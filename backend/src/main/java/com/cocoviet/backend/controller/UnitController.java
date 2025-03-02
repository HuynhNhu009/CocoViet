package com.cocoviet.backend.controller;


import com.cocoviet.backend.models.dto.RetailerDTO;
import com.cocoviet.backend.models.dto.UnitDTO;
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

import java.util.Set;

@RestController
@RequestMapping("/api/units")
public class UnitController {

    @Autowired
    IUnitService unitService;

    @PostMapping
    public ResponseEntity<ResponseData> addUnit(
            @RequestBody @Valid UnitRequest unitRequest,
            @RequestParam("retailerId") String retailerId) {
        UnitDTO unitDTO = unitService.addUnit(unitRequest, retailerId);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ResponseData.builder()
                        .data(unitDTO)
                        .msg("Unit '" + unitRequest.getUnitName() + "' added successfully")
                        .status("SUCCESS")
                        .build());
    }

    @PatchMapping("/{unitId}")
    public ResponseEntity<ResponseData> updateUnit(
            @PathVariable String unitId,
            @RequestBody @Valid UnitRequest unitRequest) {
        UnitDTO unitDTO = unitService.updateUnit(unitId, unitRequest);
        return ResponseEntity.ok()
                .body(ResponseData.builder()
                        .data(unitDTO)
                        .msg("Unit updated successfully")
                        .status("SUCCESS")
                        .build());
    }

    @GetMapping("/{unitId}")
    public ResponseEntity<ResponseData> getUnitById(@PathVariable String unitId) {
        UnitDTO unitDTO = unitService.getUnitById(unitId);
        return ResponseEntity.ok()
                .body(ResponseData.builder()
                        .data(unitDTO)
                        .msg("Unit retrieved successfully")
                        .status("SUCCESS")
                        .build());
    }


    @GetMapping
    public ResponseEntity<ResponseData> getAllUnits() {
        Set<UnitDTO> units = unitService.getAllUnits();
        return ResponseEntity.ok()
                .body(ResponseData.builder()
                        .data(units)
                        .msg("All units retrieved successfully")
                        .status("SUCCESS")
                        .build());
    }

    @DeleteMapping("/{unitId}")
    public ResponseEntity<ResponseData> deleteUnitById(@PathVariable String unitId) {
        String result = unitService.deleteUnitById(unitId);
        return ResponseEntity.ok()
                .body(ResponseData.builder()
                        .data(result)
                        .msg("Unit deleted successfully")
                        .status("SUCCESS")
                        .build());
    }

    @GetMapping("/{unitId}/retailers")
    public ResponseEntity<ResponseData> getAllRetailersByUnitId(@PathVariable String unitId) {
        Set<RetailerDTO> retailers = unitService.getRetailersByUnitId(unitId);
        return ResponseEntity.ok()
                .body(ResponseData.builder()
                        .data(retailers)
                        .msg("Retailers for unit '" + unitId + "' retrieved successfully")
                        .status("SUCCESS")
                        .build());
    }
}
