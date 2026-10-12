/**
 * 內容驗證：所有科目的心智圖、課程、題庫、情境都必須通過這些檢查。
 * 只檢查單一科目：CONTENT_SUBJECT=math pnpm test tests/content
 */
import { describe, expect, it } from "vitest";
import { hasTrack, loadSubjectScenarios, loadTrack, SUBJECTS } from "../../src/content/registry";
import {
  type Activity,
  type ActivityKind,
  type CurriculumNode,
  type Scenario,
  STAGES,
  type Stage,
  type SubjectId,
  TEACHING_FORMS,
  type TrackData,
} from "../../src/content/types";

const ONLY = process.env.CONTENT_SUBJECT;
const subjects = SUBJECTS.filter((s) => !ONLY || s.id === ONLY);

const MIN = {
  mindmapNodes: 20,
  mindmapDepth: 3,
  lessons: 4,
  questions: 24,
  questionTypes: 3,
  kindsPerTrack: 5,
  formsPerSubject: 8,
  scriptNodes: 6,
};
/** 自然科與地理必須用到全部 10 種教學形式 */
const ALL_FORMS: SubjectId[] = ["physics", "chemistry", "biology", "earth", "geography", "math"];

/** 常見「只出現在簡體」的字（不含與繁體共用或有歧義的字） */
const SIMPLIFIED =
  "这们说时会来对还发经过进现学动点问题从开关为与长门见种头样东车马鸟龙书气电实验图数线积压热华国历义务权论读写词语汉单杂节级约细织构质应变计认识讲边运传统无两个么颜儿岁观么众亿优伤体员卖师带帮战断无极势归恶灭灵猫独产么当话张钟钱铁阳阴乐吗网页";
const SIMPLIFIED_RE = new RegExp(`[${[...new Set(SIMPLIFIED)].join("")}]`);

const GRADES: Record<Stage, number[]> = { junior: [7, 8, 9], senior: [10, 11, 12] };
const CODE_RE = /^[歷地公]?[A-Za-z]{1,4}-(Ⅳ|Ⅴ[a-z]?|[0-9]{1,2}[A-Z甲乙]?)-[0-9]{1,2}$/;

function walk(
  node: CurriculumNode,
  depth = 1,
  out: { node: CurriculumNode; depth: number }[] = [],
) {
  out.push({ node, depth });
  for (const c of node.children ?? []) walk(c, depth + 1, out);
  return out;
}

/** 蒐集內容中所有字串（略過函式） */
function strings(v: unknown, out: string[] = []): string[] {
  if (typeof v === "string") out.push(v);
  else if (Array.isArray(v)) for (const x of v) strings(x, out);
  else if (v && typeof v === "object") for (const x of Object.values(v)) strings(x, out);
  return out;
}

function kindsOf(t: TrackData): Set<ActivityKind> {
  return new Set(t.lessons.flatMap((l) => l.activities.map((a) => a.kind)));
}

function formsOf(kinds: Set<ActivityKind>): string[] {
  return Object.entries(TEACHING_FORMS)
    .filter(([, ks]) => ks.some((k) => kinds.has(k)))
    .map(([f]) => f);
}

