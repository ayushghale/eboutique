import { Router } from "express";

import BorderController from "../controller/border.controller.js";

const borderRouter = Router();

// get all borders
//api/border/getAllBorders
borderRouter.get("/getAllBorders", BorderController.getAllBorders);

// get border by id
// api/border/getBorder/:id
borderRouter.get("/getBorder/:id", BorderController.getBorder);

// add new border
// api/border/addBorder
borderRouter.post("/addBorder", BorderController.addBorder);

// update border
// api/border/updateBorder/:id
borderRouter.put("/updateBorder/:id", BorderController.updateBorder);

// delete border
// api/border/deleteBorder/:id
borderRouter.delete("/deleteBorder/:id", BorderController.deleteBorder);

export default borderRouter;
