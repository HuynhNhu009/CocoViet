package com.cocoviet.backend.repository;

import com.cocoviet.backend.models.entity.CategoryEntity;
import com.cocoviet.backend.models.entity.UnitEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.Set;

@Repository
public interface IUnitRepository extends JpaRepository<UnitEntity, String> {
    boolean existsByUnitName(String unitName);

}
