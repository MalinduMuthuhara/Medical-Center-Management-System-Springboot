package edu.ijse.layered.springboot.service;

import edu.ijse.layered.springboot.dto.SupplierDTO;

import java.util.List;

public interface SupplierService {

    void saveSupplier(SupplierDTO supplierDTO) throws Exception ;
    void updateSupplier(SupplierDTO supplierDTO) throws Exception ;
    void deleteSupplier(Integer supplierId) throws Exception ;
    SupplierDTO findSupplierById( Integer supplierId) throws Exception ;
    List<SupplierDTO> getAllSuppliers() throws Exception ;

}
