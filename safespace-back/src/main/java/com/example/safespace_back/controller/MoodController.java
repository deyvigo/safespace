package com.example.safespace_back.controller;

import com.example.safespace_back.dto.out.MoodDTO;
import com.example.safespace_back.service.MoodService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/moods")
public class MoodController {
    private final MoodService moodService;

    public MoodController(MoodService moodService) {
        this.moodService = moodService;
    }

    @GetMapping("")
    public ResponseEntity<List<MoodDTO>> getMoods() {
        return ResponseEntity.ok(moodService.getAllMoods());
    }
}
