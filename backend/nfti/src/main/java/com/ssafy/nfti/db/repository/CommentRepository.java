package com.ssafy.nfti.db.repository;

import com.ssafy.nfti.db.entity.Comment;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByBoard(Long id);
}
