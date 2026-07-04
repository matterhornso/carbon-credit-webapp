import Resizer from "react-image-file-resizer";

export const resizeFile = (file:File, maxWidth?:number, maxHeight?:number) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      maxWidth|| 1024,
      maxHeight||1024,
      "JPEG",
      100,
      0,
      (uri) => {
        resolve(uri);
      },
      "blob"
    );
  });
