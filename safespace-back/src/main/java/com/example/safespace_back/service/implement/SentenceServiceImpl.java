package com.example.safespace_back.service.implement;

import com.example.safespace_back.dto.in.SentenceRequestDTO;
import com.example.safespace_back.dto.out.SentenceResponseDTO;
import com.example.safespace_back.exception.ResourceNotFoundException;
import com.example.safespace_back.exception.UnauthorizedAccessException;
import com.example.safespace_back.mapper.SentenceMapper;
import com.example.safespace_back.model.PsychologistEntity;
import com.example.safespace_back.model.SentenceEntity;
import com.example.safespace_back.model.UserEntity;
import com.example.safespace_back.repository.SentenceRepository;
import com.example.safespace_back.service.SentenceService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SentenceServiceImpl implements SentenceService {
    private final SentenceRepository sentenceRepository;
    private final SentenceMapper sentenceMapper;

    public SentenceServiceImpl(
        SentenceRepository sentenceRepository,
        SentenceMapper sentenceMapper
    ) {
        this.sentenceRepository = sentenceRepository;
        this.sentenceMapper = sentenceMapper;
    }

    @Override
    public SentenceResponseDTO create(SentenceRequestDTO dto, UserEntity user) {
        return sentenceMapper.toOutDTO(sentenceRepository.save(
            SentenceEntity.builder()
                .content(dto.content())
                .psychologist((PsychologistEntity) user)
                .build()
        ));
    }

    @Override
    public List<SentenceResponseDTO> findAll() {
        return sentenceMapper.toOutDTO(sentenceRepository.findAll());
    }

    @Override
    public void delete(Long id, UserEntity user) {
        SentenceEntity sentence = findIfOwnerOrThrow(id, user);
        sentenceRepository.delete(sentence);
    }

    @Override
    public SentenceResponseDTO update(Long id, SentenceRequestDTO dto, UserEntity user) {
        SentenceEntity sentence = findIfOwnerOrThrow(id, user);
        sentence.setContent(dto.content());
        return sentenceMapper.toOutDTO(sentenceRepository.save(sentence));
    }

    private SentenceEntity findIfOwnerOrThrow(Long id, UserEntity user) {
        SentenceEntity sentence = sentenceRepository.findById(id).orElseThrow(
            () -> new ResourceNotFoundException("cannot find sentence with id: " + id)
        );

        PsychologistEntity psychologist = sentence.getPsychologist();
        if (psychologist == null || !psychologist.getId().equals(user.getId())) {
            throw new UnauthorizedAccessException("User can't access this sentence because it's not the owner");
        }
        return sentence;
    }
}
