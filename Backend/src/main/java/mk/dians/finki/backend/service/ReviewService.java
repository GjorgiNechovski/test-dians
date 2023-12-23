package mk.dians.finki.backend.service;

import mk.dians.finki.backend.model.Review;

import java.util.List;
import java.util.Optional;

public interface ReviewService {

    List<Review> getAllReviewsByPlaceId(Long placeId);

    Optional<Review> getReviewByPlaceIdAndId(Long placeId, Long reviewId);

    void deleteReview(Long placeId, Long reviewId);

    Review saveReview(Long placeId, Long userId, Review review);
}
