package mk.dians.finki.backend.service.impl;

import mk.dians.finki.backend.model.Place;
import mk.dians.finki.backend.model.Review;
import mk.dians.finki.backend.model.User;
import mk.dians.finki.backend.repository.PlaceRepository;
import mk.dians.finki.backend.repository.ReviewRepository;
import mk.dians.finki.backend.repository.UserRepository;
import mk.dians.finki.backend.service.ReviewService;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;
import java.util.Optional;

@Service
public class ReviewServiceImpl implements ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private PlaceRepository placeRepository;

    @Autowired
    private UserRepository userRepository;

    public List<Review> getAllReviewsByPlaceId(Long placeId) {
        return reviewRepository.findAllByPlaceId(placeId);
    }

    public Optional<Review> getReviewByPlaceIdAndId(Long placeId, Long reviewId) {
        return reviewRepository.findByPlaceIdAndId(placeId, reviewId);
    }

    public Review saveReview(Long placeId, Long userId, Review review) {

        Optional<Place> place = placeRepository.findById(placeId);
        Optional<User> user = userRepository.findById(userId);

        if(place.isEmpty() || user.isEmpty()){
            return null;
        }

        review.setPlace(place.get());
        review.setUser(user.get());
        
        return reviewRepository.save(review);
    }

    public void deleteReview(Long placeId, Long reviewId) {
        reviewRepository.deleteByPlaceIdAndId(placeId, reviewId);
    }
}
