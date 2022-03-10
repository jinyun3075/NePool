package com.NePool.app.repository;

import com.NePool.app.entity.NePoolUser;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<NePoolUser, Long> {
    Optional<NePoolUser> findByUsername(String name);


}
