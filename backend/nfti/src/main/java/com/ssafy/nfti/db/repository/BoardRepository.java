package com.ssafy.nfti.db.repository;

import com.ssafy.nfti.db.entity.Board;
import java.awt.print.Pageable;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BoardRepository extends JpaRepository<Board, Long> {
    List<Board> findAll(Pageable pageable);
}
