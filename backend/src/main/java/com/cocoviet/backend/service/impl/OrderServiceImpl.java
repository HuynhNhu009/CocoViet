package com.cocoviet.backend.service.impl;

import com.cocoviet.backend.mapper.ProductVariantMapper;
import com.cocoviet.backend.models.dto.OrderDTO;
import com.cocoviet.backend.models.dto.ReceiptDetailDTO;
import com.cocoviet.backend.models.entity.*;
import com.cocoviet.backend.models.request.OrderRequest;
import com.cocoviet.backend.models.request.ReceiptDetailRequest;
import com.cocoviet.backend.repository.*;
import com.cocoviet.backend.service.IOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.HashSet;
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
    private IRetailerRepository iretailerRepository;

    @Autowired
    private IOrderRepository iOrderRepository;

    @Autowired
    private IPaymentRepository iPaymentRepository;

    @Autowired
    private ProductVariantMapper productVariantMapper;

    @Autowired
    private IReceiptDetailRepository iReceiptDetailRepository;


    @Override
    public OrderDTO createOrder(OrderRequest orderRequest) {
        CustomerEntity customerEntity = iCustomerRepository.findByCustomerId(orderRequest.getCustomerId());
        StatusEntity statusEntity = iStatusRepository.findByStatusId(orderRequest.getStatusId());
        PaymentEntity paymentEntity = iPaymentRepository.findByPaymentId(orderRequest.getPaymentId());

        Set<ReceiptDetailEntity> newReceiptDetailEntity = new HashSet<>();
        OrderEntity orderEntity = OrderEntity.builder()
                .customer(customerEntity)
                .status(statusEntity)
                .payment(paymentEntity)
                .receiptDetails(newReceiptDetailEntity)
                .orderDate(LocalDateTime.now())
                .build();
        iOrderRepository.save(orderEntity);

        for(ReceiptDetailRequest receiptDetailRequest : orderRequest.getReceiptDetailRequests()) {

            ProductVariantEntity productVariantEntity =iProducVariantRepository.findByVariantsId(receiptDetailRequest.getProductVariantId());

            ReceiptDetailEntity receiptDetailEntity = ReceiptDetailEntity.builder()
                    .productOrder(orderEntity)
                    .productVariant(productVariantEntity)
                    .price(productVariantEntity.getPrice())
                    .quantity(receiptDetailRequest.getQuantity())
                    .build();

            productVariantEntity.setStock(productVariantEntity.getStock() - receiptDetailRequest.getQuantity());
            iProducVariantRepository.save(productVariantEntity);

            newReceiptDetailEntity.add(receiptDetailEntity);
        }
        iReceiptDetailRepository.saveAll(newReceiptDetailEntity);

        Set<ReceiptDetailDTO> receiptDetailDTOS = newReceiptDetailEntity.stream()
                .map(response -> ReceiptDetailDTO.builder()
                        .receiptDetailId(response.getReceiptDetailId())
                        .totalQuantity(response.getQuantity())
                        //data type BigDecimal, khi * dung multiply(), ep kieu int sang BigDecimal.valueOf
                        .totalPrice(response.getProductVariant().getPrice().multiply(BigDecimal.valueOf(response.getQuantity())))
                        .productVariants(productVariantMapper.toDTO(response.getProductVariant()))
                        .customerName(customerEntity.getCustomerName())
                        .customerNumber(customerEntity.getPhoneNumbers())
                        .customerAddress(customerEntity.getCustomerAddress())
                        .productName(response.getProductVariant().getProduct().getProductName())
                        .retailerName(iretailerRepository.findRetailerNameByProductId(response.getProductVariant().getProduct().getProductId()))
                        .build())
                .collect(Collectors.toSet());

        //updater
        orderEntity.setReceiptDetails(newReceiptDetailEntity);
        iOrderRepository.save(orderEntity);

        OrderDTO orderDTO = new OrderDTO();
        orderDTO.setOrderDate(orderEntity.getOrderDate());
        orderDTO.setStatusName(statusEntity.getStatusName());
        orderDTO.setReceiptDetails(receiptDetailDTOS);
        orderDTO.setPaymentMethod(paymentEntity.getPaymentMethod());

        return orderDTO;
    }

//    @Override
//    public OrderDTO getOrderById(String orderId) {
////        UnitEntity unitEntity = iUnitRepository.findById(unitId)
////                .orElseThrow(() -> new RuntimeException("Unit not found"));
////
////        if (iUnitRepository.existsByUnitName(unitRequest.getUnitName())) {
////            throw new RuntimeException("Unit name already exists");
////        }
////
////        unitEntity.setUnitName(unitRequest.getUnitName());
////        return iUnitMapper.toUnitDTO(iUnitRepository.save(unitEntity));
//
//        OrderDTO orderDTO = new  OrderDTO();
//
//
//        return orderDTO;
//    }


}
