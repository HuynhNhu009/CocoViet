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

import java.time.LocalDateTime;
import java.util.*;
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
        StatusEntity statusEntity = iStatusRepository.findByStatusCode("CART");
        PaymentEntity paymentEntity = iPaymentRepository.findByPaymentCode("CASH");

        Set<ReceiptDetailEntity> newReceiptDetailEntity = new HashSet<>();

        OrderEntity orderEntity = iOrderRepository.findByCustomerIdStatusCode(customerEntity.getCustomerId(), "CART");

        //gio hag da ton tai
        if(orderEntity == null){
            orderEntity = OrderEntity.builder()
                    .customer(customerEntity)
                    .payment(paymentEntity)
                    .receiptDetails(newReceiptDetailEntity)
                    .orderDate(LocalDateTime.now())
                    .build();

            iOrderRepository.save(orderEntity);

            for(ReceiptDetailRequest receiptDetailRequest : orderRequest.getReceiptDetailRequests()) {

                ProductVariantEntity productVariantEntity =iProducVariantRepository.findByVariantsId(receiptDetailRequest.getProductVariantId());
                if(productVariantEntity.getStock() == 0){
                    continue;
                }
                ReceiptDetailEntity receiptDetailEntity = ReceiptDetailEntity.builder()
                        .productOrder(orderEntity)
                        .productVariant(productVariantEntity)
                        .price(productVariantEntity.getPrice())
                        .status(statusEntity)
                        .quantity(receiptDetailRequest.getQuantity())
                        .build();

                iProducVariantRepository.save(productVariantEntity);
                newReceiptDetailEntity.add(receiptDetailEntity);
            }
        }else{

            for(ReceiptDetailRequest receiptDetailRequest : orderRequest.getReceiptDetailRequests()) {

                ProductVariantEntity productVariantEntity =iProducVariantRepository.findByVariantsId(receiptDetailRequest.getProductVariantId());

                Optional<ReceiptDetailEntity> existRecieptDetailByVariants = iReceiptDetailRepository
                        .findByProductVariant_VariantsIdAndProductOrder_OrderId(receiptDetailRequest.getProductVariantId(),orderEntity.getOrderId());

                //existVariant
                if(existRecieptDetailByVariants.isPresent()){
                    ReceiptDetailEntity existReceiptDetailEntity = existRecieptDetailByVariants.get();
                    //update quantity
                    existReceiptDetailEntity.setQuantity(receiptDetailRequest.getQuantity() + existReceiptDetailEntity.getQuantity());
                    newReceiptDetailEntity.add(existReceiptDetailEntity);
                    iProducVariantRepository.save(productVariantEntity);
                }
                else{
                    ReceiptDetailEntity addRecieptDetail = ReceiptDetailEntity.builder()
                            .productOrder(orderEntity)
                            .productVariant(productVariantEntity)
                            .quantity(receiptDetailRequest.getQuantity())
                            .status(statusEntity)
                            .price(productVariantEntity.getPrice())
                            .build();

                    productVariantEntity.setStock(productVariantEntity.getStock() - receiptDetailRequest.getQuantity());
                    iProducVariantRepository.save(productVariantEntity);

                    newReceiptDetailEntity.add(addRecieptDetail);
                }
            }
        }
        iReceiptDetailRepository.saveAll(newReceiptDetailEntity);

        Set<ReceiptDetailDTO> receiptDetailDTOS = newReceiptDetailEntity.stream()
                .map(response -> ReceiptDetailDTO.builder()
                        .receiptDetailId(response.getReceiptDetailId())
                        .totalQuantity(response.getQuantity())
                        .statusName(response.getStatus().getStatusName())
                        .productVariants(productVariantMapper.toDTO(response.getProductVariant()))
                        .productName(response.getProductVariant().getProduct().getProductName())
                        .retailerName(iretailerRepository.findRetailerNameByProductId(response.getProductVariant().getProduct().getProductId()))
                        .build())
                .collect(Collectors.toSet());

        //updater
        orderEntity.setReceiptDetails(newReceiptDetailEntity);
        iOrderRepository.save(orderEntity);

        OrderDTO orderDTO = new OrderDTO();
        orderDTO.setOrderId(orderEntity.getOrderId());
        orderDTO.setOrderDate(orderEntity.getOrderDate());
        orderDTO.setCustomerName(customerEntity.getCustomerName());
        orderDTO.setCustomerAddress(customerEntity.getCustomerAddress());
        orderDTO.setCustomerNumber(customerEntity.getPhoneNumbers());
        orderDTO.setReceiptDetails(receiptDetailDTOS);
        orderDTO.setPaymentMethod(paymentEntity.getPaymentMethod());

        return orderDTO;
    }

    @Override
    public OrderDTO updateOrder(String orderId, OrderRequest orderRequest) {

        OrderEntity orderEntity = iOrderRepository.findByOrderId(orderId);
        if(orderEntity == null){
            throw new RuntimeException("Order not found");
        }
        CustomerEntity customerEntity = iCustomerRepository.findByCustomerId(orderEntity.getCustomer().getCustomerId());

        Set<ReceiptDetailEntity> newReceiptDetailEntity = new HashSet<>();
        OrderDTO orderDTO = new OrderDTO();

        //change receiptDetail
        if(orderRequest.getReceiptDetailRequests() != null){

            for(ReceiptDetailRequest receiptDetailRequest : orderRequest.getReceiptDetailRequests()) {

                ProductVariantEntity productVariantEntity =iProducVariantRepository.findByVariantsId(receiptDetailRequest.getProductVariantId());
                Optional<ReceiptDetailEntity> existRecieptDetailByVariants = iReceiptDetailRepository
                        .findByProductVariant_VariantsIdAndProductOrder_OrderId(receiptDetailRequest.getProductVariantId(),orderEntity.getOrderId());

                //variant
                if(existRecieptDetailByVariants.isPresent()){
                    ReceiptDetailEntity existReceiptDetailEntity = existRecieptDetailByVariants.get();

                    //update quantity
                    if(receiptDetailRequest.getQuantity() != 0){
                        existReceiptDetailEntity.setQuantity(receiptDetailRequest.getQuantity() );
                    }
                    //update status
                    if(receiptDetailRequest.getStatusCode() != null){
                        StatusEntity statusEntity = iStatusRepository.findByStatusCode(receiptDetailRequest.getStatusCode());
                        existReceiptDetailEntity.setStatus(statusEntity);
                    }

                    newReceiptDetailEntity.add(existReceiptDetailEntity);
                    //productVariantEntity.setStock(productVariantEntity.getStock() - receiptDetailRequest.getQuantity());
                    iProducVariantRepository.save(productVariantEntity);
                    newReceiptDetailEntity.add(existReceiptDetailEntity);
                }
            }

            iReceiptDetailRepository.saveAll(newReceiptDetailEntity);

            Set<ReceiptDetailDTO> receiptDetailDTOS = newReceiptDetailEntity.stream()
                    .map(response -> ReceiptDetailDTO.builder()
                            .receiptDetailId(response.getReceiptDetailId())
                            .totalQuantity(response.getQuantity())
                            .productVariants(productVariantMapper.toDTO(response.getProductVariant()))
                            .statusName(response.getStatus().getStatusName())
                            .productName(response.getProductVariant().getProduct().getProductName())
                            .retailerName(iretailerRepository.findRetailerNameByProductId(response.getProductVariant().getProduct().getProductId()))
                            .build())
                    .collect(Collectors.toSet());

            //updater
            orderEntity.setReceiptDetails(newReceiptDetailEntity);
            iOrderRepository.save(orderEntity);

            orderDTO.setReceiptDetails(receiptDetailDTOS);
        }else {
            Set<ReceiptDetailDTO> receiptDetailDTOS = orderEntity.getReceiptDetails().stream()
                    .map(response -> ReceiptDetailDTO.builder()
                            .receiptDetailId(response.getReceiptDetailId())
                            .totalQuantity(response.getQuantity())
                            .productVariants(productVariantMapper.toDTO(response.getProductVariant()))
                            .productName(response.getProductVariant().getProduct().getProductName())
                            .statusName(response.getStatus().getStatusName())
                            .retailerName(iretailerRepository.findRetailerNameByProductId(response.getProductVariant().getProduct().getProductId()))
                            .build())
                    .collect(Collectors.toSet());
            orderDTO.setReceiptDetails(receiptDetailDTOS);
        }

        //change payment
        if(orderRequest.getPaymentCode() != null){
            PaymentEntity paymentEntity = iPaymentRepository.findByPaymentCode(orderRequest.getPaymentCode());
            orderEntity.setPayment(paymentEntity);
        }

        //change customerInfor
//        if(orderRequest.getCustomerNumber() != null){
//            orderDTO.setCustomerNumber(orderRequest.getCustomerNumber());
//        }else{
//            orderDTO.setCustomerNumber(customerEntity.getPhoneNumbers());
//        }
//
//        if(orderRequest.getCustomerName() != null){
//            orderDTO.setCustomerName(orderRequest.getCustomerName());
//        }else {
//            orderDTO.setCustomerName(customerEntity.getCustomerName());
//        }
//        if(orderRequest.getCustomerAddress() != null){
//            orderDTO.setCustomerAddress(orderRequest.getCustomerAddress());
//        }else {
//            orderDTO.setCustomerAddress(customerEntity.getCustomerAddress());
//        }
        iOrderRepository.save(orderEntity);
        orderDTO.setOrderId(orderEntity.getOrderId());
        orderDTO.setOrderDate(orderEntity.getOrderDate());
        orderDTO.setPaymentMethod(orderEntity.getPayment().getPaymentMethod());
        return orderDTO;
    }

