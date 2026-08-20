package edu.ijse.layered.springboot.dto;

import edu.ijse.layered.springboot.enumaration.UserRole;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter

public class JWTResponseDTO {

    private String token;
    private String username;
    private UserRole userRole;

}
