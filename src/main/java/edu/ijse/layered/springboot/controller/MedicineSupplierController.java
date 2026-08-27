package edu.ijse.layered.springboot.controller;

import edu.ijse.layered.springboot.dto.MedicineSupplierDTO;
import edu.ijse.layered.springboot.service.MedicineSupplierService;
import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/medicinesupplier")
@AllArgsConstructor

public class MedicineSupplierController{

    private final MedicineSupplierService medicineSupplierService ;

    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE , consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String>saveMedicineSupplier(@RequestBody MedicineSupplierDTO medicineSupplierDTO) throws Exception{
        medicineSupplierService.saveMedicineSupplier(medicineSupplierDTO);
        return ResponseEntity.ok().body("MedicineSupplier Saved Successfully ");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String>deleteMedicineSupplier(@PathVariable("id") Integer medicineSupplierId)throws Exception{
        medicineSupplierService.deleteMedicineSupplier(medicineSupplierId);
        return ResponseEntity.ok().body("MedicineSupplier Deleted Successfully ");
    }

    @GetMapping
    public ResponseEntity<?>getAllMedicineSuppliers() throws Exception {
        List<MedicineSupplierDTO>medicineSupplierDTOS = medicineSupplierService.getAllMedicineSuppliers();
        return ResponseEntity.ok().body(medicineSupplierDTOS);
    }
}
