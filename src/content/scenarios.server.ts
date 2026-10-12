/**
 * 伺服器端（api/）使用的全部情境清單。
 * 客戶端請改用 registry.ts 的 loadScenario()，以免把所有情境打包進主程式。
 */

import biology from "./biology/scenarios.js";
import chemistry from "./chemistry/scenarios.js";
import chinese from "./chinese/scenarios.js";
import civics from "./civics/scenarios.js";
import earth from "./earth/scenarios.js";
import english from "./english/scenarios.js";
import geography from "./geography/scenarios.js";
import history from "./history/scenarios.js";
import math from "./math/scenarios.js";
import physics from "./physics/scenarios.js";
import type { Scenario } from "./types.js";

export const ALL_SCENARIOS: Scenario[] = [
  ...chinese,
  ...english,
  ...math,
  ...physics,
  ...chemistry,
  ...biology,
  ...earth,
  ...geography,
  ...history,
  ...civics,
];

export function findScenario(id: string): Scenario | undefined {
  return ALL_SCENARIOS.find((s) => s.id === id);
}
