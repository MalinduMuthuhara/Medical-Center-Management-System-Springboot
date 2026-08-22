package edu.ijse.layered.springboot.controller;

import edu.ijse.layered.springboot.dto.ExpenseDTO;
import edu.ijse.layered.springboot.service.ExpenseService;
import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/v1/expense")
@AllArgsConstructor

public class ExpenseController {

    private final ExpenseService expenseService ;

    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE , consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String>saveExpenses(@RequestBody ExpenseDTO expenseDTO)throws Exception{
        expenseService.saveExpense(expenseDTO);
        return ResponseEntity.ok().body("Expense Saved Successfully ");
    }

    @PutMapping(produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String>updateExpense(@RequestBody ExpenseDTO expenseDTO) throws Exception{
        expenseService.updateExpense(expenseDTO);
        return ResponseEntity.ok().body("Expense Updated Successfully ");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String>deleteExpense(@PathVariable("id") Integer expenseId)throws Exception{
        expenseService.deleteExpense(expenseId);
        return ResponseEntity.ok().body("Expense Deleted Successfully");
    }

    @GetMapping("/{id}")
    public ResponseEntity<ExpenseDTO>getExpenseById(@PathVariable("id")Integer expenseId)throws Exception{
        ExpenseDTO expenseDTO = expenseService.findExpenseById(expenseId);
        return ResponseEntity.ok().body(expenseDTO);
    }

    @GetMapping
    public ResponseEntity<?>getAllExpenses()throws Exception{
        List<ExpenseDTO>expenseDTOList = expenseService.getAllExpenses();
        return ResponseEntity.ok().body(expenseDTOList);
    }
}
