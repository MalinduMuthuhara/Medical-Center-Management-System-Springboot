package edu.ijse.layered.springboot.service.impl;

import edu.ijse.layered.springboot.dto.DoctorDTO;
import edu.ijse.layered.springboot.entity.DepartmentEntity;
import edu.ijse.layered.springboot.entity.DoctorEntity;
import edu.ijse.layered.springboot.exceptions.CustomException;
import edu.ijse.layered.springboot.repository.DepartmentRepository;
import edu.ijse.layered.springboot.repository.DoctorRepository;
import edu.ijse.layered.springboot.service.DoctorService;
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

public class DoctorServiceImpl implements DoctorService {

    private final DoctorRepository doctorRepository ;
    private final DepartmentRepository departmentRepository ;

    @Override
    public void saveDoctor(DoctorDTO doctorDTO) throws Exception {
        log.info("Executing Method saveDoctor() ");

        try{

            Optional<DepartmentEntity>optionalDepartment = departmentRepository.findById(doctorDTO.getDepartmentId());
            if (optionalDepartment.isEmpty()){
                throw new CustomException(HttpStatus.NOT_FOUND.value(), "Can't Find Department ");
            }

            DoctorEntity doctorEntity = new DoctorEntity();
            //doctorEntity.setDoctorId(doctorDTO.getDoctorId());
            doctorEntity.setDepartmentEntity(optionalDepartment.get());
            doctorEntity.setDoctorName(doctorDTO.getDoctorName());
            doctorEntity.setSpecialization(doctorDTO.getSpecialization());
            doctorEntity.setContactNumber(doctorDTO.getContactNumber());

            doctorRepository.save(doctorEntity);
            log.info("Doctor Saved Successfully !");


        }catch (CustomException ce){
            throw ce;
        } catch (Exception e) {
            log.info("Error While Executing Method saveDoctor() " , e );
            throw new CustomException(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Doctor Save Failed ! " + e.getMessage());
        }
    }

    @Override
    public void updateDoctor(DoctorDTO doctorDTO) throws Exception {
        log.info("Executing Method updateDoctor() ");

        try {

            Optional<DepartmentEntity>optionalDepartment = departmentRepository.findById(doctorDTO.getDepartmentId());
            if (optionalDepartment.isEmpty()){
                throw new CustomException(HttpStatus.NOT_FOUND.value(), "Can't Find Department ");
            }

            Optional<DoctorEntity>optionalDoctor = doctorRepository.findById(doctorDTO.getDoctorId());
            if (optionalDoctor.isEmpty()){
                throw new CustomException(HttpStatus.NOT_FOUND.value(), "Can't Find Doctor ");
            }

            DoctorEntity doctorEntity = optionalDoctor.get();

            doctorEntity.setDepartmentEntity(optionalDepartment.get());
            doctorEntity.setDoctorName(doctorDTO.getDoctorName());
            doctorEntity.setSpecialization(doctorDTO.getSpecialization());
            doctorEntity.setContactNumber(doctorDTO.getContactNumber());

            doctorRepository.save(doctorEntity);
            log.info("Doctor Updated Successfully !");


        }catch (CustomException ce){
            throw ce;
        } catch (Exception e) {
            log.info("Error While Executing Method updateDoctor() " , e );
            throw new CustomException(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Doctor Update Failed ! " + e.getMessage()) ;
        }
    }

    @Override
    public void deleteDoctor(Integer doctorId) throws Exception {
        log.info("Executing Method deleteDoctor() ");

        try{
            if (!doctorRepository.existsById(doctorId)){
                throw new CustomException(HttpStatus.NOT_FOUND.value(), "Can Not Find Doctor ");
            }

            doctorRepository.deleteById(doctorId);
            log.info("Doctor Deleted Successfully");

        }catch (CustomException ce){throw ce;} catch (Exception e) {
            log.info("Error While Executing Method deleteDoctor() " , e);
            throw new CustomException(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Doctor Deleted Fail !" + e.getMessage());
        }
    }

    @Override
    public DoctorDTO findDoctorById(Integer doctorId) throws Exception {
       log.info("Executing Method findDoctorById() ");

       try{
           Optional<DoctorEntity>optionalDoctor = doctorRepository.findById(doctorId);
           if (optionalDoctor.isEmpty()){
               throw new CustomException(HttpStatus.NOT_FOUND.value(), "Can't Find Doctor ");
           }

           DoctorEntity doctorEntity = optionalDoctor.get();

           return new DoctorDTO(
                   doctorEntity.getDoctorId(),
                   doctorEntity.getDepartmentEntity().getDepartmentId(),
                   doctorEntity.getDoctorName(),
                   doctorEntity.getSpecialization(),
                   doctorEntity.getContactNumber()
           );

       }catch (CustomException ce){
           throw ce;
       }catch (Exception e){
           log.info("Error While Executing Method findDoctorById() " , e);
           throw new CustomException(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Can't Find a Doctor" + e.getMessage());
       }
    }

    @Override
    public List<DoctorDTO> getAllDoctors() throws Exception {

        log.info("Executing Method getAllDoctors() ");

        try{

            List<DoctorDTO>doctorDTOS = new ArrayList<>();
            List<DoctorEntity>doctorEntityList = doctorRepository.findAll();

            for(DoctorEntity doctorEntity : doctorEntityList){
                doctorDTOS.add(new DoctorDTO(
                        doctorEntity.getDoctorId(),
                        doctorEntity.getDepartmentEntity().getDepartmentId(),
                        doctorEntity.getDoctorName(),
                        doctorEntity.getSpecialization(),
                        doctorEntity.getContactNumber()
                ));
            }

            return doctorDTOS ;

        }catch (CustomException ce){
            throw ce ;
        } catch (Exception e) {
            log.info("Executing Method getAllDoctors() " , e);
            throw new CustomException(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Can't Load Doctor Table" + e.getMessage());
        }
    }
}
