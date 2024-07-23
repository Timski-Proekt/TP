package com.timski.vozackamk.repository;

import com.timski.vozackamk.model.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AppUserRepository extends JpaRepository<AppUser, String> {
    AppUser findByEmailAndPassword(String email, String password);
    Optional<AppUser> findByEmail(String email);
    Boolean existsByEmail(String email);
}
