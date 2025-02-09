package com.cocoviet.backend.models.reponse;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CustomerResponse {

    String customerName;
    String customerEmail;
    String phoneNumbers;
    String customerAvatar;
    String customerAddress;
}
