package edu.ijse.layered.springboot.service.impl;

import edu.ijse.layered.springboot.dto.ExpenseDTO;
import edu.ijse.layered.springboot.entity.DepartmentEntity;
import edu.ijse.layered.springboot.entity.ExpenseEntity;
import edu.ijse.layered.springboot.exceptions.CustomException;
import edu.ijse.layered.springboot.repository.DepartmentRepository;
import edu.ijse.layered.springboot.repository.ExpenseRepository;
import edu.ijse.layered.springboot.service.ExpenseService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
@Slf4j

public class ExpenseServiceImpl implements ExpenseService {

    private final ExpenseRepository expenseRepository ;
    private final DepartmentRepository departmentRepository ;

    @Override
    public void saveExpense(ExpenseDTO expenseDTO) throws Exception {

        log.info("Executing Method saveExpense() ");

        try {

            Optional<DepartmentEntity> optionalDepartment = departmentRepository.findById(expenseDTO.getDepartmentId());
            if (optionalDepartment.isEmpty()) {
                throw new CustomException(HttpStatus.NOT_FOUND.value(), "Can't Find Department ");
            }

            ExpenseEntity expenseEntity = new ExpenseEntity();
            //expenseEntity.setExpenseId(expenseDTO.getExpenseId());
            expenseEntity.setDepartmentEntity(optionalDepartment.get());
            expenseEntity.setCategory(expenseDTO.getCategory());
            expenseEntity.setDescription(expenseDTO.getDescription());
            expenseEntity.setAmount(expenseDTO.getAmount());
            expenseEntity.setExpenseDate(expenseDTO.getExpenseDate());

            expenseRepository.save(expenseEntity);
            log.info("Expense Saved Successfully !");

        } catch (CustomException ce) {
            throw ce;
        } catch (Exception e) {
            log.info("Error While Executing Method saveExpense() ", e);
            throw new CustomException(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Expense Save Failed ! " + e.getMessage());
        }
    }

    @Override
    public void updateExpense(ExpenseDTO expenseDTO) throws Exception {
        log.info("Executing Method updateExpense() ");

        try {

            Optional<DepartmentEntity> optionalDepartment = departmentRepository.findById(expenseDTO.getDepartmentId());
            if (optionalDepartment.isEmpty()) {
                throw new CustomException(HttpStatus.NOT_FOUND.value(), "Can't Find Department ");
            }

            Optional<ExpenseEntity> optionalExpense = expenseRepository.findById(expenseDTO.getExpenseId());
            if (optionalExpense.isEmpty()) {
                throw new CustomException(HttpStatus.NOT_FOUND.value(), "Can't Find Expense ");
            }

            ExpenseEntity expenseEntity = optionalExpense.get();

            expenseEntity.setDepartmentEntity(optionalDepartment.get());
            expenseEntity.setCategory(expenseDTO.getCategory());
            expenseEntity.setDescription(expenseDTO.getDescription());
            expenseEntity.setAmount(expenseDTO.getAmount());
            expenseEntity.setExpenseDate(expenseDTO.getExpenseDate());

            expenseRepository.save(expenseEntity);
            log.info("Expense Updated Successfully !");

        } catch (CustomException ce) {
            throw ce;
        } catch (Exception e) {
            log.info("Error While Executing Method updateExpense() ", e);
            throw new CustomException(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Expense Update Failed ! " + e.getMessage());
        }
    }

    @Override
    public void deleteExpense(Integer expenseId) throws Exception {
        log.info("Executing Method deleteExpense() ");

        try {

            if (!expenseRepository.existsById(expenseId)) {
                throw new CustomException(HttpStatus.NOT_FOUND.value(), "Can Not Find Expense ");
            }

            expenseRepository.deleteById(expenseId);
            log.info("Expense Deleted Successfully !");

        } catch (CustomException ce) {
            throw ce;
        } catch (Exception e) {
            log.info("Error While Executing Method deleteExpense() ", e);
            throw new CustomException(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Expense Delete Failed ! " + e.getMessage());
        }
    }

    @Override
    public ExpenseDTO findExpenseById(Integer expenseId) throws Exception {
        log.info("Executing Method findExpenseById() ");

        try {

            Optional<ExpenseEntity> optionalExpense = expenseRepository.findById(expenseId);
            if (optionalExpense.isEmpty()) {
                throw new CustomException(HttpStatus.NOT_FOUND.value(), "Can't Find Expense ");
            }

            ExpenseEntity expenseEntity = optionalExpense.get();

            return new ExpenseDTO(
                    expenseEntity.getExpenseId(),
                    expenseEntity.getDepartmentEntity().getDepartmentId(),
                    expenseEntity.getCategory(),
                    expenseEntity.getDescription(),
                    expenseEntity.getAmount(),
                    expenseEntity.getExpenseDate()
            );

        } catch (CustomException ce) {
            throw ce;
        } catch (Exception e) {
            log.info("Error While Executing Method findExpenseById() ", e);
            throw new CustomException(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Can't Find a Expense" + e.getMessage());
        }
    }

    @Override
    public List<ExpenseDTO> getAllExpenses() throws Exception {
        log.info("Executing Method getAllExpenses() ");

        try {

            List<ExpenseDTO> expenseDTOS = new ArrayList<>();
            List<ExpenseEntity> expenseEntityList = expenseRepository.findAll();

            for (ExpenseEntity expenseEntity : expenseEntityList) {
                expenseDTOS.add(new ExpenseDTO(
                        expenseEntity.getExpenseId(),
                        expenseEntity.getDepartmentEntity().getDepartmentId(),
                        expenseEntity.getCategory(),
                        expenseEntity.getDescription(),
                        expenseEntity.getAmount(),
                        expenseEntity.getExpenseDate()
                ));
            }

            return expenseDTOS;

        } catch (CustomException ce) {
            throw ce;
        } catch (Exception e) {
            log.info("Error While Executing Method getAllExpenses() ", e);
            throw new CustomException(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Can't Load Expense Table" + e.getMessage());
        }
    }
}