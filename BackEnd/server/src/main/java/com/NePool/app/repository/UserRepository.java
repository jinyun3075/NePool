package com.NePool.app.repository;

import com.NePool.app.entity.NePoolUser;

import org.springframework.data.jpa.repository.JpaRepository;


import java.util.Optional;

public interface UserRepository extends JpaRepository<NePoolUser, String> {
    Optional<NePoolUser> findByUsername(String name);
}
