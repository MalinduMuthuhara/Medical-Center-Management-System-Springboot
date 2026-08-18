package edu.ijse.layered.springboot.service;

import edu.ijse.layered.springboot.dto.DoctorDTO;

import java.util.List;

public interface DoctorService {

    void saveDoctor(DoctorDTO doctorDTO) throws Exception ;
    void updateDoctor(DoctorDTO doctorDTO) throws Exception ;
    void deleteDoctor(Integer doctorId) throws Exception ;
    DoctorDTO findDoctorById(Integer doctorId) throws Exception;
    List<DoctorDTO> getAllDoctors() throws Exception ;

}
