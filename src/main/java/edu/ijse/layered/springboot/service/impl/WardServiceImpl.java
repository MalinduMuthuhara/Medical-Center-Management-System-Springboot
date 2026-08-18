package edu.ijse.layered.springboot.service.impl;

import edu.ijse.layered.springboot.dto.WardDTO;
import edu.ijse.layered.springboot.entity.DepartmentEntity;
import edu.ijse.layered.springboot.entity.WardEntity;
import edu.ijse.layered.springboot.exceptions.CustomException;
import edu.ijse.layered.springboot.repository.DepartmentRepository;
import edu.ijse.layered.springboot.repository.WardRepository;
import edu.ijse.layered.springboot.service.WardService;
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

public class WardServiceImpl implements WardService {

    private final WardRepository wardRepository ;
    private final DepartmentRepository departmentRepository;

    @Override
    public void saveWard(WardDTO wardDTO) throws Exception {

        log.info("Executing Method Save Ward ");

        try{

            Optional<DepartmentEntity>optionalDepartment = departmentRepository.findById(wardDTO.getDepartmentId());
            if (optionalDepartment.isEmpty()){
                throw new CustomException(HttpStatus.NOT_FOUND.value(), "Department Not Found !");
            }

            WardEntity wardEntity = new WardEntity();

            //wardEntity.setWardId(wardDTO.getWardId());
            wardEntity.setDepartmentEntity(optionalDepartment.get());
            wardEntity.setRoomNumber(wardDTO.getRoomNumber());
            wardEntity.setType(wardDTO.getType());
            wardEntity.setCapacity(wardDTO.getCapacity());

            wardRepository.save(wardEntity);
            log.info("Ward Saved Successfully !");

        }catch (CustomException ce){
            throw ce;
        }catch (Exception e) {
            log.info("Error While Executing Method Save Ward " , e);
            throw new CustomException(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Ward Save Failed !" + e.getMessage());
        }

    }

    @Override
    public void updateWard(WardDTO wardDTO) throws Exception {
        log.info("Executing Method Update Ward");

        try {
            Optional<WardEntity>optionalWard = wardRepository.findById(wardDTO.getWardId());
            if(optionalWard.isEmpty()){
                throw new CustomException(HttpStatus.NOT_FOUND.value(), "Cannot Find Ward !");
            }

            Optional<DepartmentEntity>optionalDepartment = departmentRepository.findById(wardDTO.getDepartmentId());
            if(optionalDepartment.isEmpty()){
                throw new CustomException(HttpStatus.NOT_FOUND.value(), "Cannot Find Department !");
            }

            WardEntity wardEntity = optionalWard.get();

            wardEntity.setDepartmentEntity(optionalDepartment.get());
            wardEntity.setRoomNumber(wardDTO.getRoomNumber());
            wardEntity.setType(wardDTO.getType());
            wardEntity.setCapacity(wardDTO.getCapacity());

            wardRepository.save(wardEntity);
            log.info("Ward Updated Successfully !");

        }catch (CustomException ce){
            throw ce ;
        }catch (Exception e) {
            log.info("Error While Executing method Update Ward" , e);
            throw new CustomException(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Ward Updated Failed !" + e.getMessage());
        }
    }

    @Override
    public void deleteWard(Integer wardId) throws Exception {
        log.info("Executing Method Delete Ward ");

        try{

            if(!wardRepository.existsById(wardId)){
                throw new CustomException(HttpStatus.NOT_FOUND.value(), "Ward Not Found !");
            }

            wardRepository.deleteById(wardId);
            log.info("Ward Deleted Successfully !");

        }catch (CustomException ce){
            throw ce ;
        }catch (Exception e){
            log.info("Error While Executing Method Delete Ward " , e);
           throw new CustomException(HttpStatus.INTERNAL_SERVER_ERROR.value() , "Ward Deleted Fail !" +e.getMessage());
        }
    }

    @Override
    public WardDTO findWardById(Integer wardId) throws Exception {
       log.info("Executing Method Find Ward ById");

       try{
           Optional<WardEntity>optionalWard = wardRepository.findById(wardId);
           if (optionalWard.isEmpty()){
               throw new CustomException(HttpStatus.NOT_FOUND.value() , "Cannot Find Ward " );
           }

           WardEntity wardEntity = optionalWard.get();

           return new WardDTO(
                   wardEntity.getWardId(),
                   wardEntity.getDepartmentEntity().getDepartmentId(),
                   wardEntity.getRoomNumber(),
                   wardEntity.getType(),
                   wardEntity.getCapacity()
           );

       }catch (CustomException ce){
           throw ce;
       }catch (Exception e) {
           log.info("Error While Executing Method Find Ward ById" , e);
           throw new CustomException(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Error While Executing Method Find By Id" + e.getMessage());
       }
    }

    @Override
    public List<WardDTO> getAllWards() throws Exception {
        log.info("Executing Method getAllWards()");
        try {

            List<WardDTO>wardDTOS = new ArrayList<>();
            List<WardEntity>wardList = wardRepository.findAll();

            for (WardEntity wardEntity : wardList){
                wardDTOS.add(new WardDTO(
                        wardEntity.getWardId(),
                        wardEntity.getDepartmentEntity().getDepartmentId(),
                        wardEntity.getRoomNumber(),
                        wardEntity.getType(),
                        wardEntity.getCapacity()
                ));
            }

            return wardDTOS;

        }catch (CustomException ce){
            throw ce;
        }catch (Exception e){
            log.info("Error While Executing Method getAllWards()" , e);
            throw new CustomException(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Executing Method getAllWards()" + e.getMessage());
        }

    }
}
