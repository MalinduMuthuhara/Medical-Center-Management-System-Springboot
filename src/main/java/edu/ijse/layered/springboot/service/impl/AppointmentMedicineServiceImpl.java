package edu.ijse.layered.springboot.service.impl;

import edu.ijse.layered.springboot.dto.AppointmentMedicineDTO;
import edu.ijse.layered.springboot.entity.AppointmentEntity;
import edu.ijse.layered.springboot.entity.AppointmentMedicineEntity;
import edu.ijse.layered.springboot.entity.MedicineEntity;
import edu.ijse.layered.springboot.exceptions.CustomException;
import edu.ijse.layered.springboot.repository.AppointmentMedicineRepository;
import edu.ijse.layered.springboot.repository.AppointmentRepository;
import edu.ijse.layered.springboot.repository.MedicineRepository;
import edu.ijse.layered.springboot.service.AppointmentMedicineService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@AllArgsConstructor

public class AppointmentMedicineServiceImpl implements AppointmentMedicineService {

    private final AppointmentMedicineRepository appointmentMedicineRepository;
    private final AppointmentRepository appointmentRepository;
    private final MedicineRepository medicineRepository;

    @Override
    @Transactional
    public void saveAppointmentMedicine(AppointmentMedicineDTO appointmentMedicineDTO) throws Exception {

        log.info("Execute Method saveAppointmentMedicine()");

        try {

            Optional<AppointmentEntity> optionalAppointment = appointmentRepository.findById(appointmentMedicineDTO.getAppointmentId());
            if (optionalAppointment.isEmpty()) {
                throw new CustomException(HttpStatus.NOT_FOUND.value(), "Appointment Not Found");
            }

            Optional<MedicineEntity> optionalMedicine = medicineRepository.findById(appointmentMedicineDTO.getMedicineId());
            if (optionalMedicine.isEmpty()) {
                throw new CustomException(HttpStatus.NOT_FOUND.value(), "Medicine Not Found");
            }

            MedicineEntity medicineEntity = optionalMedicine.get();
            int requestedQuantity = appointmentMedicineDTO.getQuantity();

            // Check stock availability
            if (medicineEntity.getMedicineQuantity() < requestedQuantity) {
                throw new CustomException(HttpStatus.BAD_REQUEST.value(),
                        "Not Enough Medicine Stock! Available: " + medicineEntity.getMedicineQuantity());
            }

            AppointmentMedicineEntity appointmentMedicineEntity = new AppointmentMedicineEntity();
            appointmentMedicineEntity.setAppointmentEntity(optionalAppointment.get());
            appointmentMedicineEntity.setMedicineEntity(medicineEntity);
            appointmentMedicineEntity.setQuantity(requestedQuantity);

            appointmentMedicineRepository.save(appointmentMedicineEntity);

            // Deduct stock from Medicine table
            medicineEntity.setMedicineQuantity(medicineEntity.getMedicineQuantity() - requestedQuantity);
            medicineRepository.save(medicineEntity);

            log.info("Appointment Medicine Saved Successfully ");

        } catch (CustomException ce) {
            throw ce;
        } catch (Exception e) {
            log.info("Error While Executing Method saveAppointmentMedicine()", e);
            throw new CustomException(HttpStatus.INTERNAL_SERVER_ERROR.value(), "AppointmentMedicine Saved Failed " + e.getMessage());
        }
    }

    @Override
    @Transactional
    public void updateAppointmentMedicine(AppointmentMedicineDTO appointmentMedicineDTO) throws Exception {

        log.info("Execute Method updateAppointmentMedicine()");

        try {

            Optional<AppointmentMedicineEntity> optionalAppointmentMedicine = appointmentMedicineRepository.findById(appointmentMedicineDTO.getAppointmentMedicineId());
            if (optionalAppointmentMedicine.isEmpty()) {
                throw new CustomException(HttpStatus.NOT_FOUND.value(), "AppointmentMedicine Not Found");
            }

            Optional<AppointmentEntity> optionalAppointment = appointmentRepository.findById(appointmentMedicineDTO.getAppointmentId());
            if (optionalAppointment.isEmpty()) {
                throw new CustomException(HttpStatus.NOT_FOUND.value(), "Appointment Not Found");
            }

            Optional<MedicineEntity> optionalNewMedicine = medicineRepository.findById(appointmentMedicineDTO.getMedicineId());
            if (optionalNewMedicine.isEmpty()) {
                throw new CustomException(HttpStatus.NOT_FOUND.value(), "Medicine Not Found");
            }

            AppointmentMedicineEntity appointmentMedicineEntity = optionalAppointmentMedicine.get();

            MedicineEntity oldMedicineEntity = appointmentMedicineEntity.getMedicineEntity();
            int oldQuantity = appointmentMedicineEntity.getQuantity();

            MedicineEntity newMedicineEntity = optionalNewMedicine.get();
            int newQuantity = appointmentMedicineDTO.getQuantity();

            if (oldMedicineEntity.getMedicineId() == newMedicineEntity.getMedicineId()) {

                // Same medicine - restore old quantity first, then check against new requested quantity
                int availableAfterRestore = oldMedicineEntity.getMedicineQuantity() + oldQuantity;

                if (availableAfterRestore < newQuantity) {
                    throw new CustomException(HttpStatus.BAD_REQUEST.value(),
                            "Not Enough Medicine Stock! Available: " + availableAfterRestore);
                }

                oldMedicineEntity.setMedicineQuantity(availableAfterRestore - newQuantity);
                medicineRepository.save(oldMedicineEntity);

            } else {

                // Different medicine - restore stock to old medicine
                oldMedicineEntity.setMedicineQuantity(oldMedicineEntity.getMedicineQuantity() + oldQuantity);
                medicineRepository.save(oldMedicineEntity);

                // Deduct stock from new medicine
                if (newMedicineEntity.getMedicineQuantity() < newQuantity) {
                    throw new CustomException(HttpStatus.BAD_REQUEST.value(),
                            "Not Enough Medicine Stock! Available: " + newMedicineEntity.getMedicineQuantity());
                }

                newMedicineEntity.setMedicineQuantity(newMedicineEntity.getMedicineQuantity() - newQuantity);
                medicineRepository.save(newMedicineEntity);
            }

            appointmentMedicineEntity.setAppointmentEntity(optionalAppointment.get());
            appointmentMedicineEntity.setMedicineEntity(newMedicineEntity);
            appointmentMedicineEntity.setQuantity(newQuantity);

            appointmentMedicineRepository.save(appointmentMedicineEntity);
            log.info("Appointment Medicine Updated Successfully ");

        } catch (CustomException ce) {
            throw ce;
        } catch (Exception e) {
            log.info("Error While Executing Method updateAppointmentMedicine()", e);
            throw new CustomException(HttpStatus.INTERNAL_SERVER_ERROR.value(), "AppointmentMedicine Updated Failed " + e.getMessage());
        }
    }

