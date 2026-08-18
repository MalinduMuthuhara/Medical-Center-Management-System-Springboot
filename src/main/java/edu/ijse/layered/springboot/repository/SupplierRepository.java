package edu.ijse.layered.springboot.repository;

import edu.ijse.layered.springboot.entity.SupplierEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SupplierRepository extends JpaRepository<SupplierEntity , Integer>{
}
