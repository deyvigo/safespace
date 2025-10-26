package com.example.safespace_back.jwt;

import io.jsonwebtoken.Jwt;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.Map;

@Service
public class JwtService {
    @Value("${security.jwt.secret-key}")
    private String secretKey;

    @Value("${security.jwt.expiration-time}")
    private long jwtExpiration;

    public Object extractPayload(String token) {
        Jwt <?, ?> jwt;
        try {
            jwt = Jwts
                .parser()
                .verifyWith(getSigningtKey())
                .build()
                .parse(token);
        } catch (SignatureException se) {
            System.out.println("Invalid JWT signature");
            return null;
        }

        return jwt.getPayload();
    }

    public String buildToken(Map<String, Object> claims) {
        return Jwts
            .builder()
            .claim("payload", claims)
            .signWith(getSigningtKey())
            .expiration(new Date(System.currentTimeMillis() + jwtExpiration))
            .compact();
    }

    private SecretKey getSigningtKey() {
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(secretKey));
    }

    public boolean isValidToken(String token) {
        try {
            Jwts
                .parser()
                .verifyWith(getSigningtKey())
                .build()
                .parse(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public String getUsername(String token) {
        Object payload = extractPayload(token);
        if (payload instanceof Map<?,?> payloadMap) {
            Object claims = payloadMap.get("payload");
            System.out.println("Claims: " + claims);
            if (claims instanceof Map<?,?> claimsMap) {
                Object username = claimsMap.get("username");
                System.out.println("Username: " + username);
                return username != null ? username.toString() : null;
            }
        }
        return null;
    }
}
