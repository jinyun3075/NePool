package com.NePool.app.service.impl;

import com.NePool.app.dto.SearchDTO;
import com.NePool.app.entity.NePoolUser;
import com.NePool.app.entity.WorkBook;
import com.NePool.app.repository.UserRepository;
import com.NePool.app.repository.WorkBookRepository;
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
    public SearchDTO search(String keyword) {
        List<WorkBook> workBooks = workBookRepository.findByTitleLike("%" + keyword + "%");
        List<NePoolUser> user = userRepository.findByNameLike("%" + keyword + "%");
        return SearchDTO.builder()
                .workBook(workBooks.stream().map(data->workBookEntityToDto(data)).collect(Collectors.toList()))
                .user(user.stream().map(data->userEntityToDto(data)).collect(Collectors.toList())).build();
    }

}
