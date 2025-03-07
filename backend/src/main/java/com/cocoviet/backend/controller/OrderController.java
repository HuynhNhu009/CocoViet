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

    @PatchMapping("/update/{orderId}")
    ResponseEntity<ResponseData> updateOrder(@PathVariable String orderId, @RequestBody @Valid OrderRequest orderRequest ) {

        return ResponseEntity.status(HttpStatus.OK)
                .body(ResponseData.builder()
                        .data(orderService.updateOrder(orderId, orderRequest))
                        .msg("Get order successfully")
                        .status("OK")
                        .build());
    }

    @GetMapping("/")
    ResponseEntity<ResponseData> getOrderByCustomerId(@RequestParam String customerId, @RequestParam String statusCode ) {

        return ResponseEntity.status(HttpStatus.OK)
                .body(ResponseData.builder()
                        .data(orderService.getOrderByCustomerId(customerId, statusCode))
                        .msg("Get order successfully")
                        .status("OK")
                        .build());
    }
    @GetMapping("/by/{retailerId}")
    ResponseEntity<ResponseData> getOrderByRetailerId(@PathVariable String retailerId ) {

        return ResponseEntity.status(HttpStatus.OK)
                .body(ResponseData.builder()
                        .data(orderService.getOrderByRetailerId(retailerId))
                        .msg("Get order by retailerId successfully")
                        .status("OK")
                        .build());
    }

    @GetMapping("/get-all")
    ResponseEntity<ResponseData> getAllOrder( ) {

        return ResponseEntity.status(HttpStatus.OK)
                .body(ResponseData.builder()
                        .data(orderService.getAllOrders())
                        .msg("Get all order successfully")
                        .status("OK")
                        .build());
    }

    @DeleteMapping("/{orderId}/receipt/{receiptId}")
    public ResponseEntity<ResponseData> deleteReceipt(@PathVariable String orderId, @PathVariable String receiptId) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(ResponseData.builder()
                        .data(orderService.deleteReceipt(orderId, receiptId))
                        .msg("Delete receipt successfully")
                        .status("OK")
                        .build());
    }


    @DeleteMapping("/{orderId}")
    public ResponseEntity<ResponseData> deleteReceipt(@PathVariable String orderId) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(ResponseData.builder()
                        .data(orderService.deleteOrderById(orderId))
                        .msg("Delete order successfully")
                        .status("OK")
                        .build());
    }


    @GetMapping("/revenue")
    public ResponseEntity<ResponseData> getRevenue(@RequestParam String retailerId, @RequestParam String statusCode) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(ResponseData.builder()
                        .data(orderService.getRevenue(retailerId, statusCode))
                        .msg("Get revenue successfully")
                        .status("OK")
                        .build());
    }
}