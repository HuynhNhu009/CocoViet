package com.cocoviet.backend.controller;

import com.cocoviet.backend.models.reponse.ResponseData;
import com.cocoviet.backend.models.request.ProductRequest;
import com.cocoviet.backend.service.IProductService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    IProductService productService;

    @Autowired
    private ObjectMapper objectMapper;

    @PostMapping(value = "/add", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    ResponseEntity<ResponseData> addProduct(@RequestPart("product") String productJson,
                                            @RequestPart("image") MultipartFile imageFile) throws IOException {

        ProductRequest productRequest = objectMapper.readValue(productJson, ProductRequest.class);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ResponseData.builder()
                        .data(productService.addProduct(productRequest, imageFile))
                        .msg("Add product: "+ productRequest.getProductName() + " successfully")
                        .status("OK")
                        .build());
    }

    @PatchMapping("/{productId}")
    ResponseEntity<ResponseData> update(@PathVariable("productId") String productId, @RequestBody @Valid ProductRequest coconutProductRequest) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(ResponseData.builder()
                        .data(productService.updateProduct(productId,coconutProductRequest))
                        .msg("Update product Id: "+ productId +" - Name:" + coconutProductRequest.getProductName() + " successfully!")
                        .status("OK")
                        .build());

    }

    @GetMapping("/{productId}")
    ResponseEntity<ResponseData> getProduct(@PathVariable("productId") String productId){
        return ResponseEntity.status(HttpStatus.OK)
                .body(ResponseData.builder()
                        .data(productService.getProduct(productId))
                        .msg("Update product Id: "+ productId +" successfully!")
                        .status("OK")
                        .build());
    }

    @GetMapping("/get-all")
    ResponseEntity<ResponseData> getAllProduct(){
        return ResponseEntity.status(HttpStatus.OK)
                .body(ResponseData.builder()
                        .data(productService.getAllProduct())
                        .msg("Get all product successfully!")
                        .status("OK")
                        .build());
    }

    @GetMapping("/category/{categoryId}")
    ResponseEntity<ResponseData> getAllProduct(@PathVariable String categoryId){
        return ResponseEntity.status(HttpStatus.OK)
                .body(ResponseData.builder()
                        .data(productService.getProductByCategory(categoryId))
                        .msg("Get all product successfully!")
                        .status("OK")
                        .build());
    }

    @GetMapping("/retailer/{retailerId}")
    ResponseEntity<ResponseData> getAllProductByRetailerId(@PathVariable String retailerId){
        return ResponseEntity.status(HttpStatus.OK)
                .body(ResponseData.builder()
                        .data(productService.getProductListByRetailerId(retailerId))
                        .msg("Get all product by retailer successfully!")
                        .status("OK").build());
    }
}
