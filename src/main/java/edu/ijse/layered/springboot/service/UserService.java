package edu.ijse.layered.springboot.service;

import edu.ijse.layered.springboot.dto.UserDTO;

public interface UserService {

    UserDTO findUsername(String username) throws Exception;

}
