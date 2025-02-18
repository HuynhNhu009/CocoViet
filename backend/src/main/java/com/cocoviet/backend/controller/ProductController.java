package com.cocoviet.backend.controller;


import com.cocoviet.backend.models.reponse.ResponseData;
import com.cocoviet.backend.models.request.ProductRequest;
import com.cocoviet.backend.service.IProductService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    IProductService coconutProductService;

    @PostMapping("/add")
    ResponseEntity<ResponseData> addProduct(@RequestBody @Valid ProductRequest coconutProductRequest,
                                            @RequestPart MultipartFile productImage
                                            ) throws IOException {

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ResponseData.builder()
                        .data(coconutProductService.addProduct(coconutProductRequest))
                        .msg("Add product: "+ coconutProductRequest.getProductName() + " successfully")
                        .status("OK")
                        .build());
    }

    @PatchMapping("/{productId}")
    ResponseEntity<ResponseData> update(@ModelAttribute("productId") String productId, @RequestBody @Valid ProductRequest coconutProductRequest) throws IOException {
        return ResponseEntity.status(HttpStatus.OK)
                .body(ResponseData.builder()
                        .data(coconutProductService.updateProduct(productId,coconutProductRequest))
                        .msg("Update product Id: "+ productId +" - Name:" + coconutProductRequest.getProductName() + " successfully!")
                        .status("OK")
                        .build());

    }

    @GetMapping("/{productId}")
    ResponseEntity<ResponseData> getProduct(@PathVariable("productId") String productId){
        return ResponseEntity.status(HttpStatus.OK)
                .body(ResponseData.builder()
                        .data(coconutProductService.getProduct(productId))
                        .msg("Update product Id: "+ productId +" successfully!")
                        .status("OK")
                        .build());
    }

    @GetMapping("/get-all")
    ResponseEntity<ResponseData> getAllProduct(){
        return ResponseEntity.status(HttpStatus.OK)
                .body(ResponseData.builder()
                        .data(coconutProductService.getAllProduct())
                        .msg("Get all product successfully!")
                        .status("OK")
                        .build());
    }
}
