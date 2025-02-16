package com.cocoviet.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cocoviet.backend.models.reponse.ResponseData;
import com.cocoviet.backend.models.request.PaymentRequest;
import com.cocoviet.backend.service.IPaymentService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {
        @Autowired
        IPaymentService iPaymentService;

        @PostMapping("/add")
        public ResponseEntity<ResponseData> addPaymemt(@RequestBody @Valid PaymentRequest paymentRequest) {
                return ResponseEntity.status(HttpStatus.CREATED)
                                .body(ResponseData.builder()
                                                .data(iPaymentService.addPaymentMethod(paymentRequest))
                                                .msg("Create Status: " + paymentRequest.getPaymentMethod()
                                                                + " successfully!")
                                                .status("OK")
                                                .build());
        }

        @GetMapping("/{paymentId}")
        public ResponseEntity<ResponseData> getPaymentById(@PathVariable("paymentId") String paymentId) {
                return ResponseEntity.status(HttpStatus.OK)
                                .body(ResponseData.builder()
                                                .data(iPaymentService.getPaymentMethodById(paymentId))
                                                .msg("Get payment method Id: " + paymentId + " successfully!")
                                                .status("OK")
                                                .build());
        }

        @GetMapping("/get-all-payment-method")
        public ResponseEntity<ResponseData> getAllPaymentMethod() {
                return ResponseEntity.status(HttpStatus.OK)
                                .body(ResponseData.builder()
                                                .data(iPaymentService.getAllPaymentMethod())
                                                .msg("Get all payment method successfully!")
                                                .status("OK")
                                                .build());
        }

}
