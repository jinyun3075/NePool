package com.NePool.app.repository;



import com.NePool.app.entity.WorkBook;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

public interface WorkBookRepository extends JpaRepository<WorkBook,Long> {
    Optional<WorkBook> findByWnoAndWriterUno(String id, String String);
    Page<WorkBook> findByWriterUno(String uno, Pageable page);

    @Transactional
    Long deleteByWnoAndWriterUno(String id, String user);
}
