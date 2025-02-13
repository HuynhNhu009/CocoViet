package com.cocoviet.backend.service;

import com.cocoviet.backend.models.dto.StatusDTO;
import com.cocoviet.backend.models.entity.StatusEntity;
import com.cocoviet.backend.models.request.StatusRequest;

import java.util.List;

public interface IStatusService {
    StatusDTO addStatus(StatusRequest statusRequest);
    StatusDTO getStatus(String statusName);
    List<StatusDTO> getAllStatus(List<StatusEntity> statusEntityList);
}
