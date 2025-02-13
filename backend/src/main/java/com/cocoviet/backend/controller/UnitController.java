package com.cocoviet.backend.controller;


import com.cocoviet.backend.models.reponse.ResponseData;
import com.cocoviet.backend.models.request.CategoryRequest;
import com.cocoviet.backend.service.ICategoryService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {

    @Autowired
    ICategoryService coconutCategoryService;

    @PostMapping("/add")
    ResponseEntity<ResponseData> addCategory(@RequestBody @Valid CategoryRequest categoryRequest){

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ResponseData.builder()
                        .data(coconutCategoryService.addCategory(categoryRequest))
                        .msg("Add category: "+ categoryRequest.getCategoryName() + " successfully")
                        .status("OK")
                        .build());
    }


    @PutMapping("/update/{categoryId}")
    ResponseEntity<ResponseData> updateCategory(@PathVariable String categoryId,
                                                       @RequestBody @Valid CategoryRequest categoryRequest) {

        return ResponseEntity.status(HttpStatus.OK)
                .body(ResponseData.builder()
                        .data(coconutCategoryService.updateCategory(categoryId, categoryRequest))
                        .msg("Update Category success!")
                        .status("OK")
                        .build());
    }

    @GetMapping("/{categoryId}")
    ResponseEntity<ResponseData> getCategoryById(@PathVariable String categoryId){

        return ResponseEntity.status(HttpStatus.OK)
                .body(ResponseData.builder()
                        .data(coconutCategoryService.getCategoryById(categoryId))
                        .msg("Get Category success")
                        .status("OK")
                        .build());
    }

    @GetMapping("/get-all")
    ResponseEntity<ResponseData> getAllCatgeory(){

        return ResponseEntity.status(HttpStatus.OK)
                .body(ResponseData.builder()
                        .data(coconutCategoryService.getAllCategories())
                        .msg("Get all categories success")
                        .status("OK")
                        .build());
    }
}
