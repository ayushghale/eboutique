import { Router } from "express";

import CustomDesignController from "../controller/customDesign.controller.js";

const customDesignRouter = Router();

// get all customDesigns
// api/customDesign/getAllCustomDesigns
customDesignRouter.get("/getAllCustomDesigns", CustomDesignController.getAllCustomDesigns);


// get customDesign by id
// api/customDesign/getCustomDesignById/:id
customDesignRouter.get("/getCustomDesignById/:id", CustomDesignController.getCustomDesignById);

// add new customDesign
// api/customDesign/addCustomDesign
customDesignRouter.post("/addCustomDesign", CustomDesignController.addCustomDesign);

// update customDesign
// api/customDesign/updateCustomDesign/:id
customDesignRouter.put("/updateCustomDesign/:id", CustomDesignController.updateCustomDesign);

// delete customDesign
// api/customDesign/deleteCustomDesign/:id
// customDesignRouter.delete("/deleteCustomDesign/:id", CustomDesignController.deleteCustomDesign);

export default customDesignRouter;
