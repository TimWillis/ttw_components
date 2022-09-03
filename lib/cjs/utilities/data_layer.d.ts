declare const _default: (root_path?: string) => {
    get: (path: string, from_last_update?: number, type?: string) => Promise<any>;
    post: (path: string, data: any) => Promise<void>;
    put: (path: string, data: any) => Promise<void>;
    del: (path: string, is_archived?: boolean) => Promise<void>;
    post_rest: (path: string, data: any) => Promise<void | Response>;
};
export default _default;
