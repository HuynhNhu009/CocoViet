package com.cocoviet.backend.service.impl;

import com.cocoviet.backend.Enum.OrderPayment;
import com.cocoviet.backend.mapper.IPaymentMapper;
import com.cocoviet.backend.models.dto.PaymentDTO;
import com.cocoviet.backend.models.entity.PaymentEntity;
import com.cocoviet.backend.models.request.PaymentRequest;
import com.cocoviet.backend.repository.IPaymentRepository;
import com.cocoviet.backend.service.IPaymentService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PaymentServiceImpl implements IPaymentService {

    @Autowired
    IPaymentMapper iPaymentMapper;
    @Autowired
    IPaymentRepository iPaymentRepository;

    @Override
    public PaymentDTO addPaymentMethod() {
        PaymentEntity paymentEntity = new PaymentEntity();
        for (OrderPayment orderPayment : OrderPayment.values()) {
            if (!iPaymentRepository.existsByPaymentMethod(orderPayment.getpaymentMethod())) {
                paymentEntity = PaymentEntity.builder()
                    .paymentMethod(orderPayment.getpaymentMethod())
                    .paymentCode(orderPayment.getPaymentCode())
                    .build();
                iPaymentRepository.save(paymentEntity);
            }
        }
        return iPaymentMapper.toPaymentDTO(iPaymentRepository.save(paymentEntity));
    }

    @Override
    public PaymentDTO getPaymentMethodById(String paymentMethodId) {
       PaymentEntity paymentEntity = iPaymentRepository.findById(paymentMethodId)
               .orElseThrow(() -> new RuntimeException("Payment method not found"));
        return iPaymentMapper.toPaymentDTO(paymentEntity);
    }

    @Override
    public List<PaymentDTO> getAllPaymentMethod() {
        return iPaymentMapper.toPaymentDTOList(iPaymentRepository.findAll());
    }
}
