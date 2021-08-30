package com.rmit.sept.bookmicroservices.services;

import com.rmit.sept.bookmicroservices.Repositories.BookRepository;
import com.rmit.sept.bookmicroservices.model.Book;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BookService {

    @Autowired
    private BookRepository bookrepository;

    public Book saveBook(Book newBook){

            return bookrepository.save(newBook);
    }
}
