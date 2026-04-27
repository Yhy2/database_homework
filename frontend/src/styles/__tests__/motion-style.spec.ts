import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

const currentDir = dirname(fileURLToPath(import.meta.url));
const stylesheet = readFileSync(resolve(currentDir, "../main.css"), "utf8");

describe("motion styling", () => {
  it("adds restrained page motion with a reduced-motion fallback", () => {
    expect(stylesheet).toMatch(/@keyframes\s+page-rise/);
    expect(stylesheet).toMatch(/\.page-section\s*>\s*\*\s*\{/);
    expect(stylesheet).toMatch(/animation:\s*page-rise/);
    expect(stylesheet).toMatch(/\.page-section\s*>\s*\*:nth-child\(2\)/);
    expect(stylesheet).toMatch(/\.page-route-enter-active/);
    expect(stylesheet).toMatch(/\.page-route-leave-active/);
    expect(stylesheet).toMatch(/@media\s*\(prefers-reduced-motion:\s*reduce\)/);
    expect(stylesheet).toMatch(/animation:\s*none\s*!important;/);
    expect(stylesheet).toMatch(/transition:\s*none\s*!important;/);
  });
});
