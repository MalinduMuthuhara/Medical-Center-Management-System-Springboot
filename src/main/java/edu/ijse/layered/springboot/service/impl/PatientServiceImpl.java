package edu.ijse.layered.springboot.service.impl;

import edu.ijse.layered.springboot.dto.PatientDTO;
import edu.ijse.layered.springboot.entity.PatientEntity;
import edu.ijse.layered.springboot.entity.WardEntity;
import edu.ijse.layered.springboot.exceptions.CustomException;
import edu.ijse.layered.springboot.repository.PatientRepository;
import edu.ijse.layered.springboot.repository.WardRepository;
import edu.ijse.layered.springboot.service.PatientService;
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

public class PatientServiceImpl implements PatientService {

    private final PatientRepository patientRepository;
    private final WardRepository wardRepository ;


    @Override
    public void savePatient(PatientDTO patientDTO) throws Exception {

        log.info("Executing Method savePatient() ");

        try{
            Optional<WardEntity>optionalWard = wardRepository.findById(patientDTO.getWardId());
            if(optionalWard.isEmpty()){
                throw new CustomException(HttpStatus.NOT_FOUND.value(), "Cannot Find Ward");
            }

            PatientEntity patientEntity = new PatientEntity();

            //patientEntity.setPatientId(patientDTO.getPatientId());
            patientEntity.setWardEntity(optionalWard.get());
            patientEntity.setPatientName(patientDTO.getPatientName());
            patientEntity.setPatientAge(patientDTO.getPatientAge());
            patientEntity.setPatientGender(patientDTO.getPatientGender());
            patientEntity.setPatientAddress(patientDTO.getPatientAddress());

            patientRepository.save(patientEntity);
            log.info("Patient Saved Successfully ");

        }catch (CustomException ce){
            throw ce ;
        } catch (Exception e) {
            log.info("Error While Executing Method savePatient() " , e );
            throw new CustomException(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Patient Saved Failed !" + e.getMessage());
        }
    }

    @Override
    public void updatePatient(PatientDTO patientDTO) throws Exception {

        log.info("Executing Method updatePatient() ");

        try{
            Optional<WardEntity>optionalWard = wardRepository.findById(patientDTO.getWardId());
            if(optionalWard.isEmpty()){
                throw new CustomException(HttpStatus.NOT_FOUND.value(), "Cannot Find Ward");
            }

            Optional<PatientEntity>optionalPatient = patientRepository.findById(patientDTO.getPatientId());
            if(optionalPatient.isEmpty()){
                throw new CustomException(HttpStatus.NOT_FOUND.value(), "Can Not Find Patient");
            }

            PatientEntity patientEntity = optionalPatient.get();

            //patientEntity.setPatientId(patientDTO.getPatientId());
            patientEntity.setWardEntity(optionalWard.get());
            patientEntity.setPatientName(patientDTO.getPatientName());
            patientEntity.setPatientAge(patientDTO.getPatientAge());
            patientEntity.setPatientGender(patientDTO.getPatientGender());
            patientEntity.setPatientAddress(patientDTO.getPatientAddress());

            patientRepository.save(patientEntity);
            log.info("Patient Updated Successfully ");
        }catch (CustomException ce){
            throw ce ;
        } catch (Exception e) {
            log.info("Error While Executing Method updatePatient() " , e);
            throw new CustomException(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Patient Updated Failed !" + e.getMessage());
        }
    }

    @Override
    public void deletePatient(Integer patientId) throws Exception {

        log.info("Executing Method deletePatient() ");

        try{

            if(!patientRepository.existsById(patientId)){
                throw new CustomException(HttpStatus.NOT_FOUND.value(), "Patient Not Found !");
            }
            patientRepository.deleteById(patientId);
            log.info("Patient Deleted Successfully ! ");

        }catch (CustomException ce){
            throw ce ;
        } catch (Exception e) {
            log.info("Error While Executing Method deletePatient() " , e);
            throw new CustomException(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Patient Deleted Failed !" + e.getMessage());
        }
    }

    @Override
    public PatientDTO findPatientById(Integer patientId) throws Exception {

        log.info("Executing Method findPatientById() ");

        try{

            Optional<PatientEntity>optionalPatient = patientRepository.findById(patientId);
            if(optionalPatient.isEmpty()){
                throw new CustomException(HttpStatus.NOT_FOUND.value(), "Can Not Find Patient");
            }

            PatientEntity patientEntity = optionalPatient.get();

            return new PatientDTO(
                    patientEntity.getPatientId(),
                    patientEntity.getWardEntity().getWardId(),
                    patientEntity.getPatientName(),
                    patientEntity.getPatientAge(),
                    patientEntity.getPatientGender(),
                    patientEntity.getPatientAddress()
            );

        }catch (CustomException ce){
            throw ce ;
        } catch (Exception e) {
            log.info("Error While Executing Method findPatientById() " , e);
            throw new CustomException(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Can Not Find Patient ! " + e.getMessage());
        }
    }

    @Override
    public List<PatientDTO> getAllPatients() throws Exception {

        log.info("Executing Method getAllPatients() ");

        try{
            List<PatientDTO>patientDTOS = new ArrayList<>();
            List<PatientEntity> patientEntityList = patientRepository.findAll();

            for(PatientEntity patientEntity : patientEntityList){
               patientDTOS.add(new PatientDTO(
                       patientEntity.getPatientId(),
                       patientEntity.getWardEntity().getWardId(),
                       patientEntity.getPatientName(),
                       patientEntity.getPatientAge(),
                       patientEntity.getPatientGender(),
                       patientEntity.getPatientAddress()

               ));
            }

            return patientDTOS ;

        }catch (CustomException ce){
            throw ce ;
        } catch (Exception e) {
            log.info("Error While Executing Method getAllPatients() " , e);
            throw new CustomException(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Can Not Load Patients ! " + e.getMessage());
        }


    }
}
