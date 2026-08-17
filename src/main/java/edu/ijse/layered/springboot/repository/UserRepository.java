package edu.ijse.layered.springboot.repository;

import edu.ijse.layered.springboot.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<Integer, UserEntity> {

    Optional<UserEntity> findByUserName(String username) throws Exception;

}
