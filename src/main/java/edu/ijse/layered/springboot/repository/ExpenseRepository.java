package edu.ijse.layered.springboot.repository;

import edu.ijse.layered.springboot.entity.ExpenseEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExpenseRepository extends JpaRepository< ExpenseEntity , Integer > {
}
