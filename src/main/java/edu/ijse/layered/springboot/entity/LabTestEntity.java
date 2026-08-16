package edu.ijse.layered.springboot.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter

@Entity
@Table(name = "lab_test")

public class LabTestEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int labTestId;

    private int appointmentId;
    private String testName;
    private String result;
    private LocalDate testDate;

}
