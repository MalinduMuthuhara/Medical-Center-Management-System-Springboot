package edu.ijse.layered.springboot.controller;

import edu.ijse.layered.springboot.dto.PatientDTO;
import edu.ijse.layered.springboot.service.PatientService;
import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/patient")
@AllArgsConstructor

public class PatientController {

    private final PatientService patientService ;

    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE , consumes = MediaType.APPLICATION_JSON_VALUE)
    public  ResponseEntity<String>savePatient(@RequestBody PatientDTO patientDTO) throws Exception{
        patientService.savePatient(patientDTO);
        return ResponseEntity.ok().body("Patient Saved Successfully ");
    }

    @PutMapping(produces = MediaType.APPLICATION_JSON_VALUE , consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String>updatePatient(@RequestBody PatientDTO patientDTO) throws Exception{
        patientService.updatePatient(patientDTO);
        return ResponseEntity.ok().body("Patient Updated Successfully ");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String>deletePatient(@PathVariable("id") Integer patientId) throws Exception{
        patientService.deletePatient(patientId);
        return ResponseEntity.ok().body("Patient Deleted Successfully ");
    }

    @GetMapping("/{id}")
    public ResponseEntity<PatientDTO>getPatientById(@PathVariable("id") Integer patientId) throws Exception{
        PatientDTO patientDTO = patientService.findPatientById(patientId);
        return ResponseEntity.ok().body(patientDTO);
    }

    @GetMapping
    public ResponseEntity<?>getAllPatients()throws Exception{
        List<PatientDTO> patientDTOList = patientService.getAllPatients();
        return ResponseEntity.ok().body(patientDTOList);
    }
}
