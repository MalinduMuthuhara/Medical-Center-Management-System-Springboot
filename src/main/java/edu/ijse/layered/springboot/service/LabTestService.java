package edu.ijse.layered.springboot.service;

import edu.ijse.layered.springboot.dto.LabTestDTO;

import java.util.List;

public interface LabTestService {

    void saveLabTest(LabTestDTO labTestDTO) throws Exception ;
    void updateLabTest(LabTestDTO labTestDTO) throws Exception ;
    void deleteLabTest(Integer labTestId) throws Exception ;
    LabTestDTO findLabTestById(Integer labTestId) throws Exception ;
    List<LabTestDTO> getAllLabTests() throws Exception ;

}
