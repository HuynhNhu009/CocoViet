package com.cocoviet.backend.service.impl;

import com.cocoviet.backend.mapper.IStatusMapper;
import com.cocoviet.backend.models.dto.StatusDTO;
import com.cocoviet.backend.models.entity.StatusEntity;
import com.cocoviet.backend.models.request.StatusRequest;
import com.cocoviet.backend.repository.IStatusRepository;
import com.cocoviet.backend.service.IStatusService;
import jakarta.persistence.EntityNotFoundException;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Set;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class StatusServiceImpl implements IStatusService {
    @Autowired
    IStatusMapper iStatusMapper;

    @Autowired
    IStatusRepository iStatusRepository;

    @Override
    public StatusDTO addStatus(StatusRequest statusRequest){
        if(iStatusRepository.existsByStatusName(statusRequest.getStatusName())){
            throw new RuntimeException("Status already exists");
        }

        StatusEntity statusEntity = StatusEntity.builder()
                .statusName(statusRequest.getStatusName())
                .statusCode(statusRequest.getStatusCode())
                .build();
        return iStatusMapper.toStatusDTO(iStatusRepository.save(statusEntity));
    }

    @Override
    public StatusDTO getStatus(String statusName) {
        return iStatusMapper.toStatusDTO((iStatusRepository.findById(statusName))
                .orElseThrow(() -> new RuntimeException("Status not found")));
    }

    @Override
    public Set<StatusDTO> getAllStatus() {
        return iStatusMapper.toStatusDTOList(iStatusRepository.findAll());
    }


    @Override
    public String deleteStatus(String statusId) {
        StatusDTO statusDTO = iStatusMapper.toStatusDTO(
                iStatusRepository.findById(statusId)
                        .orElseThrow(() -> new EntityNotFoundException("Status ID " + statusId + " not found"))
        );

        iStatusRepository.deleteById(statusId);

        return "Deleted status: " + statusDTO.getStatusName();
    }


}
