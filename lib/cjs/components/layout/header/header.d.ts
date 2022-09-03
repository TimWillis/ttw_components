declare global {
    var components: any;
    var is_node: any;
}
declare const header: (pages: Array<any>, name: any, logo_url: any) => {
    init: () => void;
    html: string;
};
export default header;
/*****************   End *******************/
