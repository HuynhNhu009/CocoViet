package com.cocoviet.backend.service;

import com.cocoviet.backend.models.dto.OrderDTO;
import com.cocoviet.backend.models.request.OrderRequest;

import java.util.List;

public interface IOrderService {
    OrderDTO createOrder(OrderRequest orderRequest);
//    OrderDTO getOrderByCustomerId(String customerId);
//    OrderDTO getAllOrders();

}
