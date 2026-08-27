package edu.ijse.layered.springboot.repository;

import edu.ijse.layered.springboot.entity.MedicineSupplierEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MedicineSupplierRepository extends JpaRepository<MedicineSupplierEntity , Integer> {
}
