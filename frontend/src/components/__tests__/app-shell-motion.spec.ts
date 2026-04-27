import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

const component = readFileSync(
  resolve(import.meta.dirname, "../AppShell.vue"),
  "utf8",
);

describe("AppShell route motion", () => {
  it("wraps routed pages in a named transition", () => {
    expect(component).toContain('<router-view v-slot="{ Component, route }">');
    expect(component).toContain('<Transition name="page-route" mode="out-in">');
    expect(component).toContain(':key="route.fullPath"');
  });
});
