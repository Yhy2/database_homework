import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

const currentDir = dirname(fileURLToPath(import.meta.url));
const stylesheet = readFileSync(resolve(currentDir, "../main.css"), "utf8");

describe("flow graphic styling", () => {
  it("defines animated SVG flow effects with reduced-motion fallback coverage", () => {
    expect(stylesheet).toMatch(/\.flow-graphic\s*\{/);
    expect(stylesheet).toMatch(/\.flow-graphic__stream\s*\{/);
    expect(stylesheet).toMatch(/\.flow-graphic__pulse\s*\{/);
    expect(stylesheet).toMatch(/\.flow-graphic__orbit\s*\{/);
    expect(stylesheet).toMatch(/@keyframes\s+flow-dash/);
    expect(stylesheet).toMatch(/@keyframes\s+flow-pulse/);
    expect(stylesheet).toMatch(/@keyframes\s+flow-orbit/);
    expect(stylesheet).toMatch(/@media\s*\(prefers-reduced-motion:\s*reduce\)/);
  });
});
