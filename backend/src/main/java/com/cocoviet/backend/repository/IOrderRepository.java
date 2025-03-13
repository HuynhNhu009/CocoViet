package com.cocoviet.backend.repository;

import com.cocoviet.backend.models.entity.OrderEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface IOrderRepository extends JpaRepository<OrderEntity, String> {
    OrderEntity findByOrderId(String orderId);

    @Query("SELECT o FROM OrderEntity o " +
            "JOIN o.receiptDetails rd " +
            "WHERE rd.status.statusCode = :statusCode " +
            "AND o.customer.customerId = :customerId"
    )
    OrderEntity findByCustomerIdStatusCode(@Param("customerId")String customerId,@Param("statusCode") String statusCode);

    List<OrderEntity> findByCustomer_CustomerId(String customerId);
    @Query("SELECT o FROM OrderEntity o " +
            "JOIN o.receiptDetails rd " +
            "JOIN rd.productVariant pv " +
            "JOIN pv.product p " +
            "WHERE p.retailer.retailerId = :retailerId")
    List<OrderEntity> findProcessingOrdersByRetailerId(@Param("retailerId") String retailerId);

    @Query("SELECT o FROM OrderEntity o " +
            "JOIN o.receiptDetails rd " +
            "JOIN rd.productVariant pv " +
            "JOIN pv.product p " +
            "WHERE p.retailer.retailerId = :retailerId " +
            "AND rd.status.statusCode = :statusCode"
    )
    List<OrderEntity> findDeliveredOrdersByRetailerId(@Param("retailerId") String retailerId, @Param("statusCode") String statusCode);

    @Query("SELECT o FROM OrderEntity o " +
            "JOIN o.receiptDetails rd " +
            "WHERE rd.status.statusCode = :statusCode "
    )
    List<OrderEntity> findDeliveredOrders(@Param("statusCode") String statusCode);


}
