import { flushPromises, mount } from "@vue/test-utils";
import ElementPlus from "element-plus";
import { vi } from "vitest";

import ItemsView from "../ItemsView.vue";

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
  it("renders the enterprise operations hero and summary metrics", async () => {
    const wrapper = mount(ItemsView, {
      global: {
        plugins: [ElementPlus],
      },
    });

    await flushPromises();

    expect(wrapper.text()).toContain("商品台账与供给管理");
    expect(wrapper.text()).toContain("商品总数");
    expect(wrapper.text()).toContain("在售库存");
    expect(wrapper.text()).toContain("新增商品");
  });
});
