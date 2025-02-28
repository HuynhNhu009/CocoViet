package com.cocoviet.backend.service;

import com.cocoviet.backend.models.dto.OrderDTO;
import com.cocoviet.backend.models.request.OrderRequest;

import java.util.List;

public interface IOrderService {
    OrderDTO createOrder(OrderRequest orderRequest);
    OrderDTO updateOrder(String orderId, OrderRequest orderRequest);
    List<OrderDTO> getOrderByCustomerId(String customerId);
    List<OrderDTO> getAllOrders();

}
