import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

const currentDir = dirname(fileURLToPath(import.meta.url));
const stylesheet = readFileSync(resolve(currentDir, "../main.css"), "utf8");

describe("surface interaction treatment", () => {
  it("removes frosted glass styling and keeps mouse hover highlight", () => {
    expect(stylesheet).toContain("--surface: #ffffff;");
    expect(stylesheet).toContain("--surface-hover: #fcfdff;");
    expect(stylesheet).not.toContain("backdrop-filter:");
    expect(stylesheet).toMatch(/\.site-header__inner:hover\s*\{/);
    expect(stylesheet).toMatch(/\.page-hero:hover,\s*\.content-block:hover,\s*\.panel-card:hover/);
    expect(stylesheet).not.toMatch(/:focus-within/);
  });
});
