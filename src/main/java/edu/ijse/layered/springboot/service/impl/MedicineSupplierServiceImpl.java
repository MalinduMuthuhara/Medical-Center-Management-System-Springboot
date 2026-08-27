package edu.ijse.layered.springboot.service.impl;

import edu.ijse.layered.springboot.dto.MedicineSupplierDTO;
import edu.ijse.layered.springboot.entity.MedicineEntity;
import edu.ijse.layered.springboot.entity.MedicineSupplierEntity;
import edu.ijse.layered.springboot.entity.SupplierEntity;
import edu.ijse.layered.springboot.exceptions.CustomException;
import edu.ijse.layered.springboot.repository.MedicineRepository;
import edu.ijse.layered.springboot.repository.MedicineSupplierRepository;
import edu.ijse.layered.springboot.repository.SupplierRepository;
import edu.ijse.layered.springboot.service.MedicineSupplierService;
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

public class MedicineSupplierServiceImpl implements MedicineSupplierService {

    private final MedicineSupplierRepository medicineSupplierRepository;
    private final MedicineRepository medicineRepository;
    private final SupplierRepository supplierRepository;

    @Override
    public void saveMedicineSupplier(MedicineSupplierDTO medicineSupplierDTO) throws Exception {

        log.info("Execute Method saveMedicineSupplier()");

        try {

            Optional<MedicineEntity> optionalMedicine = medicineRepository.findById(medicineSupplierDTO.getMedicineId());
            if (optionalMedicine.isEmpty()) {
                throw new CustomException(HttpStatus.NOT_FOUND.value(), "Medicine Not Found");
            }

            Optional<SupplierEntity> optionalSupplier = supplierRepository.findById(medicineSupplierDTO.getSupplierId());
            if (optionalSupplier.isEmpty()) {
                throw new CustomException(HttpStatus.NOT_FOUND.value(), "Supplier Not Found");
            }

            MedicineSupplierEntity medicineSupplierEntity = new MedicineSupplierEntity();
            medicineSupplierEntity.setMedicineEntity(optionalMedicine.get());
            medicineSupplierEntity.setSupplierEntity(optionalSupplier.get());

            medicineSupplierRepository.save(medicineSupplierEntity);
            log.info("Medicine Supplier Saved Successfully ");

        } catch (CustomException ce) {
            throw ce;
        } catch (Exception e) {
            log.info("Error While Executing Method saveMedicineSupplier()", e);
            throw new CustomException(HttpStatus.INTERNAL_SERVER_ERROR.value(), "" + e.getMessage());
        }
    }

    @Override
    public void updateMedicineSupplier(MedicineSupplierDTO medicineSupplierDTO) throws Exception {

        log.info("Execute Method updateMedicineSupplier()");

        try {

            Optional<MedicineEntity> optionalMedicine = medicineRepository.findById(medicineSupplierDTO.getMedicineId());
            if (optionalMedicine.isEmpty()) {
                throw new CustomException(HttpStatus.NOT_FOUND.value(), "Medicine Not Found");
            }

            Optional<SupplierEntity> optionalSupplier = supplierRepository.findById(medicineSupplierDTO.getSupplierId());
            if (optionalSupplier.isEmpty()) {
                throw new CustomException(HttpStatus.NOT_FOUND.value(), "Supplier Not Found");
            }

            Optional<MedicineSupplierEntity> optionalMedicineSupplier = medicineSupplierRepository.findById(medicineSupplierDTO.getMedicineSupplierId());
            if (optionalMedicineSupplier.isEmpty()) {
                throw new CustomException(HttpStatus.NOT_FOUND.value(), "MedicineSupplier Not Found ");
            }

            MedicineSupplierEntity medicineSupplierEntity = optionalMedicineSupplier.get();
            medicineSupplierEntity.setMedicineEntity(optionalMedicine.get());
            medicineSupplierEntity.setSupplierEntity(optionalSupplier.get());

            medicineSupplierRepository.save(medicineSupplierEntity);
            log.info("Medicine Supplier Updated Successfully ");

        } catch (CustomException ce) {
            throw ce;
        } catch (Exception e) {
            log.info("Error While Executing Method updateMedicineSupplier()", e);
            throw new CustomException(HttpStatus.INTERNAL_SERVER_ERROR.value(), "MedicineSupplier Updated Failed " + e.getMessage());
        }
    }

    @Override
    public void deleteMedicineSupplier(Integer medicineSupplierId) throws Exception {

        log.info("Execute Method deleteMedicineSupplier()");

        try {

            if (!medicineSupplierRepository.existsById(medicineSupplierId)) {
                throw new CustomException(HttpStatus.NOT_FOUND.value(), "Can't Find MedicineSupplier");
            }

            medicineSupplierRepository.deleteById(medicineSupplierId);
            log.info("Medicine Supplier Deleted Successfully !");

        } catch (CustomException ce) {
            throw ce;
        } catch (Exception e) {
            log.info("Error While Executing Method deleteMedicineSupplier()", e);
            throw new CustomException(HttpStatus.INTERNAL_SERVER_ERROR.value(), "MedicineSupplier Deleted Failed " + e.getMessage());
        }
    }

    @Override
    public MedicineSupplierDTO findMedicineSupplierById(Integer medicineSupplierId) throws Exception {

        log.info("Executing Method findMedicineSupplierById()");

        try {
            Optional<MedicineSupplierEntity> optionalMedicineSupplier = medicineSupplierRepository.findById(medicineSupplierId);
            if (optionalMedicineSupplier.isEmpty()) {
                throw new CustomException(HttpStatus.NOT_FOUND.value(), "Can't Find MedicineSupplier");
            }

            MedicineSupplierEntity medicineSupplierEntity = optionalMedicineSupplier.get();

            return new MedicineSupplierDTO(
                    medicineSupplierEntity.getMedicineSupplierId(),
                    medicineSupplierEntity.getMedicineEntity().getMedicineId(),
                    medicineSupplierEntity.getSupplierEntity().getSupplierId(),
                    medicineSupplierEntity.getMedicineEntity().getMedicineName(),
                    medicineSupplierEntity.getSupplierEntity().getSupplierName()
            );

        } catch (CustomException ce) {
            throw ce;
        } catch (Exception e) {
            log.info("Error While Executing Method findMedicineSupplierById()", e);
            throw new CustomException(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Can't Find MedicineSupplier " + e.getMessage());
        }
    }

    @Override
    public List<MedicineSupplierDTO> getAllMedicineSuppliers() throws Exception {

        log.info("Executing Method getAllMedicineSuppliers()");

        try {
            List<MedicineSupplierDTO> medicineSupplierDTOS = new ArrayList<>();
            List<MedicineSupplierEntity> medicineSupplierEntities = medicineSupplierRepository.findAll();

            for (MedicineSupplierEntity medicineSupplierEntity : medicineSupplierEntities) {
                medicineSupplierDTOS.add(new MedicineSupplierDTO(
                        medicineSupplierEntity.getMedicineSupplierId(),
                        medicineSupplierEntity.getMedicineEntity().getMedicineId(),
                        medicineSupplierEntity.getSupplierEntity().getSupplierId(),
                        medicineSupplierEntity.getMedicineEntity().getMedicineName(),
                        medicineSupplierEntity.getSupplierEntity().getSupplierName()
                ));
            }

            return medicineSupplierDTOS;
        } catch (CustomException ce) {
            throw ce;
        } catch (Exception e) {
            log.info("Error While Executing Method getAllMedicineSuppliers()", e);
            throw new CustomException(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Can't Load MedicineSupplier Table " + e.getMessage());
        }
    }
}