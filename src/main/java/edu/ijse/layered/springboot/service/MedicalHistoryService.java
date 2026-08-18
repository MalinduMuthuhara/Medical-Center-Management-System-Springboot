package edu.ijse.layered.springboot.service;

import edu.ijse.layered.springboot.dto.MedicalHistoryDTO;

import java.util.List;

public interface MedicalHistoryService {

    void saveMedicalHistory(MedicalHistoryDTO medicalHistoryDTO) throws Exception ;
    void updateMedicalHistory(MedicalHistoryDTO medicalHistoryDTO) throws Exception ;
    void deleteMedicalHistory(Integer medicalHistoryId) throws Exception ;
    MedicalHistoryDTO findMedicalHistoryById(Integer medicalHistoryId) throws Exception ;
    List<MedicalHistoryDTO> getAllMedicalHistories() throws Exception ;

}
