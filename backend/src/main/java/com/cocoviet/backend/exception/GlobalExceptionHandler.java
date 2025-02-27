package com.cocoviet.backend.exception;

import com.cocoviet.backend.models.reponse.ResponseData;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(value = RuntimeException.class)
    ResponseEntity<ResponseData> handleRuntimeException(RuntimeException exception) {
        ResponseData responseData = new ResponseData();
        responseData.setStatus("500");
        responseData.setMsg(exception.getMessage());
        return ResponseEntity.badRequest().body(responseData);
    }


    @ExceptionHandler(OutOfStockException.class)
    public ResponseEntity<ResponseData> handleOutOfStockException(OutOfStockException ex) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(ResponseData.builder()
                        .data(null)
                        .msg(ex.getMessage())
                        .status(ex.getStatus())
                        .build());
    }

}
