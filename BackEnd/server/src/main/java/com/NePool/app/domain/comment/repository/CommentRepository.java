package com.NePool.app.domain.comment.repository;

import com.NePool.app.domain.comment.entity.Comment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment,String> {
    Page<Comment> findByWorkbookWno(String wno, Pageable pageable);
    List<Comment> findByWorkbookWno(String wno);
}
