package com.cocoviet.backend.service.impl;

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
    public PaymentDTO addPaymentMethod(PaymentRequest paymentRequest) {
        if(iPaymentRepository.existsByPaymentMethod(paymentRequest.getPaymentMethod()))
            throw new RuntimeException("Payment method already exists");

        PaymentEntity paymentEntity = PaymentEntity.builder()
                .paymentMethod(paymentRequest.getPaymentMethod())
                .paymentCode(paymentRequest.getPaymentCode())
                .build();

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
