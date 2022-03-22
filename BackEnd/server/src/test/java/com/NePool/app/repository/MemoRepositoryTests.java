//package com.NePool.app.repository;
//
//
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.data.domain.Page;
//import org.springframework.data.domain.PageRequest;
//import org.springframework.data.domain.Pageable;
//import org.springframework.data.domain.Sort;
//import org.springframework.transaction.annotation.Transactional;
//
//
//import java.util.Optional;
//import java.util.stream.IntStream;
//
//@SpringBootTest
//public class MemoRepositoryTests {
//    @Autowired
//    MemoRepository memoRepository;
//
//    @Test
//    public void testClass() {
//        IntStream.rangeClosed(1,10).forEach(i -> {
//            Memo memo = Memo.builder().memoText("sample..."+i).build();
//            memoRepository.save(memo);
//        });
//    }
//
//    @Test
//    public void testSelect() {
//        Long mno = 10L;
//
//        Optional<Memo> result = memoRepository.findById(mno);
//        System.out.println("====================");
//        if(result.isPresent()) {
//            Memo memo = result.get();
//            System.out.println(result);
//            System.out.println(memo);
//        }
//    }
//
//    @Transactional
//    @Test
//    public void testSelect2() {
//        Long mno = 10L;
//
//        Memo result = memoRepository.getOne(mno);
//        System.out.println("====================");
//        System.out.println(result);
//    }
//
//    @Test
//    public void testUpdate() {
//        Long mno = 10L;
//
//        Memo memo = Memo.builder().memoText("update....").build();
//        memo = memoRepository.save(memo);
//        System.out.println("=============");
//        System.out.println(memo);
//    }
//
//    @Test
//    public void testDelete() {
//        Long mno = 10L;
//        memoRepository.deleteById(mno);
//    }
//
//    @Test
//    public void testPage() {
//        Pageable pageable = PageRequest.of(1,5);
//        Page<Memo> result = memoRepository.findAll(pageable);
//        result.forEach(i -> System.out.println(i));
//        System.out.println("Total Pages: "+result.getTotalPages());
//        System.out.println("Total Count: "+result.getTotalElements());
//        System.out.println("Total Number: "+result.getNumber());
//        System.out.println("page Size: "+result.getSize());
//        System.out.println("has next page?: "+result.hasNext());
//    }
//
//    @Test
//    public void testSort() {
//        Sort sort1 = Sort.by("mno").descending();
//        Sort sort2 = Sort.by("memoText").ascending();
//        Sort SortAll = sort1.and(sort2);
//    }
//
//    @Test
//    public void testQueryMethod() {
////        List<Memo> list = memoRepository.findByMnoBetweenOrderByMnoDesc(3L,5L);
////        list.forEach(i -> System.out.println(i));
//        Pageable page = PageRequest.of(0,4, Sort.by("mno").descending());
////        Page<Memo> result = memoRepository.findByMnoBetween(5L,7L,page);
//        Page<Memo> result = memoRepository.getListWithQuery(3L,page);
////        System.out.print(result);
//        result.forEach(i->System.out.println(i));
//    }
//
//}
