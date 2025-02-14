package com.cocoviet.backend.service;

import com.cocoviet.backend.models.dto.StatusDTO;
import com.cocoviet.backend.models.request.StatusRequest;

import java.util.Set;

public interface IStatusService {
    StatusDTO addStatus(StatusRequest statusRequest);
    StatusDTO getStatus(String statusName);
    Set<StatusDTO> getAllStatus();
    String deleteStatus(String statusId);
}