function checkActivity(a: Activity, track: TrackData, scenarios: Scenario[], where: string) {
  const qids = new Set(track.questions.map((q) => q.id));
  switch (a.kind) {
    case "drag":
      if (a.mode === "categorize") {
        const b = new Set(a.buckets.map((x) => x.id));
        expect(a.buckets.length, `${where} 分類至少 2 組`).toBeGreaterThanOrEqual(2);
        expect(a.items.length, `${where} 卡片至少 4 張`).toBeGreaterThanOrEqual(4);
        for (const it of a.items)
          expect(b.has(it.bucket), `${where} 卡片 ${it.id} 的 bucket 不存在`).toBe(true);
        expect(new Set(a.items.map((x) => x.id)).size, `${where} 卡片 id 重複`).toBe(
          a.items.length,
        );
      } else if (a.mode === "order") {
        expect(a.items.length, `${where} 排序至少 3 項`).toBeGreaterThanOrEqual(3);
        expect(new Set(a.items.map((x) => x.id)).size, `${where} id 重複`).toBe(a.items.length);
      } else {
        expect(a.pairs.length, `${where} 配對至少 3 組`).toBeGreaterThanOrEqual(3);
        expect(new Set(a.pairs.map((x) => x.id)).size, `${where} id 重複`).toBe(a.pairs.length);
      }
      break;
    case "quiz":
      expect(a.questionIds.length, `${where} 至少 1 題`).toBeGreaterThan(0);
      for (const id of a.questionIds) expect(qids.has(id), `${where} 找不到題目 ${id}`).toBe(true);
      break;
    case "dialogue":
      expect(
        scenarios.some((s) => s.id === a.scenarioId),
        `${where} 找不到情境 ${a.scenarioId}`,
      ).toBe(true);
      break;
    case "slider": {
      const init = Object.fromEntries(a.params.map((p) => [p.key, p.init]));
      for (const p of a.params) {
        expect(
          p.min < p.max && p.init >= p.min && p.init <= p.max,
          `${where} 參數 ${p.key} 範圍錯誤`,
        ).toBe(true);
        expect(p.step > 0, `${where} 參數 ${p.key} step`).toBe(true);
      }
      expect(() => {
        a.goal?.test(init);
        for (const f of a.plot?.fns ?? []) f.f((a.plot?.x[0] ?? 0) + 0.5, init);
        a.plot?.points?.(init);
        a.plot?.vlines?.(init);
        for (const r of a.readouts ?? []) r.value(init);
      }, `${where} 函式在初始參數下出錯`).not.toThrow();
      if (a.goal) expect(a.goal.test(init), `${where} 初始參數就已達成目標`).toBe(false);
      break;
    }
    case "hotspot": {
      const [x, y, w, h] = a.viewBox.split(/[\s,]+/).map(Number);
      expect(a.spots.length, `${where} 熱點至少 3 個`).toBeGreaterThanOrEqual(3);
      for (const s of a.spots) {
        expect(
          s.x >= x && s.x <= x + w && s.y >= y && s.y <= y + h,
          `${where} 熱點 ${s.id} 超出 viewBox`,
        ).toBe(true);
      }
      expect(typeof a.scene).toBe("function");
      break;
    }
    case "layers":
      expect(a.layers.length, `${where} 圖層至少 2 層`).toBeGreaterThanOrEqual(2);
      if (a.check) expect(a.check.answer).toBeLessThan(a.check.choices.length);
      break;
    case "steps":
      expect(a.steps.length, `${where} 至少 2 步`).toBeGreaterThanOrEqual(2);
      for (const s of a.steps)
        if (s.predict) expect(s.predict.answer).toBeLessThan(s.predict.choices.length);
      break;
    case "scratch":
      expect(a.cards.length, `${where} 刮刮卡至少 2 張`).toBeGreaterThanOrEqual(2);
      break;
    case "memory":
      expect(a.pairs.length, `${where} 翻牌至少 3 組`).toBeGreaterThanOrEqual(3);
      expect(new Set(a.pairs.flat()).size, `${where} 翻牌內容重複`).toBe(a.pairs.length * 2);
      break;
    case "mindmap":
      expect(walk(a.root).length, `${where} 心智圖至少 4 個節點`).toBeGreaterThanOrEqual(4);
      break;
    case "lab":
      expect(typeof a.load).toBe("function");
      break;
    case "canvas":
      expect(a.task.length).toBeGreaterThan(4);
      break;
    case "read":
      expect(a.body.length).toBeGreaterThan(10);
      break;
  }
}

