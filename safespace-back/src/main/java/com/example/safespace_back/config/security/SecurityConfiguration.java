package com.example.safespace_back.config.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfiguration {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    public SecurityConfiguration(JwtAuthenticationFilter jwtAuthenticationFilter) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    @Bean
    public SecurityFilterChain customSecurityFilterChain(HttpSecurity http) throws Exception {
        http
            .cors(corsCustomizer -> corsCustomizer.configurationSource(corsConfigurationSource()))
            .csrf(AbstractHttpConfigurer::disable)
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(requests -> requests
                .requestMatchers(
                    "/auth/**",
                    "/user/all",
                    "/error",
                    "/swagger-ui.html",
                    "/swagger-ui/**",
                    "/api-docs",
                    "/faculties"
                ).permitAll()
                // Permitir todas las solicitudes OPTIONS (preflight de CORS)
                .requestMatchers(request -> "OPTIONS".equalsIgnoreCase(request.getMethod())).permitAll()
                .requestMatchers(
                    "/psychologist",
                    "/sentences/**"
                ).hasAuthority("PSYCHOLOGIST")
                .requestMatchers(
                    "/student",
                    "/moods",
                    "/dailymoods/**",
                    "/students/**"
                ).hasAuthority("STUDENT")
                .anyRequest().authenticated()
            ).addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        // Permitir todos los orígenes de localhost (cualquier puerto)
        configuration.setAllowedOriginPatterns(List.of("http://localhost:*", "http://127.0.0.1:*"));
        // Permitir todos los métodos HTTP necesarios
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"));
        // Permitir todos los headers necesarios
        configuration.setAllowedHeaders(List.of("*"));
        // Permitir credenciales (cookies, headers de autenticación, etc.)
        configuration.setAllowCredentials(true);
        // Exponer headers personalizados si es necesario
        configuration.setExposedHeaders(List.of("Authorization"));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);

        return source;
    }
}
