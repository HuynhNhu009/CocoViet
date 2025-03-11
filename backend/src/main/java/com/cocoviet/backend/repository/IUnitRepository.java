package com.cocoviet.backend.repository;

import com.cocoviet.backend.models.entity.UnitEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface IUnitRepository extends JpaRepository<UnitEntity, String> {
    boolean existsByUnitName(String unitName);
    boolean existsByUnitNameAndRetailers_RetailerId(String unitName, String retailerId);
    UnitEntity findByUnitName(String unitName);
}
