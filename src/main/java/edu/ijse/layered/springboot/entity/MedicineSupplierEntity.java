package edu.ijse.layered.springboot.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(
        name = "medicine_supplier",
        uniqueConstraints = {
                @UniqueConstraint(
                        columnNames = {"medicine_id", "supplier_id"}
                )
        }
)
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MedicineSupplierEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int medicineSupplierId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "medicine_id", nullable = false)
    private MedicineEntity medicineEntity;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "supplier_id", nullable = false)
    private SupplierEntity supplierEntity;

}