package com.rmit.sept.ordermicroservices.services;

import com.rmit.sept.ordermicroservices.Repositories.OrderItemRepository;
import com.rmit.sept.ordermicroservices.model.OrderItem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class OrderItemService {

    @Autowired
    private OrderItemRepository orderItemRepository;

    public OrderItem saveItem(OrderItem newOrderItem){
        return orderItemRepository.save(newOrderItem);
    }

    @Transactional
    public OrderItem getItemByOrderIdandBookId(Long orderId, Long bookId){
        return orderItemRepository.getByOrderIdAndBookId(orderId, bookId);
    }

    @Transactional
    public List<OrderItem> getItemsByOrderId(Long orderId){
        return orderItemRepository.getByOrderId(orderId);
    }

    public List<OrderItem> getAllItems(){
        List<OrderItem> allItems = new ArrayList<>();
        orderItemRepository.findAll().forEach(item -> allItems.add(item));
        return allItems;
    }

    public boolean deleteItemsbyOrderId(Long orderId){
        try{
            orderItemRepository.deleteAllByOrderId(orderId);
            return true;
        }catch (Exception e){
            return false;
        }
    }

}
