package com.rmit.sept.bookmicroservices.services;

import com.rmit.sept.bookmicroservices.Repositories.BookRepository;
import com.rmit.sept.bookmicroservices.model.Book;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookService {

    @Autowired
    private BookRepository bookrepository;

    public Book saveBook(Book newBook){
//        bookrepository.
            return bookrepository.save(newBook);
    }

    public List<Book> getAllBooks(){
//        return bookrepository.
        return null;
    }

}
