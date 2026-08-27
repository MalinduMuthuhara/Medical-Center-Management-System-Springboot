package edu.ijse.layered.springboot.controller;

import edu.ijse.layered.springboot.dto.AppointmentMedicineDTO;
import edu.ijse.layered.springboot.service.AppointmentMedicineService;
import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/v1/appointmentmedicine")
@AllArgsConstructor

public class AppointmentMedicineController {

    private final AppointmentMedicineService appointmentMedicineService ;

    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE , consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String>saveAppointmentMedicine(@RequestBody AppointmentMedicineDTO appointmentMedicineDTO)throws Exception{
        appointmentMedicineService.saveAppointmentMedicine(appointmentMedicineDTO);
        return ResponseEntity.ok().body("Appointment Medicine Saved Successfully");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String>deleteAppointmentMedicine(@PathVariable("id")Integer appointmentMedicineId)throws Exception {
        appointmentMedicineService.deleteAppointmentMedicine(appointmentMedicineId);
        return ResponseEntity.ok().body("AppointmentMedicine Deleted Successfully");
    }

    @GetMapping
    public ResponseEntity<?>getAll()throws Exception{
        List<AppointmentMedicineDTO>appointmentMedicineDTOS = appointmentMedicineService.getAllAppointmentMedicine();
        return ResponseEntity.ok().body(appointmentMedicineDTOS);
    }

}
