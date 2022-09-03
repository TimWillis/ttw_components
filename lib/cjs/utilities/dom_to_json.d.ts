declare function toJson(node: Node & Record<string, unknown>): any;
declare function toDom(input: Node): Node;
declare const _default: {
    toDom: typeof toDom;
    toJson: typeof toJson;
};
export default _default;
