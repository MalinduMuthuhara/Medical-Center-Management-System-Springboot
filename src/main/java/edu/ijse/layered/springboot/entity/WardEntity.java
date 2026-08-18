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
@Table(name = "ward")

public class WardEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int wardId;

    @ManyToOne
    @JoinColumn(name = "department_id")
    private DepartmentEntity departmentEntity;

    private String roomNumber;
    private String type;
    private int capacity;

    @OneToMany(mappedBy = "wardEntity")
    private List<PatientEntity>patientEntityList;

}
