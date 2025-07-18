package com.nepool.app.domain.comment.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.nepool.app.domain.comment.entity.Comment;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment,String> {
    Page<Comment> findByWorkbookWno(String wno, Pageable pageable);
    List<Comment> findByWorkbookWno(String wno);
}
