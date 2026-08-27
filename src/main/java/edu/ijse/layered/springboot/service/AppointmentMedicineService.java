package edu.ijse.layered.springboot.service;

import edu.ijse.layered.springboot.dto.AppointmentMedicineDTO;
import org.springframework.http.client.support.InterceptingHttpAccessor;

import java.util.List;

public interface AppointmentMedicineService {
    void saveAppointmentMedicine(AppointmentMedicineDTO appointmentMedicineDTO)throws Exception ;
    void updateAppointmentMedicine(AppointmentMedicineDTO appointmentMedicineDTO)throws Exception ;
    void deleteAppointmentMedicine(Integer appointmentMedicineId) throws Exception ;
    AppointmentMedicineDTO getAppointmentMedicineById(Integer appointmentMedicineId)throws Exception ;
    List<AppointmentMedicineDTO>getAllAppointmentMedicine()throws Exception;

}
