import type { TableColumn } from "../types";
type __VLS_Props = {
    title?: string;
    columns: TableColumn[];
    rows: Record<string, unknown>[];
    loading?: boolean;
    emptyText?: string;
};
declare const _default: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{}>, {
    title: string;
    loading: boolean;
    emptyText: string;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
export default _default;
