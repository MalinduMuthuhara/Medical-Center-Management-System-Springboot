/*package edu.ijse.layered.springboot.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter

@Entity
@Table(name = "appointment_medicine")

public class AppointmentMedicineEntity {
    @Id
    @ManyToOne
    @JoinColumn(name = "appointment_id")
    private AppointmentEntity appointmentEntity;

    @Id
    @ManyToOne
    @JoinColumn(name = "medicine_id")
    private MedicineEntity medicineEntity;

    private int quantity;

}*/
