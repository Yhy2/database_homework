import { computed, onMounted, ref } from "vue";
import { ElMessage } from "element-plus";
import MetricCard from "../components/MetricCard.vue";
import ResultTable from "../components/ResultTable.vue";
import { getAggregateReports, getBasicReports, getJoinReports, getSoldItemView, getUnsoldItemView, } from "../api/reports";
import { formatCategory, formatPrice, getErrorMessage } from "../utils/display";
const loading = ref(false);
const basicReports = ref(null);
const joinReports = ref(null);
const aggregateReports = ref(null);
const soldView = ref([]);
const unsoldView = ref([]);
const itemColumns = [
    { key: "item_id", label: "商品编号", width: 120 },
    { key: "item_name", label: "商品名称", minWidth: 160 },
    { key: "category_label", label: "分类", minWidth: 140 },
    { key: "price_label", label: "价格", width: 120 },
    { key: "seller_id", label: "卖家编号", width: 120 },
];
const soldItemColumns = [
    { key: "item_name", label: "商品名称", minWidth: 180 },
    { key: "buyer_name", label: "买家姓名", minWidth: 160 },
];
const orderJoinColumns = [
    { key: "order_id", label: "订单编号", width: 120 },
    { key: "item_name", label: "商品名称", minWidth: 180 },
    { key: "buyer_name", label: "买家姓名", minWidth: 160 },
    { key: "order_date", label: "日期", minWidth: 140 },
];
const sellerStatusColumns = [
    { key: "item_id", label: "商品编号", width: 120 },
    { key: "item_name", label: "商品名称", minWidth: 180 },
    { key: "purchase_status", label: "购买状态", width: 130 },
    { key: "buyer_name", label: "买家姓名", minWidth: 160 },
];
const categoryCountColumns = [
    { key: "category_label", label: "分类", minWidth: 160 },
    { key: "item_count", label: "数量", width: 120 },
];
const soldViewColumns = [
    { key: "item_name", label: "商品名称", minWidth: 180 },
    { key: "buyer_id", label: "买家编号", width: 140 },
];
const unsoldViewColumns = [
    { key: "item_id", label: "商品编号", width: 120 },
    { key: "item_name", label: "商品名称", minWidth: 160 },
    { key: "category_label", label: "分类", minWidth: 140 },
    { key: "price_label", label: "价格", width: 120 },
    { key: "seller_id", label: "卖家编号", width: 120 },
];
const unsoldRows = computed(() => (basicReports.value?.unsold_items ?? []).map((item) => ({
    ...item,
    category_label: formatCategory(item.category),
    price_label: formatPrice(item.price),
})));
const priceAbove30Rows = computed(() => (basicReports.value?.price_above_30 ?? []).map((item) => ({
    ...item,
    category_label: formatCategory(item.category),
    price_label: formatPrice(item.price),
})));
const dailyGoodsRows = computed(() => (basicReports.value?.daily_goods_items ?? []).map((item) => ({
    ...item,
    category_label: formatCategory(item.category),
    price_label: formatPrice(item.price),
})));
const sellerRows = computed(() => (basicReports.value?.seller_u001_items ?? []).map((item) => ({
    ...item,
    category_label: formatCategory(item.category),
    price_label: formatPrice(item.price),
})));
const soldItemsWithBuyersRows = computed(() => (joinReports.value?.sold_items_with_buyers ?? []).map((row) => ({
    item_name: row.item_name,
    buyer_name: row.buyer_name,
})));
const orderJoinRows = computed(() => joinReports.value?.orders_with_item_and_buyer ?? []);
const sellerStatusRows = computed(() => (joinReports.value?.u001_sales_status ?? []).map((row) => ({
    ...row,
    buyer_name: row.buyer_name || "-",
})));
const categoryCountRows = computed(() => (aggregateReports.value?.category_counts ?? []).map((row) => ({
    ...row,
    category_label: formatCategory(row.category),
})));
const soldViewRows = computed(() => soldView.value);
const unsoldViewRows = computed(() => unsoldView.value.map((row) => ({
    ...row,
    category_label: formatCategory(row.category),
    price_label: formatPrice(row.price),
})));
async function loadReports() {
    loading.value = true;
    try {
        const [basic, join, aggregate, sold, unsold] = await Promise.all([
            getBasicReports(),
            getJoinReports(),
            getAggregateReports(),
            getSoldItemView(),
            getUnsoldItemView(),
        ]);
        basicReports.value = basic;
        joinReports.value = join;
        aggregateReports.value = aggregate;
        soldView.value = sold;
        unsoldView.value = unsold;
    }
    catch (error) {
        ElMessage.error(getErrorMessage(error));
    }
    finally {
        loading.value = false;
    }
}
onMounted(loadReports);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)({
    ...{ class: "page-section" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.header, __VLS_intrinsicElements.header)({
    ...{ class: "section-header" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
    ...{ class: "section-kicker" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
    ...{ class: "section-copy" },
});
const __VLS_0 = {}.ElButton;
/** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    ...{ 'onClick': {} },
    plain: true,
}));
const __VLS_2 = __VLS_1({
    ...{ 'onClick': {} },
    plain: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
let __VLS_4;
let __VLS_5;
let __VLS_6;
const __VLS_7 = {
    onClick: (__VLS_ctx.loadReports)
};
__VLS_3.slots.default;
var __VLS_3;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "metric-grid" },
});
__VLS_asFunctionalDirective(__VLS_directives.vLoading)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.loading) }, null, null);
/** @type {[typeof MetricCard, ]} */ ;
// @ts-ignore
const __VLS_8 = __VLS_asFunctionalComponent(MetricCard, new MetricCard({
    title: "商品总数",
    value: (__VLS_ctx.aggregateReports?.total_items ?? 0),
    description: "聚合查询结果",
    tone: "sun",
}));
const __VLS_9 = __VLS_8({
    title: "商品总数",
    value: (__VLS_ctx.aggregateReports?.total_items ?? 0),
    description: "聚合查询结果",
    tone: "sun",
}, ...__VLS_functionalComponentArgsRest(__VLS_8));
/** @type {[typeof MetricCard, ]} */ ;
// @ts-ignore
const __VLS_11 = __VLS_asFunctionalComponent(MetricCard, new MetricCard({
    title: "平均价格",
    value: (__VLS_ctx.aggregateReports ? `¥${__VLS_ctx.aggregateReports.average_price.toFixed(2)}` : '¥0.00'),
    description: "所有商品平均价格",
    tone: "sea",
}));
const __VLS_12 = __VLS_11({
    title: "平均价格",
    value: (__VLS_ctx.aggregateReports ? `¥${__VLS_ctx.aggregateReports.average_price.toFixed(2)}` : '¥0.00'),
    description: "所有商品平均价格",
    tone: "sea",
}, ...__VLS_functionalComponentArgsRest(__VLS_11));
/** @type {[typeof MetricCard, ]} */ ;
// @ts-ignore
const __VLS_14 = __VLS_asFunctionalComponent(MetricCard, new MetricCard({
    title: "发布最多的用户",
    value: (__VLS_ctx.aggregateReports?.top_seller?.user_name ?? '-'),
    description: (__VLS_ctx.aggregateReports ? `${__VLS_ctx.aggregateReports.top_seller.item_count} 件商品` : ''),
    tone: "ink",
}));
const __VLS_15 = __VLS_14({
    title: "发布最多的用户",
    value: (__VLS_ctx.aggregateReports?.top_seller?.user_name ?? '-'),
    description: (__VLS_ctx.aggregateReports ? `${__VLS_ctx.aggregateReports.top_seller.item_count} 件商品` : ''),
    tone: "ink",
}, ...__VLS_functionalComponentArgsRest(__VLS_14));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "stats-grid" },
});
/** @type {[typeof ResultTable, ]} */ ;
// @ts-ignore
const __VLS_17 = __VLS_asFunctionalComponent(ResultTable, new ResultTable({
    title: "未售商品",
    columns: (__VLS_ctx.itemColumns),
    rows: (__VLS_ctx.unsoldRows),
    loading: (__VLS_ctx.loading),
}));
const __VLS_18 = __VLS_17({
    title: "未售商品",
    columns: (__VLS_ctx.itemColumns),
    rows: (__VLS_ctx.unsoldRows),
    loading: (__VLS_ctx.loading),
}, ...__VLS_functionalComponentArgsRest(__VLS_17));
/** @type {[typeof ResultTable, ]} */ ;
// @ts-ignore
const __VLS_20 = __VLS_asFunctionalComponent(ResultTable, new ResultTable({
    title: "价格大于 30 的商品",
    columns: (__VLS_ctx.itemColumns),
    rows: (__VLS_ctx.priceAbove30Rows),
    loading: (__VLS_ctx.loading),
}));
const __VLS_21 = __VLS_20({
    title: "价格大于 30 的商品",
    columns: (__VLS_ctx.itemColumns),
    rows: (__VLS_ctx.priceAbove30Rows),
    loading: (__VLS_ctx.loading),
}, ...__VLS_functionalComponentArgsRest(__VLS_20));
/** @type {[typeof ResultTable, ]} */ ;
// @ts-ignore
const __VLS_23 = __VLS_asFunctionalComponent(ResultTable, new ResultTable({
    title: "生活用品类商品",
    columns: (__VLS_ctx.itemColumns),
    rows: (__VLS_ctx.dailyGoodsRows),
    loading: (__VLS_ctx.loading),
}));
const __VLS_24 = __VLS_23({
    title: "生活用品类商品",
    columns: (__VLS_ctx.itemColumns),
    rows: (__VLS_ctx.dailyGoodsRows),
    loading: (__VLS_ctx.loading),
}, ...__VLS_functionalComponentArgsRest(__VLS_23));
/** @type {[typeof ResultTable, ]} */ ;
// @ts-ignore
const __VLS_26 = __VLS_asFunctionalComponent(ResultTable, new ResultTable({
    title: "u001 发布的商品",
    columns: (__VLS_ctx.itemColumns),
    rows: (__VLS_ctx.sellerRows),
    loading: (__VLS_ctx.loading),
}));
const __VLS_27 = __VLS_26({
    title: "u001 发布的商品",
    columns: (__VLS_ctx.itemColumns),
    rows: (__VLS_ctx.sellerRows),
    loading: (__VLS_ctx.loading),
}, ...__VLS_functionalComponentArgsRest(__VLS_26));
/** @type {[typeof ResultTable, ]} */ ;
// @ts-ignore
const __VLS_29 = __VLS_asFunctionalComponent(ResultTable, new ResultTable({
    title: "已售商品及买家姓名",
    columns: (__VLS_ctx.soldItemColumns),
    rows: (__VLS_ctx.soldItemsWithBuyersRows),
    loading: (__VLS_ctx.loading),
}));
const __VLS_30 = __VLS_29({
    title: "已售商品及买家姓名",
    columns: (__VLS_ctx.soldItemColumns),
    rows: (__VLS_ctx.soldItemsWithBuyersRows),
    loading: (__VLS_ctx.loading),
}, ...__VLS_functionalComponentArgsRest(__VLS_29));
/** @type {[typeof ResultTable, ]} */ ;
// @ts-ignore
const __VLS_32 = __VLS_asFunctionalComponent(ResultTable, new ResultTable({
    title: "订单商品 + 买家 + 日期",
    columns: (__VLS_ctx.orderJoinColumns),
    rows: (__VLS_ctx.orderJoinRows),
    loading: (__VLS_ctx.loading),
}));
const __VLS_33 = __VLS_32({
    title: "订单商品 + 买家 + 日期",
    columns: (__VLS_ctx.orderJoinColumns),
    rows: (__VLS_ctx.orderJoinRows),
    loading: (__VLS_ctx.loading),
}, ...__VLS_functionalComponentArgsRest(__VLS_32));
/** @type {[typeof ResultTable, ]} */ ;
// @ts-ignore
const __VLS_35 = __VLS_asFunctionalComponent(ResultTable, new ResultTable({
    title: "u001 卖出的商品状态",
    columns: (__VLS_ctx.sellerStatusColumns),
    rows: (__VLS_ctx.sellerStatusRows),
    loading: (__VLS_ctx.loading),
}));
const __VLS_36 = __VLS_35({
    title: "u001 卖出的商品状态",
    columns: (__VLS_ctx.sellerStatusColumns),
    rows: (__VLS_ctx.sellerStatusRows),
    loading: (__VLS_ctx.loading),
}, ...__VLS_functionalComponentArgsRest(__VLS_35));
/** @type {[typeof ResultTable, ]} */ ;
// @ts-ignore
const __VLS_38 = __VLS_asFunctionalComponent(ResultTable, new ResultTable({
    title: "每类商品数量",
    columns: (__VLS_ctx.categoryCountColumns),
    rows: (__VLS_ctx.categoryCountRows),
    loading: (__VLS_ctx.loading),
}));
const __VLS_39 = __VLS_38({
    title: "每类商品数量",
    columns: (__VLS_ctx.categoryCountColumns),
    rows: (__VLS_ctx.categoryCountRows),
    loading: (__VLS_ctx.loading),
}, ...__VLS_functionalComponentArgsRest(__VLS_38));
/** @type {[typeof ResultTable, ]} */ ;
// @ts-ignore
const __VLS_41 = __VLS_asFunctionalComponent(ResultTable, new ResultTable({
    title: "已售商品视图（sold_item_view）",
    columns: (__VLS_ctx.soldViewColumns),
    rows: (__VLS_ctx.soldViewRows),
    loading: (__VLS_ctx.loading),
}));
const __VLS_42 = __VLS_41({
    title: "已售商品视图（sold_item_view）",
    columns: (__VLS_ctx.soldViewColumns),
    rows: (__VLS_ctx.soldViewRows),
    loading: (__VLS_ctx.loading),
}, ...__VLS_functionalComponentArgsRest(__VLS_41));
/** @type {[typeof ResultTable, ]} */ ;
// @ts-ignore
const __VLS_44 = __VLS_asFunctionalComponent(ResultTable, new ResultTable({
    title: "未售商品视图（unsold_item_view）",
    columns: (__VLS_ctx.unsoldViewColumns),
    rows: (__VLS_ctx.unsoldViewRows),
    loading: (__VLS_ctx.loading),
}));
const __VLS_45 = __VLS_44({
    title: "未售商品视图（unsold_item_view）",
    columns: (__VLS_ctx.unsoldViewColumns),
    rows: (__VLS_ctx.unsoldViewRows),
    loading: (__VLS_ctx.loading),
}, ...__VLS_functionalComponentArgsRest(__VLS_44));
/** @type {__VLS_StyleScopedClasses['page-section']} */ ;
/** @type {__VLS_StyleScopedClasses['section-header']} */ ;
/** @type {__VLS_StyleScopedClasses['section-kicker']} */ ;
/** @type {__VLS_StyleScopedClasses['section-copy']} */ ;
/** @type {__VLS_StyleScopedClasses['metric-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['stats-grid']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            MetricCard: MetricCard,
            ResultTable: ResultTable,
            loading: loading,
            aggregateReports: aggregateReports,
            itemColumns: itemColumns,
            soldItemColumns: soldItemColumns,
            orderJoinColumns: orderJoinColumns,
            sellerStatusColumns: sellerStatusColumns,
            categoryCountColumns: categoryCountColumns,
            soldViewColumns: soldViewColumns,
            unsoldViewColumns: unsoldViewColumns,
            unsoldRows: unsoldRows,
            priceAbove30Rows: priceAbove30Rows,
            dailyGoodsRows: dailyGoodsRows,
            sellerRows: sellerRows,
            soldItemsWithBuyersRows: soldItemsWithBuyersRows,
            orderJoinRows: orderJoinRows,
            sellerStatusRows: sellerStatusRows,
            categoryCountRows: categoryCountRows,
            soldViewRows: soldViewRows,
            unsoldViewRows: unsoldViewRows,
            loadReports: loadReports,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
