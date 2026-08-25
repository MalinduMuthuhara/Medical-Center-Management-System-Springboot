package edu.ijse.layered.springboot.controller;

import edu.ijse.layered.springboot.dto.LabTestDTO;
import edu.ijse.layered.springboot.service.LabTestService;
import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/labtest")
@AllArgsConstructor

public class LabTestController {

    private final LabTestService labTestService;

    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE , consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String>saveLabTest(@RequestBody LabTestDTO labTestDTO)throws Exception{
        labTestService.saveLabTest(labTestDTO);
        return ResponseEntity.ok().body("Test Saved Successfully");
    }

    @PutMapping(produces = MediaType.APPLICATION_JSON_VALUE , consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String>updateLabTest(@RequestBody LabTestDTO labTestDTO)throws Exception{
        labTestService.updateLabTest(labTestDTO);
        return  ResponseEntity.ok().body("Test Updated Successfully");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String>deleteLabTest(@PathVariable("id") Integer labTestId) throws Exception {
        labTestService.deleteLabTest(labTestId);
        return ResponseEntity.ok().body("LabTest Deleted Successfully");
    }

    @GetMapping("/{id}")
    public ResponseEntity<LabTestDTO>findLabTestById(@PathVariable("id") Integer labTestId)throws Exception{
        LabTestDTO labTestDTO = labTestService.findLabTestById(labTestId);
        return ResponseEntity.ok().body(labTestDTO);
    }

    @GetMapping
    public ResponseEntity<?>getAllTests()throws Exception{
        List<LabTestDTO>labTestDTOS = labTestService.getAllLabTests();
        return ResponseEntity.ok().body(labTestDTOS);

    }
}
