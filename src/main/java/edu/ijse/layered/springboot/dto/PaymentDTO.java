package edu.ijse.layered.springboot.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data

public class PaymentDTO {

    private int paymentId;
    private int appointmentId;
    private double amount;

}
