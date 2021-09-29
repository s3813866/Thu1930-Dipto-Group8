package com.rmit.sept.bk_loginservices.web;


import com.rmit.sept.bk_loginservices.model.User;
import com.rmit.sept.bk_loginservices.payload.JWTLoginSucessReponse;
import com.rmit.sept.bk_loginservices.payload.LoginRequest;
import com.rmit.sept.bk_loginservices.security.JwtTokenProvider;
import com.rmit.sept.bk_loginservices.services.MapValidationErrorService;
import com.rmit.sept.bk_loginservices.services.UserService;
import com.rmit.sept.bk_loginservices.validator.UserValidator;
//import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

import java.util.Map;

import static com.rmit.sept.bk_loginservices.security.SecurityConstant.TOKEN_PREFIX;

// Imported for @CrossOrigin


@RestController
@RequestMapping("/api/users")
@CrossOrigin
public class UserController {

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @Autowired
    private UserService userService;

    @Autowired
    private UserValidator userValidator;


    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody User user, BindingResult result){
        // Validate passwords match
        userValidator.validate(user,result);

        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if(errorMap != null)return errorMap;
        user.setStatus("active");
        User newUser = userService.saveUser(user);

        return  new ResponseEntity<User>(newUser, HttpStatus.CREATED);
    }


    @Autowired
    private JwtTokenProvider tokenProvider;

    @Autowired
    private AuthenticationManager authenticationManager;



    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest, BindingResult result){
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if(errorMap != null) return errorMap;
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(),
                        loginRequest.getPassword()
                )
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = TOKEN_PREFIX +  tokenProvider.generateToken(authentication);
        if(userService.getUserByUsername(loginRequest.getUsername()).getStatus().equals("banned")){
            return new ResponseEntity<>(new JWTLoginSucessReponse(false, null),HttpStatus.FORBIDDEN);
        }
        return ResponseEntity.ok(new JWTLoginSucessReponse(true, jwt));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getUserByID(@PathVariable Long id){
        User toGet = userService.getUserByID(id);
        if(toGet != null){
            return new ResponseEntity<>(toGet, HttpStatus.OK);
        }else{
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    //Send GET as URL with structure /api/users/search?username={username}
    // (e.g. /api/users/search?username=test@test.com).
    @GetMapping("/search")
    public ResponseEntity<?> getUserByUsername(@RequestParam(required = false)  String username){
        User toGet = userService.getUserByUsername(username);
        if(toGet != null){
            return new ResponseEntity<>(toGet, HttpStatus.OK);
        }else{
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    // To use this command, include the id number of the user to edit in the URL, and POST with a JSON body
    // of the attributes to change.  Any attributes that are not being changed should be left out of the JSON body.
    @PutMapping("/edit/{id}")
    public ResponseEntity<?> editUser(@PathVariable Long id, @Valid @RequestBody User newDetails,
                                      BindingResult result){
        final User updatedUser;
        User user = userService.getUserByID(id);
        if(user == null) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
        if(newDetails.getUsername() != null){
            user.setUsername(newDetails.getUsername());
        }
        if(newDetails.getFullName() != null){
            user.setFullName(newDetails.getFullName());
        }
        if(newDetails.getPassword() != null){
            user.setPassword(newDetails.getPassword());
            user.setConfirmPassword(newDetails.getConfirmPassword());
            userValidator.validate(user, result);
            ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
            if(errorMap != null){
                Map<String, String> errorHashMap = (Map<String, String>) errorMap.getBody();
                if(errorHashMap.containsKey("password") || errorHashMap.containsKey("confirmPassword")){
                    return errorMap;
                }
            }
            updatedUser = userService.updateUser(user);
        }else{
            updatedUser = userService.updateUser_noPwdChange(user);
        }
        return ResponseEntity.ok(updatedUser);
    }

    @PutMapping("/ban/{id}")
    public ResponseEntity<?> banUser(@PathVariable Long id){
        final User updatedUser;
        User user = userService.getUserByID(id);
        user.setStatus("banned");
        updatedUser = userService.updateUser_noPwdChange(user);
        return ResponseEntity.ok(updatedUser);
    }

    @PutMapping("/unban/{id}")
    public ResponseEntity<?> unbanUser(@PathVariable Long id){
        final User updatedUser;
        User user = userService.getUserByID(id);
        user.setStatus("active");
        updatedUser = userService.updateUser_noPwdChange(user);
        return ResponseEntity.ok(updatedUser);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id){
        if(userService.deleteUserByID(id)){
            return ResponseEntity.ok(null);
        }else{
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

}
