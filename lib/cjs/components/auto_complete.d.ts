export interface this_interface {
    list: Array<any>;
    callback?: (e: any, create_data_list: any) => void;
    id?: string;
    value?: string;
    placeholder?: string;
}
declare const _default: ({ list, value, callback, id, placeholder, }: this_interface) => string;
export default _default;