//    @Override
//    public List<OrderDTO> getOrderByCustomerId(String customerId) {
//        List<OrderEntity> listOrderEntities = iOrderRepository.findByCustomer_CustomerId(customerId);
//
//        List<OrderDTO> orderDTOS = listOrderEntities.stream()
//            .map(orderEntity -> {
//
//                CustomerEntity customerEntity = iCustomerRepository.findByCustomerId(orderEntity.getCustomer().getCustomerId());
//
//                Set<ReceiptDetailDTO> receiptDetailDTOS = orderEntity.getReceiptDetails().stream()
//                    .map(response -> ReceiptDetailDTO.builder()
//                        .receiptDetailId(response.getReceiptDetailId())
//                        .totalQuantity(response.getQuantity())
//                        .productVariants(productVariantMapper.toDTO(response.getProductVariant()))
//                        .productName(response.getProductVariant().getProduct().getProductName())
//                        .statusName(response.getStatus().getStatusName())
//                        .retailerName(iretailerRepository.findRetailerNameByProductId(response.getProductVariant().getProduct().getProductId()))
//                        .build())
//                    .collect(Collectors.toSet());
//
//                OrderDTO orderDTO = new OrderDTO();
//                orderDTO.setOrderId(orderEntity.getOrderId());
//                orderDTO.setOrderDate(orderEntity.getOrderDate());
//                orderDTO.setReceiptDetails(receiptDetailDTOS);
//                orderDTO.setCustomerName(customerEntity.getCustomerName());
//                orderDTO.setCustomerAddress(customerEntity.getCustomerAddress());
//                orderDTO.setCustomerNumber(customerEntity.getPhoneNumbers());
//                orderDTO.setPaymentMethod(orderEntity.getPayment().getPaymentMethod());
//
//                return orderDTO;
//            }).sorted(Comparator.comparing(OrderDTO::getOrderDate)).collect(Collectors.toList());
//
//        return orderDTOS;
//    }
@Override
public List<OrderDTO> getOrderByCustomerId(String customerId, String statusCode) {
    List<OrderEntity> listOrderEntities = iOrderRepository.findByCustomer_CustomerId(customerId);

    List<OrderDTO> orderDTOS = listOrderEntities.stream()
            .map(orderEntity -> {
                CustomerEntity customerEntity = orderEntity.getCustomer();

                Set<ReceiptDetailDTO> receiptDetailDTOS = orderEntity.getReceiptDetails().stream()
                        .filter(response -> response.getStatus().getStatusCode().equals(statusCode))
                        .map(response -> ReceiptDetailDTO.builder()
                                .receiptDetailId(response.getReceiptDetailId())
                                .totalQuantity(response.getQuantity())
                                .productVariants(productVariantMapper.toDTO(response.getProductVariant()))
                                .productName(response.getProductVariant().getProduct().getProductName())
                                .statusName(response.getStatus().getStatusName())
                                .retailerName(iretailerRepository.findRetailerNameByProductId(response.getProductVariant().getProduct().getProductId()))
                                .build())
                        .collect(Collectors.toSet());

                if (receiptDetailDTOS.isEmpty()) {
                    return null;
                }

                OrderDTO orderDTO = new OrderDTO();
                orderDTO.setOrderId(orderEntity.getOrderId());
                orderDTO.setOrderDate(orderEntity.getOrderDate());
                orderDTO.setReceiptDetails(receiptDetailDTOS);
                orderDTO.setCustomerName(customerEntity.getCustomerName());
                orderDTO.setCustomerAddress(customerEntity.getCustomerAddress());
                orderDTO.setCustomerNumber(customerEntity.getPhoneNumbers());
                orderDTO.setPaymentMethod(orderEntity.getPayment().getPaymentMethod());

                return orderDTO;
            })
            .filter(Objects::nonNull)
            .sorted(Comparator.comparing(OrderDTO::getOrderDate))
            .collect(Collectors.toList());

    return orderDTOS;
}



    @Override
    public List<OrderDTO> getOrderByRetailerId(String retailerId) {
        List<OrderEntity> listOrderEntities = iOrderRepository.findProcessingOrdersByRetailerId(retailerId);

        List<OrderDTO> orderDTOS = listOrderEntities.stream()
                .map(orderEntity -> {

                    CustomerEntity customerEntity = iCustomerRepository.findByCustomerId(orderEntity.getCustomer().getCustomerId());

                    Set<ReceiptDetailEntity> receiptDetailEntitiesByRetailerId =iReceiptDetailRepository.findReceiptDetailsByRetailerAndOrderId(retailerId, orderEntity.getOrderId());

                    Set<ReceiptDetailDTO> receiptDetailDTOS = receiptDetailEntitiesByRetailerId.stream()
                        .map(response -> ReceiptDetailDTO.builder()
                            .receiptDetailId(response.getReceiptDetailId())
                            .totalQuantity(response.getQuantity())
                            .productVariants(productVariantMapper.toDTO(response.getProductVariant()))
                            .productName(response.getProductVariant().getProduct().getProductName())
                            .statusName(response.getStatus().getStatusName())
                            .retailerName(iretailerRepository.findRetailerNameByProductId(response.getProductVariant().getProduct().getProductId()))
                            .build())
                        .collect(Collectors.toSet());

                    OrderDTO orderDTO = new OrderDTO();
                    orderDTO.setOrderId(orderEntity.getOrderId());
                    orderDTO.setOrderDate(orderEntity.getOrderDate());
                    orderDTO.setReceiptDetails(receiptDetailDTOS);
                    orderDTO.setCustomerName(customerEntity.getCustomerName());
                    orderDTO.setCustomerAddress(customerEntity.getCustomerAddress());
                    orderDTO.setCustomerNumber(customerEntity.getPhoneNumbers());
                    orderDTO.setPaymentMethod(orderEntity.getPayment().getPaymentMethod());

                    return orderDTO;
                }).sorted(Comparator.comparing(OrderDTO::getOrderDate)).collect(Collectors.toList());

        return orderDTOS;
    }

    @Override
    public List<OrderDTO> getAllOrders() {
        List<OrderEntity> listOrderEntities = iOrderRepository.findAll();

        List<OrderDTO> orderDTOS = listOrderEntities.stream()
                .map(orderEntity -> {

                    CustomerEntity customerEntity = iCustomerRepository.findByCustomerId(orderEntity.getCustomer().getCustomerId());
                    Set<ReceiptDetailDTO> receiptDetailDTOS = orderEntity.getReceiptDetails().stream()
                        .map(response -> ReceiptDetailDTO.builder()
                            .receiptDetailId(response.getReceiptDetailId())
                            .totalQuantity(response.getQuantity())
                            .productVariants(productVariantMapper.toDTO(response.getProductVariant()))
                            .productName(response.getProductVariant().getProduct().getProductName())
                            .statusName(response.getStatus().getStatusName())
                            .retailerName(iretailerRepository.findRetailerNameByProductId(response.getProductVariant().getProduct().getProductId()))
                            .build())
                        .collect(Collectors.toSet());

                    OrderDTO orderDTO = new OrderDTO();
                    orderDTO.setOrderId(orderEntity.getOrderId());
                    orderDTO.setOrderDate(orderEntity.getOrderDate());
                    orderDTO.setCustomerName(customerEntity.getCustomerName());
                    orderDTO.setCustomerAddress(customerEntity.getCustomerAddress());
                    orderDTO.setCustomerNumber(customerEntity.getPhoneNumbers());
                    orderDTO.setReceiptDetails(receiptDetailDTOS);
                    orderDTO.setPaymentMethod(orderEntity.getPayment().getPaymentMethod());

                    return orderDTO;
                }).collect(Collectors.toList());
        return orderDTOS;
    }

    @Override
    public OrderDTO deleteReceipt(String orderId, String receiptId) {
        OrderEntity orderEntity = iOrderRepository.findByOrderId(orderId);

        if(orderEntity == null){
            throw new RuntimeException("Order not found");
        }

        ReceiptDetailEntity receiptDetailEntity = iReceiptDetailRepository.findByReceiptDetailId(receiptId);
        if(receiptDetailEntity == null){
            throw new RuntimeException("ReceiptDetail not found");
        }
        CustomerEntity customerEntity = iCustomerRepository.findByCustomerId(orderEntity.getCustomer().getCustomerId());

        iReceiptDetailRepository.deleteById(receiptDetailEntity.getReceiptDetailId());
        OrderDTO orderDTO = new OrderDTO();

        Set<ReceiptDetailDTO> receiptDetailDTOS = orderEntity.getReceiptDetails().stream()
                .map(response -> ReceiptDetailDTO.builder()
                    .receiptDetailId(response.getReceiptDetailId())
                    .totalQuantity(response.getQuantity())
                    .productVariants(productVariantMapper.toDTO(response.getProductVariant()))
                    .productName(response.getProductVariant().getProduct().getProductName())
                    .statusName(response.getStatus().getStatusName())
                    .retailerName(iretailerRepository.findRetailerNameByProductId(response.getProductVariant().getProduct().getProductId()))
                    .build())
                .collect(Collectors.toSet());

        orderEntity.getReceiptDetails().remove(receiptDetailEntity);
        iOrderRepository.save(orderEntity);
        orderDTO.setCustomerName(customerEntity.getCustomerName());
        orderDTO.setCustomerAddress(customerEntity.getCustomerAddress());
        orderDTO.setCustomerNumber(customerEntity.getPhoneNumbers());
        orderDTO.setOrderId(orderEntity.getOrderId());
        orderDTO.setOrderDate(orderEntity.getOrderDate());
        orderDTO.setPaymentMethod(orderEntity.getPayment().getPaymentMethod());
        orderDTO.setReceiptDetails(receiptDetailDTOS);
        return orderDTO;
    }

    @Override
    public String deleteOrderById(String orderId){
        OrderEntity orderEntity = iOrderRepository.findByOrderId(orderId);
        if(orderEntity == null){
            throw new RuntimeException("Order not found");
        }
        iOrderRepository.deleteById(orderId);
        return "Deleted successfully";
    }


}