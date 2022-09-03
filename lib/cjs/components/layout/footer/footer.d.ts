declare global {
    var components: any;
    var is_node: any;
}
declare const footer: (name?: string, address?: string, phone?: string, facebook_url?: string) => {
    init: () => void;
    html: string;
};
export default footer;
/*****************   End *******************/
