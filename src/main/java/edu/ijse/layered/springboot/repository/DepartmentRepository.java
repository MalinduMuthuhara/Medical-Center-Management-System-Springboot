package edu.ijse.layered.springboot.repository;

import edu.ijse.layered.springboot.entity.DepartmentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DepartmentRepository extends JpaRepository< DepartmentEntity , Integer > {
}
