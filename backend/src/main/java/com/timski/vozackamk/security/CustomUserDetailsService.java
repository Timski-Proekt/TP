package com.timski.vozackamk.security;

import com.timski.vozackamk.model.AppUser;
import com.timski.vozackamk.repository.AppUserRepository;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Set;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final AppUserRepository userRepository;

    public CustomUserDetailsService(AppUserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        AppUser user = userRepository.findByEmail(email)
                .orElseThrow(()->new UsernameNotFoundException("User not found."));

        Set<SimpleGrantedAuthority> authorities = Collections.singleton(
                new SimpleGrantedAuthority("ROLE_" + user.getRole().toString()));

        return new User(user.getEmail(),user.getPassword(), authorities);
    }
}
