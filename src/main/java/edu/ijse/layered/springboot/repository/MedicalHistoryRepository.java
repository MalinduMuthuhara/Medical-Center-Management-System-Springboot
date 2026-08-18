package edu.ijse.layered.springboot.repository;

import edu.ijse.layered.springboot.entity.MedicalHistoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MedicalHistoryRepository extends JpaRepository<MedicalHistoryEntity , Integer>{
}
