import * as fs from 'fs';

const path = __dirname; // + "/../";
const sourceFolder = __dirname + '/../../src/resources';
const destinationFolder = __dirname + '/../../dist/resources';

const files = fs.readdirSync(sourceFolder);
for (const file of files) {
  const sourceFile = `${sourceFolder}/${file}`;
  const destinationFile = `${destinationFolder}/${file}`;
  fs.copyFileSync(sourceFile, destinationFile);
}
console.log('Folder copied successfully');
