package com.rmit.sept.bookmicroservices.web;

import com.rmit.sept.bookmicroservices.Repositories.ReviewRepository;
import com.rmit.sept.bookmicroservices.model.Review;
import com.rmit.sept.bookmicroservices.services.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    private ReviewService reviewService;

    @Autowired
    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @PostMapping("/add")
    public ResponseEntity<?> addReview(@RequestBody Review review, BindingResult result){
        if(result.hasErrors()){
            Map<String,String> errorMap = new HashMap<>();
            for(FieldError error: result.getFieldErrors()){
                return new ResponseEntity<List<FieldError>>(result.getFieldErrors(), HttpStatus.BAD_REQUEST);
            }
        }
        Review savedReview = reviewService.saveReview(review);
        return new ResponseEntity<Review>(review, HttpStatus.CREATED);

    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getReviewById(@PathVariable Long id){
        Review retVal = reviewService.getReviewById(id);
        if(retVal != null){
            return new ResponseEntity<>(retVal,HttpStatus.OK);
        }else{
            return new ResponseEntity<>(null,HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/bookid/{id}")
    public ResponseEntity<?> getReviewsByBookId(@PathVariable Long id){
        List<Review> reviews = reviewService.getReviewsByBookId(id);
        if(reviews.size()>0){
            return new ResponseEntity<>(reviews,HttpStatus.OK);
        }else{
            return new ResponseEntity<>(null,HttpStatus.NO_CONTENT);
        }
    }

    @GetMapping("/userid/{id}")
    public ResponseEntity<?> getReviewsByUserId(@PathVariable Long id){
        List<Review> reviews = reviewService.getReviewsByUserId(id);
        if(reviews.size()>0){
            return new ResponseEntity<>(reviews,HttpStatus.OK);
        }else{
            return new ResponseEntity<>(null,HttpStatus.NO_CONTENT);
        }
    }


//    @PutMapping("/edit/{id}")
//    public ResponseEntity<?> editReview(@PathVariable Long id, @RequestBody Review newDetails){
//        final Review updatedReview;
//        boolean hasNewValues = false;
//        Review
//
//    }


    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteReview(@PathVariable Long id){
        if(reviewService.deleteReview(id)){
            return ResponseEntity.ok(null);
        }else{
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

}
