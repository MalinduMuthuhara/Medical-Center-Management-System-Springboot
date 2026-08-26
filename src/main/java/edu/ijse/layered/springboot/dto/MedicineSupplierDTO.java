package edu.ijse.layered.springboot.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MedicineSupplierDTO {

    private Long medicineSupplierId;
    private Long medicineId;
    private Long supplierId;

}