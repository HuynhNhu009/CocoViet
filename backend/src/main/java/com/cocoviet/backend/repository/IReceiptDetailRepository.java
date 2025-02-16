package com.cocoviet.backend.repository;

import com.cocoviet.backend.models.entity.OrderEntity;
import com.cocoviet.backend.models.entity.ReceiptDetailEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IReceiptDetailRepository extends JpaRepository<ReceiptDetailEntity, String> {

    ReceiptDetailEntity findByReceiptDetailId(String receiptionDetailId);
}
