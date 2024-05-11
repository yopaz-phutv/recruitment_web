export const srcToFile = (src, fileName, mimeType) => {
  return fetch(src)
    .then(function (res) {
      return res.arrayBuffer();
    })
    .then(function (buf) {
      return new File([buf], fileName, { type: mimeType });
    });
};

export const toSrcFromGgImgLink = (imgLink) => {
  const arr = imgLink?.split("/") || [];
  const imgFileIdIndex = arr.findIndex((item) => item === "view") - 1;

  return `https://lh3.googleusercontent.com/d/${arr[imgFileIdIndex]}?authuser=0`;
};
