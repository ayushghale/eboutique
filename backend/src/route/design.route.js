import { Router } from "express";

import DesignController from "../controller/design.controller.js";
import UserMiddleware from "../middlewares/user.middleware.js";
import AdminMiddleware from "../middlewares/admin.middleware.js";
import uploadFile from "../middlewares/uploadFile.middleware.js";

// UserMiddleware,
// AdminMiddleware,
const designRouter = Router();

// get all designs
// api/design/getAllDesigns
designRouter.get("/getAllDesigns", DesignController.getAllDesigns);

// get design by id
// api/design/getDesignById/:id
designRouter.get(
  "/getDesignById/:id",
  DesignController.getDesignById
);

// add new design
// api/design/addDesign
designRouter.post("/addDesign", uploadFile(), DesignController.addDesign);

// update design
// api/design/updateDesign/:id
designRouter.put("/updateDesign/:id",uploadFile(), DesignController.updateDesign);

// delete design
// api/design/deleteDesign/:id
designRouter.delete("/deleteDesign/:id", DesignController.deleteDesign);

// upadte design status
// api/design/updateDesignStatus/:id
designRouter.put("/updateDesignStatus/:id", DesignController.updateStatus);

export default designRouter;
