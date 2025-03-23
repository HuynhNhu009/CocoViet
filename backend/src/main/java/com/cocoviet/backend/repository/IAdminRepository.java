package com.cocoviet.backend.repository;

import com.cocoviet.backend.models.entity.AdminEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IAdminRepository extends JpaRepository<AdminEntity, String> {
    boolean existsByAdminName(String adminName);

    AdminEntity findByAdminName(String adminName);
}
