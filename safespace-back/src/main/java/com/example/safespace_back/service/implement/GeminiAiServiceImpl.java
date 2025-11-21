package com.example.safespace_back.service.implement;

import com.example.safespace_back.service.GeminiAiService;
import com.google.common.collect.ImmutableMap;
import com.google.genai.Client;
import com.google.genai.types.GenerateContentConfig;
import com.google.genai.types.GenerateContentResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.concurrent.CompletableFuture;

@Service
public class GeminiAiServiceImpl implements GeminiAiService {
    @Value("${gemini.api-key}")
    private String apiKey;

    @Override
    public CompletableFuture<String> askSome(String modelName, ImmutableMap<String, Object> schema, String content) {
        GenerateContentResponse response;
        try (Client client = Client.builder().apiKey(apiKey).build()) {

            GenerateContentConfig config = GenerateContentConfig
                .builder()
                .responseMimeType("application/json")
                .candidateCount(1)
                .responseJsonSchema(schema)
                .build();

            response = client.models.generateContent("gemini-2.5-flash", content, config);
        } catch (Exception ex) {
            System.out.println("Error calling Gemini API:" + ex.getMessage());

            return CompletableFuture.failedFuture(ex);
        }

        return CompletableFuture.completedFuture(response.text());
    }
}
