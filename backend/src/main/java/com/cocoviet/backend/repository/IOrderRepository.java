package com.cocoviet.backend.repository;

import com.cocoviet.backend.models.entity.OrderEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IOrderRepository extends JpaRepository<OrderEntity, String> {
//    boolean exsitsByCustomerId(String customerId);

    @Query("SELECT o FROM OrderEntity o LEFT JOIN FETCH o.receiptDetails WHERE o.customer.customerId = :customerId")
    OrderEntity findByCustomerId(String customerId);
//    OrderEntity findByCustomerIdWithReceiptDetails(String customerId);
}
