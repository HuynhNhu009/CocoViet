package com.cocoviet.backend.Enum;

import lombok.Getter;

@Getter
public enum OrderPayment {

    CASH("CASH", "Thanh toán khi nhận hàng"),
    ONLINE("ONLINE", "Thanh toán Online");

    private final String paymentCode;
    private final String paymentMethod;

    OrderPayment(String paymentCode, String paymentMethod) {
        this.paymentCode = paymentCode;
        this.paymentMethod = paymentMethod;
    }

    public static OrderPayment fromPaymentCode(String paymentCode) {
        for (OrderPayment status : values()) {
            if (status.paymentCode.equalsIgnoreCase(paymentCode)) {
                return status;
            }
        }
        throw new IllegalArgumentException("Không tìm thấy với mã: " + paymentCode);
    }
}
