package com.cocoviet.backend.controller;

import com.cocoviet.backend.models.reponse.ResponseData;
import com.cocoviet.backend.models.request.StatusRequest;
import com.cocoviet.backend.service.IStatusService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/status")
public class StatusController {
    @Autowired
    IStatusService iStatusService;

    @GetMapping("/{statusId}")
    public ResponseEntity<ResponseData> getStatusById(@PathVariable("statusId") String statusId){
        return ResponseEntity.status(HttpStatus.OK)
                .body(ResponseData.builder()
                        .data(iStatusService.getStatus(statusId))
                        .msg("Get Status Id: "+ statusId +" successfully!")
                        .status("OK")
                        .build());
    }

    @PostMapping("/add")
    public ResponseEntity<ResponseData> addStatus(@RequestBody @Valid StatusRequest statusRequest){
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ResponseData.builder()
                        .data(iStatusService.addStatus(statusRequest))
                        .msg("Create Status: "+ statusRequest.getStatusName() +" successfully!")
                        .status("OK")
                        .build());
    }
}
