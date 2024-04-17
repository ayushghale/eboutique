import multer from "multer";
import cloudinary from "cloudinary";
import streamifier from "streamifier";
import dotenv from "dotenv";
dotenv.config();

// Set up multer storage to store files in memory
const storage = multer.memoryStorage();

// Configure Cloudinary
cloudinary.config({
  cloud_name: "djbarm1oa",
  api_key: "376641272241857",
  api_secret: "KJ19k75fps3eliK23sNCFrjVkJ4",

  //   CLOUDE_NAME = "djbarm1oa"
  // CLOUDEN_API_KEY = "376641272241857"
  // CLOUDEN_API_SECRET = "KJ19k75fps3eliK23sNCFrjVkJ4"
});

// Middleware to handle file upload
export default function uploadFile(folder = "site") {


  const upload = multer({ storage }).fields([
    { name: "image", maxCount: 1 },
    { name: "gallery", maxCount: 10 },
  ]);

  async function uploadToCloudinary(req, res, next) {
    try {
      // Function to upload a buffer to Cloudinary
      let uploadFromBuffer = (buffer) => {
        return new Promise((resolve, reject) => {
          let cld_upload_stream = cloudinary.v2.uploader.upload_stream(
            { folder },
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
      // Upload image if present
      if (req.files && req.files.image && req.files.image.length > 0) {
        const profilePictureBuffer = req.files.image[0].buffer;
        console.log("Profile picture buffer:", profilePictureBuffer);

        // Assuming uploadFromBuffer is a function that uploads an image buffer to Cloudinary
        const uriFromCloudinary = await uploadFromBuffer(profilePictureBuffer);
        console.log("Uploaded image URL:", uriFromCloudinary);

        // Ensure that uriFromCloudinary has the expected structure before attempting to access properties
        if (
          uriFromCloudinary &&
          (uriFromCloudinary.secure_url || uriFromCloudinary.url)
        ) {
          req.image = uriFromCloudinary.secure_url || uriFromCloudinary.url;
        } else {
          console.error(
            "Failed to retrieve image URL from Cloudinary response"
          );
          // Handle the error appropriately, e.g., return an error response
        }
      } else {
        console.error("=================================No image file found in request");
        // Handle the case where no image file is found in the request, e.g., return an error response
      }

      // Upload gallery images if present
      if (req.files?.gallery) {
        const galleryUploadPromises = req.files.gallery.map(async (file) => {
          const uriFromCloudinary = await uploadFromBuffer(file.buffer);
          return uriFromCloudinary.secure_url;
        });
        req.galleryImages = await Promise.all(galleryUploadPromises);
      }

      next();
    } catch (e) {
      next(e);
    }
  }

  return [upload, uploadToCloudinary];
}
