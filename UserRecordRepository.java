package com.example.rockpaperscissors.repository;

import com.example.rockpaperscissors.model.UserRecord;
import org.springframework.data.mongodb.repository.MongoRepository;

import org.springframework.stereotype.Repository;

@Repository
public interface UserRecordRepository extends MongoRepository<UserRecord, String> {
    UserRecord findUserRecordByIdAndPassword(String id, String password);

    UserRecord findUserRecordById(String id);
}

