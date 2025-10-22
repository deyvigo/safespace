package com.example.safespace_back.jwt;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;

    public JwtAuthenticationFilter(JwtService jwtService, UserDetailsService userDetailsService) {
        this.jwtService = jwtService;
        this.userDetailsService = userDetailsService;
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {
        String requestPath = request.getRequestURI();

        if (isPublicPath(requestPath)) {
            filterChain.doFilter(request, response);
            return;
        }

        String token = getTokenFromRequest(request);

        if (token == null || token.trim().isEmpty()) {
            sendUnauthorizedResponse(response, "Token not provided");
            return;
        } else {
            try {
                if (!jwtService.isValidToken(token)) {
                    sendUnauthorizedResponse(response, "Token invalid");
                    return;
                }

                String username = jwtService.getUsername(token);

                UserDetails userDetails = userDetailsService.loadUserByUsername(username);

                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities()
                );

                SecurityContextHolder.getContext().setAuthentication(authentication);
            } catch (Exception e) {
                sendUnauthorizedResponse(response, "Token validation failed: " + e.getMessage());
                return;
            }
        }

        filterChain.doFilter(request, response);
    }

    private boolean isPublicPath(String path) {
        return path.startsWith("/api/auth") ||
                path.equals("/error") ||
                path.startsWith("/swagger-ui/") ||
                path.startsWith("/api-docs");
    }

    private String getTokenFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }

    private void sendUnauthorizedResponse(
            HttpServletResponse response,
            String message
    ) throws IOException {
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write(String.format(
                "{\"status\":401,\"message\":\"%s\"}", message
        ));
    }

    private boolean isValidToekn(String token) {
        return jwtService.isValidToken(token);
    }
}
