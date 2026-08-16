package edu.ijse.layered.springboot.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Data

public class ExpenseDTO {

    private int expenseId;
    private int departmentId;
    private String category;
    private String description;
    private double amount;
    private LocalDate expenseDate;

}
