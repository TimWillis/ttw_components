declare function timeout(ms: any): Promise<unknown>;
declare function sleep(fn: any, ...args: any[]): Promise<any>;
declare const _default: {
    timeout: typeof timeout;
    sleep: typeof sleep;
};
export default _default;
