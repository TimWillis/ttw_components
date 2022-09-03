import * as ddl_mod from './components/ddl';
import * as auto_complete_mod from './components/auto_complete';
import * as modal_mod from './components/modal';
import * as modal_alert_mod from './components/modal_alert';
import * as input_with_label_mod from './components/input_with_label';
import * as table_mod from './components/table/table';
import * as list_gen_mod from './components/list_gen';
import * as wysiwyg_mod from './components/wysiwyg';
import * as idb_keyvalue_mod from './utilities/idb_keyvalue';
import * as navigation_mod from './utilities/navigation';
export declare const ddl: ({ options, callback, id, selected_value, is_disabled, }: ddl_mod.ddl_interface) => string;
export declare const auto_complete: ({ list, value, callback, id, placeholder, }: auto_complete_mod.this_interface) => string;
export declare const modal: ({ callback, id, html, style, title }: modal_mod.this_interface) => void;
export declare const modal_alert: ({ callback, id, title, prompt, button_one_text, button_two_text, style, }: modal_alert_mod.this_interface) => void;
export declare const dom_diffing: (id: any, html: any, tag?: string, el?: any, use_dom_diff?: boolean) => void;
export declare const input_with_label: ({ html, for_id, name, id }: input_with_label_mod.input_with_label_interface) => string;
export declare const table: ({ data, actions }: table_mod.this_interface) => string;
export declare const list_gen: ({ list, callback, id }: list_gen_mod.list_gen_interface) => string;
export declare const spinner: (is_out: any, where_el?: string, spinner_el?: string) => void;
export declare const toast: (msg: any, fade_time: any, bg_color?: string, color?: string) => void;
export declare const wysiwyg: ({ callback, id, is_disabled, html, style }: wysiwyg_mod.this_interface) => string;
export declare const layout: (page: string, pages: any[], name?: string, address?: string, phone?: string, facebook_url?: string, logo_url?: string) => {
    init: () => void;
    html: string;
};
export declare const anonymous_user: () => any;
export declare const convert_style_obj: (style_obj: any) => string;
export declare const distinct_array_by_prop: (array: any, prop: any) => any[];
export declare const field_validation: (text: any, el: any, id?: string, z_index?: string, offset_top?: number) => any;
export declare const get_date: () => string;
export declare const group_by: (list: any, keyGetter: any) => Map<any, any>;
export declare const data_layer: (root_path?: string) => {
    get: (path: string, from_last_update?: number, type?: string) => Promise<any>;
    post: (path: string, data: any) => Promise<void>;
    put: (path: string, data: any) => Promise<void>;
    del: (path: string, is_archived?: boolean) => Promise<void>;
    post_rest: (path: string, data: any) => Promise<void | Response>;
};
export declare const idb_keyvalue: typeof idb_keyvalue_mod;
export declare const dom_to_json: {
    toDom: (input: Node) => Node;
    toJson: (node: Node & Record<string, unknown>) => any;
};
export declare const image_resize: (dataURL: any, maxWidth: any, maxHeight: any) => Promise<unknown>;
export declare const insert_array: (arr: any, index: any, ...newItems: any[]) => any[];
export declare const navigation: typeof navigation_mod.default;
export declare const random_int: (min: any, max: any) => number;
export declare const shorten_string: (string: any, len: any) => any;
export declare const timeout_sleep: {
    timeout: (ms: any) => Promise<unknown>;
    sleep: (fn: any, ...args: any[]) => Promise<any>;
};
export declare const touch: (el: any, callback: any) => void;
export declare const unique_id: (N?: number, type?: string) => string;
export declare const load_sw: () => void;
export declare const nn_events: {
    events: {};
    emit(event: any, ...args: any): void;
    on(event: any, cb: any): () => any;
};
