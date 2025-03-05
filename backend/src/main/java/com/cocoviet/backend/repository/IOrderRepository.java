package com.cocoviet.backend.repository;

import com.cocoviet.backend.models.entity.OrderEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface IOrderRepository extends JpaRepository<OrderEntity, String> {
    OrderEntity findByOrderId(String orderId);
    OrderEntity findByCustomer_CustomerIdAndStatus_StatusCode(String customerCustomerId, String statusStatusCode);
    List<OrderEntity> findByCustomer_CustomerId(String customerId);
    @Query("SELECT o FROM OrderEntity o " +
            "JOIN o.receiptDetails rd " +
            "JOIN rd.productVariant pv " +
            "JOIN pv.product p " +
            "WHERE p.retailer.retailerId = :retailerId")
    List<OrderEntity> findProcessingOrdersByRetailerId(@Param("retailerId") String retailerId);

}
