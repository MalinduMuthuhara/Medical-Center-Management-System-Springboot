package edu.ijse.layered.springboot.service;

import edu.ijse.layered.springboot.dto.NurseDTO;

import java.util.List;

public interface NurseService {

    void saveNurse(NurseDTO nurseDTO) throws Exception ;
    void updateNurse(NurseDTO nurseDTO) throws Exception ;
    void deleteNurse(Integer nurseId) throws Exception ;
    NurseDTO findNurseById(Integer nurseId) throws Exception ;
    List<NurseDTO> getAllNurses() throws Exception ;

}
