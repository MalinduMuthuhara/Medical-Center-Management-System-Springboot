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
@Table(name = "medical_history")

public class MedicalHistoryEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int historyId;

    @ManyToOne
    @JoinColumn(name = "patient_id")
    private PatientEntity patientEntity;

    private String details;

}
