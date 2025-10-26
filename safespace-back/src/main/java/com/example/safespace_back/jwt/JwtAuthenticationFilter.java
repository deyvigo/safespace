package com.example.safespace_back.jwt;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.servlet.util.matcher.PathPatternRequestMatcher;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.stream.Stream;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;

    private final List<PathPatternRequestMatcher> publicMatchers = Stream.of(
        "/auth/**",
        "/error"
    ).map(path -> PathPatternRequestMatcher.withDefaults().matcher(path)).toList();


    public JwtAuthenticationFilter(JwtService jwtService,  UserDetailsService userDetailsService) {
        this.jwtService = jwtService;
        this.userDetailsService = userDetailsService;
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        return publicMatchers.stream().anyMatch(m -> m.matches(request));
    }

    @Override
    protected void doFilterInternal(
        HttpServletRequest req,
        HttpServletResponse res,
        FilterChain chain
    ) throws ServletException, IOException {
        String token = getTokenFromRequest(req);
        if (token == null || token.trim().isEmpty()) {
            sendUnauthorizedResponse(res, "Token not provided");
            return;
        } else {
            try {
                if (!isValidToken(token)) {
                    sendUnauthorizedResponse(res, "Invalid Token");
                    return;
                }
                String username = jwtService.getUsername(token);
                UserDetails userDetails = userDetailsService.loadUserByUsername(username);

                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                    userDetails, null, userDetails.getAuthorities()
                );
                SecurityContextHolder.getContext().setAuthentication(authentication);
            } catch (Exception e) {
                sendUnauthorizedResponse(res, "Token validation failed" + e.getMessage());
                return;
            }
        }

        chain.doFilter(req, res);
    }

    private String getTokenFromRequest(HttpServletRequest req) {
        String bearerToken = req.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }

    private boolean isValidToken(String token) {
        return jwtService.isValidToken(token);
    }

    private void sendUnauthorizedResponse(
        HttpServletResponse res,
        String message
    ) throws IOException {
        res.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        res.setContentType("application/json");
        res.setCharacterEncoding("UTF-8");
        ObjectMapper mapper = new ObjectMapper();
        Map<String, Object> body = Map.of(
            "status", HttpServletResponse.SC_UNAUTHORIZED,
            "message", message
        );
        mapper.writeValue(res.getWriter(), body);
    }
}
