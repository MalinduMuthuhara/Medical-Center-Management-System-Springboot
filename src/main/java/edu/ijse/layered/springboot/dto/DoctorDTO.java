package edu.ijse.layered.springboot.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data

public class DoctorDTO {

    private int doctorId;
    private int departmentId;
    private String doctorName;
    private String specialization;
    private String contactNumber;

}
