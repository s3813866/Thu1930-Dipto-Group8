package com.rmit.sept.ordermicroservices.Repositories;

import com.rmit.sept.ordermicroservices.model.Order;
import com.rmit.sept.ordermicroservices.model.OrderItem;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface OrderItemRepository extends CrudRepository<OrderItem, Long> {
    OrderItem getByOrderIdAndBookId(Long orderId, Long bookId);
    List<OrderItem> getByOrderId(Long orderId);
    void deleteAllByOrderId(Long orderId);

}
