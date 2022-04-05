package com.ssafy.nfti.db.repository;

import com.ssafy.nfti.db.entity.Community;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommunityRepository extends JpaRepository<Community, Long> {
    List<Community> findByUserAddress(Pageable pageable, String userAddress);
}
