package edu.ijse.layered.springboot.service;

import edu.ijse.layered.springboot.dto.DepartmentDTO;

import java.util.List;

public interface DepartmentService {

    void saveDepartment(DepartmentDTO departmentDTO) throws Exception ;
    void updateDepartment(DepartmentDTO departmentDTO) throws Exception ;
    void deleteDepartment(Integer departmentId) throws Exception ;
    DepartmentDTO findDepartmentById(Integer departmentId) throws Exception ;
    List<DepartmentDTO> getAllDepartments() throws Exception ;

}
