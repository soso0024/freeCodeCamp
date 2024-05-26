import express from 'express'
import ReviewsCtrl from './reviews.controller.js'

const router = express.Router()

// router.route("/").get((req, res) => res.send("Hello World!")) // Respond with "Hello World!" for GET requests to the / path

router.route("/movie/:id").get(ReviewsCtrl.apiGetReviews)   //: means that it is a parameter
router.route("/new").post(ReviewsCtrl.apiPostReview)
router.route("/:id")
    .get(ReviewsCtrl.apiGetReview)
    .put(ReviewsCtrl.apiUpdateReview)
    .delete(ReviewsCtrl.apiDeleteReview)

export default router // Export the router object