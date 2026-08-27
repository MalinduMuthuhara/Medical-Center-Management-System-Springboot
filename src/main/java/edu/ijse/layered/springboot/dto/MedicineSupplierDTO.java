package edu.ijse.layered.springboot.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class MedicineSupplierDTO {

    private int medicineSupplierId;
    private int medicineId;
    private int supplierId;
    private String medicineName;
    private String supplierName;

}