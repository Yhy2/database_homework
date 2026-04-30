import { mount } from "@vue/test-utils";
import ElementPlus from "element-plus";
import { createMemoryHistory, createRouter } from "vue-router";
import { beforeEach } from "vitest";

import AppShell from "../AppShell.vue";
import { resetAuthSessionForTest } from "../../auth/session";

async function mountShell(initialPath = "/") {
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: "/", component: { template: "<div>home page</div>" } },
      { path: "/items", component: { template: "<div>items page</div>" } },
      { path: "/users", component: { template: "<div>users page</div>" } },
      { path: "/orders", component: { template: "<div>orders page</div>" } },
      { path: "/stats", component: { template: "<div>stats page</div>" } },
      { path: "/purchase", component: { template: "<div>purchase page</div>" } },
      { path: "/login", component: { template: "<div>login page</div>" } },
    ],
  });

  router.push(initialPath);
  await router.isReady();

  return mount(AppShell, {
    global: {
      plugins: [router, ElementPlus],
    },
  });
}

describe("AppShell", () => {
  beforeEach(() => {
    localStorage.clear();
    resetAuthSessionForTest();
  });

  it("renders enterprise brand copy and all navigation entries", async () => {
    const wrapper = await mountShell();

    expect(wrapper.text()).toContain("Campus Exchange Platform");
    expect(wrapper.text()).toContain("校园二手交易平台");
    expect(wrapper.text()).toContain("Database System Showcase");

    expect(wrapper.text()).toContain("首页");
    expect(wrapper.text()).toContain("商品列表");
    expect(wrapper.text()).toContain("用户列表");
    expect(wrapper.text()).toContain("订单列表");
    expect(wrapper.text()).toContain("查询统计");
    expect(wrapper.text()).toContain("购买演示");
    expect(wrapper.text()).toContain("游客只读模式");
    expect(wrapper.text()).toContain("账号登录");
  });

  it("marks the current route inside the global shell", async () => {
    const wrapper = await mountShell("/stats");

    const activeItem = wrapper.find(".nav-item.is-active");
    expect(activeItem.exists()).toBe(true);
    expect(activeItem.text()).toContain("查询统计");
  });
});
