package com.nepool.app.controller;


import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.nepool.app.domain.comment.dto.CommentRequestDTO;
import com.nepool.app.domain.comment.entity.Comment;
import com.nepool.app.service.CommentService;
import com.nepool.app.util.dto.PageResultDTO;

@RestController
@RequiredArgsConstructor
@RequestMapping("/comment")
@Log4j2
public class CommentApiController {
    private final CommentService service;

    @PostMapping("/{user_id}/{work_book_id}")
    public ResponseEntity<CommentRequestDTO> insertComment(@PathVariable("user_id") String user_id, @PathVariable String work_book_id, @RequestBody CommentRequestDTO dto) throws Exception {
        return new ResponseEntity<>(service.insertComment(user_id, work_book_id, dto), HttpStatus.OK);
    }

    @GetMapping("/{work_book_id}")
    public ResponseEntity<PageResultDTO<CommentRequestDTO, Comment>> selectCommentList(@PathVariable("work_book_id") String work_book_id, @RequestParam(value = "page", required = false) Integer page, @RequestParam(value = "size", required = false) Integer size) throws Exception {
        return new ResponseEntity<>(service.selectCommentList(work_book_id, page, size), HttpStatus.OK);
    }

    @DeleteMapping("/{comment_id}/{writer}")
    public ResponseEntity<String> deleteComment(@PathVariable("comment_id") String comment_id, @PathVariable("writer") String writer) throws Exception {
        return new ResponseEntity<>(service.deleteComment(comment_id, writer), HttpStatus.OK);
    }

    @GetMapping("/like/{work_book_id}")
    public ResponseEntity<Double> selectCommentLikeCount(@PathVariable("work_book_id") String work_book_id) throws Exception {
        return new ResponseEntity<>(service.selectCommentLikeCount(work_book_id), HttpStatus.OK);
    }

}
