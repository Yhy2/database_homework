const __VLS_props = withDefaults(defineProps(), {
    title: "",
    loading: false,
    emptyText: "暂无数据",
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_withDefaultsArg = (function (t) { return t; })({
    title: "",
    loading: false,
    emptyText: "暂无数据",
});
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)({
    ...{ class: "panel-card" },
});
if (__VLS_ctx.title) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.header, __VLS_intrinsicElements.header)({
        ...{ class: "panel-card__header" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
    (__VLS_ctx.title);
}
const __VLS_0 = {}.ElTable;
/** @type {[typeof __VLS_components.ElTable, typeof __VLS_components.elTable, typeof __VLS_components.ElTable, typeof __VLS_components.elTable, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    data: (__VLS_ctx.rows),
    border: true,
    stripe: true,
    emptyText: (__VLS_ctx.emptyText),
}));
const __VLS_2 = __VLS_1({
    data: (__VLS_ctx.rows),
    border: true,
    stripe: true,
    emptyText: (__VLS_ctx.emptyText),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
__VLS_asFunctionalDirective(__VLS_directives.vLoading)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.loading) }, null, null);
__VLS_3.slots.default;
for (const [column] of __VLS_getVForSourceType((__VLS_ctx.columns))) {
    const __VLS_4 = {}.ElTableColumn;
    /** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
    // @ts-ignore
    const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4({
        key: (column.key),
        prop: (column.key),
        label: (column.label),
        minWidth: (column.minWidth ?? 120),
        width: (column.width),
        showOverflowTooltip: true,
    }));
    const __VLS_6 = __VLS_5({
        key: (column.key),
        prop: (column.key),
        label: (column.label),
        minWidth: (column.minWidth ?? 120),
        width: (column.width),
        showOverflowTooltip: true,
    }, ...__VLS_functionalComponentArgsRest(__VLS_5));
}
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['panel-card']} */ ;
/** @type {__VLS_StyleScopedClasses['panel-card__header']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    __typeProps: {},
    props: {},
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    __typeProps: {},
    props: {},
});
; /* PartiallyEnd: #4569/main.vue */
