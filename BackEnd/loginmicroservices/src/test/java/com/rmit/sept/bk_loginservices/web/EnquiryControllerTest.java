package com.rmit.sept.bk_loginservices.web;

import com.rmit.sept.bk_loginservices.model.Enquiry;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.validation.BeanPropertyBindingResult;
import org.springframework.validation.BindingResult;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class EnquiryControllerTest {
    @Autowired
    EnquiryController enquiryController;

    @BeforeAll
    public void setUp(){

    }

    @Test
    public void whenAllFieldsAreFull_ThenSubmitSucceeds(){
        Enquiry newEnq = new Enquiry("John", "john@test.com", "test subject", "test message");
        BindingResult result = new BeanPropertyBindingResult(newEnq, "newEnq");
        Enquiry retVal = (Enquiry) enquiryController.submitEnquiry(newEnq, result).getBody();
        Enquiry testResult = (Enquiry) enquiryController.getEnquiry(retVal.getId()).getBody();

        assertEquals(newEnq.getName(), testResult.getName());
        assertEquals(newEnq.getEmail(), testResult.getEmail());
        assertEquals(newEnq.getSubject(), testResult.getSubject());
        assertEquals(newEnq.getMessage(), testResult.getMessage());
    }

    @Test
    public void whenEmailIsNotCorrectFormat_thenSubmitFails(){
        Enquiry newEnq = new Enquiry("jane", "janetest.com", "test subject", "test message");
        BindingResult result = new BeanPropertyBindingResult(newEnq, "newEnq");
        enquiryController.submitEnquiry(newEnq, result);
        Enquiry testResult = (Enquiry) enquiryController.getEnquiry(1L).getBody();

        assertNull(testResult);
    }

    @Test
    public void whenNameDoesNotExist_thenSubmitFails(){
        Enquiry newEnq = new Enquiry(null, "jane@test.com", "test subject", "test message");
        BindingResult result = new BeanPropertyBindingResult(newEnq, "newEnq");
        enquiryController.submitEnquiry(newEnq, result);
        Enquiry testResult = (Enquiry) enquiryController.getEnquiry(1L).getBody();

        assertNull(testResult);
    }

    @Test
    public void whenEmailDoesNotExist_thenSubmitFails(){
        Enquiry newEnq = new Enquiry("jane", null, "test subject", "test message");
        BindingResult result = new BeanPropertyBindingResult(newEnq, "newEnq");
        enquiryController.submitEnquiry(newEnq, result);
        Enquiry testResult = (Enquiry) enquiryController.getEnquiry(1L).getBody();

        assertNull(testResult);
    }

    @Test
    public void whenSubjectDoesNotExist_thenSubmitFails(){
        Enquiry newEnq = new Enquiry("jane", "jane@test.com", null , "test message");
        BindingResult result = new BeanPropertyBindingResult(newEnq, "newEnq");
        enquiryController.submitEnquiry(newEnq, result);
        Enquiry testResult = (Enquiry) enquiryController.getEnquiry(1L).getBody();

        assertNull(testResult);
    }

    @Test
    public void whenMessageDoesNotExist_thenSubmitFails(){
        Enquiry newEnq = new Enquiry("jane", "jane@test.com", "test subject", null);
        BindingResult result = new BeanPropertyBindingResult(newEnq, "newEnq");
        enquiryController.submitEnquiry(newEnq, result);
        Enquiry testResult = (Enquiry) enquiryController.getEnquiry(1L).getBody();

        assertNull(testResult);
    }

    @Test
    public void whenEnquiryBelongingToIDExists_thenDeleteSucceeds(){
        Enquiry newEnq = new Enquiry("Jim", "Jim@test.com", "test subject", "test message");
        BindingResult result = new BeanPropertyBindingResult(newEnq, "newEnq");
        Enquiry retVal = (Enquiry) enquiryController.submitEnquiry(newEnq, result).getBody();
        Enquiry testResult = (Enquiry) enquiryController.getEnquiry(retVal.getId()).getBody();
        assertEquals(newEnq.getName(), testResult.getName());

        enquiryController.deleteEnquiry(retVal.getId());
        testResult = (Enquiry) enquiryController.getEnquiry(retVal.getId()).getBody();
        assertNull(testResult);
    }

}