    @Override
    @Transactional
    public void deleteAppointmentMedicine(Integer appointmentMedicineId) throws Exception {

        log.info("Execute Method deleteAppointmentMedicine()");

        try {

            Optional<AppointmentMedicineEntity> optionalAppointmentMedicine = appointmentMedicineRepository.findById(appointmentMedicineId);
            if (optionalAppointmentMedicine.isEmpty()) {
                throw new CustomException(HttpStatus.NOT_FOUND.value(), "Can't Find AppointmentMedicine");
            }

            AppointmentMedicineEntity appointmentMedicineEntity = optionalAppointmentMedicine.get();
            MedicineEntity medicineEntity = appointmentMedicineEntity.getMedicineEntity();

            // Restore stock back to Medicine table
            medicineEntity.setMedicineQuantity(medicineEntity.getMedicineQuantity() + appointmentMedicineEntity.getQuantity());
            medicineRepository.save(medicineEntity);

            appointmentMedicineRepository.deleteById(appointmentMedicineId);
            log.info("Appointment Medicine Deleted Successfully !");

        } catch (CustomException ce) {
            throw ce;
        } catch (Exception e) {
            log.info("Error While Executing Method deleteAppointmentMedicine()", e);
            throw new CustomException(HttpStatus.INTERNAL_SERVER_ERROR.value(), "AppointmentMedicine Deleted Failed " + e.getMessage());
        }
    }

    @Override
    public AppointmentMedicineDTO getAppointmentMedicineById(Integer appointmentMedicineId) throws Exception {

        log.info("Execute Method getAppointmentMedicineById()");

        try {

            Optional<AppointmentMedicineEntity> optionalAppointmentMedicine = appointmentMedicineRepository.findById(appointmentMedicineId);
            if (optionalAppointmentMedicine.isEmpty()) {
                throw new CustomException(HttpStatus.NOT_FOUND.value(), "Can't Find AppointmentMedicine");
            }

            AppointmentMedicineEntity appointmentMedicineEntity = optionalAppointmentMedicine.get();

            return new AppointmentMedicineDTO(
                    appointmentMedicineEntity.getAppointmentMedicineId(),
                    appointmentMedicineEntity.getAppointmentEntity().getAppointmentId(),
                    appointmentMedicineEntity.getMedicineEntity().getMedicineId(),
                    appointmentMedicineEntity.getMedicineEntity().getMedicineName(),
                    appointmentMedicineEntity.getQuantity()
            );

        } catch (CustomException ce) {
            throw ce;
        } catch (Exception e) {
            log.info("Error While Executing Method getAppointmentMedicineById()", e);
            throw new CustomException(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Can't Find AppointmentMedicine " + e.getMessage());
        }
    }

    @Override
    public List<AppointmentMedicineDTO> getAllAppointmentMedicine() throws Exception {

        log.info("Execute Method getAllAppointmentMedicine()");

        try {

            List<AppointmentMedicineDTO> appointmentMedicineDTOS = new ArrayList<>();
            List<AppointmentMedicineEntity> appointmentMedicineEntities = appointmentMedicineRepository.findAll();

            for (AppointmentMedicineEntity appointmentMedicineEntity : appointmentMedicineEntities) {
                appointmentMedicineDTOS.add(new AppointmentMedicineDTO(
                        appointmentMedicineEntity.getAppointmentMedicineId(),
                        appointmentMedicineEntity.getAppointmentEntity().getAppointmentId(),
                        appointmentMedicineEntity.getMedicineEntity().getMedicineId(),
                        appointmentMedicineEntity.getMedicineEntity().getMedicineName(),
                        appointmentMedicineEntity.getQuantity()
                ));
            }

            return appointmentMedicineDTOS;

        } catch (CustomException ce) {
            throw ce;
        } catch (Exception e) {
            log.info("Error While Executing Method getAllAppointmentMedicine()", e);
            throw new CustomException(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Can't Load AppointmentMedicine Table " + e.getMessage());
        }
    }
}