package com.nepool.app.service.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import com.nepool.app.domain.user.entity.NePoolUser;
import com.nepool.app.domain.user.repository.UserRepository;
import com.nepool.app.domain.workbook.entity.WorkBook;
import com.nepool.app.domain.workbook.repository.WorkBookRepository;
import com.nepool.app.service.SearchService;
import com.nepool.app.util.dto.SearchDTO;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Log4j2
public class SearchServiceImpl implements SearchService {
    private final UserRepository userRepository;
    private final WorkBookRepository workBookRepository;

    @Override
    public SearchDTO selectUserAndWorkBook(String keyword) {
        List<WorkBook> workBooks = workBookRepository.findByTitleLike("%" + keyword + "%");
        List<NePoolUser> user = userRepository.findByNameLike("%" + keyword + "%");
        return SearchDTO.builder()
                .workBook(workBooks.stream().map(data->workBookEntityToDto(data)).collect(Collectors.toList()))
                .user(user.stream().map(data->userEntityToDto(data)).collect(Collectors.toList())).build();
    }

}
