package edu.ijse.layered.springboot.service;

import edu.ijse.layered.springboot.dto.DepartmentDTO;
import edu.ijse.layered.springboot.dto.WardDTO;

import java.util.List;

public interface WardService {

    void saveWard(WardDTO wardDTO) throws Exception ;
    void updateWard(WardDTO wardDTO) throws Exception ;
    void deleteWard(Integer wardId) throws Exception ;
    WardDTO findWardById(Integer wardId) throws Exception ;
    List<WardDTO> getAllWards() throws Exception ;

}
