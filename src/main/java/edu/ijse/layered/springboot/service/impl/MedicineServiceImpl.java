package edu.ijse.layered.springboot.service.impl;

import edu.ijse.layered.springboot.dto.MedicineDTO;
import edu.ijse.layered.springboot.entity.MedicineEntity;
import edu.ijse.layered.springboot.exceptions.CustomException;
import edu.ijse.layered.springboot.repository.MedicineRepository;
import edu.ijse.layered.springboot.service.MedicineService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;


import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Slf4j
@Service

public class MedicineServiceImpl implements MedicineService {

    private final MedicineRepository medicineRepository ;

    @Override
    public void saveMedicine(MedicineDTO medicineDTO) throws Exception {

        log.info("Executing Method saveMedicine()");

        try{
            MedicineEntity medicineEntity = new MedicineEntity();

            //medicineEntity.setMedicineId(medicineDTO.getMedicineId());
            medicineEntity.setMedicineName(medicineDTO.getMedicineName());
            medicineEntity.setExpireDate(medicineDTO.getExpireDate());
            medicineEntity.setMedicineQuantity(medicineDTO.getMedicineQuantity());
            medicineEntity.setPrice(medicineDTO.getPrice());

            medicineRepository.save(medicineEntity);
            log.info("Medicine Saved Successfully !");

        }catch (CustomException ce){
            throw ce;
        }catch(Exception e){
            log.info("Error While Executing Method saveMedicine()" , e);
            throw new CustomException(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Can't Save Medicine" + e.getMessage());
        }

    }

    @Override
    public void updateMedicine(MedicineDTO medicineDTO) throws Exception {

        log.info("Executing Method updateMedicine()");

        try{

            Optional<MedicineEntity>optionalMedicine = medicineRepository.findById(medicineDTO.getMedicineId());
            if(optionalMedicine.isEmpty()){
                throw new CustomException(HttpStatus.NOT_FOUND.value(), "Can't Find Medicine");
            }

            MedicineEntity medicineEntity = optionalMedicine.get();
            //medicineEntity.setMedicineId(medicineDTO.getMedicineId());
            medicineEntity.setMedicineName(medicineDTO.getMedicineName());
            medicineEntity.setExpireDate(medicineDTO.getExpireDate());
            medicineEntity.setMedicineQuantity(medicineDTO.getMedicineQuantity());
            medicineEntity.setPrice(medicineDTO.getPrice());

            medicineRepository.save(medicineEntity);
            log.info("Medicine Updated Successfully ");

        }catch (CustomException ce){
            throw ce;
        } catch (Exception e) {
            log.info("Error While Executing method updateMedicine()" , e);
            throw new CustomException(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Medicine Updated Failed !" + e.getMessage());
        }
    }

    @Override
    public void deleteMedicine(Integer medicineId) throws Exception {

        log.info("Executing Method deleteMedicine()");

        try{
            if(!medicineRepository.existsById(medicineId)){
                throw new CustomException(HttpStatus.NOT_FOUND.value(), "Can't Find Medicine");
            }

            medicineRepository.deleteById(medicineId);
            log.info("Medicine Deleted Successfully");

        }catch (CustomException ce){
            throw ce;
        }catch (Exception e){
            log.info("Error While Executing Method deleteMedicine()" , e);
            throw new CustomException(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Medicine Deleted Failed" + e.getMessage());
        }
    }

    @Override
    public MedicineDTO findMedicineById(Integer medicineId) throws Exception {

        log.info("Executing Method findMedicineById()");

        try{
            Optional<MedicineEntity>optionalMedicine = medicineRepository.findById(medicineId);
            if (optionalMedicine.isEmpty()){
                throw new CustomException(HttpStatus.NOT_FOUND.value(), "Medicine Not Found");
            }

            MedicineEntity medicineEntity = optionalMedicine.get();

            return new MedicineDTO(
                    medicineEntity.getMedicineId(),
                    medicineEntity.getMedicineName(),
                    medicineEntity.getExpireDate(),
                    medicineEntity.getMedicineQuantity(),
                    medicineEntity.getPrice()
            );
        }catch (CustomException ce){
           throw ce;
        }catch (Exception e){
            log.info("Error While Executing Method findMedicineById " , e);
            throw new CustomException(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Can Not Find Medicine"+ e.getMessage());
        }
    }

    @Override
    public List<MedicineDTO> getAllMedicines() throws Exception {

        log.info("Executing Method getAllMedicines()");

        try{

            List<MedicineDTO>medicineDTOS = new ArrayList<>();
            List<MedicineEntity>medicineEntityList = medicineRepository.findAll();

            for(MedicineEntity medicineEntity : medicineEntityList){
                medicineDTOS.add(new MedicineDTO(
                        medicineEntity.getMedicineId(),
                        medicineEntity.getMedicineName(),
                        medicineEntity.getExpireDate(),
                        medicineEntity.getMedicineQuantity(),
                        medicineEntity.getPrice()
                ));
            }

            return medicineDTOS;

        }catch (CustomException ce){
            throw ce;
        } catch (Exception e) {
            log.info("Error While Executing Method getAllMedicines()" , e);
            throw new CustomException(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Can,t Load Medicine Table" + e.getMessage());
        }


    }
}
