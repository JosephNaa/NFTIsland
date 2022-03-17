package com.ssafy.nfti.db.repository;

import com.ssafy.nfti.db.entity.Items;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemsRepository extends JpaRepository<Items, Long> {

}
