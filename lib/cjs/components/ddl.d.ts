export interface ddl_interface {
    options: any[];
    callback?: (e: any, project: string) => void;
    id?: string;
    selected_value?: string;
    is_disabled?: boolean;
}
declare const _default: ({ options, callback, id, selected_value, is_disabled, }: ddl_interface) => string;
export default _default;
