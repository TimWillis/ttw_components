declare global {
    var components: any;
    var is_node: any;
}
declare const layout: (page: string, pages: Array<any>, name?: string, address?: string, phone?: string, facebook_url?: string, logo_url?: string) => {
    init: () => void;
    html: string;
};
export default layout;
/*****************   End *******************/
