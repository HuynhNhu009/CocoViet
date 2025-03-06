package com.cocoviet.backend.repository;

import com.cocoviet.backend.models.entity.OrderEntity;
import com.cocoviet.backend.models.entity.ReceiptDetailEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Repository
public interface IReceiptDetailRepository extends JpaRepository<ReceiptDetailEntity, String> {
    ReceiptDetailEntity findByReceiptDetailId(String receiptionDetailId);
    Optional<ReceiptDetailEntity> findByProductVariant_VariantsIdAndProductOrder_OrderId(String productVariantVariantsId, String productOrderOrderId);

    void deleteByReceiptDetailId(String receiptDetailId);

    @Query("SELECT r FROM ReceiptDetailEntity r " +
            "JOIN r.productVariant pv " +
            "JOIN pv.product p " +
            "WHERE p.retailer.retailerId = :retailerId " +
            "AND r.productOrder.orderId = :orderId")
    Set<ReceiptDetailEntity> findReceiptDetailsByRetailerAndOrderId(
            @Param("retailerId") String retailerId,
            @Param("orderId") String orderId);

}
