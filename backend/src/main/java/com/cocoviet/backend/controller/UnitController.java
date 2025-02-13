package com.cocoviet.backend.controller;


import com.cocoviet.backend.models.reponse.ResponseData;
import com.cocoviet.backend.models.request.CategoryRequest;
import com.cocoviet.backend.models.request.UnitRequest;
import com.cocoviet.backend.service.ICategoryService;
import com.cocoviet.backend.service.IUnitService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/units")
public class UnitController {

    @Autowired
    IUnitService unitService;

    @PostMapping("/add")
    ResponseEntity<ResponseData> addUnit(@RequestBody @Valid UnitRequest unitRequest){

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ResponseData.builder()
                        .data(unitService.addUnit(unitRequest))
                        .msg("Add unit: "+ unitRequest.getUnitName() + " successfully")
                        .status("OK")
                        .build());
    }


    @PatchMapping("/update/{unitId}")
    ResponseEntity<ResponseData> updateUnit(@PathVariable String unitId,
                                                       @RequestBody @Valid UnitRequest unitRequest) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(ResponseData.builder()
                        .data(unitService.updateUnit(unitId, unitRequest))
                        .msg("Update Unit success!")
                        .status("OK")
                        .build());
    }

    @GetMapping("/{unitId}")
    ResponseEntity<ResponseData> getUnitById(@PathVariable String unitId){

        return ResponseEntity.status(HttpStatus.OK)
                .body(ResponseData.builder()
                        .data(unitService.getUnitById(unitId))
                        .msg("Get Unit success")
                        .status("OK")
                        .build());
    }

    @GetMapping("/get-all")
    ResponseEntity<ResponseData> getAllUnits(){

        return ResponseEntity.status(HttpStatus.OK)
                .body(ResponseData.builder()
                        .data(unitService.getAllUnits())
                        .msg("Get all units success")
                        .status("OK")
                        .build());
    }
}
