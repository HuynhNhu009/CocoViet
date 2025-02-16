package com.cocoviet.backend.repository;

import com.cocoviet.backend.models.entity.PaymentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IPaymentRepository extends JpaRepository<PaymentEntity, String> {
    boolean existsByPaymentMethod(String paymentMethod);
    PaymentEntity findByPaymentId(String paymentId);
}
