package edu.ijse.layered.springboot.service;

import edu.ijse.layered.springboot.dto.ExpenseDTO;

import java.util.List;

public interface ExpenseService {

    void saveExpense(ExpenseDTO expenseDTO) throws Exception ;
    void updateExpense(ExpenseDTO expenseDTO) throws Exception ;
    void deleteExpense(Integer expenseId) throws Exception ;
    ExpenseDTO findExpenseById(Integer expenseId) throws Exception ;
    List<ExpenseDTO> getAllExpenses() throws Exception ;

}
