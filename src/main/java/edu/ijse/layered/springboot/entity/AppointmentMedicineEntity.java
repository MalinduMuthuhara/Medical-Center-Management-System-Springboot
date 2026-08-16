package edu.ijse.layered.springboot.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter

//@Entity
//@Table(name = "appointment_medicine")

public class AppointmentMedicineEntity {

    private int appointmentId;
    private int medicineId;
    private int quantity;

}
