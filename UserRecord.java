package com.example.rockpaperscissors.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("userauth")
public class UserRecord {
    @Id
    private String id;
    private String password;
    
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }


    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
    
    public UserRecord() {}
    public UserRecord(String id,String password) {
        this.id = id;
      
        this.password=password;
     
    }
}
