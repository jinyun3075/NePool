package com.nepool.app.domain.work.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import com.nepool.app.domain.work.entity.Work;

import java.util.List;
import java.util.Optional;

public interface WorkRepository extends JpaRepository<Work,String> {
    Optional<Work> findByQnoAndWorkBookWno(String id, String workbook);
    List<Work> findByWorkBookWno(String workbook);

    @Transactional
    Long deleteByQnoAndWorkBookWno(String qno,String wno);
}
