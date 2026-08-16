package edu.ijse.layered.springboot.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data

public class AppointmentMedicineDTO {

    private int appointmentId;
    private int medicineId;
    private int quantity;

}
