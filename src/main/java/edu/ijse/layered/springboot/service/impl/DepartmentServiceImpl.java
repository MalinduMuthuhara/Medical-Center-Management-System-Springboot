package edu.ijse.layered.springboot.service.impl;

import edu.ijse.layered.springboot.dto.DepartmentDTO;
import edu.ijse.layered.springboot.entity.DepartmentEntity;
import edu.ijse.layered.springboot.exceptions.CustomException;
import edu.ijse.layered.springboot.repository.DepartmentRepository;
import edu.ijse.layered.springboot.service.DepartmentService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@AllArgsConstructor

public class DepartmentServiceImpl implements DepartmentService {

    private final DepartmentRepository departmentRepository ;

    @Override
    public void saveDepartment(DepartmentDTO departmentDTO) throws Exception {

        log.info("Execute Method Save Department ! ");

        try{

            DepartmentEntity departmentEntity = new DepartmentEntity() ;

            //departmentEntity.setDepartmentId(departmentDTO.getDepartmentId());
            departmentEntity.setDepartmentName(departmentDTO.getDepartmentName());
            departmentEntity.setDepartmentLocation(departmentDTO.getDepartmentLocation());

            departmentRepository.save(departmentEntity);
            log.info("Department Saved Successfully ! ");

        } catch (Exception e) {
            log.info("Error While Saving Department " , e);
            throw new CustomException(HttpStatus.INTERNAL_SERVER_ERROR.value() , "Fail To Save Department !" + e.getMessage());
        }
    }

    @Override
    public void updateDepartment(DepartmentDTO departmentDTO) throws Exception {

        log.info("Executing Method Update Department !");

        try{
            Optional<DepartmentEntity>optionalDepartment = departmentRepository.findById(departmentDTO.getDepartmentId());

            if(optionalDepartment.isEmpty()){
                throw new CustomException(HttpStatus.NOT_FOUND.value() , "Department Not Found !");
            }

            DepartmentEntity departmentEntity = optionalDepartment.get();
            departmentEntity.setDepartmentName(departmentDTO.getDepartmentName());
            departmentEntity.setDepartmentLocation(departmentDTO.getDepartmentLocation());

            departmentRepository.save(departmentEntity);
            log.info("Department Updated Successfully !");

        } catch (Exception e) {
            log.info("Error While Updating Department ! " , e );
            throw new CustomException(HttpStatus.INTERNAL_SERVER_ERROR.value(),"Department Update Failed " + e.getMessage() );
        }
    }

    @Override
    public void deleteDepartment(Integer departmentId) throws Exception {

        log.info("Executing Method Delete Department");

        try {

            if(!departmentRepository.existsById(departmentId)){
                throw new CustomException(HttpStatus.NOT_FOUND.value(), "Department Not Found !" );
            }

            departmentRepository.deleteById(departmentId);
            log.info("Department Deleted Successfully !");

        } catch (Exception e) {
            log.info("Error While Deleting Department " , e);
            throw new CustomException(HttpStatus.INTERNAL_SERVER_ERROR.value() , "Department Delete Failed " + e.getMessage());
        }
    }

    @Override
    public DepartmentDTO findDepartmentById(Integer departmentId) throws Exception {

        log.info("Executing Method Find Department By Id");

        try{

            Optional<DepartmentEntity> optionalDepartment = departmentRepository.findById(departmentId);

            if (optionalDepartment.isEmpty()){
                throw  new CustomException(HttpStatus.NOT_FOUND.value(), "Department Not Found !");
            }

            DepartmentEntity departmentEntity = optionalDepartment.get();

            return new DepartmentDTO(
                    departmentEntity.getDepartmentId(),
                    departmentEntity.getDepartmentName(),
                    departmentEntity.getDepartmentLocation()
            );

        } catch (Exception e) {
            log.info("Error While Finding Department ");
            throw new CustomException(HttpStatus.NOT_FOUND.value(), "Department Not Found !" + e.getMessage());
        }
    }

    @Override
    public List<DepartmentDTO> getAllDepartments() throws Exception {

       log.info("Executing Method get All Departments");

       try{
           List<DepartmentDTO>departmentDTOS = new ArrayList<>();
           List<DepartmentEntity> departmentList= departmentRepository.findAll();

           for(DepartmentEntity departmentEntity : departmentList){

               departmentDTOS.add(new DepartmentDTO(
                     departmentEntity.getDepartmentId(),
                     departmentEntity.getDepartmentName(),
                     departmentEntity.getDepartmentLocation()
               ));
           }

           return departmentDTOS;

       } catch (Exception e) {
           log.info("Error While Finding Department");
           throw new CustomException(HttpStatus.NOT_FOUND.value(), "Can't Load Deapartment Table" + e.getMessage());
       }

    }
}
