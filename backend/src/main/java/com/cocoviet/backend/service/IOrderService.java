package com.cocoviet.backend.service;

import com.cocoviet.backend.models.dto.OrderDTO;
import com.cocoviet.backend.models.request.OrderRequest;

public interface IOrderService {
    OrderDTO createOrder(OrderRequest orderRequest);
//    OrderDTO getOrderById(String orderId);
}
