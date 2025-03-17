package com.cocoviet.backend.Enum;

public enum OrderStatus {

    CART("CART", "Giỏ Hàng"),
    PROCESSING("PROCESSING", "Đang Xử Lý"),
    SHIPPING("SHIPPING", "Đang Giao"),
    DELIVERED("DELIVERED", "Đã Giao"),
    CANCELLED("CANCELLED", "Đã Hủy");

    private final String statusCode;
    private final String statusName;

    OrderStatus(String statusCode, String statusName) {
        this.statusCode = statusCode;
        this.statusName = statusName;
    }

    public String getStatusCode() {
        return statusCode;
    }

    public String getStatusName() {
        return statusName;
    }

    public static OrderStatus fromStatusCode(String statusCode) {
        for (OrderStatus status : values()) {
            if (status.statusCode.equalsIgnoreCase(statusCode)) {
                return status;
            }
        }
        throw new IllegalArgumentException("Không tìm thấy trạng thái với mã: " + statusCode);
    }
}