function checkScenario(s: Scenario, subject: SubjectId) {
  const ids = Object.keys(s.script);
  expect(s.id.startsWith(`${subject}.${s.stage}.s-`), `情境 id 格式：${s.id}`).toBe(true);
  expect(s.subject).toBe(subject);
  expect(ids.length, `${s.id} 腳本至少 ${MIN.scriptNodes} 個節點`).toBeGreaterThanOrEqual(
    MIN.scriptNodes,
  );
  expect(s.script[s.start], `${s.id} start 節點不存在`).toBeDefined();
  expect(s.persona.length, `${s.id} persona 太短`).toBeGreaterThan(40);
  let hasEnd = false;
  for (const [id, n] of Object.entries(s.script)) {
    if (n.end) hasEnd = true;
    if (!n.end) expect(n.options?.length, `${s.id}/${id} 不是結尾卻沒有選項`).toBeGreaterThan(0);
    for (const o of n.options ?? [])
      expect(s.script[o.next], `${s.id}/${id} → ${o.next} 不存在`).toBeDefined();
  }
  expect(hasEnd, `${s.id} 沒有結尾節點`).toBe(true);
  // 從 start 一定走得到結尾
  const seen = new Set<string>();
  const stack = [s.start];
  let reachEnd = false;
  while (stack.length) {
    const id = stack.pop() as string;
    if (seen.has(id)) continue;
    seen.add(id);
    const n = s.script[id];
    if (n.end) reachEnd = true;
    for (const o of n.options ?? []) stack.push(o.next);
  }
  expect(reachEnd, `${s.id} 從 start 走不到結尾`).toBe(true);
}

/** 內容撰寫完成的科目必須兩個學段都有內容（全部完成後由 ALL_SUBJECTS_READY 檢查 10 科） */
it("已有內容的科目，國中與高中都有課程", () => {
  for (const meta of subjects) {
    const n = STAGES.filter((st) => hasTrack(meta.id, st)).length;
    if (n > 0) expect(n, `${meta.name} 只有一個學段`).toBe(2);
    else if (process.env.ALL_SUBJECTS_READY !== "0")
      expect.soft(n, `${meta.name} 尚無內容`).toBe(2);
  }
});

