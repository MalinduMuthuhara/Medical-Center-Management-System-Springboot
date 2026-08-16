package edu.ijse.layered.springboot.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Data

public class MedicineDTO {

    private int medicineId;
    private String medicineName;
    private LocalDate expireDate;
    private int medicineQuantity;
    private double price;

}
