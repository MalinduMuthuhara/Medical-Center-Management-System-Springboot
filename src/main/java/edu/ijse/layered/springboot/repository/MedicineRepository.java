package edu.ijse.layered.springboot.repository;

import edu.ijse.layered.springboot.entity.MedicineEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MedicineRepository extends JpaRepository<MedicineEntity , Integer>{
}
