package edu.ijse.layered.springboot.service.impl;

import edu.ijse.layered.springboot.dto.AppointmentDTO;
import edu.ijse.layered.springboot.entity.AppointmentEntity;
import edu.ijse.layered.springboot.entity.DoctorEntity;
import edu.ijse.layered.springboot.entity.PatientEntity;
import edu.ijse.layered.springboot.exceptions.CustomException;
import edu.ijse.layered.springboot.repository.AppointmentRepository;
import edu.ijse.layered.springboot.repository.DoctorRepository;
import edu.ijse.layered.springboot.repository.PatientRepository;
import edu.ijse.layered.springboot.service.AppointmentService;
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

public class AppointmentServiceImpl implements AppointmentService {

    private final AppointmentRepository appointmentRepository ;
    private final DoctorRepository doctorRepository ;
    private final PatientRepository patientRepository ;

    @Override
    public void saveAppointment(AppointmentDTO appointmentDTO) throws Exception {
        log.info("Executing Method saveAppointment()");

        try{
            Optional<DoctorEntity>optionalDoctor = doctorRepository.findById(appointmentDTO.getDoctorId());
            if (optionalDoctor.isEmpty()){
                throw new CustomException(HttpStatus.NOT_FOUND.value(), "Can Not Find Doctor");
            }

            Optional<PatientEntity>optionalPatient = patientRepository.findById(appointmentDTO.getPatientId());
            if(optionalPatient.isEmpty()){
                throw new CustomException(HttpStatus.NOT_FOUND.value(), "Can Not Find Patient");
            }

            AppointmentEntity appointmentEntity = new AppointmentEntity();
            //appointmentEntity.setAppointmentId(appointmentDTO.getAppointmentId());
            appointmentEntity.setDoctorEntity(optionalDoctor.get());
            appointmentEntity.setPatientEntity(optionalPatient.get());



            appointmentRepository.save(appointmentEntity);
            log.info("Appointment Saved Successfully ");

        }catch (CustomException ce){
            throw ce;
        }catch (Exception e){
            log.info("Error While Executing Method saveAppointment()" , e);
            throw new CustomException(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Failed To Save An Appointment " + e.getMessage()) ;
        }
    }

    @Override
    public void updateAppointment(AppointmentDTO appointmentDTO) throws Exception {
        log.info("Executing Method updateAppointment()");

        try{
            Optional<DoctorEntity>optionalDoctor = doctorRepository.findById(appointmentDTO.getDoctorId());
            if (optionalDoctor.isEmpty()){
                throw new CustomException(HttpStatus.NOT_FOUND.value(), "Can Not Find Doctor");
            }

            Optional<PatientEntity>optionalPatient = patientRepository.findById(appointmentDTO.getPatientId());
            if(optionalPatient.isEmpty()){
                throw new CustomException(HttpStatus.NOT_FOUND.value(), "Can Not Find Patient");
            }

            Optional<AppointmentEntity>optionalAppointment = appointmentRepository.findById(appointmentDTO.getAppointmentId());
            if (optionalAppointment.isEmpty()){
                throw new CustomException(HttpStatus.NOT_FOUND.value(), "Can Not Find Appointment");
            }

            AppointmentEntity appointmentEntity = optionalAppointment.get();

            //appointmentEntity.setAppointmentId(appointmentDTO.getAppointmentId());
            appointmentEntity.setDoctorEntity(optionalDoctor.get());
            appointmentEntity.setPatientEntity(optionalPatient.get());

            appointmentRepository.save(appointmentEntity);
            log.info("Appointment Updated Successfully");

        }catch (CustomException ce){
            throw ce ;
        }catch (Exception e){
            log.info("Error While Executing Executing Method updateAppointment()" , e);
            throw new CustomException(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Failed To Update Appointment" + e.getMessage());
        }
    }

    @Override
    public void deleteAppointment(Integer appointmentId) throws Exception {
        log.info("Executing Method deleteAppointment()");

        try{
            if(!appointmentRepository.existsById(appointmentId)){
                throw new CustomException(HttpStatus.NOT_FOUND.value(), "Ca Not Find");
            }

            appointmentRepository.deleteById(appointmentId);
            log.info("Appointment Deleted Successfully");

        }catch (CustomException ce){
            throw ce ;
        }catch (Exception e){
            log.info("Error While Executing Method deleteAppointment() " , e);
            throw new CustomException(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Failed To Delete Appointment " + e.getMessage());
        }
    }

    @Override
    public AppointmentDTO findAppointmentById(Integer appointmentId) throws Exception {
        log.info("Executing Method findAppointmentById()");

        try{
            Optional<AppointmentEntity>optionalAppointment = appointmentRepository.findById(appointmentId);
            if (optionalAppointment.isEmpty()){
                throw new CustomException(HttpStatus.NOT_FOUND.value(), "Can Not Find Appointment");
            }

            AppointmentEntity appointmentEntity = optionalAppointment.get();

            return new AppointmentDTO(
                    appointmentEntity.getAppointmentId(),
                    appointmentEntity.getDoctorEntity().getDoctorId(),
                    appointmentEntity.getPatientEntity().getPatientId()
            );

        }catch (CustomException ce){
            throw ce ;
        }catch (Exception e){
            log.info("Error While Executing Method findAppointmentById()" , e);
            throw new CustomException(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Appointment Not Found" + e.getMessage());
        }
    }

    @Override
    public List<AppointmentDTO> getAllAppointments() throws Exception {
       log.info("Executing Method getAllAppointments()");

       try{
           List<AppointmentDTO>appointmentDTOS = new ArrayList<>();
           List<AppointmentEntity>appointmentEntityList = appointmentRepository.findAll();

           for(AppointmentEntity appointmentEntity : appointmentEntityList){
               appointmentDTOS.add(new AppointmentDTO(
                       appointmentEntity.getAppointmentId(),
                       appointmentEntity.getDoctorEntity().getDoctorId(),
                       appointmentEntity.getPatientEntity().getPatientId()
               ));
           }

           return appointmentDTOS;
       }catch (CustomException ce){
           throw ce;
       }catch (Exception e){
           log.info("Error While Executing Method getAllAppointments()" , e);
           throw new CustomException(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Can Not Load Appointment Table" + e.getMessage());
       }
    }
}
