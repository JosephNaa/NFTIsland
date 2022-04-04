package com.ssafy.nfti.db.repository;

import com.ssafy.nfti.db.entity.Items;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemsRepository extends JpaRepository<Items, Long> {
    List<Items> findByOwnerAddressAndOnSaleYn(Pageable pageable, String address, Boolean onSaleYn);
    List<Items> findByOwnerAddressAndCommunityIdAndOnSaleYn(Pageable pageable, String address, Long communityId, Boolean onSaleYn);
    Optional<Items> findByTokenId(Long tokenId);
    List<Items> findByOwnerAddressAndCommunityIdAndOnSaleYn(String ownerAddress, Long communityId, Boolean onSaleYn);
}
