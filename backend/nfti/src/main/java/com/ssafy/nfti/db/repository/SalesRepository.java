package com.ssafy.nfti.db.repository;

import com.ssafy.nfti.db.entity.Sales;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SalesRepository extends JpaRepository<Sales, Long> {
}
