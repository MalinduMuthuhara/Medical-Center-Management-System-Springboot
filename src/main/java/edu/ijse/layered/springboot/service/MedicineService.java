package edu.ijse.layered.springboot.service;

import edu.ijse.layered.springboot.dto.MedicineDTO;

import java.util.List;

public interface MedicineService {

    void saveMedicine(MedicineDTO medicineDTO) throws Exception ;
    void updateMedicine(MedicineDTO medicineDTO) throws Exception ;
    void deleteMedicine(Integer medicineId) throws Exception ;
    MedicineDTO findMedicineById(Integer medicineId) throws Exception ;
    List<MedicineDTO> getAllMedicines() throws Exception ;

}
