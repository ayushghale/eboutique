import { Router } from "express";

import DesignController from "../controller/design.controller.js";

const designRouter = Router();

// get all designs
// api/design/getAllDesigns
designRouter.get("/getAllDesigns", DesignController.getAllDesigns);

// get design by id
// api/design/getDesignById/:id
designRouter.get("/getDesignById/:id", DesignController.getDesignById);

// add new design
// api/design/addDesign
designRouter.post("/addDesign", DesignController.addDesign);

// update design
// api/design/updateDesign/:id
designRouter.put("/updateDesign/:id", DesignController.updateDesign);

// delete design
// api/design/deleteDesign/:id
designRouter.delete("/deleteDesign/:id", DesignController.deleteDesign);

export default designRouter;
