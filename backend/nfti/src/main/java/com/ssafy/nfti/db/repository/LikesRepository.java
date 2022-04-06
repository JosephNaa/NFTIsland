package com.ssafy.nfti.db.repository;

import com.ssafy.nfti.db.entity.Likes;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LikesRepository extends JpaRepository<Likes, Long> {
    Optional<Likes> findByUserAddressAndBoardId(String userAddress, Long boardId);
    List<Likes> findByBoardId(Long boardId);
}
