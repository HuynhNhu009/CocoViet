package com.cocoviet.backend.service.impl;

import com.cocoviet.backend.mapper.IUnitMapper;
import com.cocoviet.backend.models.dto.UnitDTO;
import com.cocoviet.backend.models.entity.UnitEntity;
import com.cocoviet.backend.models.request.UnitRequest;
import com.cocoviet.backend.repository.IUnitRepository;
import com.cocoviet.backend.service.IUnitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class UnitServiceImpl implements IUnitService {

    @Autowired
    private IUnitRepository iUnitRepository;

    @Autowired
    private IUnitMapper iUnitMapper;

    @Override
    public UnitDTO addUnit(UnitRequest unitRequest) {
        if (iUnitRepository.existsByUnitName(unitRequest.getUnitName())) {
            throw new RuntimeException("Unit name already exists");
        }

        UnitEntity unitEntity = UnitEntity.builder()
                .unitName(unitRequest.getUnitName())
                .build();

        return iUnitMapper.toUnitDTO(iUnitRepository.save(unitEntity));
    }

    @Override
    public UnitDTO updateUnit(String unitId, UnitRequest unitRequest) {
        UnitEntity unitEntity = iUnitRepository.findById(unitId)
                .orElseThrow(() -> new RuntimeException("Unit not found"));

        if (iUnitRepository.existsByUnitName(unitRequest.getUnitName())) {
            throw new RuntimeException("Unit name already exists");
        }

        unitEntity.setUnitName(unitRequest.getUnitName());
        return iUnitMapper.toUnitDTO(iUnitRepository.save(unitEntity));
    }

    @Override
    public UnitDTO getUnitById(String unitId) {
        UnitEntity unitEntity = iUnitRepository.findById(unitId)
                .orElseThrow(() -> new RuntimeException("Unit not found"));

        return iUnitMapper.toUnitDTO(iUnitRepository.save(unitEntity));
    }

    @Override
    public Set<UnitDTO> getAllUnits() {
        return iUnitMapper.toSetUnitDTO(iUnitRepository.findAll());
    }
}
