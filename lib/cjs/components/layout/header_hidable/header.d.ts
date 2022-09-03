declare global {
    var components: any;
    var is_node: any;
}
declare const header: (selector: string, parent_app: any, pages: Array<any>) => {
    init: (app_to_render: any) => {
        element: any;
    };
    app: any;
    css: string;
};
export default header;
/*****************   End *******************/
