package edu.ijse.layered.springboot.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data

public class NurseDTO {

    private int nurseId;
    private int departmentId;
    private String nurseName;
    private String  contactNumber;

}
