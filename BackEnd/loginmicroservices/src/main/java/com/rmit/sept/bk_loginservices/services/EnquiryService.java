package com.rmit.sept.bk_loginservices.services;

import com.rmit.sept.bk_loginservices.Repositories.EnquiryRepository;
import com.rmit.sept.bk_loginservices.model.Enquiry;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class EnquiryService {

    @Autowired
    private EnquiryRepository enquiryRepository;

    public Enquiry sendEnquiry(Enquiry newEnquiry){
//        try{
            return enquiryRepository.save(newEnquiry);
//        }catch (Exception e){
//            throw new IllegalArgumentException();
//        }
    }

    public List<Enquiry> getAllEnquiries(){
        List<Enquiry> allEnquiries = new ArrayList<Enquiry>();
        enquiryRepository.findAll().forEach(enquiry -> allEnquiries.add(enquiry));
        return allEnquiries;
    }

    public Enquiry getEnquiry(Long id){
        Optional<Enquiry> retVal = enquiryRepository.findById(id);
        if(retVal.isPresent()){
            return retVal.get();
        }
        return null;
    }

    public boolean deleteEnquiry(Long id){
        try{
            enquiryRepository.deleteById(id);
            return true;
        }catch (Exception e){
            return false;
        }
    }

}
