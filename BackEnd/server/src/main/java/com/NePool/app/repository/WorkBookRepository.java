package com.NePool.app.repository;


import com.NePool.app.entity.WorkBookEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WorkBookRepository extends JpaRepository<WorkBookEntity,Long> {
}
