package com.NePool.app.domain.user.repository;

import com.NePool.app.domain.user.entity.NePoolUser;

import org.springframework.data.jpa.repository.JpaRepository;


import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<NePoolUser, String> {
    Optional<NePoolUser> findByUsername(String name);
    List<NePoolUser> findByNameLike(String name);
}
