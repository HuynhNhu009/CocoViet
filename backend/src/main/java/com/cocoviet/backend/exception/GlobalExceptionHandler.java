package com.cocoviet.backend.exception;

import com.cocoviet.backend.Enum.ErrorCode;
import com.cocoviet.backend.models.reponse.ApiResponse;
import com.cocoviet.backend.models.reponse.ResponseData;
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


    @ExceptionHandler(AppException.class)
    public ResponseEntity<ApiResponse> handleAppException(AppException ex) {
            ErrorCode errorCode = ex.getErrorCode();
            ApiResponse apiResponse = new ApiResponse();
            apiResponse.setCode(errorCode.getCode());
            apiResponse.setMsg(errorCode.getMessage());
            return ResponseEntity.badRequest().body(apiResponse);
        }
}

