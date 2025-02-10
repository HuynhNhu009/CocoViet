package com.cocoviet.backend.repository;

import com.cocoviet.backend.models.entity.CoconutProductEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ICoconutProductRepository extends JpaRepository<CoconutProductEntity, String> {
//    boolean existsByCustomerEmail(String email);

}
