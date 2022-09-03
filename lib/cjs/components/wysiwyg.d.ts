export interface this_interface {
    callback?: (e: any, value: string) => void;
    id?: string;
    html: string;
    style?: string;
    is_disabled?: boolean;
}
declare const _default: ({ callback, id, is_disabled, html, style }: this_interface) => string;
export default _default;
