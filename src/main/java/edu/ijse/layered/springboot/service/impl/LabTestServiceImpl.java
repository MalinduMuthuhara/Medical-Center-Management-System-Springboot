package edu.ijse.layered.springboot.service.impl;

import edu.ijse.layered.springboot.dto.LabTestDTO;
import edu.ijse.layered.springboot.entity.AppointmentEntity;
import edu.ijse.layered.springboot.entity.LabTestEntity;
import edu.ijse.layered.springboot.exceptions.CustomException;
import edu.ijse.layered.springboot.repository.AppointmentRepository;
import edu.ijse.layered.springboot.repository.LabTestRepository;
import edu.ijse.layered.springboot.service.LabTestService;
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

public class LabTestServiceImpl implements LabTestService {

    private final LabTestRepository labTestRepository;
    private final AppointmentRepository appointmentRepository ;

    @Override
    public void saveLabTest(LabTestDTO labTestDTO) throws Exception {

        log.info("Execute Method saveLabTest() ");

        try{
            Optional<AppointmentEntity>optionalAppointment = appointmentRepository.findById(labTestDTO.getAppointmentId());
            if(optionalAppointment.isEmpty()){
                throw  new CustomException(HttpStatus.NOT_FOUND.value(), "Can Not Find Appointment Id ");
            }


            LabTestEntity labTestEntity = new LabTestEntity();
            //labTestEntity.setLabTestId(labTestDTO.getLabTestId());
            labTestEntity.setAppointmentEntity(optionalAppointment.get());
            labTestEntity.setTestName(labTestDTO.getTestName());
            labTestEntity.setResult(labTestDTO.getResult());
            labTestEntity.setTestDate(labTestDTO.getTestDate());

            labTestRepository.save(labTestEntity);
            log.info("LabTest Saved Successfully ");

        }catch (CustomException  ce){
            throw ce ;
        } catch (Exception e) {
            log.info("Error While Executing Method saveLabTest() ");
            throw new CustomException(HttpStatus.INTERNAL_SERVER_ERROR.value(), "LabTest Saved Failed " + e.getMessage());
        }
    }

    @Override
    public void updateLabTest(LabTestDTO labTestDTO) throws Exception {
        log.info("Execute Method updateLabTest() ");

        try{

            Optional<AppointmentEntity>optionalAppointment = appointmentRepository.findById(labTestDTO.getAppointmentId());
            if(optionalAppointment.isEmpty()){
                throw  new CustomException(HttpStatus.NOT_FOUND.value(), "Can Not Find Appointment Id ");
            }

            Optional<LabTestEntity>optionalLabTest = labTestRepository.findById(labTestDTO.getLabTestId());
            if(optionalLabTest.isEmpty()){
                throw  new CustomException(HttpStatus.NOT_FOUND.value(), "Can Not Find LabTest Id ");
            }

            LabTestEntity labTestEntity = new LabTestEntity();
            //labTestEntity.setLabTestId(labTestDTO.getLabTestId());
            labTestEntity.setAppointmentEntity(optionalAppointment.get());
            labTestEntity.setTestName(labTestDTO.getTestName());
            labTestEntity.setResult(labTestDTO.getResult());
            labTestEntity.setTestDate(labTestDTO.getTestDate());

            labTestRepository.save(labTestEntity);
            log.info("LabTest Updated Successfully ");

        }catch (CustomException  ce){
            throw ce ;
        } catch (Exception e) {
            log.info("Error While Executing Method updateLabTest() ");
            throw new CustomException(HttpStatus.INTERNAL_SERVER_ERROR.value(), "LabTest Updated Failed " + e.getMessage());
        }
    }

    @Override
    public void deleteLabTest(Integer labTestId) throws Exception {
        log.info("Execute Method deleteLabTest() ");

        try{
            if(!labTestRepository.existsById(labTestId)){
                throw new CustomException(HttpStatus.NOT_FOUND.value(), "Can't Find LabTest");
            }

            labTestRepository.deleteById(labTestId);
            log.info("Lab Test Deleted Successfully ");

        }catch (CustomException  ce){
            throw ce ;
        } catch (Exception e) {
            log.info("Error While Executing Method deleteLabTest() ");
            throw new CustomException(HttpStatus.INTERNAL_SERVER_ERROR.value(), "LabTest Deleted Failed " + e.getMessage());
        }
    }

    @Override
    public LabTestDTO findLabTestById(Integer labTestId) throws Exception {
        log.info("Execute Method findLabTestById() ");

        try{
            Optional<LabTestEntity>optionalLabTest = labTestRepository.findById(labTestId);
            if(optionalLabTest.isEmpty()){
                throw  new CustomException(HttpStatus.NOT_FOUND.value(), "Can Not Find LabTest Id ");
            }
            LabTestEntity labTestEntity = optionalLabTest.get();

            return new LabTestDTO(
                    labTestEntity.getLabTestId(),
                    labTestEntity.getAppointmentEntity().getAppointmentId(),
                    labTestEntity.getTestName(),
                    labTestEntity.getResult(),
                    labTestEntity.getTestDate()
            );

        }catch (CustomException  ce){
            throw ce ;
        } catch (Exception e) {
            log.info("Error While Executing Method findLabTestById() ");
            throw new CustomException(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Can't Find LabTest " + e.getMessage());
        }
    }

    @Override
    public List<LabTestDTO> getAllLabTests() throws Exception {
        log.info("Execute Method getAllLabTests() ");

        try{
            List<LabTestDTO>labTestDTOS = new ArrayList<>();
            List<LabTestEntity>labTestEntities = labTestRepository.findAll();

            for(LabTestEntity labTestEntity : labTestEntities){

                labTestDTOS.add(new LabTestDTO(
                        labTestEntity.getLabTestId(),
                        labTestEntity.getAppointmentEntity().getAppointmentId(),
                        labTestEntity.getTestName(),
                        labTestEntity.getResult(),
                        labTestEntity.getTestDate()
                ));
            }

            return labTestDTOS;

        }catch (CustomException  ce){
            throw ce ;
        } catch (Exception e) {
            log.info("Error While Executing Method getAllLabTests() ");
            throw new CustomException(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Can't Load LabTest Table " + e.getMessage());
        }
    }
}
