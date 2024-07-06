package com.example.rockpaperscissors.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.rockpaperscissors.model.UserRecord;
import com.example.rockpaperscissors.service.UserAuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

@RestController
public class GameController {

    private int userPoints = 0;
    private int computerPoints = 0;
    private int ties = 0;
    private int roundsPlayed = 0;


    @Autowired
    private UserAuthService userAuthService;

    @GetMapping("/initialize")
    public String initializeUserRecords() {
        return userAuthService.initializeUserRecord();
    }
    @PostMapping("/auth/signUp")
    public String signUp(@RequestBody UserRecord loginRequest){ return userAuthService.SignUser(loginRequest.getId(), loginRequest.getPassword());}

    @PostMapping("/auth/login")
    public UserRecord login(@RequestBody UserRecord loginRequest){ return userAuthService.loginUser(loginRequest.getId(), loginRequest.getPassword());}

    @PostMapping("/battle")
    public ResponseEntity<Map<String, String>> playGame2(@RequestBody String userMove) {
        if (roundsPlayed < 10) {
            // Get computer move randomly
            System.out.println("usermove: " + userMove);
            String[] moves = {"rock", "paper", "scissors"};
            int randomIndex = new Random().nextInt(moves.length);
            String computerMove = moves[randomIndex];
            System.out.println("compmove: " + computerMove);

            // Implement game logic to determine winner
            String result = determineWinner(userMove, computerMove);

            // Increment points or ties based on result
            if (result.equals("User +1")) {
                userPoints++;
            } else if (result.equals("Computer +1")) {
                computerPoints++;
            } else {
                ties++;
            }

            roundsPlayed++;

            // Build response
            Map<String, String> response = new HashMap<>();
            response.put("result", result);
            response.put("computerMove", computerMove);

            return ResponseEntity.ok(response);
        } else {
            // Game is over after 10 rounds
            return ResponseEntity.badRequest().body(Collections.singletonMap("error", "Game over."));
        }
    }
    @PostMapping("/play")
    public ResponseEntity<Map<String, String>> playGame(@RequestBody String userMove) {
        if (roundsPlayed < 10) {
            // Get computer move randomly
            System.out.println("usermove: " + userMove);
            String[] moves = {"rock", "paper", "scissors"};
            int randomIndex = new Random().nextInt(moves.length);
            String computerMove = moves[randomIndex];
            System.out.println("compmove: " + computerMove);

            // Implement game logic to determine winner
            String result = determineWinner(userMove, computerMove);

            // Increment points or ties based on result
            if (result.equals("User +1")) {
                userPoints++;
            } else if (result.equals("Computer +1")) {
                computerPoints++;
            } else {
                ties++;
            }

            roundsPlayed++;

            // Build response
            Map<String, String> response = new HashMap<>();
            response.put("result", result);
            response.put("computerMove", computerMove);

            return ResponseEntity.ok(response);
        } else {
            // Game is over after 10 rounds
            return ResponseEntity.badRequest().body(Collections.singletonMap("error", "Game over."));
        }
    }
    @PostMapping("/reset")
    public ResponseEntity<Map<String, String>> resetGame() {
        userPoints = 0;
        computerPoints = 0;
        ties = 0;
        roundsPlayed = 0;

        Map<String, String> response = new HashMap<>();
        response.put("status", "Game reset successfully");

        return ResponseEntity.ok(response);
    }

    private String determineWinner(String userMove, String computerMove) {
        // Implement your game logic here
        // For simplicity, let's assume Rock beats Scissors, Scissors beats Paper, and Paper beats Rock
        if ((userMove.equals("{\"userMove\":\"rock\"}") && computerMove.equals("rock")) ||
                (userMove.equals("{\"userMove\":\"scissors\"}") && computerMove.equals("scissors")) ||
                (userMove.equals("{\"userMove\":\"paper\"}") && computerMove.equals("paper")))  {
            return "It's a tie!";
        } else if ((userMove.equals("{\"userMove\":\"rock\"}") && computerMove.equals("scissors")) ||
                (userMove.equals("{\"userMove\":\"scissors\"}") && computerMove.equals("paper")) ||
                (userMove.equals("{\"userMove\":\"paper\"}") && computerMove.equals("rock"))) {
            return "User +1";
        } else {
            return "Computer +1";
        }
    }

    @GetMapping("/result")
    public ResponseEntity<Map<String, String>> getResult() {
        // Determine the winner of the overall game
        if (userPoints > computerPoints) {
            return ResponseEntity.ok(Collections.singletonMap("finalResult", "User wins the game!"));
        } else if (userPoints < computerPoints) {
            return ResponseEntity.ok(Collections.singletonMap("finalResult", "Computer wins the game!"));
        } else {
            return ResponseEntity.ok(Collections.singletonMap("finalResult", "It's a tie! Game over."));
        }
    }
}
