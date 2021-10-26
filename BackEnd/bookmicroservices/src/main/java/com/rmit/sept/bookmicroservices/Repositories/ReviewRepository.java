package com.rmit.sept.bookmicroservices.Repositories;

import com.rmit.sept.bookmicroservices.model.Book;
import com.rmit.sept.bookmicroservices.model.Review;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends CrudRepository<Review, Long> {
    Review getById(Long id);
    List<Review> getByUserId(Long id);
    List<Review> getByBookId(Long id);
}
