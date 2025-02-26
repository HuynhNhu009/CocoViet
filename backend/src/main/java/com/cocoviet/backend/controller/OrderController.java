package com.cocoviet.backend.controller;


import com.cocoviet.backend.models.reponse.ResponseData;
import com.cocoviet.backend.models.request.OrderRequest;
import com.cocoviet.backend.service.IOrderService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    IOrderService orderService;

    @PostMapping("/create")
    ResponseEntity<ResponseData> createOrder(@RequestBody @Valid OrderRequest orderRequest) {

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ResponseData.builder()
                        .data(orderService.createOrder(orderRequest))
                        .msg("Add order successfully")
                        .status("OK")
                        .build());
    }
}