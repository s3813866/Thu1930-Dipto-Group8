package com.rmit.sept.bk_loginservices.validator;

import com.rmit.sept.bk_loginservices.model.Enquiry;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

@Component
public class EnquiryValidator implements Validator {
    @Override
    public boolean supports(Class<?> aClass) {
        return Enquiry.class.equals(aClass);
    }

    @Override
    public void validate(Object object, Errors errors) {
//
//        Enquiry enquiry = (Enquiry) object;
//
//
//        if(enquiry.getEMessage() == null || enquiry.getEMessage().length() < 1){
//            errors.rejectValue("enquiryMessage","Length", "Enquiry must contain text");
//        }
//
//        if(enquiry.getSubject() == null ||enquiry.getSubject().length() < 1){
//            errors.rejectValue("subject","Length", "Subject must contain text");
//
//        }
//


    }
}
