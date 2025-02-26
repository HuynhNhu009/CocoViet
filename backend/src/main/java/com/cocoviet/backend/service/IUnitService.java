package com.cocoviet.backend.service;

import com.cocoviet.backend.models.dto.UnitDTO;
import com.cocoviet.backend.models.request.UnitRequest;

import java.util.Set;

public interface IUnitService {
    UnitDTO addUnit(UnitRequest unitRequest);
    UnitDTO updateUnit(String unitId, UnitRequest unitRequest);
    UnitDTO getUnitById(String unitId);
    Set<UnitDTO> getAllUnits();
    String deleteUnitById(String unitId);

}
