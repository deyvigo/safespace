package com.example.safespace_back.service;

import java.util.concurrent.CompletableFuture;
import com.google.common.collect.ImmutableMap;

public interface GeminiAiService {
    CompletableFuture<String> askSome(String modelName, ImmutableMap<String, Object> schema, String content);
}
