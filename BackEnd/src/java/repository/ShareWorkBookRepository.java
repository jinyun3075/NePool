package com.NePool.app.repository;

import com.NePool.app.entity.ShareWorkBook;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface ShareWorkBookRepository extends JpaRepository<ShareWorkBook,Long> {
    Page<ShareWorkBook> findByNePoolUserUno(String user_id, Pageable req);

    @Transactional
    Long deleteByWorkBookWnoAndNePoolUserUno(String work_book_id, String user_id);
}
