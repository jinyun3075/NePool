package com.NePool.app.repository;

import com.NePool.app.entity.Work;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface WorkRepository extends JpaRepository<Work,Long> {
    Optional<Work> findByQnoAndWorkBookWno(String id, String workbook);
    List<Work> findByWorkBookWno(String workbook);
}
