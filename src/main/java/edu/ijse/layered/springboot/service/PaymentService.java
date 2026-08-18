package edu.ijse.layered.springboot.service;

import edu.ijse.layered.springboot.dto.PaymentDTO;

import java.util.List;

public interface PaymentService {

    void savePayment(PaymentDTO paymentDTO) throws Exception ;
    void updatePayment(PaymentDTO paymentDTO )throws Exception ;
    void deletePayment(Integer paymentId) throws Exception ;
    PaymentDTO findPaymentById(Integer paymentId) throws Exception ;
    List<PaymentDTO>getAllPayments() throws Exception ;

}
