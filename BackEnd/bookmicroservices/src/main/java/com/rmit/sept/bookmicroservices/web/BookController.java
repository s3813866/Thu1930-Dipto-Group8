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

    //
    //DEPRECATED: Use getBooksByQuery to search for books
    //
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

    //Send GET as URL with structure /api/books/search?<query>={term}, query is not case sensitive.

    //Usage: When making a request to this function, attach the desired parameter to the URL
    //(e.g. searching for title: /api/books/search?title=qwerty
    //      searching for author: /api/books/search?author=qwerty
    //      searching for category: /api/books/search?category=qwerty
    @GetMapping("/search")
    public ResponseEntity<?> getBooksByQuery(@RequestParam(required = false) String title,
                                             @RequestParam(required = false) String author,
                                             @RequestParam(required = false) String category){
        List<Book> booksByQuery = null;
        //Checks which parameter was used to perform a search
        if(title != null){
            booksByQuery = bookservice.getBooksByTitle(title);
        }else if(author != null){
            booksByQuery = bookservice.getBooksByAuthor(author);
        }else if(category != null){
            booksByQuery = bookservice.getBooksByCategory(category);
        }
        if(booksByQuery.size() > 0){
            return ResponseEntity.ok(booksByQuery);
        }else{
            return new ResponseEntity<>(booksByQuery, HttpStatus.NO_CONTENT);
        }
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity editBook(@PathVariable Long id, @RequestBody Book newDetails,
                                   BindingResult result){
        final Book updatedBook;
        boolean hasNewValues = false;
        Book toEdit = bookservice.getBookById(id);
        if(toEdit == null){
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
        if(newDetails.getTitle() != null){
            toEdit.setTitle(newDetails.getTitle());
            hasNewValues = true;
        }
        if(newDetails.getAuthor() != null){
            toEdit.setAuthor(newDetails.getAuthor());
            hasNewValues = true;
        }
        if(newDetails.getCategory() != null){
            toEdit.setCategory(newDetails.getCategory());
            hasNewValues = true;
        }
        if(newDetails.getISBN() != null){
            toEdit.setISBN(newDetails.getISBN());
            hasNewValues = true;
        }
        if(newDetails.getDescription() != null){
            toEdit.setDescription(newDetails.getDescription());
            hasNewValues = true;
        }
        try{
            if(hasNewValues){
                updatedBook = bookservice.updateBook(toEdit);
                return ResponseEntity.ok(updatedBook);
            }else{
                return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
            }
        }catch (Exception e){
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

}
