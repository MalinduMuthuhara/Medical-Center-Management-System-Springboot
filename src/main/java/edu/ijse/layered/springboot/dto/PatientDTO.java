package edu.ijse.layered.springboot.dto;

import edu.ijse.layered.springboot.enumaration.PatientGender;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data

public class PatientDTO {

    private int patientId;
    private int wardId;
    private String patientName;
    private int patientAge;
    private PatientGender patientGender;
    private String patientAddress;

}
