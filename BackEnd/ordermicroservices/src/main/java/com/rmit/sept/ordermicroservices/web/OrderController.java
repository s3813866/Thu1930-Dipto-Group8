package com.rmit.sept.ordermicroservices.web;

import com.rmit.sept.ordermicroservices.model.Order;
import com.rmit.sept.ordermicroservices.model.OrderItem;
import com.rmit.sept.ordermicroservices.services.OrderItemService;
import com.rmit.sept.ordermicroservices.services.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/order")
public class OrderController {

    private OrderService orderService;
    private OrderItemService orderItemService;

    @Autowired
    public OrderController(OrderService orderService, OrderItemService orderItemService){
        this.orderService = orderService;
        this.orderItemService = orderItemService;
    }

    //Usage: Send Post request as /api/order/purchase, with user id and order items sent in a JSON
    //Submits an order and corresponding items to the database
    @PostMapping("/purchase")
    public ResponseEntity<?> purchaseCart(@RequestBody Map<String, Object> json){
        long userId = ((Integer)json.get("userId")).longValue();
        Order purchase = new Order();
        purchase.setUserId(userId);
        purchase = orderService.saveOrder(purchase);

        List<OrderItem> cartList = new ArrayList<>();
        List<Map<String,Object>> cartJson = (List<Map<String, Object>>) json.get("cart");
        for(int i=0; i<cartJson.size();i++){
            OrderItem newItem = new OrderItem(purchase.getOrderId(),
                    ((Integer)cartJson.get(i).get("bookId")).longValue(),
                    (int)cartJson.get(i).get("quantity"),
                    (double)cartJson.get(i).get("subtotal"));
            cartList.add(orderItemService.saveItem(newItem));
        }

        Map<String, Object> result = new LinkedHashMap<>();
        result.put("order", purchase);
        result.put("cart", cartList);

        return ResponseEntity.ok(result);
    }

    //Usage: Send Get request as /api/order/{id}, with id being the order id
    //Returns the list of items that belong to the order (i.e. share the same order id).
    @GetMapping("{id}")
    public ResponseEntity<?> getOrderItemsByOrderId(@PathVariable Long id){
        Order order = orderService.getOrderByOrderId(id);
        if(order != null){
            List<OrderItem> items = orderItemService.getItemsByOrderId(id);
            Map<String, Object> result = new LinkedHashMap<>();
            result.put("order", order);
            result.put("items", items);
            return ResponseEntity.ok(result);
        }else{
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    //Usage: Send Get request as /api/order/user/{id}, with id being the user id
    //Returns the list of orders that belong to the user (i.e. share the same user id).
    @GetMapping("/user/{id}")
    public ResponseEntity<?> getOrdersByUserId(@PathVariable Long id){
        List<Order> orders = orderService.getOrdersByUserId(id);
        if(orders != null){
            return ResponseEntity.ok(orders);
        }else{
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }
}
