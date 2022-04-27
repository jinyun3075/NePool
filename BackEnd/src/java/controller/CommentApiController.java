package com.NePool.app.controller;


import com.NePool.app.domain.comment.dto.CommentRequestDTO;
import com.NePool.app.util.dto.PageResultDTO;
import com.NePool.app.domain.comment.entity.Comment;
import com.NePool.app.service.CommentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/comment")
@Log4j2
public class CommentApiController {
    private final CommentService service;

    @PostMapping("/{user_id}/{work_book_id}")
    public ResponseEntity<CommentRequestDTO> insertComment(@PathVariable String user_id, @PathVariable String work_book_id, @RequestBody CommentRequestDTO dto) throws Exception {
        return new ResponseEntity<>(service.insertComment(user_id, work_book_id, dto), HttpStatus.OK);
    }

    @GetMapping("/{work_book_id}")
    public ResponseEntity<PageResultDTO<CommentRequestDTO, Comment>> selectCommentList(@PathVariable String work_book_id, @RequestParam(value = "page", required = false) Integer page, @RequestParam(value = "size", required = false) Integer size) throws Exception {
        return new ResponseEntity<>(service.selectCommentList(work_book_id, page, size), HttpStatus.OK);
    }

    @DeleteMapping("/{comment_id}/{writer}")
    public ResponseEntity<String> deleteComment(@PathVariable String comment_id, @PathVariable String writer) throws Exception {
        return new ResponseEntity<>(service.deleteComment(comment_id, writer), HttpStatus.OK);
    }

    @GetMapping("/like/{work_book_id}")
    public ResponseEntity<Double> selectCommentLikeCount(@PathVariable String work_book_id) throws Exception {
        return new ResponseEntity<>(service.selectCommentLikeCount(work_book_id), HttpStatus.OK);
    }

}
