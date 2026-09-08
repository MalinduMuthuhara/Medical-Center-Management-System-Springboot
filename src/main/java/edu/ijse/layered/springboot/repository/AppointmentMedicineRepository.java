package edu.ijse.layered.springboot.repository;

import edu.ijse.layered.springboot.entity.AppointmentMedicineEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AppointmentMedicineRepository extends JpaRepository<AppointmentMedicineEntity, Integer> {

    List<AppointmentMedicineEntity> findByAppointmentEntity_AppointmentId(Integer appointmentId);

}