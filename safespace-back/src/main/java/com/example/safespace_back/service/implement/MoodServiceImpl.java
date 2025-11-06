package com.example.safespace_back.service.implement;

import com.example.safespace_back.dto.out.MoodDTO;
import com.example.safespace_back.mapper.MoodMapper;
import com.example.safespace_back.repository.MoodRepository;
import com.example.safespace_back.service.MoodService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MoodServiceImpl implements MoodService {
    private final MoodRepository moodRepository;
    private final MoodMapper moodMapper;

    public MoodServiceImpl(MoodRepository moodRepository, MoodMapper moodMapper) {
        this.moodRepository = moodRepository;
        this.moodMapper = moodMapper;
    }

    @Override
    public List<MoodDTO> getAllMoods() {
        return moodMapper.toDTO(moodRepository.findAll());
    }
}
