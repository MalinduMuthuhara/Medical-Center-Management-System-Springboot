package edu.ijse.layered.springboot.dto;

import edu.ijse.layered.springboot.enumaration.UserRole;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data

public class UserDTO {

    private int userId;
    private String userName;
    private String password;
    private UserRole userRole;

}
