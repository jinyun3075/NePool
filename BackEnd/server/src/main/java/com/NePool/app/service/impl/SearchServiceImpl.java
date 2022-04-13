package com.NePool.app.service.impl;

import com.NePool.app.util.dto.SearchDTO;
import com.NePool.app.domain.user.entity.NePoolUser;
import com.NePool.app.domain.workbook.entity.WorkBook;
import com.NePool.app.domain.user.repository.UserRepository;
import com.NePool.app.domain.workbook.repository.WorkBookRepository;
import com.NePool.app.service.SearchService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

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
