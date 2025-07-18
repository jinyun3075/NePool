package com.nepool.app.util.dto;

import lombok.Data;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.function.Function;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Data
public class PageResultDTO<DTO,EN>{
    private List<DTO> dtoList;

    private int totalPage;

    private int page;

    private int size;

    private boolean prev,next;

    private int start, end;

    private List<Integer> pageList;

    public PageResultDTO(Page<EN> result, Function<EN,DTO> fn) {
        dtoList = result.stream().map(fn).collect(Collectors.toList());

        totalPage = result.getTotalPages();

        makePageList(result.getPageable());
    }

    private void makePageList(Pageable pageable) {
        this.page = pageable.getPageNumber()+1;
        this.size = pageable.getPageSize();

        int tempEnd = (int)(Math.ceil(page/5.0))*5;

        start = tempEnd -4;

        prev = start>1;

        end = totalPage > tempEnd?tempEnd:totalPage;

        next =totalPage>tempEnd;

        pageList = IntStream.rangeClosed(start,end).boxed().collect(Collectors.toList());
    }
}
