package com.cocoviet.backend.repository;

import com.cocoviet.backend.models.entity.OrderEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface IOrderRepository extends JpaRepository<OrderEntity, String> {
    OrderEntity findByOrderId(String orderId);

    OrderEntity findByCustomer_CustomerIdAndStatus_StatusCode(String customerCustomerId, String statusStatusCode);
//    OrderEntity findByCustomer_CustomerId(String customerCustomerId);
    List<OrderEntity> findByCustomer_CustomerId(String customerId);
    //    OrderEntity findByCustomerIdWithReceiptDetails(String customerId);
}
