package edu.ijse.layered.springboot.repository;

import edu.ijse.layered.springboot.entity.AppointmentMedicineEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AppointmentMedicineRepository extends JpaRepository<AppointmentMedicineEntity , Integer>{
}
