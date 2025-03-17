package com.cocoviet.backend.controller;

import com.cocoviet.backend.models.reponse.ResponseData;
import com.cocoviet.backend.models.request.StatusRequest;
import com.cocoviet.backend.service.IStatusService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    public ResponseEntity<ResponseData> addStatus(){
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ResponseData.builder()
                        .data(iStatusService.addStatus())
                        .msg("Create Status: successfully!")
                        .status("OK")
                        .build());
    }

    @GetMapping("/get-all")
    public ResponseEntity<ResponseData> getAllStatus(){
        return ResponseEntity.status(HttpStatus.OK)
                .body(ResponseData.builder()
                        .data(iStatusService.getAllStatus())
                        .msg("Get all status successfully!")
                        .status("OK").build());

    }

    @DeleteMapping("/{statusId}")
    public  ResponseEntity<ResponseData>  deleteStatus(@PathVariable("statusId") String statusId){
        return ResponseEntity.status(HttpStatus.OK)
                .body(ResponseData.builder()
                        .data(iStatusService.deleteStatus(statusId))
                        .msg("Delete status "+ statusId +" successfully!")
                        .status("OK").build())
                ;
    }
}
