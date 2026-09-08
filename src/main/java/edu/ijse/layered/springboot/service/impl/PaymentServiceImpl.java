package edu.ijse.layered.springboot.service.impl;

import edu.ijse.layered.springboot.dto.PaymentDTO;
import edu.ijse.layered.springboot.entity.AppointmentEntity;
import edu.ijse.layered.springboot.entity.AppointmentMedicineEntity;
import edu.ijse.layered.springboot.entity.PaymentEntity;
import edu.ijse.layered.springboot.exceptions.CustomException;
import edu.ijse.layered.springboot.repository.AppointmentMedicineRepository;
import edu.ijse.layered.springboot.repository.AppointmentRepository;
import edu.ijse.layered.springboot.repository.PaymentRepository;
import edu.ijse.layered.springboot.service.PaymentService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@AllArgsConstructor

public class PaymentServiceImpl implements PaymentService {

    // Base consultation fee added to every appointment payment
    private static final double BASE_CONSULTATION_FEE = 2500;

    private final PaymentRepository paymentRepository;
    private final AppointmentRepository appointmentRepository;
    private final AppointmentMedicineRepository appointmentMedicineRepository;

    @Override
    public void savePayment(PaymentDTO paymentDTO) throws Exception {

        log.info("Execute Method savePayment()");

        try {

            Optional<AppointmentEntity> optionalAppointment = appointmentRepository.findById(paymentDTO.getAppointmentId());
            if (optionalAppointment.isEmpty()) {
                throw new CustomException(HttpStatus.NOT_FOUND.value(), "Appointment Not Found");
            }

            // Payment is OneToOne with Appointment - block duplicates
            if (paymentRepository.existsByAppointmentEntity_AppointmentId(paymentDTO.getAppointmentId())) {
                throw new CustomException(HttpStatus.BAD_REQUEST.value(), "Payment Already Exists For This Appointment");
            }

            // Calculate amount server-side - never trust a client-sent amount
            double amount = calculateAmount(paymentDTO.getAppointmentId());

            PaymentEntity paymentEntity = new PaymentEntity();
            paymentEntity.setAppointmentEntity(optionalAppointment.get());
            paymentEntity.setAmount(amount);

            paymentRepository.save(paymentEntity);
            log.info("Payment Saved Successfully ");

        } catch (CustomException ce) {
            throw ce;
        } catch (Exception e) {
            log.info("Error While Executing Method savePayment()", e);
            throw new CustomException(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Payment Saved Failed " + e.getMessage());
        }
    }

    @Override
    public void updatePayment(PaymentDTO paymentDTO) throws Exception {

        log.info("Execute Method updatePayment()");

        try {

            Optional<PaymentEntity> optionalPayment = paymentRepository.findById(paymentDTO.getPaymentId());
            if (optionalPayment.isEmpty()) {
                throw new CustomException(HttpStatus.NOT_FOUND.value(), "Payment Not Found");
            }

            Optional<AppointmentEntity> optionalAppointment = appointmentRepository.findById(paymentDTO.getAppointmentId());
            if (optionalAppointment.isEmpty()) {
                throw new CustomException(HttpStatus.NOT_FOUND.value(), "Appointment Not Found");
            }

            // Recalculate in case medicines/quantities changed since the payment was created
            double amount = calculateAmount(paymentDTO.getAppointmentId());

            PaymentEntity paymentEntity = optionalPayment.get();
            paymentEntity.setAppointmentEntity(optionalAppointment.get());
            paymentEntity.setAmount(amount);

            paymentRepository.save(paymentEntity);
            log.info("Payment Updated Successfully ");

        } catch (CustomException ce) {
            throw ce;
        } catch (Exception e) {
            log.info("Error While Executing Method updatePayment()", e);
            throw new CustomException(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Payment Updated Failed " + e.getMessage());
        }
    }

    @Override
    public void deletePayment(Integer paymentId) throws Exception {

        log.info("Execute Method deletePayment()");

        try {

            if (!paymentRepository.existsById(paymentId)) {
                throw new CustomException(HttpStatus.NOT_FOUND.value(), "Can't Find Payment");
            }

            paymentRepository.deleteById(paymentId);
            log.info("Payment Deleted Successfully !");

        } catch (CustomException ce) {
            throw ce;
        } catch (Exception e) {
            log.info("Error While Executing Method deletePayment()", e);
            throw new CustomException(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Payment Deleted Failed " + e.getMessage());
        }
    }

    @Override
    public PaymentDTO findPaymentById(Integer paymentId) throws Exception {

        log.info("Execute Method findPaymentById()");

        try {

            Optional<PaymentEntity> optionalPayment = paymentRepository.findById(paymentId);
            if (optionalPayment.isEmpty()) {
                throw new CustomException(HttpStatus.NOT_FOUND.value(), "Can't Find Payment");
            }

            PaymentEntity paymentEntity = optionalPayment.get();

            return new PaymentDTO(
                    paymentEntity.getPaymentId(),
                    paymentEntity.getAppointmentEntity().getAppointmentId(),
                    paymentEntity.getAmount()
            );

        } catch (CustomException ce) {
            throw ce;
        } catch (Exception e) {
            log.info("Error While Executing Method findPaymentById()", e);
            throw new CustomException(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Can't Find Payment " + e.getMessage());
        }
    }

    @Override
    public List<PaymentDTO> getAllPayments() throws Exception {

        log.info("Execute Method getAllPayments()");

        try {

            List<PaymentDTO> paymentDTOS = new ArrayList<>();
            List<PaymentEntity> paymentEntities = paymentRepository.findAll();

            for (PaymentEntity paymentEntity : paymentEntities) {
                paymentDTOS.add(new PaymentDTO(
                        paymentEntity.getPaymentId(),
                        paymentEntity.getAppointmentEntity().getAppointmentId(),
                        paymentEntity.getAmount()
                ));
            }

            return paymentDTOS;

        } catch (CustomException ce) {
            throw ce;
        } catch (Exception e) {
            log.info("Error While Executing Method getAllPayments()", e);
            throw new CustomException(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Can't Load Payment Table " + e.getMessage());
        }
    }

    // ============================================================================
    // Amount = 2500 (base consultation fee) + Σ (AppointmentMedicine.quantity * Medicine.price)
    // ============================================================================
    @Override
    public double calculateAmount(Integer appointmentId) throws Exception {

        log.info("Execute Method calculateAmount()");

        try {

            if (!appointmentRepository.existsById(appointmentId)) {
                throw new CustomException(HttpStatus.NOT_FOUND.value(), "Appointment Not Found");
            }

            List<AppointmentMedicineEntity> appointmentMedicineEntities =
                    appointmentMedicineRepository.findByAppointmentEntity_AppointmentId(appointmentId);

            double medicineTotal = 0;

            for (AppointmentMedicineEntity appointmentMedicineEntity : appointmentMedicineEntities) {
                medicineTotal += appointmentMedicineEntity.getQuantity() * appointmentMedicineEntity.getMedicineEntity().getPrice();
            }

            return BASE_CONSULTATION_FEE + medicineTotal;

        } catch (CustomException ce) {
            throw ce;
        } catch (Exception e) {
            log.info("Error While Executing Method calculateAmount()", e);
            throw new CustomException(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Can't Calculate Amount " + e.getMessage());
        }
    }
}