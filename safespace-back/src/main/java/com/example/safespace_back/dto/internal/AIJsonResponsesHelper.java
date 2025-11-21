package com.example.safespace_back.dto.internal;

import com.google.common.collect.ImmutableList;
import com.google.common.collect.ImmutableMap;

public class AIJsonResponsesHelper {
    public static ImmutableMap<String, Object> getRateSchema () {
        return ImmutableMap.of(
            "type", "object",
            "properties", ImmutableMap.of(
                "rate", ImmutableMap.of("type", "number"),
                "justification", ImmutableMap.of("type", "string")
            ),
            "required", ImmutableList.of("rate", "justification")
        );
    }

    public static ImmutableMap<String, Object> getSentenceSchema () {
        return ImmutableMap.of(
            "type", "array",
            "items", ImmutableMap.of(
                "type", "object",
                "properties", ImmutableMap.of(
                    "id", ImmutableMap.of("type", "number"),
                    "sentence", ImmutableMap.of("type", "string")
                ),
                "required", ImmutableList.of("id", "sentence")
            )
        );
    }
}
