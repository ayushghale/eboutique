import { Router } from "express";

import BorderController from "../controller/border.controller.js";
import { postBorderValidation } from "../validator/border.validator.js";
import uploadFile from "../middlewares/uploadFile.middleware.js";


const borderRouter = Router();

// ================================ user border routes ================================
// get all borders
//api/border/getAllBorders
borderRouter.get("/getAllBorders", BorderController.getAllBorders);


// ================================ admin border routes ================================

// get all borders
// api/border/getAllBorders
borderRouter.get("/admin/getAllBorders", BorderController.getAllBorders);
// get border by id
// api/border/getBorder/:id
borderRouter.get("/admin/getBorder/:id", BorderController.getBorder);

// add new border
// api/border/addBorder
borderRouter.post("/admin/addBorder",uploadFile(), BorderController.addBorder);

// update border
// api/border/updateBorder/:id
borderRouter.post("/admin/updateBorder/:id",uploadFile(), BorderController.updateBorder);

// delete border
// api/border/deleteBorder/:id
borderRouter.delete("/admin/deleteBorder/:id", BorderController.deleteBorder);

// update border status
// api/border/updateBorderStatus/:id
// borderRouter.post("/admin/updateBorderStatus/:id", BorderController.statusChange);

export default borderRouter;
