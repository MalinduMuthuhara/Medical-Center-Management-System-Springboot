package edu.ijse.layered.springboot.controller;

import edu.ijse.layered.springboot.dto.PaymentDTO;
import edu.ijse.layered.springboot.service.PaymentService;
import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/payment")
@AllArgsConstructor

public class PaymentController {

    private final PaymentService paymentService;

    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> savePayment(@RequestBody PaymentDTO paymentDTO) throws Exception {
        paymentService.savePayment(paymentDTO);
        return ResponseEntity.ok().body("Payment Saved Successfully");
    }

    @PutMapping(produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> updatePayment(@RequestBody PaymentDTO paymentDTO) throws Exception {
        paymentService.updatePayment(paymentDTO);
        return ResponseEntity.ok().body("Payment Updated Successfully");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletePayment(@PathVariable("id") Integer paymentId) throws Exception {
        paymentService.deletePayment(paymentId);
        return ResponseEntity.ok().body("Payment Deleted Successfully");
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findPaymentById(@PathVariable("id") Integer paymentId) throws Exception {
        PaymentDTO paymentDTO = paymentService.findPaymentById(paymentId);
        return ResponseEntity.ok().body(paymentDTO);
    }

    @GetMapping
    public ResponseEntity<?> getAllPayments() throws Exception {
        List<PaymentDTO> paymentDTOS = paymentService.getAllPayments();
        return ResponseEntity.ok().body(paymentDTOS);
    }

    // Preview the auto-calculated amount for an appointment (used by the UI before Save)
    @GetMapping("/calculate/{appointmentId}")
    public ResponseEntity<Double> calculateAmount(@PathVariable("appointmentId") Integer appointmentId) throws Exception {
        double amount = paymentService.calculateAmount(appointmentId);
        return ResponseEntity.ok().body(amount);
    }
}