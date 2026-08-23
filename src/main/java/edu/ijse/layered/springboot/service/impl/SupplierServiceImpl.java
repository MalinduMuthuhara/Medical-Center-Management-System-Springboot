package edu.ijse.layered.springboot.service.impl;

import edu.ijse.layered.springboot.dto.SupplierDTO;
import edu.ijse.layered.springboot.entity.SupplierEntity;
import edu.ijse.layered.springboot.exceptions.CustomException;
import edu.ijse.layered.springboot.repository.SupplierRepository;
import edu.ijse.layered.springboot.service.SupplierService;
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

public class SupplierServiceImpl implements SupplierService {

    private final SupplierRepository supplierRepository;

    @Override
    public void saveSupplier(SupplierDTO supplierDTO) throws Exception {

        log.info("Executing Method saveSupplier()");

        try{
            SupplierEntity supplierEntity = new SupplierEntity();
            //supplierEntity.setSupplierId(supplierDTO.getSupplierId());
            supplierEntity.setSupplierName(supplierDTO.getSupplierName());
            supplierEntity.setContactNumber(supplierDTO.getContactNumber());

            supplierRepository.save(supplierEntity);
            log.info("Supplier Saved Successfully ");
        }catch (CustomException ce){
            throw ce ;
        } catch (Exception e) {
            log.info("Error While Executing Method saveSupplier()" , e);
            throw new CustomException(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Supplier Saved Failed" + e.getMessage());
        }
    }

    @Override
    public void updateSupplier(SupplierDTO supplierDTO) throws Exception {

        log.info("Executing Method updateSupplier()");

        try{
            Optional<SupplierEntity>optionalSupplier = supplierRepository.findById(supplierDTO.getSupplierId());
            if(optionalSupplier.isEmpty()){
                throw new CustomException(HttpStatus.NOT_FOUND.value(), "Can't Find Supplier");
            }

            SupplierEntity supplierEntity = optionalSupplier.get();

            //supplierEntity.setSupplierId(supplierDTO.getSupplierId());
            supplierEntity.setSupplierName(supplierDTO.getSupplierName());
            supplierEntity.setContactNumber(supplierDTO.getContactNumber());

            supplierRepository.save(supplierEntity);
            log.info("Supplier Updated Successfully ");


        }catch (CustomException ce){
            throw ce ;
        } catch (Exception e) {
            log.info("Error While Executing Method updateSupplier()" , e);
            throw new CustomException(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Supplier Updated Failed" + e.getMessage());
        }
    }

    @Override
    public void deleteSupplier(Integer supplierId) throws Exception {

        log.info("Executing Method deleteSupplier()");

        try{

            if(!supplierRepository.existsById(supplierId)){
                throw new CustomException(HttpStatus.NOT_FOUND.value(), "Can't Find Supplier");
            }

            supplierRepository.deleteById(supplierId);
            log.info("Supplier Deleted Successfully");
        }catch (CustomException ce){
            throw ce;
        }catch (Exception e){
            log.info("Error While Executing Method deleteSupplier()" , e);
            throw new CustomException(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Supplier Deleted Failed" + e.getMessage());
        }
    }

    @Override
    public SupplierDTO findSupplierById(Integer supplierId) throws Exception {

        log.info("Executing Method findSupplierById()");

        try{
            Optional<SupplierEntity>optionalSupplier = supplierRepository.findById(supplierId);
            if(optionalSupplier.isEmpty()){
                throw new CustomException(HttpStatus.NOT_FOUND.value(), "Can't Find Supplier");
            }

            SupplierEntity supplierEntity = optionalSupplier.get();

            return new SupplierDTO(
                    supplierEntity.getSupplierId(),
                    supplierEntity.getSupplierName(),
                    supplierEntity.getContactNumber()
            );

        }catch (CustomException ce){
            throw ce ;
        } catch (Exception e) {
            log.info("Error While Executing Method findSupplierById()" , e);
            throw new CustomException(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Can't Fing Supplier" + e.getMessage());
        }
    }

    @Override
    public List<SupplierDTO> getAllSuppliers() throws Exception {
        log.info("Executing Method getAllSupplieres()");

        try {
            List<SupplierDTO>supplierDTOS = new ArrayList<>();
            List<SupplierEntity>supplierEntities = supplierRepository.findAll();

            for(SupplierEntity supplierEntity : supplierEntities){

                supplierDTOS.add(new SupplierDTO(
                        supplierEntity.getSupplierId(),
                        supplierEntity.getSupplierName(),
                        supplierEntity.getContactNumber()
                ));
            }
            return supplierDTOS;
        }catch (CustomException ce){
            throw ce ;
        }catch (Exception e){
            log.info("Error While Executing Method getAllSupplieres()" , e);
            throw new CustomException(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Can't Load Supplier Table" + e.getMessage());
        }
    }
}
