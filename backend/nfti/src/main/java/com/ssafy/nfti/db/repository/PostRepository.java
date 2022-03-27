package com.ssafy.nfti.db.repository;

import com.ssafy.nfti.db.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<Post, Long> {

}
