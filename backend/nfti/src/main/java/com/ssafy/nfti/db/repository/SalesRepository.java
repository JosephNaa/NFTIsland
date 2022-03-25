package com.ssafy.nfti.db.repository;

import com.ssafy.nfti.db.entity.Sales;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SalesRepository extends JpaRepository<Sales, Long> {
    Sales findByTokenId(Long tokenId);
    Optional<Sales> findById(Long saleId);
}
