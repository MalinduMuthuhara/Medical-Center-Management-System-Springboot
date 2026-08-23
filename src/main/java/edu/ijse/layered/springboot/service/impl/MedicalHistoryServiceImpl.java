package edu.ijse.layered.springboot.service.impl;

import edu.ijse.layered.springboot.dto.MedicalHistoryDTO;
import edu.ijse.layered.springboot.entity.MedicalHistoryEntity;
import edu.ijse.layered.springboot.entity.PatientEntity;
import edu.ijse.layered.springboot.exceptions.CustomException;
import edu.ijse.layered.springboot.repository.MedicalHistoryRepository;
import edu.ijse.layered.springboot.repository.PatientRepository;
import edu.ijse.layered.springboot.service.MedicalHistoryService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@AllArgsConstructor

public class MedicalHistoryServiceImpl implements MedicalHistoryService {

    private final MedicalHistoryRepository medicalHistoryRepository ;
    private final PatientRepository patientRepository ;

    @Override
    public void saveMedicalHistory(MedicalHistoryDTO medicalHistoryDTO) throws Exception {

        log.info("Executing Method saveMedicalHistory()");

        try {

            Optional<PatientEntity>optionalPatient = patientRepository.findById(medicalHistoryDTO.getPatientId());
            if (optionalPatient.isEmpty()){
                throw new CustomException(HttpStatus.NOT_FOUND.value(), "Can Not Find Patient");
            }

            MedicalHistoryEntity medicalHistoryEntity = new MedicalHistoryEntity();
            //medicalHistoryEntity.setHistoryId(medicalHistoryDTO.getHistoryId());
            medicalHistoryEntity.setPatientEntity(optionalPatient.get());
            medicalHistoryEntity.setDetails(medicalHistoryDTO.getDetails());

            medicalHistoryRepository.save(medicalHistoryEntity);
            log.info("MedicalHistory Saved Successfully");

        }catch (CustomException ce){
            throw ce;
        }catch (Exception e){
            log.info("Error While Executing Method saveMedicalHistory() " , e);
            throw new CustomException(HttpStatus.INTERNAL_SERVER_ERROR.value(), "MedicalHistory Saved Failed " + e.getMessage());
        }
    }

    @Override
    public void updateMedicalHistory(MedicalHistoryDTO medicalHistoryDTO) throws Exception {
        log.info("Executing Method updateMedicalHistory()");

        try {

            Optional<PatientEntity>optionalPatient = patientRepository.findById(medicalHistoryDTO.getPatientId());
            if (optionalPatient.isEmpty()){
                throw new CustomException(HttpStatus.NOT_FOUND.value(), "Can Not Find Patient");
            }

            Optional<MedicalHistoryEntity>optionalMedicalHistory = medicalHistoryRepository.findById(medicalHistoryDTO.getHistoryId());
            if (optionalMedicalHistory.isEmpty()){
                throw new CustomException(HttpStatus.NOT_FOUND.value(), "Can Not Find MedicalHistory");
            }

            MedicalHistoryEntity medicalHistoryEntity = optionalMedicalHistory.get();
            //medicalHistoryEntity.setHistoryId(medicalHistoryDTO.getHistoryId());
            medicalHistoryEntity.setPatientEntity(optionalPatient.get());
            medicalHistoryEntity.setDetails(medicalHistoryDTO.getDetails());

            medicalHistoryRepository.save(medicalHistoryEntity);
            log.info("MedicalHistory Updated Successfully");

        }catch (CustomException ce){
            throw ce;
        }catch (Exception e){
            log.info("Error While Executing Method updateMedicalHistory()" , e);
            throw new CustomException(HttpStatus.INTERNAL_SERVER_ERROR.value(), "MedicalHistory Updated Failed " + e.getMessage());
        }
    }

    @Override
    public void deleteMedicalHistory(Integer medicalHistoryId) throws Exception {
        log.info("Executing Method deleteMedicalHistory()");

        try {
            if (!medicalHistoryRepository.existsById(medicalHistoryId)){
                throw new CustomException(HttpStatus.NOT_FOUND.value(), "Can Not Find MedicalHistory");
            }

            medicalHistoryRepository.deleteById(medicalHistoryId);
            log.info("Medical History Deleted Successfully");

        }catch (CustomException ce){
            throw ce;
        }catch (Exception e){
            log.info("Error While Executing Method deleteMedicalHistory()" , e);
            throw new CustomException(HttpStatus.INTERNAL_SERVER_ERROR.value(), "MedicalHistory Deleted Failed " + e.getMessage());
        }
    }

    @Override
    public MedicalHistoryDTO findMedicalHistoryById(Integer medicalHistoryId) throws Exception {
        log.info("Executing Method findMedicalHistoryById()");

        try {

            Optional<MedicalHistoryEntity>optionalMedicalHistory = medicalHistoryRepository.findById(medicalHistoryId);
            if (optionalMedicalHistory.isEmpty()){
                throw new CustomException(HttpStatus.NOT_FOUND.value(), "Can Not Find MedicalHistory ");
            }

            MedicalHistoryEntity medicalHistoryEntity = optionalMedicalHistory.get();

            return new MedicalHistoryDTO(
                    medicalHistoryEntity.getHistoryId(),
                    medicalHistoryEntity.getPatientEntity().getPatientId(),
                    medicalHistoryEntity.getDetails()
            );

        }catch (CustomException ce){
            throw ce;
        }catch (Exception e){
            log.info("Error While Executing Method findMedicalHistoryById()" , e);
            throw new CustomException(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Can't Find Medical History " + e.getMessage());
        }
    }

    @Override
    public List<MedicalHistoryDTO> getAllMedicalHistories() throws Exception {
        log.info("Executing Method getAllMedicalHistories()");

        try {
            List<MedicalHistoryDTO>medicalHistoryDTOS = new ArrayList<>();
            List<MedicalHistoryEntity>medicalHistoryEntities = medicalHistoryRepository.findAll();

            for(MedicalHistoryEntity medicalHistoryEntity : medicalHistoryEntities){

                medicalHistoryDTOS.add(new MedicalHistoryDTO(
                        medicalHistoryEntity.getHistoryId(),
                        medicalHistoryEntity.getPatientEntity().getPatientId(),
                        medicalHistoryEntity.getDetails()
                ));
            }
            return medicalHistoryDTOS ;

        }catch (CustomException ce){
            throw ce;
        }catch (Exception e){
            log.info("Error While Executing Method getAllMedicalHistories()" , e);
            throw new CustomException(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Can Not Load MedicalHistory Table " + e.getMessage());
        }
    }
}
