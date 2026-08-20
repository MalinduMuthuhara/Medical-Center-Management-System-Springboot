package edu.ijse.layered.springboot.controller;

import edu.ijse.layered.springboot.dto.DoctorDTO;
import edu.ijse.layered.springboot.service.DoctorService;
import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/doctor")
@AllArgsConstructor

public class DoctorController {

    private final DoctorService doctorService ;

    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE , consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String>saveDoctor(@RequestBody DoctorDTO doctorDTO) throws Exception {
        doctorService.saveDoctor(doctorDTO);
        return ResponseEntity.ok().body("Doctor Saved Successfully !");
    }

    @PutMapping(produces = MediaType.APPLICATION_JSON_VALUE , consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String>updateDoctor(@RequestBody DoctorDTO doctorDTO )throws Exception{
        doctorService.updateDoctor(doctorDTO);
        return ResponseEntity.ok().body("Doctor Updated Successfully !");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String>deleteDoctor(@PathVariable("id") Integer doctorId) throws Exception {
        doctorService.deleteDoctor(doctorId);
        return ResponseEntity.ok().body("Doctor Deleted Successfully ");
    }
}
