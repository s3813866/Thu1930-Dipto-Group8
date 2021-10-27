package com.rmit.sept.bookmicroservices.model;

import javax.persistence.Entity;
import javax.persistence.*;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import java.util.Date;

@Entity
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Please enter a heading")
    private String heading;
    @Min(1) @Max(5)
    private int rating;
    @NotBlank(message = "Review is required")
    private String reviewText;
    @Min(0)
    private Long bookId;
    @Min(0)
    private Long userId;

    private Date created_At;
    private Date updated_At;

    public Review() {
    }

    public Review(Long id, String heading, int rating, String reviewText, Long bookId, Long userId, Date created_At, Date updated_At) {
        this.id = id;
        this.heading = heading;
        this.rating = rating;
        this.reviewText = reviewText;
        this.bookId = bookId;
        this.userId = userId;
        this.created_At = created_At;
        this.updated_At = updated_At;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getHeading() {
        return heading;
    }

    public void setHeading(String heading) {
        this.heading = heading;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public String getReviewText() {
        return reviewText;
    }

    public void setReviewText(String reviewText) {
        this.reviewText = reviewText;
    }

    public Long getBookId() {
        return bookId;
    }

    public void setBookId(Long bookId) {
        this.bookId = bookId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
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
