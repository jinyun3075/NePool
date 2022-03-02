package com.NePool.app.repository;

import com.NePool.app.entity.NePoolUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<NePoolUser, Long> {
}
