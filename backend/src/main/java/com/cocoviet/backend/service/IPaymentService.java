package com.cocoviet.backend.service;

import com.cocoviet.backend.models.dto.PaymentDTO;
import com.cocoviet.backend.models.request.PaymentRequest;

import java.util.List;

public interface IPaymentService {
    PaymentDTO addPaymentMethod(PaymentRequest paymentRequest);
    PaymentDTO getPaymentMethodById(String paymentMethodId);
    List<PaymentDTO> getAllPaymentMethod();
}
