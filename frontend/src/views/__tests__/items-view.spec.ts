import { flushPromises, mount } from "@vue/test-utils";
import ElementPlus from "element-plus";
import { createMemoryHistory, createRouter } from "vue-router";
import { beforeEach, vi } from "vitest";

import ItemsView from "../ItemsView.vue";
import { resetAuthSessionForTest } from "../../auth/session";

vi.mock("../../api/items", () => ({
  listItems: vi.fn().mockResolvedValue([
    {
      item_id: "i001",
      item_name: "CalculusBook",
      category: "Book",
      price: 20,
      status: 0,
      seller_id: "u001",
      seller_name: "ZhangSan",
    },
    {
      item_id: "i002",
      item_name: "DeskLamp",
      category: "DailyGoods",
      price: 35,
      status: 1,
      seller_id: "u002",
      seller_name: "LiSi",
    },
  ]),
  deleteItem: vi.fn(),
  updateItemPrice: vi.fn(),
}));

vi.mock("../../api/users", () => ({
  listUsers: vi.fn().mockResolvedValue([
    { user_id: "u001", user_name: "ZhangSan", phone: "13800000001" },
    { user_id: "u002", user_name: "LiSi", phone: "13800000002" },
  ]),
}));

describe("ItemsView", () => {
  beforeEach(() => {
    localStorage.clear();
    resetAuthSessionForTest();
  });

  it("renders a read-only item ledger for visitors", async () => {
    const router = createRouter({
      history: createMemoryHistory(),
      routes: [
        { path: "/items", component: ItemsView },
        { path: "/login", component: { template: "<div>login page</div>" } },
      ],
    });
    router.push("/items");
    await router.isReady();

    const wrapper = mount(ItemsView, {
      global: {
        plugins: [router, ElementPlus],
      },
    });

    await flushPromises();

    expect(wrapper.text()).toContain("商品台账与供给管理");
    expect(wrapper.text()).toContain("商品总数");
    expect(wrapper.text()).toContain("在售库存");
    expect(wrapper.text()).toContain("游客只读模式");
    expect(wrapper.text()).toContain("商家登录后上架");
    expect(wrapper.text()).not.toContain("新增商品");
  });
});
