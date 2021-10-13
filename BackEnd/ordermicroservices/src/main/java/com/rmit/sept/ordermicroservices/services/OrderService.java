package com.rmit.sept.ordermicroservices.services;

import com.rmit.sept.ordermicroservices.Repositories.OrderRepository;
import com.rmit.sept.ordermicroservices.model.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    public Order saveOrder(Order newOrder){
        return orderRepository.save(newOrder);
    }

    @Transactional
    public Order getOrderByOrderId(Long orderId){
        return orderRepository.getByOrderId(orderId);
    }

    @Transactional
    public List<Order> getOrdersByUserId(Long userId){
        return orderRepository.getByUserId(userId);
    }

    @Transactional
    public List<Order> getOrdersByDate(Date date){
        return orderRepository.getByOrderDate(date);
    }

    public boolean deleteOrderByOrderId(Long orderId){
        try{
            orderRepository.deleteByOrderId(orderId);
            return true;
        }catch (Exception e){
            return false;
        }
    }

}
