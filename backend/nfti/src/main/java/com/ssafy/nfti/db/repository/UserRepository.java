package com.ssafy.nfti.db.repository;

import com.ssafy.nfti.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, String> {
    Optional<User> findByAddress(String address);
    Optional<User> findByNickname(String nickname);

}
