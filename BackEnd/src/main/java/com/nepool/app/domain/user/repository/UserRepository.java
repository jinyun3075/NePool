package com.nepool.app.domain.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nepool.app.domain.user.entity.NePoolUser;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<NePoolUser, String> {
    Optional<NePoolUser> findByUsername(String name);
    List<NePoolUser> findByNameLike(String name);
}
