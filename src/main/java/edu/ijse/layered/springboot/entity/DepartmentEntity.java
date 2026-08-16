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
@Table(name = "department")

public class DepartmentEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int departmentId;

    private String departmentName;
    private String departmentLocation;

    @OneToMany(mappedBy = "departmentEntity")
    private List<WardEntity> wardEntityList;

    @OneToMany(mappedBy = "departmentEntity")
    private List<NurseEntity>nurseEntityList;

    @OneToMany(mappedBy = "departmentEntity")
    private List<DoctorEntity>doctorEntityList;

    @OneToMany(mappedBy = "departmentEntity")
    private List<ExpenseEntity>expenseEntityList;
}
