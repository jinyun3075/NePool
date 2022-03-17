package com.NePool.app.repository;

import com.NePool.app.entity.Comments;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comments,String> {
}
