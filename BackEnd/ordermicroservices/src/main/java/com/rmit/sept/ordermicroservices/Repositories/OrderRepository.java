package com.rmit.sept.ordermicroservices.Repositories;

import com.rmit.sept.ordermicroservices.model.Order;
import org.springframework.data.repository.CrudRepository;

import java.util.Date;
import java.util.List;

public interface OrderRepository extends CrudRepository<Order, Long> {
    Order getByOrderId(Long orderId);
    List<Order> getByOrderDate(Date date);
    List<Order> getByUserId(Long userId);
    void deleteByOrderId(Long orderId);
}
