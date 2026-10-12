/**
 * 等高線用的地形函數與「行進方格法」（marching squares）等值線產生器。
 * 由 ContourScene（熱區）與 ContourLab（剖面實驗）共用。
 */
export type HeightFn = (x: number, y: number) => number;

/** 左右不對稱的高斯山丘：西側用 sxW、東側用 sxE 控制坡度（數值越小越陡） */
export function hill(
  x: number,
  y: number,
  cx: number,
  cy: number,
  peak: number,
  sxW: number,
  sxE: number,
  sy: number,
) {
  const sx = x < cx ? sxW : sxE;
  return peak * Math.exp(-(((x - cx) / sx) ** 2) - ((y - cy) / sy) ** 2);
}

/**
 * 產生多條等高線的 SVG path（每個高度一條 path）。
 * 以 step 為格距取樣，對每個方格找出等值線穿過的邊並連線。
 */
export function contourPaths(
  h: HeightFn,
  levels: number[],
  width: number,
  height: number,
  step: number,
): { level: number; d: string }[] {
  const nx = Math.ceil(width / step);
  const ny = Math.ceil(height / step);
  const v: number[][] = [];
  for (let j = 0; j <= ny; j++) {
    const row: number[] = [];
    for (let i = 0; i <= nx; i++) row.push(h(i * step, j * step));
    v.push(row);
  }
  const r1 = (n: number) => Math.round(n * 10) / 10;
  return levels.map((level) => {
    let d = "";
    for (let j = 0; j < ny; j++) {
      for (let i = 0; i < nx; i++) {
        const x0 = i * step;
        const y0 = j * step;
        const a = v[j][i];
        const b = v[j][i + 1];
        const c = v[j + 1][i + 1];
        const e = v[j + 1][i];
        const pts: [number, number][] = [];
        const lerp = (p: number, q: number) => (level - p) / (q - p);
        if ((a - level) * (b - level) < 0) pts.push([x0 + lerp(a, b) * step, y0]);
        if ((b - level) * (c - level) < 0) pts.push([x0 + step, y0 + lerp(b, c) * step]);
        if ((e - level) * (c - level) < 0) pts.push([x0 + lerp(e, c) * step, y0 + step]);
        if ((a - level) * (e - level) < 0) pts.push([x0, y0 + lerp(a, e) * step]);
        for (let k = 0; k + 1 < pts.length; k += 2) {
          d += `M${r1(pts[k][0])},${r1(pts[k][1])}L${r1(pts[k + 1][0])},${r1(pts[k + 1][1])}`;
        }
      }
    }
    return { level, d };
  });
}

/** 熱區場景用的地形（viewBox 400×300）：兩座山頂、一個鞍部、一條山脊與東側陡坡 */
export const RELIEF: HeightFn = (x, y) =>
  20 +
  hill(x, y, 130, 135, 500, 115, 62, 62) +
  hill(x, y, 292, 125, 390, 58, 30, 52) +
  hill(x, y, 92, 200, 190, 30, 30, 30) +
  hill(x, y, 70, 245, 120, 28, 28, 28);

/** 剖面實驗用的地形（地圖 400×240）：主峰西緩東陡，東北另有一座小山 */
export const PROFILE_HILL: HeightFn = (x, y) =>
  30 + hill(x, y, 180, 120, 600, 140, 52, 72) + hill(x, y, 322, 58, 280, 42, 42, 42);
