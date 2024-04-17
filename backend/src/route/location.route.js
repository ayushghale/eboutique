import { Router } from "express";

import LocationController from "../controller/user/location.controller.js";
import UserMiddleware from "../middlewares/user.middleware.js";


// UserMiddleware,
const locationRouter = Router();


// Create a new location
// api/location
locationRouter.post("/",UserMiddleware, LocationController.create);

// Get all locations
// api/location/user/:id
locationRouter.get("/user/:id",UserMiddleware, LocationController.findAllByUserId);

// Update a location by id
// api/location/update/:id
locationRouter.put("/update/:id",UserMiddleware, LocationController.update);

// Delete a location by id
// api/location/delete/:id
locationRouter.delete("/delete/:id",UserMiddleware, LocationController.delete);


export default locationRouter;

