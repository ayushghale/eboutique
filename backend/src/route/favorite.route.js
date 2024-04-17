import { Router } from "express";

import FavoriteController from "../controller/user/favorite.controller";


const router = Router();

// Create a new favorite
router.post("/", FavoriteController.create);

// get favorites by user id
router.get("/user/:id", FavoriteController.findAllByUserId);

// remove a favorite by id
router.get("/:id", FavoriteController.remove);

export default router;

