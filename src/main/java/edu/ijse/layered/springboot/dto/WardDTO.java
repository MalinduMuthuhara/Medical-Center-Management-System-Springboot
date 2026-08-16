package edu.ijse.layered.springboot.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data

public class WardDTO {

    private int wardId;
    private int departmentId;
    private String roomNumber;
    private String type;
    private int capacity;

}
