package edu.ijse.layered.springboot.security;

import edu.ijse.layered.springboot.entity.UserEntity;
import edu.ijse.layered.springboot.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserEntity userEntity;
        try {
            userEntity = userRepository.findByUserName(username)
                    .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));
        } catch (UsernameNotFoundException e) {
            throw e;
        } catch (Exception e) {
            // UserRepository#findByUserName declares "throws Exception"
            throw new UsernameNotFoundException("Error loading user: " + username, e);
        }

        return org.springframework.security.core.userdetails.User
                .withUsername(userEntity.getUserName())
                .password(userEntity.getPassword())
                .authorities(List.of(new SimpleGrantedAuthority("ROLE_" + userEntity.getUserRole().name())))
                .build();
    }
}
