package edu.ijse.layered.springboot.service;

import edu.ijse.layered.springboot.dto.AppointmentDTO;

import java.util.List;

public interface AppointmentService {

    void saveAppointment(AppointmentDTO appointmentDTO) throws Exception ;
    void updateAppointment(AppointmentDTO appointmentDTO) throws Exception ;
    void deleteAppointment(Integer appointmentId) throws Exception ;
    AppointmentDTO findAppointmentById(Integer appointmentId) throws Exception ;
    List<AppointmentDTO> getAllAppointments() throws Exception ;

}
