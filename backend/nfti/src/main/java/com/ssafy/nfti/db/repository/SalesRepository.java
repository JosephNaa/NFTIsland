package com.ssafy.nfti.db.repository;

import com.ssafy.nfti.db.entity.Items;
import com.ssafy.nfti.db.entity.Sales;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SalesRepository extends JpaRepository<Sales, Long> {
    Optional<Sales> findBySaleContractAddress(String saleContractAddress);
    Optional<Sales> findByItemAndSaleYn(Items item, Boolean saleYn);
}
