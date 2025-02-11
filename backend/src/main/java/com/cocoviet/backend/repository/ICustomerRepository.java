package com.cocoviet.backend.repository;

import com.cocoviet.backend.models.dto.CustomerDTO;
import com.cocoviet.backend.models.entity.CustomerEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ICustomerRepository extends JpaRepository<CustomerEntity, String> {
    boolean existsByCustomerEmail(String email);
    Optional<CustomerEntity> findByCustomerEmail(String email);

}
