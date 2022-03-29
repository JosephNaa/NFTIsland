package com.ssafy.nfti.db.repository;

import com.ssafy.nfti.db.entity.Likes;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LikeRepository extends JpaRepository<Likes, Long> {

}
