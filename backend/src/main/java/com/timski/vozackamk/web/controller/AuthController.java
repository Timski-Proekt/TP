package com.timski.vozackamk.web.controller;

import com.timski.vozackamk.model.dto.LoginAppUserDto;
import com.timski.vozackamk.model.dto.RegistrationAppUserDto;
import com.timski.vozackamk.model.exceptions.AppUserExistsException;
import com.timski.vozackamk.model.exceptions.DrivingSchoolNotFoundException;
import com.timski.vozackamk.repository.AppUserRepository;
import com.timski.vozackamk.service.AppUserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final AppUserRepository userRepository;
    private final AppUserService appUserService;

    public AuthController(AuthenticationManager authenticationManager, AppUserRepository userRepository, AppUserService appUserService) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.appUserService = appUserService;
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
    public ResponseEntity<String> authenticateUser(@RequestBody LoginAppUserDto loginDto) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                loginDto.getEmail(), loginDto.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        return new ResponseEntity<>("User signed-in successfully.", HttpStatus.OK);
    }
}
