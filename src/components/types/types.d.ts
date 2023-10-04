declare module '@storybook/addon-storyshots';
// declare module '*.json' {
//   //https://github.com/vuejs/vetur/issues/1027
//   const value: any;
//   export default value;
// }
interface Window {
  _ttw: any;
}
// declare module '*.png' {
//   const value: any;
//   export default value;
// }
declare module 'vanillajs-datepicker';
declare module 'date_picker';
/*only needed for root components so they can mount. may change this to ttw*/
// declare global {
//   var ttw: TTW;
//   var components: any;
//   var is_node: any;
// }
// export type Pages = 'home' | 'test';
// export type EnvironmentNames = 'dev' | 'prod' | 'local';
// export type RootPaths =
//   | 'http://localhost:8080'
//   | 'https://homeherorealty.web.app'
//   | 'local'
//   | 'http://localhost:4000/gql'
//   | 'https://homeherorealty.web.app/gql';
// export type page_list_item = { name: string; url: string };
// export type TTW = {
//   env_name: EnvironmentNames;
//   root_path: RootPaths;
//   graphql: RootPaths;
//   is_server: boolean;
//   default_app?: any;
//   firebase_initted?: boolean;
//   fire_ref?: any;
//   firebase?: any;
//   firebase_config: any;
//   data_access_ready: boolean;
//   page_list: page_list_item[];
//   last_page?: string;
//   idb_version: string;
//   page_info: any;
//   emitter: any;
//   functions: any;
// };

// interface String {
//   replaceAll(searchValue: string | RegExp, replaceValue: string): string;
// }
// interface String {
//   /**
//    * Replace all instances of a substring in a string, using a regular expression or search string.
//    * @param searchValue A string to search for.
//    * @param replaceValue A string containing the text to replace for every successful match of searchValue in this string.
//    */
//   replaceAll(searchValue: string | RegExp, replaceValue: string): string;

//   /**
//    * Replace all instances of a substring in a string, using a regular expression or search string.
//    * @param searchValue A string to search for.
//    * @param replacer A function that returns the replacement text.
//    */
//   replaceAll(searchValue: string | RegExp, replacer: (substring: string, ...args: any[]) => string): string;
// }
// declare const ttw: TTW;
