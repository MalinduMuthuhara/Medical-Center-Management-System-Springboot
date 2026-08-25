package edu.ijse.layered.springboot.controller;

import edu.ijse.layered.springboot.dto.MedicalHistoryDTO;
import edu.ijse.layered.springboot.service.MedicalHistoryService;
import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/v1/medicalhistory")
@AllArgsConstructor

public class MedicalHistoryController {

    private final MedicalHistoryService medicalHistoryService ;

    @PutMapping(produces = MediaType.APPLICATION_JSON_VALUE , consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String>saveMedicalHistory(@RequestBody MedicalHistoryDTO medicalHistoryDTO)throws Exception{
        medicalHistoryService.saveMedicalHistory(medicalHistoryDTO);
        return ResponseEntity.ok().body("Medical History Saved Successfully");
    }

    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE , consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String>updateMedicalHistory(@RequestBody MedicalHistoryDTO medicalHistoryDTO) throws Exception{
        medicalHistoryService.updateMedicalHistory(medicalHistoryDTO);
        return ResponseEntity.ok().body("Medical History Updated Successfully");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String>deleteMedicalHistory(@PathVariable("id") Integer medicalHistoryId)throws Exception{
        medicalHistoryService.deleteMedicalHistory(medicalHistoryId);
        return ResponseEntity.ok().body("Medical History Deleted Successfully");
    }

    @GetMapping("/{id}")
    public ResponseEntity<MedicalHistoryDTO>findMedicalHistoryByID(@PathVariable("id")Integer medicalHistoryId) throws Exception{
        MedicalHistoryDTO medicalHistoryDTO = medicalHistoryService.findMedicalHistoryById(medicalHistoryId);
        return ResponseEntity.ok().body(medicalHistoryDTO);
    }

    @GetMapping
    public ResponseEntity<?>gelAllMedicalHistories()throws Exception{
        List<MedicalHistoryDTO>medicalHistoryDTOS = medicalHistoryService.getAllMedicalHistories();
        return ResponseEntity.ok().body(medicalHistoryDTOS);
    }
}
