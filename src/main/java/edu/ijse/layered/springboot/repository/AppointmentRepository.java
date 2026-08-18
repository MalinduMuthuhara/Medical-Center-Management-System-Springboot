package edu.ijse.layered.springboot.repository;

import edu.ijse.layered.springboot.entity.AppointmentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AppointmentRepository extends JpaRepository<AppointmentEntity , Integer>{
}
