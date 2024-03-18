import { Router } from "express";

import ReviewController from "../controller/review.controller.js";

const reviewRouter = Router();

// get all reviews
// api/review/getAllReviews
reviewRouter.get("/getAllReviews", ReviewController.getAllReviews);

// add new review
// api/review/addReview
reviewRouter.post("/addReview", ReviewController.addReview);

// update review
// api/review/updateReview/:id
reviewRouter.put("/updateReview/:id", ReviewController.updateReview);

// delete review
// api/review/deleteReview/:id
reviewRouter.delete("/deleteReview/:id", ReviewController.deleteReview);

export default reviewRouter;