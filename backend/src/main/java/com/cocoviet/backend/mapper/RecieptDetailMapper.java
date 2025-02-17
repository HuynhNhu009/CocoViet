//package com.cocoviet.backend.mapper;
//
//import com.cocoviet.backend.models.dto.ProductVariantDTO;
//import com.cocoviet.backend.models.dto.ReceiptDetailDTO;
//import com.cocoviet.backend.models.entity.ProductVariantEntity;
//import com.cocoviet.backend.models.entity.ReceiptDetailEntity;
//import org.springframework.stereotype.Component;
//
//import java.math.BigDecimal;
//import java.util.Set;
//import java.util.stream.Collectors;
//
//@Component
//public class RecieptDetailMapper {
//
//        public Set<ReceiptDetailDTO> receiptDetailDTOS = newReceiptDetailEntity.stream()
//                .map(response -> ReceiptDetailDTO.builder()
//                        .receiptDetailId(response.getReceiptDetailId())
//                        .totalQuantity(response.getQuantity())
//                        .totalPrice(response.getProductVariant().getPrice().multiply(BigDecimal.valueOf(response.getQuantity())))
//                        .productVariants(productVariantMapper.toDTO(response.getProductVariant()))
//                        .customerName(customerEntity.getCustomerName())
//                        .customerNumber(customerEntity.getPhoneNumbers())
//                        .customerAddress(customerEntity.getCustomerAddress())
//                        .productName(response.getProductVariant().getProduct().getProductName())
//                        .retailerName(iretailerRepository.findRetailerNameByProductId(response.getProductVariant().getProduct().getProductId()))
//                        .build())
//                .collect(Collectors.toSet());
//
//    public ReceiptDetailDTO toDTO(ReceiptDetailEntity receiptDetailEntity) {
//        return ReceiptDetailDTO.builder()
//                .receiptDetailId(receiptDetailEntity.getReceiptDetailId())
//                .totalQuantity(receiptDetailEntity.getQuantity())
//                .totalPrice(receiptDetailEntity.getProductVariant().getPrice().multiply(BigDecimal.valueOf(response.getQuantity())))
//                .productVariants(productVariantMapper.toDTO(response.getProductVariant()))
//                .customerName(receiptDetailEntity.getCustomerName())
//                .customerNumber(receiptDetailEntity.getPhoneNumbers())
//                .customerAddress(receiptDetailEntity.getCustomerAddress())
//                .productName(receiptDetailEntity.getProductVariant().getProduct().getProductName())
//                .retailerName(iretailerRepository.findRetailerNameByProductId(receiptDetailEntity.getProductVariant().getProduct().getProductId()))
//                .build())
//                .build();
//    }
//
//
//
//}
//
