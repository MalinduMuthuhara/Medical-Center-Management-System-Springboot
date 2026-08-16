package edu.ijse.layered.springboot.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Data

public class LabTestDTO {

    private int labTestId;
    private int appointmentId;
    private String testName;
    private String result;
    private LocalDate testDate;

}
