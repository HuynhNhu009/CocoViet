package com.cocoviet.backend.Enum;

public enum OrderPayment {

    CASH("CASH", "Thanh toán khi nhận hàng"),
    ONLINE("ONLINE", "Thanh toán Online");

    private final String paymentCode;
    private final String paymentMethod;

    OrderPayment(String paymentCode, String paymentMethod) {
        this.paymentCode = paymentCode;
        this.paymentMethod = paymentMethod;
    }

    public String getPaymentCode() {
        return paymentCode;
    }

    public String getpaymentMethod() {
        return paymentMethod;
    }

    public static OrderPayment frompaymentCode(String paymentCode) {
        for (OrderPayment status : values()) {
            if (status.paymentCode.equalsIgnoreCase(paymentCode)) {
                return status;
            }
        }
        throw new IllegalArgumentException("Không tìm thấy với mã: " + paymentCode);
    }
}
