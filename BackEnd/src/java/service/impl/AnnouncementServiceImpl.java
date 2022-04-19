package com.NePool.app.service.impl;

import com.NePool.app.domain.announcement.dto.AnnouncementDTO;
import com.NePool.app.service.AnnouncementService;
import com.NePool.app.util.dto.PageRequestDTO;
import com.NePool.app.util.dto.PageResultDTO;
import com.NePool.app.domain.announcement.entity.Announcement;
import com.NePool.app.domain.announcement.repository.AnnouncementRepository;
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
    public AnnouncementDTO insertAnnouncement(AnnouncementDTO dto){
        return entityToDto(repository.save(dtoToEntity(dto)));
    }

    @Override
    public AnnouncementDTO selectAnnouncement(Long announcement_id) {
        return entityToDto(repository.findById(announcement_id).get());
    }

    @Override
    public PageResultDTO<AnnouncementDTO, Announcement> selectAnnouncementList(PageRequestDTO dto) {
        Page<Announcement> entity = repository.findAll(dto.getPageable(Sort.by("modDate").descending()));
        Function<Announcement,AnnouncementDTO> fn = (data->entityToDto(data));
        return new PageResultDTO<>(entity,fn);
    }

    @Override
    public AnnouncementDTO updateAnnouncement(AnnouncementDTO dto){

        Optional<Announcement> entity = repository.findById(dto.getId());
        entity.get().update(dto.getTitle(),dto.getContents());
        return entityToDto(repository.save(entity.get()));
    }

    @Override
    public Long deleteAnnouncement(Long id) throws Exception {
        Optional<Announcement> entity = repository.findById(id);
        if(!entity.isPresent()) {
            throw new Exception("없는 id 값 입니다.");
        }
        repository.deleteById(id);
        return 1l;
    }
}
