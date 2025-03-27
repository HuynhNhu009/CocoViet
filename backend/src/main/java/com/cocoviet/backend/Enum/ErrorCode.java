package com.cocoviet.backend.Enum;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public enum ErrorCode {
    UNAUTHENTICATED(1008, "Unauthenticated.", HttpStatus.UNAUTHORIZED),
    UNAUTHORIZED(1009, "You do not have permission.", HttpStatus.FORBIDDEN),
//    ROLE_EXISTED(1001, "Role existed.", HttpStatus.INTERNAL_SERVER_ERROR);
    TOKEN_INVALID(1010, "Token is invalid or expired.", HttpStatus.BAD_REQUEST),
    TOKEN_EXPIRED(1011, "Token has expired.", HttpStatus.UNAUTHORIZED);
    private int code;
    private String message;
    private HttpStatusCode statusCode;
}
