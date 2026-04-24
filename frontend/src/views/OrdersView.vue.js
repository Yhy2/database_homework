import { computed, onMounted, ref } from "vue";
import { ElMessage } from "element-plus";
import ResultTable from "../components/ResultTable.vue";
import { listOrders } from "../api/orders";
import { getErrorMessage } from "../utils/display";
const loading = ref(false);
const orders = ref([]);
const columns = [
    { key: "order_id", label: "订单编号", width: 120 },
    { key: "item_name", label: "商品名称", minWidth: 180 },
    { key: "buyer_name", label: "买家姓名", minWidth: 160 },
    { key: "seller_name", label: "卖家姓名", minWidth: 160 },
    { key: "order_date", label: "成交日期", minWidth: 140 },
];
const rows = computed(() => orders.value);
async function loadOrders() {
    loading.value = true;
    try {
        orders.value = await listOrders();
    }
    catch (error) {
        ElMessage.error(getErrorMessage(error));
    }
    finally {
        loading.value = false;
    }
}
onMounted(loadOrders);
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
    onClick: (__VLS_ctx.loadOrders)
};
__VLS_3.slots.default;
var __VLS_3;
/** @type {[typeof ResultTable, ]} */ ;
// @ts-ignore
const __VLS_8 = __VLS_asFunctionalComponent(ResultTable, new ResultTable({
    title: "平台订单",
    columns: (__VLS_ctx.columns),
    rows: (__VLS_ctx.rows),
    loading: (__VLS_ctx.loading),
    emptyText: "暂无订单数据",
}));
const __VLS_9 = __VLS_8({
    title: "平台订单",
    columns: (__VLS_ctx.columns),
    rows: (__VLS_ctx.rows),
    loading: (__VLS_ctx.loading),
    emptyText: "暂无订单数据",
}, ...__VLS_functionalComponentArgsRest(__VLS_8));
/** @type {__VLS_StyleScopedClasses['page-section']} */ ;
/** @type {__VLS_StyleScopedClasses['section-header']} */ ;
/** @type {__VLS_StyleScopedClasses['section-kicker']} */ ;
/** @type {__VLS_StyleScopedClasses['section-copy']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            ResultTable: ResultTable,
            loading: loading,
            columns: columns,
            rows: rows,
            loadOrders: loadOrders,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
