package com.rmit.sept.bk_loginservices.web;

import com.rmit.sept.bk_loginservices.model.Enquiry;
import com.rmit.sept.bk_loginservices.services.EnquiryService;
import com.rmit.sept.bk_loginservices.services.MapValidationErrorService;
import com.rmit.sept.bk_loginservices.validator.EnquiryValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/enquiries")
//@CrossOrigin
public class EnquiryController {

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @Autowired
    private EnquiryService enquiryService;

    @Autowired
    private EnquiryValidator enquiryValidator;


    /**
     *
     * @param enquiry Sent in json as
     *                {
     *                  "name": [value],
     *                  "email": [email],
     *                  "subject": [value],
     *                  "message": [value]
     *                }
     * @param result
     * @return
     */
    @PostMapping("/submit")
    public ResponseEntity<?> submitEnquiry(@Valid @RequestBody Enquiry enquiry, BindingResult result){
        enquiryValidator.validate(enquiry,result);

        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if(errorMap != null)return errorMap;
        try{
            Enquiry newEnquiry = enquiryService.sendEnquiry(enquiry);
            return new ResponseEntity<Enquiry>(newEnquiry, HttpStatus.CREATED);
        }catch(Exception e){
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllEnquiries(){
        List<Enquiry> allEnquiries = enquiryService.getAllEnquiries();
        if(allEnquiries.size()>0){
            return new ResponseEntity<>(allEnquiries, HttpStatus.OK);
        }else{
            return new ResponseEntity<>(null, HttpStatus.NO_CONTENT);
        }
    }

    @GetMapping("{id}")
    public ResponseEntity<?> getEnquiry(@PathVariable Long id){
        Enquiry retVal = enquiryService.getEnquiry(id);
        if(retVal != null){
            return new ResponseEntity<>(retVal, HttpStatus.OK);
        }else{
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }


    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteEnquiry(@PathVariable Long id){
        Enquiry toDelete = enquiryService.getEnquiry(id);
        if (toDelete != null){
            enquiryService.deleteEnquiry(id);
            return new ResponseEntity<>(toDelete, HttpStatus.OK);
        }else{
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

}
