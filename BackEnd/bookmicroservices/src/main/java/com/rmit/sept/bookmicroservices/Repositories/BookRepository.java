package com.rmit.sept.bookmicroservices.Repositories;

import com.rmit.sept.bookmicroservices.model.Book;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookRepository extends CrudRepository<Book, Long>{

    Book getById(Long id);
    Book findByTitle(String title);
    Book getByISBN(String ISBN);
    List<Book> findBookByAuthor(String author);

}
