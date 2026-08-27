package edu.ijse.layered.springboot.entity;

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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int appointmentMedicineId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "appointment_id" , nullable = false)
    private AppointmentEntity appointmentEntity;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "medicine_id" , nullable = false)
    private  MedicineEntity medicineEntity;

    private int quantity;
}
