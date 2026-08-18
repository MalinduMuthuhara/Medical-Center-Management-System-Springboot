package edu.ijse.layered.springboot.entity;

import edu.ijse.layered.springboot.enumaration.PatientGender;
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
@Table(name = "patient")

public class PatientEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int patientId;

    @ManyToOne
    @JoinColumn(name = "ward_id")
    private WardEntity wardEntity;

    private String patientName;
    private int patientAge;

    @Enumerated(EnumType.STRING)
    private PatientGender patientGender;

    private String patientAddress;

    @OneToMany(mappedBy = "patientEntity")
    private List<AppointmentEntity>appointmentEntityList;

    @OneToMany(mappedBy = "patientEntity")
    private List<MedicalHistoryEntity>medicalHistoryEntityList;
}
