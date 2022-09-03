export interface list_gen_interface {
    list: Array<any>;
    callback?: (e: any, id: string, list: any) => void;
    id?: string;
}
declare const _default: ({ list, callback, id }: list_gen_interface) => string;
export default _default;
