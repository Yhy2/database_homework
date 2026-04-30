import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const rootDir = resolve(__dirname, "../../../..");

describe("production Docker build", () => {
  it("does not expose auth secrets to the frontend build", () => {
    const dockerfile = readFileSync(resolve(rootDir, "Dockerfile"), "utf8");
    const prodCompose = readFileSync(resolve(rootDir, "docker-compose.prod.yml"), "utf8");

    expect(dockerfile).not.toContain("VITE_DEMO_ACCESS_TOKEN");
    expect(prodCompose).not.toContain("DEMO_ACCESS_TOKEN");
  });
});
