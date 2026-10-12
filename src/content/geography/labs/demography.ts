/**
 * 人口轉型模擬（某虛構國家，示意）：
 * 平均壽命逐年提高、總生育率隨後下降，以「世代推移法」逐年推算各年齡人口。
 * 走勢與許多已開發國家（包括臺灣）相似，但數字是模型結果，不是實際統計。
 */
export const START_YEAR = 1900;
export const END_YEAR = 2080;
const AGES = 101;

/** 平均壽命與總生育率的假設路徑 */
export const lifeExpectancy = (t: number) => 22 + 62 / (1 + Math.exp(-(t - 1950) / 20));
export const fertility = (t: number) => 1.1 + 4.9 / (1 + Math.exp((t - 1972) / 9));

/** 以死亡強度 m 產生存活曲線 l(a)：嬰幼兒死亡＋隨年齡增加的老化死亡 */
function survival(m: number): number[] {
  const l = [1];
  for (let a = 0; a < AGES; a++) {
    const mu = m * (0.05 * Math.exp(-a / 2) + 0.0003 * Math.exp(0.085 * a));
    l.push(l[a] * Math.exp(-mu));
  }
  return l;
}

function expectancy(l: number[]): number {
  let s = 0;
  for (let a = 0; a < AGES; a++) s += (l[a] + l[a + 1]) / 2;
  return s;
}

/** 找出平均壽命等於 target 的存活曲線（二分法） */
function lifeTable(target: number): number[] {
  let lo = 0.01;
  let hi = 80;
  for (let i = 0; i < 45; i++) {
    const mid = Math.sqrt(lo * hi);
    if (expectancy(survival(mid)) > target) lo = mid;
    else hi = mid;
  }
  return survival(Math.sqrt(lo * hi));
}

/** 生育年齡分布（15～49 歲，以 29 歲為高峰） */
const PHI: number[] = (() => {
  const raw = Array.from({ length: AGES }, (_, a) =>
    a >= 15 && a <= 49 ? Math.exp(-(((a - 29) / 6.5) ** 2) / 2) : 0,
  );
  const total = raw.reduce((x, y) => x + y, 0);
  return raw.map((v) => v / total);
})();

export interface YearStat {
  year: number;
  /** 出生率（‰） */
  birth: number;
  /** 死亡率（‰） */
  death: number;
  young: number;
  working: number;
  old: number;
  /** 5 歲一組（0–4 … 80+）的人口比例（%） */
  groups: number[];
  e0: number;
  tfr: number;
}

function simulate(): YearStat[] {
  // 起始：以 1900 年條件下的穩定人口作為初始年齡結構
  const l0 = lifeTable(lifeExpectancy(START_YEAR));
  const f0 = fertility(START_YEAR);
  const net = (r: number) => {
    let s = 0;
    for (let a = 15; a <= 49; a++) s += Math.exp(-r * (a + 0.5)) * l0[a] * f0 * 0.488 * PHI[a];
    return s - 1;
  };
  let lo = -0.08;
  let hi = 0.08;
  for (let i = 0; i < 50; i++) {
    const mid = (lo + hi) / 2;
    if (net(mid) > 0) lo = mid;
    else hi = mid;
  }
  const r0 = (lo + hi) / 2;
  let P = Array.from({ length: AGES }, (_, a) => 1000 * Math.exp(-r0 * a) * l0[a]);

  const out: YearStat[] = [];
  for (let t = START_YEAR; t <= END_YEAR; t++) {
    const e0 = lifeExpectancy(t);
    const tfr = fertility(t);
    const l = lifeTable(e0);
    const pop = P.reduce((x, y) => x + y, 0);
    let births = 0;
    for (let a = 15; a <= 49; a++) births += P[a] * 0.488 * tfr * PHI[a];
    const next = new Array<number>(AGES).fill(0);
    let deaths = 0;
    for (let a = 0; a < AGES - 1; a++) {
      const s = l[a + 1] / l[a];
      next[a + 1] = P[a] * s;
      deaths += P[a] * (1 - s);
    }
    deaths += P[AGES - 1];
    const s0 = Math.sqrt(l[1]);
    next[0] = births * s0;
    deaths += births * (1 - s0);

    const share = (from: number, to: number) =>
      (100 * P.slice(from, to).reduce((x, y) => x + y, 0)) / pop;
    out.push({
      year: t,
      birth: (1000 * births) / pop,
      death: (1000 * deaths) / pop,
      young: share(0, 15),
      working: share(15, 65),
      old: share(65, AGES),
      groups: Array.from({ length: 17 }, (_, g) => share(g * 5, g === 16 ? AGES : g * 5 + 5)),
      e0,
      tfr,
    });
    P = next;
  }
  return out;
}

export const YEARS: YearStat[] = simulate();

/** 依出生率、死亡率判斷人口轉型階段 */
export function stageOf(s: YearStat): { n: number; text: string } {
  if (s.birth < s.death) return { n: 5, text: "第五階段：出生率低於死亡率，人口自然減少" };
  if (s.birth >= 30 && s.death >= 20)
    return { n: 1, text: "第一階段：高出生、高死亡，人口成長緩慢" };
  if (s.birth >= 30) return { n: 2, text: "第二階段：死亡率快速下降，人口快速成長" };
  if (s.birth >= 15) return { n: 3, text: "第三階段：出生率明顯下降，成長趨緩" };
  return { n: 4, text: "第四階段：低出生、低死亡，成長停滯" };
}
