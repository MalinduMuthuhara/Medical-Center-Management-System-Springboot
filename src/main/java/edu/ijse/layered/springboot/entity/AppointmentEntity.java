package edu.ijse.layered.springboot.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter

@Entity
@Table(name = "appointment")

public class AppointmentEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int appointmentId;

    @ManyToOne
    @JoinColumn(name = "doctor_id")
    private DoctorEntity doctorEntity;

    @ManyToOne
    @JoinColumn(name = "patient_id")
    private PatientEntity patientEntity;

    @OneToMany(mappedBy = "appointmentEntity")
    private List<LabTestEntity> labTestEntityList;

    @OneToOne(mappedBy = "appointmentEntity")
    private PaymentEntity paymentEntity;

}
