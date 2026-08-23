package edu.ijse.layered.springboot.controller;

import edu.ijse.layered.springboot.dto.MedicineDTO;
import edu.ijse.layered.springboot.service.MedicineService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/v1/medicine")
@RequiredArgsConstructor

public class MedicineController {

    private final MedicineService medicineService;

    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE , consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String>saveMedicine(@RequestBody MedicineDTO medicineDTO) throws Exception{
        medicineService.saveMedicine(medicineDTO);
        return ResponseEntity.ok().body("Medicine Saved Successfully");
    }

    @PutMapping(produces = MediaType.APPLICATION_JSON_VALUE , consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String>updateMedicine(@RequestBody MedicineDTO medicineDTO)throws Exception{
        medicineService.updateMedicine(medicineDTO);
        return ResponseEntity.ok().body("Medicine Updated Successfully");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String>deleteMedicine(@PathVariable("id") Integer medicineId)throws Exception{
        medicineService.deleteMedicine(medicineId);
        return ResponseEntity.ok().body("Medicine Deleted Successfully");
    }

    @GetMapping("/{id}")
    public ResponseEntity<MedicineDTO>findMedicineById(@PathVariable("id") Integer medicineId)throws Exception{
        MedicineDTO medicineDTO = medicineService.findMedicineById(medicineId);
        return ResponseEntity.ok().body(medicineDTO);
    }

    @GetMapping
    public ResponseEntity<?>getAllMedicines()throws Exception{
        List<MedicineDTO> medicineDTOList = medicineService.getAllMedicines();
        return  ResponseEntity.ok().body(medicineDTOList);
    }
}
