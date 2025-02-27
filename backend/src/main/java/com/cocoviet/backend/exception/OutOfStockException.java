package com.cocoviet.backend.exception;

public class OutOfStockException extends RuntimeException {
    private static final String STATUS = "OUT_OF_STOCK";
    public OutOfStockException(String message) {
        super(message);
    }

    public String getStatus() {
        return STATUS;
    }
}
