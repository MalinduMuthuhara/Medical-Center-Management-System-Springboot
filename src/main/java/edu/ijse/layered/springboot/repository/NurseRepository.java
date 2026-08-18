package edu.ijse.layered.springboot.repository;

import edu.ijse.layered.springboot.entity.NurseEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NurseRepository extends JpaRepository< NurseEntity , Integer > {
}
