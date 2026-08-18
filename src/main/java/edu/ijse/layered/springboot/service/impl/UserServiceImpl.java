package edu.ijse.layered.springboot.service.impl;

import edu.ijse.layered.springboot.dto.UserDTO;
import edu.ijse.layered.springboot.entity.UserEntity;
import edu.ijse.layered.springboot.repository.UserRepository;
import edu.ijse.layered.springboot.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public UserDTO findUsername(String username) throws Exception {
        try {
            UserEntity user = userRepository.findByUserName(username)
                    .orElseThrow(()-> new BadCredentialsException("Invalid username or password"));

            return new UserDTO(
                    user.getUserId(),
                    user.getUserName(),
                    user.getPassword(),
                    user.getUserRole()

            );

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}