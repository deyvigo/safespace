package com.example.safespace_back.service;

public interface DailyMoodService {
    boolean checkIfAlreadyRegisteredDailyMoodToday(Long id);
    Object registerDailyMoodToday(Object dto);
}
