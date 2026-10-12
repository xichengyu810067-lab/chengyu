import { type ReactNode, useEffect, useRef, useState } from "react";
import { RichText } from "./RichText";

export interface Bubble {
  role: "user" | "assistant" | "note";
  content: string;
}

export default function ChatPanel({
  bubbles,
  streaming,
  aiName,
  aiAvatar = "🤖",
  userAvatar = "🧑‍🎓",
  onSend,
  disabled,
  placeholder = "輸入訊息…",
  suggestions,
  footer,
  maxLength = 600,
}: {
  bubbles: Bubble[];
  streaming?: string | null;
  aiName: string;
  aiAvatar?: string;
  userAvatar?: string;
  onSend?: (text: string) => void;
  disabled?: boolean;
  placeholder?: string;
  suggestions?: string[];
  footer?: ReactNode;
  maxLength?: number;
}) {
  const [text, setText] = useState("");
  const endRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: 新訊息時捲到底
  useEffect(() => {
    const list = listRef.current;
    if (list) list.scrollTop = list.scrollHeight;
  }, [bubbles.length, streaming]);

  const send = (t: string) => {
    const v = t.trim();
    if (!v || disabled || !onSend) return;
    onSend(v.slice(0, maxLength));
    setText("");
  };

  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      <div
        ref={listRef}
        className="max-h-[55vh] min-h-56 space-y-3 overflow-y-auto p-4"
        aria-live="polite"
        data-testid="chat-list"
      >
        {bubbles.map((b, i) =>
          b.role === "note" ? (
            <div
              key={i}
              className="mx-auto max-w-[90%] rounded-lg bg-amber-50 px-3 py-1.5 text-center text-xs text-amber-900 dark:bg-amber-950/40 dark:text-amber-100"
            >
              <RichText text={b.content} inline />
            </div>
          ) : (
            <Row
              key={i}
              who={b.role}
              avatar={b.role === "user" ? userAvatar : aiAvatar}
              name={b.role === "user" ? "你" : aiName}
            >
              {b.role === "assistant" ? (
                <RichText text={b.content} />
              ) : (
                <p className="whitespace-pre-wrap">{b.content}</p>
              )}
            </Row>
          ),
        )}
        {streaming !== null && streaming !== undefined && (
          <Row who="assistant" avatar={aiAvatar} name={aiName}>
            {streaming ? (
              <RichText text={streaming} />
            ) : (
              <span className="inline-flex gap-1">
                <Dot />
                <Dot d={150} />
                <Dot d={300} />
              </span>
            )}
          </Row>
        )}
        <div ref={endRef} />
      </div>
      {suggestions && suggestions.length > 0 && onSend && !disabled && (
        <div className="flex flex-wrap gap-2 border-t border-slate-100 px-3 py-2 dark:border-slate-800">
          {suggestions.map((s) => (
            <button
              key={s}
              type="button"
              className="chip cursor-pointer hover:bg-brand-100 dark:hover:bg-brand-900"
              onClick={() => send(s)}
            >
              {s}
            </button>
          ))}
        </div>
      )}
      {onSend && (
        <form
          className="flex items-end gap-2 border-t border-slate-200 p-3 dark:border-slate-800"
          onSubmit={(e) => {
            e.preventDefault();
            send(text);
          }}
        >
          <label className="sr-only" htmlFor="chat-input">
            訊息
          </label>
          <textarea
            id="chat-input"
            className="input max-h-32 min-h-11 flex-1 resize-none"
            rows={1}
            value={text}
            maxLength={maxLength}
            disabled={disabled}
            placeholder={placeholder}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
                e.preventDefault();
                send(text);
              }
            }}
            data-testid="chat-input"
          />
          <button type="submit" className="btn-primary" disabled={disabled || !text.trim()}>
            送出
          </button>
        </form>
      )}
      {footer && (
        <div className="border-t border-slate-200 p-3 dark:border-slate-800">{footer}</div>
      )}
    </div>
  );
}

function Row({
  who,
  avatar,
  name,
  children,
}: {
  who: "user" | "assistant";
  avatar: string;
  name: string;
  children: ReactNode;
}) {
  const mine = who === "user";
  return (
    <div className={`flex animate-fade-in gap-2 ${mine ? "flex-row-reverse" : ""}`}>
      <span
        className="grid size-9 shrink-0 place-items-center rounded-full bg-slate-100 text-lg dark:bg-slate-800"
        aria-hidden
      >
        {avatar}
      </span>
      <div className={`max-w-[80%] ${mine ? "text-right" : ""}`}>
        <p className="mb-0.5 text-[11px] text-slate-500">{name}</p>
        <div
          className={`inline-block rounded-2xl px-3.5 py-2 text-left text-[15px] ${
            mine
              ? "rounded-tr-sm bg-brand-600 text-white"
              : "rounded-tl-sm bg-slate-100 dark:bg-slate-800"
          }`}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

function Dot({ d = 0 }: { d?: number }) {
  return (
    <span
      className="size-2 animate-bounce rounded-full bg-slate-400"
      style={{ animationDelay: `${d}ms` }}
    />
  );
}
