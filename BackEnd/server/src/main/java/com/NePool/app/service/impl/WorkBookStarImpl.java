//package com.NePool.app.service.impl;
//
//import com.NePool.app.entity.NePoolUser;
//import com.NePool.app.entity.WorkBook;
//import com.NePool.app.entity.WorkBookStar;
//import com.NePool.app.entity.compositekey.StarId;
//import com.NePool.app.repository.WorkBookStarRepository;
//import com.NePool.app.service.WorkBookStarService;
//import lombok.RequiredArgsConstructor;
//import lombok.extern.log4j.Log4j2;
//import org.springframework.stereotype.Service;
//
//@Service
//@RequiredArgsConstructor
//@Log4j2
//public class WorkBookStarImpl implements WorkBookStarService {
//
//    private final WorkBookStarRepository workBookStarRepository;
//
//    @Override
//    public int register(String work_book_id, String user_id,Long score) {
//        WorkBookStar entity =WorkBookStar.builder().starId(new StarId(
//                WorkBook.builder()
//                        .wno(work_book_id)
//                        .build(),
//                NePoolUser.builder()
//                        .uno(user_id)
//                        .build()
//        )).score(score).build();
//        workBookStarRepository.save(entity);
//        return 0;
//    }
//}
