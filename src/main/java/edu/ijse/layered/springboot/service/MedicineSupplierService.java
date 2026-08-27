package edu.ijse.layered.springboot.service;

import edu.ijse.layered.springboot.dto.MedicineSupplierDTO;

import java.util.List;

public interface MedicineSupplierService {

    void saveMedicineSupplier(MedicineSupplierDTO medicineSupplierDTO) throws Exception;
    void updateMedicineSupplier(MedicineSupplierDTO medicineSupplierDTO) throws Exception;
    void deleteMedicineSupplier(Integer medicineSupplierId) throws Exception;
    MedicineSupplierDTO findMedicineSupplierById(Integer medicineSupplierId) throws Exception;
    List<MedicineSupplierDTO> getAllMedicineSuppliers() throws Exception;

}