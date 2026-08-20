package edu.ijse.layered.springboot.controller;

import edu.ijse.layered.springboot.dto.WardDTO;
import edu.ijse.layered.springboot.service.WardService;
import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping(value = "/api/v1/ward")

public class WardController {

    private final WardService wardService ;

    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE , consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String>saveWard(@RequestBody WardDTO wardDTO) throws Exception {
        wardService.saveWard(wardDTO);
        return ResponseEntity.ok().body("Ward Saved Successfully");
    }

    @PutMapping(produces = MediaType.APPLICATION_JSON_VALUE , consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String>updateWard(@RequestBody WardDTO wardDTO) throws Exception{
        wardService.updateWard(wardDTO);
        return ResponseEntity.ok().body("Ward Updated Successfully");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String>deleteWard(@PathVariable("id") Integer wardId) throws Exception{
        wardService.deleteWard(wardId);
        return ResponseEntity.ok().body("Ward Deleted Successfully !");
    }

    @GetMapping("/{id}")
    public ResponseEntity<WardDTO>findWardById(@PathVariable("id") Integer wardId) throws Exception{
        WardDTO wardDTO= wardService.findWardById(wardId);
        return ResponseEntity.ok().body(wardDTO);
    }

    @GetMapping
    public ResponseEntity<?>getAllWards() throws Exception{
        List<WardDTO>wardDTOS = wardService.getAllWards();
        return ResponseEntity.ok().body(wardDTOS);
    }
}
