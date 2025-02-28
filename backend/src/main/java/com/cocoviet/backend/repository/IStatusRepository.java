package com.cocoviet.backend.repository;

import com.cocoviet.backend.models.entity.StatusEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IStatusRepository extends JpaRepository<StatusEntity, String> {
    boolean existsByStatusName(String statusName);

//    StatusEntity findByStatusId(Long statusId);

    StatusEntity findByStatusCode(String statusCode);
}
