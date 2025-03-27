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
    USER_EXISTED(1001, "User existed.", HttpStatus.INTERNAL_SERVER_ERROR),
    USERNAME_INVALID(1002, "Username must be at least 6 characters.", HttpStatus.BAD_REQUEST),
    PASSWORD_INVALID(1003, "Password must be at least 8 characters.", HttpStatus.BAD_REQUEST),
    PHONE_NUMBER_INVALID(1004, "Phone number must be at least 10 characters.", HttpStatus.BAD_REQUEST),
    TITLE_INVALID(1005, "Title must be at least 10 characters.", HttpStatus.BAD_REQUEST),
    CONTENT_INVALID(1006, "Content must be at least 10 characters.", HttpStatus.BAD_REQUEST),
    USER_NOT_EXISTED(1007, "User not existed.", HttpStatus.NOT_FOUND),
    UNAUTHENTICATED(1008, "Unauthenticated.", HttpStatus.UNAUTHORIZED),
    UNAUTHORIZED(1009, "You do not have permission.", HttpStatus.FORBIDDEN),
//    ROLE_EXISTED(1001, "Role existed.", HttpStatus.INTERNAL_SERVER_ERROR);
    TOKEN_INVALID(1010, "Token is invalid or expired.", HttpStatus.BAD_REQUEST),
    TOKEN_EXPIRED(1011, "Token has expired.", HttpStatus.UNAUTHORIZED);
    private int code;
    private String message;
    private HttpStatusCode statusCode;
}
