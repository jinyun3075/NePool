package com.NePool.app.repository;

import com.NePool.app.entity.ShareWorkBook;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ShareWorkBookRepository extends JpaRepository<ShareWorkBook,Long> {
    Page<ShareWorkBook> findByNePoolUserUno(String user_id, Pageable req);
}
