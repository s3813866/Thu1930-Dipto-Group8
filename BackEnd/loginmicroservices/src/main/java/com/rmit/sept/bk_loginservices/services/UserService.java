package com.rmit.sept.bk_loginservices.services;




import com.rmit.sept.bk_loginservices.AccountType;
import com.rmit.sept.bk_loginservices.Repositories.UserRepository;
import com.rmit.sept.bk_loginservices.exceptions.UsernameAlreadyExistsException;
import com.rmit.sept.bk_loginservices.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public User saveUser (User newUser){

      /*  newUser.setPassword(bCryptPasswordEncoder.encode(newUser.getPassword()));
        //Username has to be unique (exception)
        // Make sure that password and confirmPassword match
        // We don't persist or show the confirmPassword
        return userRepository.save(newUser);
       */
        try{
            newUser.setPassword(bCryptPasswordEncoder.encode(newUser.getPassword()));
            //Username has to be unique (exception)
            newUser.setUsername(newUser.getUsername());
            // Make sure that password and confirmPassword match
            // We don't persist or show the confirmPassword
            newUser.setConfirmPassword("");
            if(newUser.getAccountType() == null){
                newUser.setAccountType(AccountType.CUSTOMER);
            }
            return userRepository.save(newUser);

        }catch (Exception e){
            throw new UsernameAlreadyExistsException("Username '"+newUser.getUsername()+"' already exists");
        }

    }

    public User getUserByID(Long id){
        Optional<User> toGet = userRepository.findById(id);
        if(toGet.isPresent()){
            User getVal = toGet.get();
            return getVal;
        }
        return null;
    }

    public List<User> getAllUsers(){
        List<User> users = new ArrayList<>();
        userRepository.findAll().forEach(user -> users.add(user));
        return users;
    }

    public User getUserByUsername(String username){
        return userRepository.findByUsername(username);
    }

    public User updateUser(User updatedUser){
        try{
            updatedUser.setPassword(bCryptPasswordEncoder.encode(updatedUser.getPassword()));
            updatedUser.setConfirmPassword("");
            return userRepository.save(updatedUser);
        }catch (Exception e){
            throw new UsernameAlreadyExistsException("Username '"+updatedUser.getUsername()+"' already exists");
        }
    }

    public User updateUser_noPwdChange(User updatedUser){
        try{
            return userRepository.save(updatedUser);
        }catch (Exception e){
            throw new UsernameAlreadyExistsException("Username '"+updatedUser.getUsername()+"' already exists");
        }
    }


}
