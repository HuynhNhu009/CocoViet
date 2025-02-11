package com.cocoviet.backend.models.reponse;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ResponseData <T>{
    String status;
    String msg;
    T data;
}

