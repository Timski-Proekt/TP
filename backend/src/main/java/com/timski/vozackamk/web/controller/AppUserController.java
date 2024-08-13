package com.timski.vozackamk.web.controller;

import com.timski.vozackamk.model.AppUser;
import com.timski.vozackamk.model.dto.AppUserDrivingSchoolProjection;
import com.timski.vozackamk.repository.AppUserRepository;
import com.timski.vozackamk.service.AppUserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/appusers")
public class AppUserController {

    private final AppUserService appUserService;
    private final AppUserRepository appUserRepository;

    public AppUserController(AppUserService appUserService, AppUserRepository appUserRepository) {
        this.appUserService = appUserService;
        this.appUserRepository = appUserRepository;
    }

    @GetMapping()
    public AppUser getAppUser(@RequestParam String embg) {
        return appUserService.findById(embg);
    }

    @GetMapping("/all")
    public List<AppUser> getAllAppUsers() {
        return appUserService.findAll();
    }

    @GetMapping("/findInfoByEmbg")
    public AppUserDrivingSchoolProjection getAppUserInfoByEmbg(@RequestParam String embg) {
        return appUserRepository.findUserWithDrivingSchoolByEmbg(embg);
    }

}
