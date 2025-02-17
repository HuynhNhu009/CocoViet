package com.cocoviet.backend.repository;

import com.cocoviet.backend.models.entity.ReceiptDetailEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IReceiptDetailRepository extends JpaRepository<ReceiptDetailEntity, String> {
    ReceiptDetailEntity findByReceiptDetailId(String receiptionDetailId);

    Optional<ReceiptDetailEntity> findByProductVariant_VariantsIdAndProductOrder_OrderId(String productVariantVariantsId, String productOrderOrderId);
}
