package edu.ijse.layered.springboot.controller;

import edu.ijse.layered.springboot.dto.AppointmentDTO;
import edu.ijse.layered.springboot.service.AppointmentService;
import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/v1/appointment")
@AllArgsConstructor

public class AppointmentController {

    private final AppointmentService appointmentService;

    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE , consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String>saveAppointment(@RequestBody AppointmentDTO appointmentDTO)throws Exception{
        appointmentService.saveAppointment(appointmentDTO);
        return ResponseEntity.ok().body("Appointment Saved Successfully ");
    }

    @PutMapping(produces = MediaType.APPLICATION_JSON_VALUE , consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String>updateAppointment(@RequestBody AppointmentDTO appointmentDTO)throws Exception{
        appointmentService.updateAppointment(appointmentDTO);
        return ResponseEntity.ok().body("Appointment Updated Successfully");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String>deleteAppointment(@PathVariable("id") Integer appointmentId)throws Exception{
        appointmentService.deleteAppointment(appointmentId);
        return ResponseEntity.ok().body("Appointment Deleted Successfully");
    }

    @GetMapping("/{id}")
    public ResponseEntity<AppointmentDTO>findAppointmentById(@PathVariable("id") Integer appointmentId)throws Exception{
        AppointmentDTO appointmentDTO = appointmentService.findAppointmentById(appointmentId);
        return ResponseEntity.ok().body(appointmentDTO);
    }

    @GetMapping
    public ResponseEntity<?>getAllAppointment()throws Exception{
        List<AppointmentDTO>appointmentDTOList = appointmentService.getAllAppointments();
        return ResponseEntity.ok().body(appointmentDTOList);
    }
}
