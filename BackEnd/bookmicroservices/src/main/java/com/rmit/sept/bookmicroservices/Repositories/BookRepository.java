package com.rmit.sept.bookmicroservices.Repositories;

import com.rmit.sept.bookmicroservices.model.Book;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookRepository extends CrudRepository<Book, Long>{

    Book findByTitle(String title);
    Book getById(Long id);
    Book getByISBN(String ISBN);

}
