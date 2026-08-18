package edu.ijse.layered.springboot.repository;

import edu.ijse.layered.springboot.entity.PaymentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PaymentRepository extends JpaRepository<PaymentEntity , Integer>{
}
