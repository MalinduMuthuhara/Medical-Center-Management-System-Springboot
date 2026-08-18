package edu.ijse.layered.springboot.service;

import edu.ijse.layered.springboot.dto.PatientDTO;

import java.util.List;

public interface PatientService {

    void savePatient(PatientDTO patientDTO) throws Exception ;
    void updatePatient(PatientDTO patientDTO) throws Exception ;
    void deletePatient(Integer patientId) throws Exception ;
    PatientDTO findPatientById(Integer patientId) throws Exception ;
    List<PatientDTO> getAllPatients() throws Exception ;

}