for (const meta of subjects) {
  const stages = STAGES.filter((st) => hasTrack(meta.id, st));
  describe.skipIf(stages.length === 0)(`${meta.name}（${meta.id}）`, () => {
    it("對話情境格式正確且至少一個", async () => {
      const scenarios = await loadSubjectScenarios(meta.id);
      expect(scenarios.length).toBeGreaterThanOrEqual(1);
      expect(new Set(scenarios.map((s) => s.id)).size).toBe(scenarios.length);
      for (const s of scenarios) checkScenario(s, meta.id);
    });

    it(`教學形式涵蓋至少 ${MIN.formsPerSubject} 種（自然科、數學與地理 10 種）`, async () => {
      const kinds = new Set<ActivityKind>();
      for (const st of stages) for (const k of kindsOf(await loadTrack(meta.id, st))) kinds.add(k);
      const forms = formsOf(kinds);
      const need = ALL_FORMS.includes(meta.id) ? 10 : MIN.formsPerSubject;
      expect(forms.length, `目前只有：${forms.join("、")}`).toBeGreaterThanOrEqual(need);
    });

    for (const stage of stages) {
      describe(stage, () => {
        const prefix = `${meta.id}.${stage}`;

        it("心智圖", async () => {
          const t = await loadTrack(meta.id, stage);
          expect(t.mindmap.id).toBe(prefix);
          const nodes = walk(t.mindmap);
          expect(nodes.length).toBeGreaterThanOrEqual(MIN.mindmapNodes);
          expect(Math.max(...nodes.map((n) => n.depth))).toBeGreaterThanOrEqual(MIN.mindmapDepth);
          const ids = nodes.map((n) => n.node.id);
          expect(new Set(ids).size, "心智圖 id 重複").toBe(ids.length);
          const lessonIds = new Set(t.lessons.map((l) => l.id));
          for (const { node } of nodes) {
            expect(node.id.startsWith(prefix), `節點 id 前綴：${node.id}`).toBe(true);
            if (node.code) expect(node.code, `課綱代碼格式：${node.code}`).toMatch(CODE_RE);
            if (node.grade) expect(GRADES[stage]).toContain(node.grade);
            for (const lid of node.lessonIds ?? [])
              expect(lessonIds.has(lid), `節點 ${node.id} 連到不存在的課程 ${lid}`).toBe(true);
          }
          // 每堂課都應該能從心智圖找到
          const linked = new Set(nodes.flatMap((n) => n.node.lessonIds ?? []));
          for (const l of t.lessons)
            expect(linked.has(l.id), `課程 ${l.id} 沒有掛在心智圖上`).toBe(true);
        });

        it("課程", async () => {
          const t = await loadTrack(meta.id, stage);
          const scenarios = await loadSubjectScenarios(meta.id);
          expect(t.lessons.length).toBeGreaterThanOrEqual(MIN.lessons);
          expect(new Set(t.lessons.map((l) => l.id)).size).toBe(t.lessons.length);
          const nodeIds = new Set(walk(t.mindmap).map((n) => n.node.id));
          for (const l of t.lessons) {
            expect(l.id.startsWith(`${prefix}.`), `課程 id 前綴：${l.id}`).toBe(true);
            expect(GRADES[stage], `${l.id} 年級`).toContain(l.grade);
            expect(l.activities.length, `${l.id} 活動數 2–6`).toBeGreaterThanOrEqual(2);
            expect(l.activities.length, `${l.id} 活動數 2–6`).toBeLessThanOrEqual(6);
            expect(l.objectives.length, `${l.id} 學習目標`).toBeGreaterThan(0);
            expect(
              l.activities.some((a) => a.kind !== "read" && a.kind !== "quiz"),
              `${l.id} 需要互動活動`,
            ).toBe(true);
            expect(new Set(l.activities.map((a) => a.id)).size, `${l.id} 活動 id 重複`).toBe(
              l.activities.length,
            );
            for (const n of l.nodeIds ?? [])
              expect(nodeIds.has(n), `${l.id} nodeId ${n} 不存在`).toBe(true);
            for (const a of l.activities) checkActivity(a, t, scenarios, `${l.id}/${a.id}`);
          }
          expect(kindsOf(t).size, "每個學段至少 5 種活動").toBeGreaterThanOrEqual(
            MIN.kindsPerTrack,
          );
        });

        it("題庫", async () => {
          const t = await loadTrack(meta.id, stage);
          expect(t.questions.length).toBeGreaterThanOrEqual(MIN.questions);
          expect(new Set(t.questions.map((q) => q.type)).size).toBeGreaterThanOrEqual(
            MIN.questionTypes,
          );
          expect(new Set(t.questions.map((q) => q.id)).size, "題目 id 重複").toBe(
            t.questions.length,
          );
          for (const q of t.questions) {
            expect(q.id.startsWith(`${prefix}.q-`), `題目 id 前綴：${q.id}`).toBe(true);
            expect(q.explain.length, `${q.id} 缺詳解`).toBeGreaterThan(4);
            if (q.type === "single") {
              expect(q.answer, q.id).toBeLessThan(q.choices.length);
              expect(q.choices.length, q.id).toBeGreaterThanOrEqual(2);
              expect(new Set(q.choices).size, `${q.id} 選項重複`).toBe(q.choices.length);
            }
            if (q.type === "multi") {
              expect(q.answer.length, q.id).toBeGreaterThan(0);
              for (const i of q.answer) expect(i, q.id).toBeLessThan(q.choices.length);
            }
            if (q.type === "cloze") expect(q.accept.length, q.id).toBeGreaterThan(0);
            if (q.type === "numeric") expect(Number.isFinite(q.answer), q.id).toBe(true);
          }
        });

        it("文字：繁體中文、無外部連結", async () => {
          const t = await loadTrack(meta.id, stage);
          const scenarios = (await loadSubjectScenarios(meta.id)).filter((s) => s.stage === stage);
          for (const s of strings([t, scenarios])) {
            expect(s, `疑似簡體字：「${s.slice(0, 40)}」`).not.toMatch(SIMPLIFIED_RE);
            expect(s, `內容不可包含外部網址：「${s.slice(0, 40)}」`).not.toMatch(/https?:\/\//);
          }
        });
      });
    }
  });
}
