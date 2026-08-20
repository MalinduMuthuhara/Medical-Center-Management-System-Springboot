package edu.ijse.layered.springboot.service.impl;

import edu.ijse.layered.springboot.dto.NurseDTO;
import edu.ijse.layered.springboot.entity.DepartmentEntity;
import edu.ijse.layered.springboot.entity.NurseEntity;
import edu.ijse.layered.springboot.exceptions.CustomException;
import edu.ijse.layered.springboot.repository.DepartmentRepository;
import edu.ijse.layered.springboot.repository.NurseRepository;
import edu.ijse.layered.springboot.service.NurseService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
@Slf4j

public class NurseServiceImpl implements NurseService {

    private final NurseRepository nurseRepository ;
    private final DepartmentRepository departmentRepository ;

    @Override
    public void saveNurse(NurseDTO nurseDTO) throws Exception {
        log.info("Execute Method Save Nurse ");

        try{

            Optional<DepartmentEntity>optionalDepartment = departmentRepository.findById(nurseDTO.getDepartmentId());
            if (optionalDepartment.isEmpty()){
                throw new CustomException(HttpStatus.NOT_FOUND.value(), "Can't Find Department");
            }

            NurseEntity nurseEntity = new NurseEntity();
            //nurseEntity.setNurseId(nurseDTO.getNurseId());
            nurseEntity.setDepartmentEntity(optionalDepartment.get());
            nurseEntity.setNurseName(nurseDTO.getNurseName());
            nurseEntity.setContactNumber(nurseDTO.getContactNumber());

            nurseRepository.save(nurseEntity);
            log.info("Nurse Saved Successfully !");

        }catch (CustomException ce){
            throw ce;
        }catch (Exception e){
            log.info("Error While Executing Method saveNurse() " , e);
            throw new CustomException(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Nurse Save Failed !" + e.getMessage());
        }
    }

    @Override
    public void updateNurse(NurseDTO nurseDTO) throws Exception {

        log.info("Executing Method updateNurse()");

        try{

            Optional<DepartmentEntity>optionalDepartment = departmentRepository.findById(nurseDTO.getDepartmentId());
            if (optionalDepartment.isEmpty()){
                throw new CustomException(HttpStatus.NOT_FOUND.value(), "Department Not Found ");
            }

            Optional<NurseEntity>optionalNurse = nurseRepository.findById(nurseDTO.getNurseId());
            if (optionalNurse.isEmpty()){
                throw new CustomException(HttpStatus.NOT_FOUND.value(), "Nurse Not Found ");
            }

            NurseEntity nurseEntity = optionalNurse.get();
            nurseEntity.setDepartmentEntity(optionalDepartment.get());
            nurseEntity.setNurseName(nurseDTO.getNurseName());
            nurseEntity.setContactNumber(nurseDTO.getContactNumber());

            nurseRepository.save(nurseEntity);
            log.info("Nurse Updated Successfully !");


        }catch (CustomException ce){
            throw ce ;
        }catch (Exception e) {
            log.info("Error While Executing Method updateNurse()" ,e );
            throw new CustomException(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Error While Executing Method updateNurse()" + e.getMessage());
        }

    }

    @Override
    public void deleteNurse(Integer nurseId) throws Exception {
        log.info("Executing Method deleteNurse()");

        try{

            if(!nurseRepository.existsById(nurseId)){
                throw new CustomException(HttpStatus.NOT_FOUND.value(), "Can't Find Nurse Id !" );
            }

            nurseRepository.deleteById(nurseId);
            log.info("Nurse Deleted Successfully !");

        }catch(CustomException ce){
            throw ce;
        }catch (Exception e) {
            log.info("Error While Executing Method deleteNurse()" , e);
            throw new CustomException(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Nurse Not Found " + e.getMessage());
        }
    }

    @Override
    public NurseDTO findNurseById(Integer nurseId) throws Exception {
        log.info("Executing Method findNurseById()");

        try {
            Optional<NurseEntity>optionalNurse = nurseRepository.findById(nurseId);
            if (optionalNurse.isEmpty()){
                throw new CustomException(HttpStatus.NOT_FOUND.value(), "Nurse Not Found ");
            }

            NurseEntity nurseEntity = optionalNurse.get();
            return new NurseDTO(
                    nurseEntity.getNurseId(),
                    nurseEntity.getDepartmentEntity().getDepartmentId(),
                    nurseEntity.getNurseName(),
                    nurseEntity.getContactNumber()
            );

        }catch(CustomException ce){
            throw ce;
        }catch (Exception e) {
            log.info("Error While Executing Method findNurseById()" , e);
            throw new CustomException(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Nurse Not Found " + e.getMessage());
        }
    }

    @Override
    public List<NurseDTO> getAllNurses() throws Exception {
        log.info("Executing Method getAllNurses()");

        try{
            List<NurseDTO>nurseDTOS = new ArrayList<>();
            List<NurseEntity>nurseEntityList = nurseRepository.findAll();

            for (NurseEntity nurseEntity :nurseEntityList){
               nurseDTOS.add(new NurseDTO(
                       nurseEntity.getNurseId(),
                       nurseEntity.getDepartmentEntity().getDepartmentId(),
                       nurseEntity.getNurseName(),
                       nurseEntity.getContactNumber()
               ));
            }

            return nurseDTOS;

        }catch(CustomException ce){
            throw ce;
        }catch (Exception e) {
            log.info("Error While Executing Method getAllNurses()" , e );
            throw new CustomException(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Can't Load Nurse Table " + e.getMessage());
        }
    }
}
