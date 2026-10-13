import { Fragment, type ReactNode, useEffect, useState } from "react";

/**
 * 輕量 Rich 文字：**粗體**、$行內公式$、$$區塊公式$$、\ce{} 化學式（需包在 $ 內）、
 * 「- 」條列、空白行分段。KaTeX 只在出現公式時才延遲載入。
 */

type Katex = typeof import("katex").default;
let katexPromise: Promise<Katex> | null = null;
let katexInstance: Katex | null = null;

function loadKatex(): Promise<Katex> {
  if (!katexPromise) {
    katexPromise = Promise.all([
      import("katex"),
      import("katex/contrib/mhchem"),
      import("katex/dist/katex.min.css"),
    ]).then(([k]) => {
      katexInstance = k.default;
      return k.default;
    });
  }
  return katexPromise;
}

export function hasMath(text: string): boolean {
  return /\$[^$]+\$/.test(text);
}

function useKatex(needed: boolean): Katex | null {
  const [k, setK] = useState<Katex | null>(katexInstance);
  useEffect(() => {
    if (needed && !k) {
      let alive = true;
      loadKatex().then((x) => alive && setK(() => x));
      return () => {
        alive = false;
      };
    }
  }, [needed, k]);
  return k;
}

function MathSpan({ tex, display, katex }: { tex: string; display: boolean; katex: Katex | null }) {
  if (!katex) {
    return <code className="font-mono text-[0.95em] text-slate-500">{tex}</code>;
  }
  const html = katex.renderToString(tex, {
    displayMode: display,
    throwOnError: false,
    strict: "ignore",
  });
  const Tag = display ? "div" : "span";
  return (
    <Tag
      className={display ? "my-2 overflow-x-auto" : undefined}
      // biome-ignore lint/security/noDangerouslySetInnerHtml: KaTeX 輸出（內容為站內撰寫、未開啟 trust）
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

/** 處理一行文字中的 $..$ 與 **..** */
function renderInline(text: string, katex: Katex | null, keyBase: string): ReactNode[] {
  const out: ReactNode[] = [];
  const re = /(\$\$[^$]+\$\$|\$[^$\n]+\$|\*\*[^*]+\*\*)/g;
  let last = 0;
  let i = 0;
  for (let m = re.exec(text); m; m = re.exec(text)) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const tok = m[0];
    const key = `${keyBase}-${i++}`;
    if (tok.startsWith("$$"))
      out.push(<MathSpan key={key} tex={tok.slice(2, -2)} display katex={katex} />);
    else if (tok.startsWith("$"))
      out.push(<MathSpan key={key} tex={tok.slice(1, -1)} display={false} katex={katex} />);
    else out.push(<strong key={key}>{renderInline(tok.slice(2, -2), katex, key)}</strong>);
    last = m.index + tok.length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

export function RichText({
  text,
  className = "",
  inline = false,
}: {
  text: string | undefined;
  className?: string;
  inline?: boolean;
}) {
  const value = text ?? "";
  const katex = useKatex(hasMath(value));
  if (inline) {
    return <span className={className}>{renderInline(value, katex, "i")}</span>;
  }
  const paragraphs = value.split(/\n\s*\n/);
  return (
    <div className={`prose-rich leading-relaxed ${className}`}>
      {paragraphs.map((para, pi) => {
        const lines = para.split("\n");
        const isList = lines.every((l) => /^\s*[-•]\s+/.test(l));
        if (isList) {
          return (
            <ul key={pi}>
              {lines.map((l, li) => (
                <li key={li}>{renderInline(l.replace(/^\s*[-•]\s+/, ""), katex, `${pi}-${li}`)}</li>
              ))}
            </ul>
          );
        }
        return (
          <p key={pi}>
            {lines.map((l, li) => (
              <Fragment key={li}>
                {li > 0 && <br />}
                {renderInline(l, katex, `${pi}-${li}`)}
              </Fragment>
            ))}
          </p>
        );
      })}
    </div>
  );
}

/** 單行（選項、標籤等） */
export function Rich({ text, className }: { text: string; className?: string }) {
  return <RichText text={text} inline className={className} />;
}
