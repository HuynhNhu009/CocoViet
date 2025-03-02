package com.cocoviet.backend.service;

import com.cocoviet.backend.models.dto.RetailerDTO;
import com.cocoviet.backend.models.dto.UnitDTO;
import com.cocoviet.backend.models.request.UnitRequest;

import java.util.Set;

public interface IUnitService {
    UnitDTO addUnit(UnitRequest unitRequest, String retailerId);
    UnitDTO updateUnit(String unitId, UnitRequest unitRequest);
    UnitDTO getUnitById(String unitId);
    Set<UnitDTO> getAllUnits();
    String deleteUnitById(String unitId);
    Set<RetailerDTO> getRetailersByUnitId(String unitId);

}
