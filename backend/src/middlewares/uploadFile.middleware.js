import multer from "multer";
import cloudinary from "cloudinary";
import streamifier from "streamifier";

// image --> code save ---> upload ---> removed
// image ---> memory save ----> upload

const storage = multer.memoryStorage();

cloudinary.config({
  cloud_name: "djbarm1oa",
  api_key: "376641272241857",
  api_secret: "KJ19k75fps3eliK23sNCFrjVkJ4",
  secure: true,
});

export default function uploadFile(folder = "site") {
  const upload = multer({ storage }).fields([
    {
      name: "image",
      maxCount: 1,
    },
    {
      name: "gallery",
      maxCount: 10,
    },
  ]);

  async function uploadToCloudinary(req, res, next) {
    try {
      let uploadFromBuffer = (buffer) => {
        return new Promise((resolve, reject) => {
          let cld_upload_stream = cloudinary.v2.uploader.upload_stream(
            {
              folder,
            },
            (error, result) => {
              if (result) {
                resolve(result);
              } else {
                reject(error);
              }
            }
          );

          streamifier.createReadStream(buffer).pipe(cld_upload_stream);
        });
      };

      if (req.files?.image) {
        const profilePictureBuffer = req.files?.image[0].buffer;

        const uriFromCloudinary = await uploadFromBuffer(profilePictureBuffer);
        // console.log(uriFromCloudinary);
        // console.log(uriFromCloudinary.secure_url);

        req.image = uriFromCloudinary.secure_url || uriFromCloudinary.url;
      }

      if (req.files?.gallery) {
        // map or forEach is not awaitable

        console.log("gallery image decoded");

        const startBeforeUpload = performance.now();
        const result = [];
        for (let i = 0; i < req.files?.gallery.length; i++) {
          const galleryFromBuffer = req.files?.gallery[i].buffer;
          const uriFromCloudinary = await uploadFromBuffer(galleryFromBuffer);
          result.push(uriFromCloudinary.secure_url);
        }

        console.log("Normal Flow time", performance.now() - startBeforeUpload);

        const startForAll = performance.now();
        const promisesToBeResolved = [];
        for (let i = 0; i < req.files?.gallery.length; i++) {
          const galleryFromBuffer = req.files?.gallery[i].buffer;
          promisesToBeResolved.push(uploadFromBuffer(galleryFromBuffer));
        }
        const uris = await Promise.all(promisesToBeResolved);

        // Promise.race()
        // Promise.allSettled()

        console.log("all", performance.now() - startForAll);

        // console.log("result from array", uris);

        // console.log("Upload in ", performance.now() - startBeforeUpload);

        // // Promise.all()

        // console.log("result from gallery", result);
      }

      next();
    } catch (e) {
      next(e);
    }
    // let result = await uploadFromBuffer(req);
  }

  return [upload, uploadToCloudinary];
}
