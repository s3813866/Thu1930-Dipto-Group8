package com.rmit.sept.bookmicroservices.web;

import com.rmit.sept.bookmicroservices.model.Book;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BeanPropertyBindingResult;
import org.springframework.validation.BindingResult;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class BookControllerTest {

    @Autowired
    BookController bookController;

    BindingResult result;

    Book testBook;


    @BeforeAll
    public void setUp() {
        Book test1 = new Book("test book", "test author", "0123456789123", "test category", "test description", 30.1);
        result = new BeanPropertyBindingResult(test1, "test1");
        testBook = (Book) bookController.addBook(test1, result).getBody();
    }

    @Test
    public void dummyTest(){
        assertTrue(true);
    }

    @Test
    public void whenOnlyTitleIsGiven_thenUpdateSucceeds(){
        //Set up details to change, unchanged fields are set to null
        Book toUpdate = (Book) bookController.getBookByID(testBook.getId()).getBody();
        Book updateVal = new Book("new title", null, null, null, null, 0);

        //Process edit book request, new field value should show in return Book
        Book testResult = (Book) bookController.editBook(testBook.getId(), updateVal, result).getBody();
        assertEquals(updateVal.getTitle(), testResult.getTitle());

        assertEquals(toUpdate.getAuthor(), testResult.getAuthor());
        assertEquals(toUpdate.getCategory(), testResult.getCategory());
        assertEquals(toUpdate.getDescription(), testResult.getDescription());
        assertEquals(toUpdate.getISBN(), testResult.getISBN());
    }

    @Test
    public void whenOnlyAuthorIsGiven_thenUpdateSucceeds(){
        //Set up details to change, unchanged fields are set to null
        Book toUpdate = (Book) bookController.getBookByID(testBook.getId()).getBody();
        Book updateVal = new Book(null, "new author", null, null, null, 0);

        //Process edit book request, new field value should show in return Book
        Book testResult = (Book) bookController.editBook(testBook.getId(), updateVal, result).getBody();
        assertEquals(updateVal.getAuthor(), testResult.getAuthor());

        assertEquals(toUpdate.getTitle(), testResult.getTitle());
        assertEquals(toUpdate.getCategory(), testResult.getCategory());
        assertEquals(toUpdate.getDescription(), testResult.getDescription());
        assertEquals(toUpdate.getISBN(), testResult.getISBN());
    }

    @Test
    public void whenOnlyCategoryIsGiven_thenUpdateSucceeds(){
        //Set up details to change, unchanged fields are set to null
        Book toUpdate = (Book) bookController.getBookByID(testBook.getId()).getBody();
        Book updateVal = new Book(null, null, null, "new category", null, -2);

        //Process edit book request, new field value should show in return Book
        Book testResult = (Book) bookController.editBook(testBook.getId(), updateVal, result).getBody();
        assertEquals(updateVal.getCategory(), testResult.getCategory());

        assertEquals(toUpdate.getTitle(), testResult.getTitle());
        assertEquals(toUpdate.getAuthor(), testResult.getAuthor());
        assertEquals(toUpdate.getISBN(), testResult.getISBN());
        assertEquals(toUpdate.getDescription(), testResult.getDescription());
    }

    @Test
    public void whenOnlyISBNIsGiven_thenUpdateSucceeds(){
        //Set up details to change, unchanged fields are set to null
        Book toUpdate = (Book) bookController.getBookByID(testBook.getId()).getBody();
        Book updateVal = new Book(null, null, "9876543210987", null, null, -1);

        //Process edit book request, new field value should show in return Book
        Book testResult = (Book) bookController.editBook(testBook.getId(), updateVal, result).getBody();
        assertEquals(updateVal.getISBN(), testResult.getISBN());

        assertEquals(toUpdate.getTitle(), testResult.getTitle());
        assertEquals(toUpdate.getAuthor(), testResult.getAuthor());
        assertEquals(toUpdate.getCategory(), testResult.getCategory());
        assertEquals(toUpdate.getDescription(), testResult.getDescription());
    }

    @Test
    public void whenOnlyDescriptionIsGiven_thenUpdateSucceeds(){
        //Set up details to change, unchanged fields are set to null
        Book toUpdate = (Book) bookController.getBookByID(testBook.getId()).getBody();
        Book updateVal = new Book(null, null, null, null, "new description", -2.1);

        //Process edit book request, new field value should show in return Book
        Book testResult = (Book) bookController.editBook(testBook.getId(), updateVal, result).getBody();
        assertEquals(updateVal.getDescription(), testResult.getDescription());

        assertEquals(toUpdate.getTitle(), testResult.getTitle());
        assertEquals(toUpdate.getAuthor(), testResult.getAuthor());
        assertEquals(toUpdate.getCategory(), testResult.getCategory());
        assertEquals(toUpdate.getISBN(), testResult.getISBN());
    }

    @Test
    public void whenNoNewValuesAreGiven_thenUpdateFails(){
        //Set up details to change, unchanged fields are set to null
        Book toUpdate = (Book) bookController.getBookByID(testBook.getId()).getBody();
        Book updateVal = new Book(null, null, null, null, null, -2);

        //Process edit book request, new field value should show in return Book
        assertEquals(HttpStatus.BAD_REQUEST, bookController.editBook(testBook.getId(), updateVal, result).getStatusCode());
    }

    @Test
    public void whenISBNIsNot13Long_thenUpdateFails(){
        //Set up details to change, unchanged fields are set to null
        Book toUpdate = (Book) bookController.getBookByID(testBook.getId()).getBody();
        Book updateVal = new Book(null, null, "56789", null, null, -2.3);

        //Process edit book request, new field value should show in return Book
        assertEquals(HttpStatus.BAD_REQUEST, bookController.editBook(testBook.getId(), updateVal, result).getStatusCode());
    }

    @AfterAll
    public void tearDown(){
        bookController.deleteBook(testBook.getId());
    }
}