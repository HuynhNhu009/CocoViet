package com.cocoviet.backend.service.impl;

import com.cocoviet.backend.models.dto.OrderDTO;
import com.cocoviet.backend.models.dto.ProductVariantDTO;
import com.cocoviet.backend.models.dto.ReceiptDetailDTO;
import com.cocoviet.backend.models.entity.*;
import com.cocoviet.backend.models.request.OrderRequest;
import com.cocoviet.backend.models.request.ReceiptDetailRequest;
import com.cocoviet.backend.repository.*;
import com.cocoviet.backend.service.IOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class OrderServiceImpl implements IOrderService {

    @Autowired
    private IProducVariantRepository iProducVariantRepository;

    @Autowired
    private IStatusRepository iStatusRepository;

    @Autowired
    private ICustomerRepository iCustomerRepository;

    @Autowired
    private IPaymentRepository iPaymentRepository;

    @Autowired
    private IReceiptDetailRepository iReceiptDetailRepository;


    @Override
    public OrderDTO createOrder(OrderRequest orderRequest) {
        CustomerEntity customerEntity = iCustomerRepository.findByCustomerId(orderRequest.getCustomerId());
        StatusEntity statusEntity = iStatusRepository.findByStatusId(orderRequest.getStatusId());
        PaymentEntity paymentEntity = iPaymentRepository.findByPaymentId(orderRequest.getPaymentId());

        Set<ReceiptDetailEntity> newReceiptDetailEntity = new HashSet<>();

        for(ReceiptDetailRequest receiptDetailRequest : orderRequest.getReceiptDetailRequests()) {

            ProductVariantEntity productVariantEntity =iProducVariantRepository.findByVariantsId(receiptDetailRequest.getProductVariantId());

            ReceiptDetailEntity receiptDetailEntity = ReceiptDetailEntity.builder()
                    .productVariant(productVariantEntity)
                    .price(productVariantEntity.getPrice())
                    .quantity(receiptDetailRequest.getQuantity())
                    .build();

            productVariantEntity.setStock(productVariantEntity.getStock() - receiptDetailRequest.getQuantity());
            newReceiptDetailEntity.add(receiptDetailEntity);
        }
        iReceiptDetailRepository.saveAll(newReceiptDetailEntity);

        OrderEntity orderEntity = OrderEntity.builder()
                .customer(customerEntity)
                .status(statusEntity)
                .payment(paymentEntity)
                .receiptDetails(newReceiptDetailEntity)
                .orderDate(LocalDateTime.now())
                .build();

        Set<ReceiptDetailDTO> receiptDetailDTOS = newReceiptDetailEntity.stream()
                .map(response -> ReceiptDetailDTO.builder()
                        .customerName(customerEntity.getCustomerName())
                        .customerNumber(customerEntity.getPhoneNumbers())
                        .retailerName()
                        .build()
                .collect(Collectors.toSet());

        OrderDTO orderDTO = new OrderDTO();
        orderDTO.setOrderDate(orderEntity.getOrderDate());
        orderDTO.setStatusName(statusEntity.getStatusName());
        orderDTO.setReceiptDetails


        return orderDTO;
    }

    @Override
    public OrderDTO getOrderById(String orderId) {
//        UnitEntity unitEntity = iUnitRepository.findById(unitId)
//                .orElseThrow(() -> new RuntimeException("Unit not found"));
//
//        if (iUnitRepository.existsByUnitName(unitRequest.getUnitName())) {
//            throw new RuntimeException("Unit name already exists");
//        }
//
//        unitEntity.setUnitName(unitRequest.getUnitName());
//        return iUnitMapper.toUnitDTO(iUnitRepository.save(unitEntity));

        OrderDTO orderDTO = new  OrderDTO();


        return orderDTO;
    }


}
