package com.rmit.sept.bk_loginservices.web;

import com.rmit.sept.bk_loginservices.AccountType;
import com.rmit.sept.bk_loginservices.exceptions.UsernameAlreadyExistsException;
import com.rmit.sept.bk_loginservices.exceptions.UsernameAlreadyExistsResponse;
import com.rmit.sept.bk_loginservices.model.User;
import com.rmit.sept.bk_loginservices.payload.LoginRequest;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BeanPropertyBindingResult;
import org.springframework.validation.BindingResult;

import java.util.ArrayList;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class UserControllerTest {
    @Autowired
    UserController userController;

    BindingResult result;

    private ArrayList<User> testUsers = new ArrayList<>();

    @BeforeAll
    public void setUp(){
        User user1 = new User("test1@test.com", "John Citizen", "testPASSWORD", "testPASSWORD", "add");
        result = new BeanPropertyBindingResult(user1, "user1");
        userController.registerUser(user1, result);
        User user2 = new User("test2@test.com", "Jane Doe", "passwordTEST", "passwordTEST", "add");
        result = new BeanPropertyBindingResult(user2, "user2");
        userController.registerUser(user2, result);
        User user3 = new User("test3@test.com", "Jim Do", "qwertyuiop", "qwertyuiop", "add");
        result = new BeanPropertyBindingResult(user3, "user3");
        testUsers.add((User) userController.registerUser(user3, result).getBody());
    }

    @Test
    void whenOnlyUsernameIsGiven_thenUpdateSucceeds() {
        //Set up details to be changed, unchanged fields are set to null
        ResponseEntity<?> response  = userController.getUserByID(testUsers.get(1).getId());
        User toUpdate = (User) response.getBody();
        User updateVal = new User("testx@test.com", null, null, null, null);

        //Process edit user request, new username should show in retrieved user and password should be left unchanged
        response = userController.editUser(testUsers.get(1).getId(), updateVal,result);
        User testResult = (User) response.getBody();
        assertEquals(updateVal.getUsername(), testResult.getUsername());

        assertEquals(toUpdate.getFullName(), testResult.getFullName());
        assertEquals(toUpdate.getPassword(), testResult.getPassword());

        updateVal = new User("test1@test.com", null, null, null, null);
        response = userController.editUser(1L, updateVal,result);

    }

    @Test
    void whenOnlyFullNameIsGiven_thenUpdateSucceeds() {
        //Set up details to be changed, unchanged fields are set to null
        ResponseEntity<?> response  = userController.getUserByID(testUsers.get(2).getId());
        User toUpdate = (User) response.getBody();
        User updateVal = new User(null, "Jane Citizen", null, null, null);

        //Process edit user request, new fullname should show in retrieved user and password should be left unchanged
        response = userController.editUser(testUsers.get(2).getId(), updateVal,result);
        User testResult = (User) response.getBody();
        assertEquals(updateVal.getFullName(), testResult.getFullName());

        assertEquals(toUpdate.getUsername(), testResult.getUsername());
        assertEquals(toUpdate.getPassword(), testResult.getPassword());

        updateVal = new User(null, "Jane Doe", null, null, null);
        response = userController.editUser(2L, updateVal,result);
    }

    @Test
    void whenOnlyPasswordIsGiven_thenUpdateSucceeds() {
        ResponseEntity<?> response  = userController.getUserByID(testUsers.get(1).getId());
        User toUpdate = (User) response.getBody();
        User updateVal = new User(null, null, "superPASSWORD", "superPASSWORD", "add");

        //Process edit user request, new password should show in retrieved user,
        // and should not match with previous password hash
        response = userController.editUser(testUsers.get(1).getId(), updateVal,result);
        User testResult = (User) response.getBody();
        assertNotEquals(toUpdate.getPassword(), testResult.getPassword());

        assertEquals(toUpdate.getFullName(), testResult.getFullName());
        assertEquals(toUpdate.getUsername(), testResult.getUsername());

        updateVal = new User(null, null, "testPASSWORD", "testPASSWORD", "add");
        response = userController.editUser(1L, updateVal,result);

    }

    @Test
    void whenPasswordsMismatch_thenUpdateFails() {
        ResponseEntity<?> response  = userController.getUserByID(testUsers.get(2).getId());
        User toUpdate = (User) response.getBody();
        User updateVal = new User(null, null, "hyperPASSWORD", "HYPERpassword", "add");

        //Process edit user request, should fail update
        response = userController.editUser(testUsers.get(2).getId(), updateVal,result);
        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
    }

    @Test
    void whenUpdateHasNoConfirm_thenUpdateFails() {
        ResponseEntity<?> response  = userController.getUserByID(testUsers.get(2).getId());
        User toUpdate = (User) response.getBody();
        User updateVal = new User(null, null, "hyperPASSWORD", null, "add");

        //Process edit user request, should fail update
        response = userController.editUser(testUsers.get(2).getId(), updateVal,result);
        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
    }

    @Test
    void whenUsernameIsNotEmail_thenUpdateFails() {
        ResponseEntity<?> response  = userController.getUserByID(testUsers.get(1).getId());
        User toUpdate = (User) response.getBody();
        User updateVal = new User("john", null, null, null, "add");

        //Process edit user request, should fail update
        assertThrows(UsernameAlreadyExistsException.class, ()->
        {userController.editUser(testUsers.get(1).getId(), updateVal,result);});
    }

    @Test
    void whenUsernameBelongsToAnotherUser_thenUpdateFails() {
        ResponseEntity<?> response  = userController.getUserByID(testUsers.get(1).getId());
        User toUpdate = (User) response.getBody();
        User updateVal = new User("test2@test.com", null, null, null, "add");

        //Process edit user request, should fail update
        assertThrows(UsernameAlreadyExistsException.class, ()->
        {userController.editUser(testUsers.get(1).getId(), updateVal,result);});
    }

    @Test
    void whenNewUserHasNoSpecificType_thenTypeIsCustomer(){
        ResponseEntity<?> response  = userController.getUserByID(testUsers.get(1).getId());
        User retVal = (User) response.getBody();
        assertEquals(AccountType.CUSTOMER, retVal.getAccountType());
    }

    @Test
    void whenNewUserTypeisSpecified_thenTypeIsAdmin(){
        User testUser = new User("test4@test.com", "William Doe", "qwertyuiop", "qwertyuiop", "add");
        testUser.setAccountType(AccountType.ADMIN);
        result = new BeanPropertyBindingResult(testUser, "testUser");
        userController.registerUser(testUser, result);
        ResponseEntity<?> response  = userController.getUserByUsername("test4@test.com");
        User retVal = (User) response.getBody();
        assertEquals(AccountType.ADMIN, retVal.getAccountType());
    }

    @Test
    void whenIDIsGiven_userBanSucceeds(){
        LoginRequest lr = new LoginRequest();
        lr.setUsername("test3@test.com");
        lr.setPassword("qwertyuiop");
        result = new BeanPropertyBindingResult(lr, "lr");
        userController.banUser(testUsers.get(3).getId());
        assertEquals(403,userController.authenticateUser(lr,result).getStatusCodeValue());
    }

    @AfterAll
    void tearDown() {
        testUsers.remove(0);
        for(User u: testUsers){
            userController.deleteUser(u.getId());
        }
    }
}