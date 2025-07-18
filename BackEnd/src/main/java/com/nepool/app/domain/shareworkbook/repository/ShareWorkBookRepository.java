package com.nepool.app.domain.shareworkbook.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import com.nepool.app.domain.shareworkbook.entity.ShareWorkBook;

import java.util.Optional;

public interface ShareWorkBookRepository extends JpaRepository<ShareWorkBook,Long> {
    Page<ShareWorkBook> findByNePoolUserUno(String user_id, Pageable req);

    Optional<ShareWorkBook> findByWorkBookWnoAndNePoolUserUno(String wno,String uno);

    Long countByWorkBookWno(String wno);
    @Transactional
    Long deleteByWorkBookWnoAndNePoolUserUno(String work_book_id, String user_id);
}
