package com.timski.vozackamk.web.controller;

import com.timski.vozackamk.model.AppUser;
import com.timski.vozackamk.model.dto.AuthResponseDto;
import com.timski.vozackamk.model.dto.LoginAppUserDto;
import com.timski.vozackamk.model.dto.RegistrationAppUserDto;
import com.timski.vozackamk.model.exceptions.AppUserExistsException;
import com.timski.vozackamk.model.exceptions.DrivingSchoolNotFoundException;
import com.timski.vozackamk.repository.AppUserRepository;
import com.timski.vozackamk.security.JWTGenerator;
import com.timski.vozackamk.security.TokenBlacklistService;
import com.timski.vozackamk.service.AppUserService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final AppUserRepository userRepository;
    private final AppUserService appUserService;
    private final JWTGenerator jwtGenerator;
    private final TokenBlacklistService tokenService;

    public AuthController(AuthenticationManager authenticationManager, AppUserRepository userRepository, AppUserService appUserService, JWTGenerator jwtGenerator, TokenBlacklistService tokenService) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.appUserService = appUserService;
        this.jwtGenerator = jwtGenerator;
        this.tokenService = tokenService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody RegistrationAppUserDto signUpDto) throws AppUserExistsException {

        if (userRepository.existsByEmail(signUpDto.getEmail())) {
            return new ResponseEntity<>("Email is already taken.", HttpStatus.BAD_REQUEST);
        }

        try {
            appUserService.register(signUpDto);
        } catch (DrivingSchoolNotFoundException e) {
            throw new RuntimeException(e);
        }
        return new ResponseEntity<>("User registered successfully.", HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDto> authenticateUser(@RequestBody LoginAppUserDto loginDto) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                loginDto.getEmail(), loginDto.getPassword()));

        AppUser appUser = appUserService.findByEmail(loginDto.getEmail());

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = jwtGenerator.generateToken(authentication);
        return new ResponseEntity<>(new AuthResponseDto(token, appUser.getEmbg()), HttpStatus.OK);
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpServletRequest request) {
        String token = extractTokenFromRequest(request);
        if (token != null) {
            tokenService.blacklistToken(token);
        }
        SecurityContextHolder.clearContext();
        return new ResponseEntity<>("Logged out successfully.", HttpStatus.OK);
    }

    public String extractTokenFromRequest(HttpServletRequest request) {
        String authorizationHeader = request.getHeader("Authorization");
        if (StringUtils.hasText(authorizationHeader) && authorizationHeader.startsWith("Bearer ")) {
            return authorizationHeader.substring(7);
        }
        return null;
    }
}
