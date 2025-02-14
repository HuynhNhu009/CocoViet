package com.cocoviet.backend.mapper;

import com.cocoviet.backend.models.dto.PaymentDTO;
import com.cocoviet.backend.models.entity.PaymentEntity;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface IPaymentMapper {
    PaymentDTO toPaymentDTO(PaymentEntity paymentEntity);
    List<PaymentDTO> toPaymentDTOList(List<PaymentEntity> paymentEntities);
}
