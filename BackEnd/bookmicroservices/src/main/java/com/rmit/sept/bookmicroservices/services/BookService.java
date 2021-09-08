package com.rmit.sept.bookmicroservices.services;

import com.rmit.sept.bookmicroservices.Repositories.BookRepository;
import com.rmit.sept.bookmicroservices.model.Book;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class BookService {

    @Autowired
    private BookRepository bookrepository;

    public Book saveBook(Book newBook){
            return bookrepository.save(newBook);
    }

    public Book getBookById(Long id){
        Optional<Book> toGet = bookrepository.findById(id);
        if(toGet.isPresent()){
            Book getVal = toGet.get();
            return getVal;
        }
        return null;
    }

    public List<Book> getBooksByAuthor(String author){
        List<Book> books = bookrepository.getBooksByAuthorContains(author);
        return books;
    }

    public List<Book> getAllBooks(){
        List<Book> books = new ArrayList<Book>();
        bookrepository.findAll().forEach(book -> books.add(book));
        return books;
    }

}
