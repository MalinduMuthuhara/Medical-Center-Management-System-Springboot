package edu.ijse.layered.springboot.controller;

import edu.ijse.layered.springboot.dto.DepartmentDTO;
import edu.ijse.layered.springboot.service.DepartmentService;
import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/v1/department")
@AllArgsConstructor

public class DepartmentController {

    private final DepartmentService departmentService ;

    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE , consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> saveDepartment(@RequestBody DepartmentDTO departmentDTO) throws Exception{
        departmentService.saveDepartment(departmentDTO);
        return ResponseEntity.ok().body("Department Saved Successfully !");
    }

    @PutMapping(produces = MediaType.APPLICATION_JSON_VALUE , consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> updateDepartment(@RequestBody DepartmentDTO departmentDTO)throws Exception{
        departmentService.updateDepartment(departmentDTO);
        return ResponseEntity.ok().body("Department Updated Successfully !");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String>deleteDepartment(@PathVariable("id") Integer departmentId) throws Exception{
        departmentService.deleteDepartment(departmentId);
        return ResponseEntity.ok().body("Department Deleted Successfully");
    }

    @GetMapping("/{id}")
    public ResponseEntity<DepartmentDTO>findDepartmentById(@PathVariable("id") Integer departmentId) throws Exception{
        DepartmentDTO departmentDTO = departmentService.findDepartmentById(departmentId);
        return ResponseEntity.ok().body(departmentDTO);
    }

    @GetMapping
    public ResponseEntity<?>getAllDepartments() throws Exception{
        List<DepartmentDTO> departmentDTOS = departmentService.getAllDepartments();
        return ResponseEntity.ok().body(departmentDTOS);
    }
}
