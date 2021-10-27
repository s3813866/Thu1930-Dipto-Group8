package com.rmit.sept.bookmicroservices.services;

import com.rmit.sept.bookmicroservices.Repositories.BookRepository;
import com.rmit.sept.bookmicroservices.model.Book;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

    @Transactional
    public List<Book> getBooksByAuthor(String author){
        List<Book> books = bookrepository.getBooksByAuthorIgnoreCaseContaining(author);
        return books;
    }

    @Transactional
    public  List<Book> getBooksByTitle(String title){
        List<Book> books = bookrepository.getBooksByTitleIgnoreCaseContaining(title);
        return books;
    }

    @Transactional
    public List<Book> getBooksByCategory(String category){
        List<Book> books = bookrepository.getBooksByCategoryIgnoreCaseContaining(category);
        return books;
    }

    public List<Book> getAllBooks(){
        List<Book> books = new ArrayList<Book>();
        bookrepository.findAll().forEach(book -> books.add(book));
        return books;
    }

    public Book updateBook(Book updatedBook){
        try{
            return bookrepository.save(updatedBook);
        }catch(Exception e){
            throw new IllegalArgumentException("Incorrect details entered");
        }
    }

    public boolean deleteBookByID(Long id){
        try{
            bookrepository.deleteById(id);
            return true;
        }catch (Exception e){
            return false;
        }
    }

}
