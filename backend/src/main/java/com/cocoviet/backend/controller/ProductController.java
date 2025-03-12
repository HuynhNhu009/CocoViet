package com.cocoviet.backend.controller;

import com.cocoviet.backend.models.dto.ProductDTO;
import com.cocoviet.backend.models.reponse.ResponseData;
import com.cocoviet.backend.models.request.ProductRequest;
import com.cocoviet.backend.service.IProductService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    IProductService productService;

    @Autowired
    private ObjectMapper objectMapper;

    @PostMapping(value = "/add", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    ResponseEntity<ResponseData> addProduct(
            @RequestPart("product") String productJson,
            @RequestPart("image") MultipartFile imageFile) throws IOException {
        try {
            ProductRequest productRequest = objectMapper.readValue(productJson, ProductRequest.class);
            ProductDTO productDTO = productService.addProduct(productRequest, imageFile);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(ResponseData.builder()
                            .data(productDTO)
                            .msg("Add product: " + productRequest.getProductName() + " successfully")
                            .status("OK")
                            .build());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ResponseData.builder()
                            .msg(e.getMessage())
                            .status("INVALID_INPUT")
                            .build());
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ResponseData.builder()
                            .msg(e.getMessage())
                            .status(e.getMessage().contains("Product name already exists")
                                    ? "PRODUCT_ALREADY_EXISTS"
                                    : "BAD_REQUEST")
                            .build());
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ResponseData.builder()
                            .msg("Failed to upload image: " + e.getMessage())
                            .status("SERVER_ERROR")
                            .build());
        }
    }

    @PatchMapping(value = "/{productId}", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    ResponseEntity<ResponseData> update(@PathVariable("productId") String productId,@RequestPart(value = "product", required = false) String productJson,
                                        @RequestPart(value = "image", required = false) MultipartFile imageFile) throws IOException {
        ProductRequest productRequest = (productJson != null)
                ? objectMapper.readValue(productJson, ProductRequest.class)
                : new ProductRequest();

        ProductDTO productDTO = productService.updateProduct(productId,productRequest, imageFile);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ResponseData.builder()
                        .data(productDTO)
                        .msg("Update product successfully")
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

    @DeleteMapping("/{productId}/{variantId}")
    ResponseEntity<ResponseData> deleteVariant(@PathVariable("productId") String productId, @PathVariable("variantId") String variantId){
        return ResponseEntity.status(HttpStatus.OK)
                .body(ResponseData.builder()
                        .data(productService.deleteVariants(productId, variantId))
                        .msg("Delete variant Id: "+ variantId +" successfully!")
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
