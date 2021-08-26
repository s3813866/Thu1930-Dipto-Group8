package com.rmit.sept.bk_loginservices.exceptions;

public class InvalidLoginResponse {

        private String username;
        private String password;

        public InvalidLoginResponse() {
            this.username = "Invalid Username (Invalid Login Response (exceptions))";
            this.password = "Invalid Password (Invalid Login Response (exceptions))";
        }

        public String getUsername() {
            return username;
        }

        public void setUsername(String username) {
            this.username = username;
        }

        public String getPassword() {
            return password;
        }

        public void setPassword(String password) {
            this.password = password;
        }
    }


