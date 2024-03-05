package com.timski.vozackamk.web.controller;

import com.timski.vozackamk.model.AppUser;
import com.timski.vozackamk.service.AppUserService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/appusers")
public class AppUserController {

    private final AppUserService appUserService;

    public AppUserController(AppUserService appUserService) {
        this.appUserService = appUserService;
    }

    @GetMapping
    public List<AppUser> getAllAppUsers() {
        return appUserService.findAll();
    }
}
