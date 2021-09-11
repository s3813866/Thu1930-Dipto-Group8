package com.rmit.sept.bookmicroservices.web;

import com.rmit.sept.bookmicroservices.model.Book;
import com.rmit.sept.bookmicroservices.services.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/books")
public class BookController {


    private BookService bookservice;

    @Autowired
    public BookController(BookService bookservice) {
        this.bookservice = bookservice;
    }



    @PostMapping("/add")
    public ResponseEntity<?> addBook(@RequestBody Book book, BindingResult result){
        if(result.hasErrors()){
            Map<String,String> errorMap = new HashMap<>();
            for(FieldError error: result.getFieldErrors()){
                return new ResponseEntity<List<FieldError>>(result.getFieldErrors(), HttpStatus.BAD_REQUEST);
            }
        }
        Book book1 = bookservice.saveBook(book);
        return new ResponseEntity<Book>(book, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<?> getAllBooks(){
        List<Book> books = bookservice.getAllBooks();
        if(books.size() > 0){
            return new ResponseEntity<>(books, HttpStatus.OK);
        }else{
            return new ResponseEntity<>(books, HttpStatus.NO_CONTENT);
        }
    }

    //Send GET with id at the end of the URL (e.g. /api/books/1)
    @GetMapping("/{id}")
    public ResponseEntity<?> getBookByID(@PathVariable Long id){
        Book toGet = bookservice.getBookById(id);
        if(toGet != null){
            return new ResponseEntity<>(toGet, HttpStatus.OK);
        }else{
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    //Send GET as URL with structure /api/books/author?author={author}
    // (e.g. /api/books/author?author=qwerty).
    //To use spaces for search, replace spaces in query with "%20"
    @GetMapping("/author")
    public ResponseEntity<?> getBooksByAuthor(@RequestParam String author){
        if(author.contains("%20")){
            author.replace("%20", " ");
        }
        List<Book> booksByAuthor = bookservice.getBooksByAuthor(author);
        if(booksByAuthor.size() > 0){
            return ResponseEntity.ok(booksByAuthor);
        }else{
            return new ResponseEntity<>(booksByAuthor, HttpStatus.NO_CONTENT);
        }
    }

}
