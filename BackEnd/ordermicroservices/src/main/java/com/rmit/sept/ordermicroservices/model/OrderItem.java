package com.rmit.sept.ordermicroservices.model;

import org.springframework.context.annotation.Primary;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Date;

@Entity
@IdClass(ItemKey.class)
public class OrderItem {
    @Id
    private long orderId;
    @Id
    private long bookId;
    @Max(10000) @Min(1)
    private int quantity;
    @DecimalMax("10000.0") @DecimalMin("0.0")
    private double price;

    private Date created_At;
    private Date updated_At;

    public OrderItem() {
    }

    public OrderItem(long orderId, long bookId, int quantity, double price) {
        this.orderId = orderId;
        this.bookId = bookId;
        this.quantity = quantity;
        this.price = price;
    }

    public long getOrderId() {
        return orderId;
    }

    public void setOrderId(long orderId) {
        this.orderId = orderId;
    }

    public long getBookId() {
        return bookId;
    }

    public void setBookId(long bookId) {
        this.bookId = bookId;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public Date getCreated_At() {
        return created_At;
    }

    public void setCreated_At(Date created_At) {
        this.created_At = created_At;
    }

    public Date getUpdated_At() {
        return updated_At;
    }

    public void setUpdated_At(Date updated_At) {
        this.updated_At = updated_At;
    }

    @PrePersist
    protected void onCreate(){
        this.created_At = new Date();
    }

    @PreUpdate
    protected void onUpdate(){
        this.updated_At = new Date();
    }
}

class ItemKey implements Serializable {

    private long orderId;
    private long bookId;

    public ItemKey() {
    }

    public ItemKey(long orderId, long bookId) {
        this.orderId = orderId;
        this.bookId = bookId;
    }
}