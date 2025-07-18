package com.nepool.app.domain.workbook.repository;



import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import com.nepool.app.domain.workbook.entity.WorkBook;

import java.util.List;
import java.util.Optional;

public interface WorkBookRepository extends JpaRepository<WorkBook,String> {
    Optional<WorkBook> findByWnoAndWriterUno(String id, String user);
    Page<WorkBook> findByWriterUno(String uno, Pageable page);

    List<WorkBook> findByTitleLike(String title);

    Page<WorkBook> findByTypeAndShare(String type,boolean share,Pageable pageable);

    Page<WorkBook> findByShare(boolean share, Pageable pageable);

    List<WorkBook> findByShare(boolean share);

    List<WorkBook> findByTypeAndShare(String type,boolean share);
    @Transactional
    Long deleteByWnoAndWriterUno(String id, String user);
}
