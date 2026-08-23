package edu.ijse.layered.springboot.controller;

import edu.ijse.layered.springboot.dto.SupplierDTO;
import edu.ijse.layered.springboot.service.SupplierService;
import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/v1/supplier")
@AllArgsConstructor

public class SupplierController {

    private final SupplierService supplierService;

    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE , consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String>saveSupplier(@RequestBody SupplierDTO supplierDTO) throws Exception{
        supplierService.saveSupplier(supplierDTO);
        return ResponseEntity.ok().body("Supplier Saved Successfully");
    }

    @PutMapping(produces = MediaType.APPLICATION_JSON_VALUE , consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String>updateSupplier(@RequestBody SupplierDTO supplierDTO)throws Exception{
        supplierService.updateSupplier(supplierDTO);
        return ResponseEntity.ok().body("Supplier Updated Successfully");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String>deleteSupplier(@PathVariable("id") Integer supplierId)throws Exception{
        supplierService.deleteSupplier(supplierId);
        return ResponseEntity.ok().body("Supplier Deleted Successfully");
    }

    @GetMapping("/{id}")
    public ResponseEntity<SupplierDTO>findSupplierById(@PathVariable("id") Integer supplierId)throws Exception{
        SupplierDTO supplierDTO = supplierService.findSupplierById(supplierId);
        return ResponseEntity.ok().body(supplierDTO);
    }

    @GetMapping
    public ResponseEntity<?>getAllSuppliers()throws Exception{
        List<SupplierDTO>supplierDTOS = supplierService.getAllSuppliers();
        return ResponseEntity.ok().body(supplierDTOS);
    }




}
