package com.rmit.sept.bookmicroservices.services;

import com.rmit.sept.bookmicroservices.Repositories.ReviewRepository;
import com.rmit.sept.bookmicroservices.model.Review;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    public Review saveReview(Review newReview){ return reviewRepository.save(newReview);}

    public Review getReviewById(Long id){
        Optional<Review> retVal = reviewRepository.findById(id);
        if(retVal.isPresent()){
            return retVal.get();
        }
        return null;
    }

    @Transactional
    public List<Review> getReviewsByBookId(Long id){
        return reviewRepository.getByBookId(id);
    }

    @Transactional
    public List<Review> getReviewsByUserId(Long id){
        return reviewRepository.getByUserId(id);
    }

    public boolean deleteReview(Long id){
        try{
            reviewRepository.deleteById(id);
            return true;
        }catch (Exception e){
            return false;
        }
    }

    public Review updateReview(Review updatedReview){
        try{
            return reviewRepository.save(updatedReview);
        }catch (Exception e){}
            throw new IllegalArgumentException("Incorrect details entered");
    }
}
