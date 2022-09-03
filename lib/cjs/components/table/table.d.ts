interface table_interface {
    headers: Array<{
        value: string;
        style: string;
    }>;
    rows: Array<any>;
}
export interface this_interface {
    data: table_interface;
    actions: any;
}
declare const _default: ({ data, actions }: this_interface) => string;
export default _default;
