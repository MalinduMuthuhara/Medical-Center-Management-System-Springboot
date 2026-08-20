package edu.ijse.layered.springboot.controller;

import edu.ijse.layered.springboot.dto.NurseDTO;
import edu.ijse.layered.springboot.service.NurseService;
import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping(value = "/api/v1/nurse")
@AllArgsConstructor

public class NurseController {

    private final NurseService nurseService;

    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE , consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String>saveNurse(@RequestBody NurseDTO nurseDTO) throws Exception{
        nurseService.saveNurse(nurseDTO);
        return ResponseEntity.ok().body("Nurse Saved Successfully");
    }

    @PutMapping(produces = MediaType.APPLICATION_JSON_VALUE , consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String>updateNurse(@RequestBody NurseDTO nurseDTO) throws Exception{
        nurseService.updateNurse(nurseDTO);
        return ResponseEntity.ok().body("Nurse Updated Successfully");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteNurse(@PathVariable("id") Integer nurseId) throws Exception{
        nurseService.deleteNurse(nurseId);
        return ResponseEntity.ok().body("Nurse Deleted Successfully");
    }

    @GetMapping("/{id}")
    public ResponseEntity<NurseDTO>getNurseById(@PathVariable("id") Integer nurseId) throws Exception{
        NurseDTO nurseDTO = nurseService.findNurseById(nurseId);
        return ResponseEntity.ok().body(nurseDTO);
    }

    @GetMapping
    public ResponseEntity<?>getAllNurses() throws Exception{
        List<NurseDTO> nurseList = nurseService.getAllNurses();
        return ResponseEntity.ok().body(nurseList);
    }
}
