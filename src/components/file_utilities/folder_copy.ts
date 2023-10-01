import * as fs from 'fs-extra';
// const path = __dirname; // + "/../";
const sourceFolder = __dirname + '/../../src/resources';
const destinationFolder = __dirname + '/../../dist/components/resources';
const destinationFolder2 = __dirname + '/../../dist/cjs/components/resources';

fs.copy(sourceFolder, destinationFolder, (err) => {
  if (err) return console.error(err);
});

fs.copy(sourceFolder, destinationFolder2, (err) => {
  if (err) return console.error(err);
});

const js_lib_src = __dirname + '/../../src/components/libs';
const js_lib_dest = __dirname + '/../../dist/components/libs';
const js_lib_dest2 = __dirname + '/../../dist/cjs/components/libs';

fs.copy(js_lib_src, js_lib_dest, (err) => {
  if (err) return console.error(err);
});

fs.copy(js_lib_src, js_lib_dest2, (err) => {
  if (err) return console.error(err);
});
