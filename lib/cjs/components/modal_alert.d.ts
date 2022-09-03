export interface this_interface {
    callback?: (e: any, value: string) => void;
    id?: string;
    title?: string;
    prompt?: string;
    style?: string;
    button_one_text?: string;
    button_two_text?: string;
}
declare const _default: ({ callback, id, title, prompt, button_one_text, button_two_text, style, }: this_interface) => void;
export default _default;
