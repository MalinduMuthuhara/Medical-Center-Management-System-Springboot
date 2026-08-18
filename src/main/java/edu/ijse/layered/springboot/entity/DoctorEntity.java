package edu.ijse.layered.springboot.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter

@Entity
@Table(name = "doctor")

public class DoctorEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int doctorId;

    @ManyToOne
    @JoinColumn(name = "department_id")
    private DepartmentEntity departmentEntity;

    private String doctorName;
    private String specialization;
    private int contactNumber;

    @OneToMany(mappedBy = "doctorEntity")
    private List<AppointmentEntity>appointmentEntityList;

}
