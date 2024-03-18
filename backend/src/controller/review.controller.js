import Review from '../model/review.model.js';

const ReviewController = {
    async getAllReviews(req, res) {
        try {
            const reviews = await Review.findAll();
            res.status(200).json(reviews);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async addReview(req, res) {
        try {
            const { userId, productId, content, rating } = req.body;
            console.log('Received userId:', userId);
            const newReview = await Review.create({
                userId: userId,
                productId: productId,
                content: content,
                rating: rating
            });
            console.log('Review created:', newReview);
            res.status(201).json("Review added successfully" + newReview);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async updateReview(req, res) {
        try {
            const reviewId = req.params.id;
            console.log('Received reviewId:', req.params.id);

            const { newUserId, newProductId, newContent, newRating } = req.body; // Assuming you receive the user ID, new username, and new email in the request body

            // Find the user by ID
            const review = await Review.findByPk(reviewId);

            console.log('Received review:', review);

            if (review) {
                // Update the user's username and email
                await Review.update(
                    {
                        userId: newUserId,
                        productId: newProductId,
                        content: newContent,
                        rating: newRating
                        // Add other fields to update as needed...
                    },
                    {
                        where: {
                            id: reviewId, // Condition to match the user ID
                        },
                    }
                );

                res.status(200).json("Review updated successfully");
            } else {
                res.status(404).json("Review not found");
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async deleteReview(req, res) {
        try {
            const reviewId = req.params.id;
            console.log('Received reviewId:', req.params.id);

            const review = await Review.findByPk(reviewId);

            console.log('Received review:', review);

            if (review) {
                await Review.destroy({
                    where: {
                        id: reviewId,
                    },
                });

                res.status(200).json("Review deleted successfully");        }

            else {
                    
                    res.status(404).json("Review not found");
    
                }

        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }

    }

};

export default ReviewController;