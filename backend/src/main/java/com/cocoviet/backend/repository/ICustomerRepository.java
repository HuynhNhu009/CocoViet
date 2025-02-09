package com.cocoviet.backend.repository;

import com.cocoviet.backend.models.entity.CustomerEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ICustomerRepository extends JpaRepository<String, CustomerEntity> {
}
