/*https://stackoverflow.com/questions/56668685/reduce-the-dimension-of-base64-image-maintaining-aspect-ratio-in-javascript*/
export default (dataURL, maxWidth, maxHeight) => {
  return new Promise((done) => {
    var img = new Image();
    img.onload = () => {
      var scale, newWidth, newHeight, canvas, ctx;
      if (img.width < maxWidth) {
        scale = maxWidth / img.width;
      } else {
        scale = maxHeight / img.height;
      }
      newWidth = img.width * scale;
      newHeight = img.height * scale;
      canvas = document.createElement('canvas');
      canvas.height = newHeight;
      canvas.width = newWidth;
      ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, newWidth, newHeight);
      done(canvas.toDataURL());
    };
    img.src = dataURL;
  });
};
