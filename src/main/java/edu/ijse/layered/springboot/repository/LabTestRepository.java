package edu.ijse.layered.springboot.repository;

import edu.ijse.layered.springboot.entity.LabTestEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LabTestRepository extends JpaRepository<LabTestEntity , Integer>{
}
