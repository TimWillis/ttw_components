// const fs = require('fs');
// const path = require('path');
import fs from 'fs-extra';
import path from 'path';

const folderPath = __dirname + '/../../dist/components';
const folderPath_cjs = __dirname + '/../../dist/cjs/components';
const imageTypes = ['jpg', 'jpeg', 'png', 'gif'];
const file_extension_type = 'js';

function readDirectory(dir) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const fileExtension = path.extname(filePath).substr(1);
    const stat = fs.lstatSync(filePath);

    if (stat.isDirectory()) {
      readDirectory(filePath);
    } else if (fileExtension === file_extension_type) {
      // Only process HTML files
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          return;
        }

        // Search for img tags in the file
        const imgRegex = /<img[^>]*src="([^"]*)"[^>]*>/gi;
        let match;
        while ((match = imgRegex.exec(data)) !== null) {
          const imgSrc = match[1];
          const imgExtension = path.extname(imgSrc).substr(1);

          // Only process image files
          if (!imageTypes.includes(imgExtension)) {
            continue;
          }

          // Check if the image is already inlined
          if (imgSrc.startsWith('data:image/')) {
            console.log(`Image ${imgSrc} is already inlined. Skipping...`);
            continue;
          }

          // Read the image file and convert it to a data URI
          const imgPath = path.join(path.dirname(filePath), imgSrc);
          try {
            const imgData = fs.readFileSync(imgPath);
            const dataUri = 'data:image/' + imgExtension + ';base64,' + imgData.toString('base64');
            data = data.replace(imgSrc, dataUri);
          } catch (e) {
            console.log(e);
          }
        }

        // Write the modified file back to disk
        fs.writeFile(filePath, data, 'utf8', (err) => {
          if (err) {
            console.error(err);
          } else {
            console.log(`File ${filePath} has been modified`);
          }
        });
      });
    }
  });
}

readDirectory(folderPath);
readDirectory(folderPath_cjs);
