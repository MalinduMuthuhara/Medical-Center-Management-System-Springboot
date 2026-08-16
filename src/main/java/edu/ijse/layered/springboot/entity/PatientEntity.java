package edu.ijse.layered.springboot.entity;

import edu.ijse.layered.springboot.enumaration.PatientGender;
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
@Table(name = "patient")

public class PatientEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int patientId;

    private int wardId;
    private String patientName;
    private int patientAge;
    private PatientGender patientGender;
    private String patientAddress;

}
