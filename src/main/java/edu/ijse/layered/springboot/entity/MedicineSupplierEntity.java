/*package edu.ijse.layered.springboot.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Entity
@Table(name = "medicine_supplier")
public class MedicineSupplierEntity {

    @EmbeddedId
    private MedicineSupplierId id;

    @ManyToOne
    @MapsId("medicineId")
    @JoinColumn(name = "medicine_id")
    private MedicineEntity medicineEntity;

    @ManyToOne
    @MapsId("supplierId")
    @JoinColumn(name = "supplier_id")
    private SupplierEntity supplierEntity;

}*/