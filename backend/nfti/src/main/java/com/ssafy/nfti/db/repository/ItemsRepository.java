package com.ssafy.nfti.db.repository;

import com.ssafy.nfti.db.entity.Items;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemsRepository extends JpaRepository<Items, Long> {
    List<Items> findByOwnerAddress(String address);
    Items findByTokenId(Long tokenId);
}
