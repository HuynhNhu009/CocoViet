package com.cocoviet.backend.service.impl;

import com.cocoviet.backend.mapper.IRetailerMapper;
import com.cocoviet.backend.mapper.IUnitMapper;
import com.cocoviet.backend.models.dto.RetailerDTO;
import com.cocoviet.backend.models.dto.UnitDTO;
import com.cocoviet.backend.models.entity.RetailerEntity;
import com.cocoviet.backend.models.entity.UnitEntity;
import com.cocoviet.backend.models.request.UnitRequest;
import com.cocoviet.backend.repository.IProductRepository;
import com.cocoviet.backend.repository.IProductVariantRepository;
import com.cocoviet.backend.repository.IRetailerRepository;
import com.cocoviet.backend.repository.IUnitRepository;
import com.cocoviet.backend.service.IUnitService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class UnitServiceImpl implements IUnitService {

    @Autowired
    private IUnitRepository iUnitRepository;

    @Autowired
    private IRetailerRepository iRetailerRepository;

    @Autowired
    private IProductVariantRepository iProductVariantRepository;

    @Autowired
    private IUnitMapper iUnitMapper;

    @Autowired
    private IRetailerMapper iRetailerMapper;

    @Override
    public UnitDTO addUnit(UnitRequest unitRequest, String retailerId) {

        RetailerEntity retailer = iRetailerRepository.findById(retailerId)
                .orElseThrow(() -> new IllegalArgumentException("Retailer not found with ID: " + retailerId));
        //exist Unit
        if (iUnitRepository.existsByUnitName(unitRequest.getUnitName())) {
            //exist Retailer in Unit
            if(iUnitRepository.existsByUnitNameAndRetailers_RetailerId(unitRequest.getUnitName(),retailer.getRetailerId())) {
                throw new IllegalArgumentException("Unit name '" + unitRequest.getUnitName() + "' already exists");
            }else {
                UnitEntity existUnit = iUnitRepository.findByUnitName(unitRequest.getUnitName());
                existUnit.getRetailers().add(retailer);
                retailer.getUnits().add(existUnit);
                iRetailerRepository.save(retailer);
                iUnitRepository.save(existUnit);
                return iUnitMapper.toUnitDTO(existUnit);
            }
            //not exist Unit
        }else{
            UnitEntity unitEntity = UnitEntity.builder()
                    .unitName(unitRequest.getUnitName())
                    .retailers(new HashSet<>())
                    .build();

            unitEntity.getRetailers().add(retailer);

            retailer.getUnits().add(unitEntity);

            UnitEntity savedUnit = iUnitRepository.save(unitEntity);
            iRetailerRepository.save(retailer);

            return iUnitMapper.toUnitDTO(savedUnit);
        }
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

//    @Override
//    public String deleteUnitById(String unitId) {
//        UnitDTO unitDTO = iUnitMapper.toUnitDTO(iUnitRepository.findById(unitId).orElseThrow(()->
//                new EntityNotFoundException("Units ID " + unitId + " not found")));
//
//
//        iUnitRepository.deleteById(unitId);
//        return "Deleted :" + unitId + " " + unitDTO.getUnitName();
//    }

    @Override
    public String deleteUnitById(String unitId) {
        UnitEntity unitEntity = iUnitRepository.findById(unitId)
                .orElseThrow(() -> new EntityNotFoundException("Units ID " + unitId + " not found"));

        // Kiểm tra xem có sản phẩm nào đang sử dụng unit này không
        boolean hasProducts = iProductVariantRepository.existsByUnit(unitEntity); // Nếu dùng Cách 1
        // Hoặc: boolean hasProducts = iProductRepository.existsProductsEntitiesByUnit(unitEntity); // Nếu dùng Cách 2
        if (hasProducts) {
            return "Product exist";
        }

        // Xóa tất cả các mối quan hệ trong retailer_unit liên quan đến unitId
        Set<RetailerEntity> retailers = unitEntity.getRetailers();
        for (RetailerEntity retailer : retailers) {
            retailer.getUnits().remove(unitEntity); // Xóa unit khỏi retailer
        }
        unitEntity.getRetailers().clear(); // Xóa tất cả retailer khỏi unit

        // Lưu thay đổi để đồng bộ hóa retailer
        iRetailerRepository.saveAll(retailers);

        // Xóa unit
        iUnitRepository.deleteById(unitId);

        return "Deleted: " + unitId + " " + unitEntity.getUnitName();
    }

    @Override
    public Set<RetailerDTO> getRetailersByUnitId(String unitId) {
        UnitEntity unit = iUnitRepository.findById(unitId)
                .orElseThrow(() -> new RuntimeException("Unit not found"));
        Set<RetailerEntity> retailers = unit.getRetailers();

        return iRetailerMapper.toSetRetailerDTO(retailers);
    }
}
