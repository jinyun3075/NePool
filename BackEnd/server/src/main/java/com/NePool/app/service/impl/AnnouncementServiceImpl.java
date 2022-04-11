package com.NePool.app.service.impl;

import com.NePool.app.dto.AnnouncementDTO;
import com.NePool.app.dto.PageRequestDTO;
import com.NePool.app.dto.PageResultDTO;
import com.NePool.app.entity.Announcement;
import com.NePool.app.repository.AnnouncementRepository;
import com.NePool.app.service.AnnouncementService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.function.Function;

@Service
@RequiredArgsConstructor
@Log4j2
public class AnnouncementServiceImpl implements AnnouncementService {

    private final AnnouncementRepository repository;

    @Override
    public AnnouncementDTO register(AnnouncementDTO dto) throws Exception{
        return entityToDto(repository.save(dtoToEntity(dto)));
    }

    @Override
    public PageResultDTO<AnnouncementDTO, Announcement> getList(PageRequestDTO dto) {
        Page<Announcement> entity = repository.findAll(dto.getPageable(Sort.by("modDate").ascending()));
        Function<Announcement,AnnouncementDTO> fn = (data->entityToDto(data));
        return new PageResultDTO<>(entity,fn);
    }

    @Override
    public AnnouncementDTO update(AnnouncementDTO dto){

        Optional<Announcement> entity = repository.findById(dto.getId());
        entity.get().update(dto.getTitle(),dto.getContents());
        return entityToDto(repository.save(entity.get()));
    }

    @Override
    public Long delete(Long id) throws Exception {
        Optional<Announcement> entity = repository.findById(id);
        if(!entity.isPresent()) {
            throw new Exception("없는 id 값 입니다.");
        }
        repository.deleteById(id);
        return 1l;
    }
}
