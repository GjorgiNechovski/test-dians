package mk.dians.finki.backend.web;

import mk.dians.finki.backend.model.Review;
import mk.dians.finki.backend.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @GetMapping("/place/{placeId}")
    public ResponseEntity<List<Review>> getAllReviewsByPlaceId(@PathVariable Long placeId) {
        List<Review> reviews = reviewService.getAllReviewsByPlaceId(placeId);
        return new ResponseEntity<>(reviews, HttpStatus.OK);
    }

    @GetMapping("/place/{placeId}/review/{reviewId}")
    public ResponseEntity<Review> getReviewByPlaceIdAndId(
            @PathVariable Long placeId,
            @PathVariable Long reviewId) {
        Optional<Review> review = reviewService.getReviewByPlaceIdAndId(placeId, reviewId);
        return review.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                     .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/place/{placeId}")
    public ResponseEntity<Review> addReview(
            @PathVariable Long placeId,
            @RequestParam Long userId,
            @RequestParam String comment,
            @RequestParam double rating) {

        Review review = new Review(comment, rating);

        Review savedReview = reviewService.saveReview(placeId, userId, review);

        return new ResponseEntity<>(savedReview, HttpStatus.CREATED);
    }

    @DeleteMapping("/place/{placeId}/review/{reviewId}")
    public ResponseEntity<Void> deleteReview(
            @PathVariable Long placeId,
            @PathVariable Long reviewId) {
        reviewService.deleteReview(placeId, reviewId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
