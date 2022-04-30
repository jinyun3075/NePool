package com.NePool.app.service.impl;

import com.NePool.app.domain.announcement.dto.AnnouncementDTO;
import com.NePool.app.service.AnnouncementService;
import com.NePool.app.util.dto.PageRequestDTO;
import com.NePool.app.util.dto.PageResultDTO;
import com.NePool.app.domain.announcement.entity.Announcement;
import com.NePool.app.domain.announcement.repository.AnnouncementRepository;
import com.NePool.app.util.module.PageModule;
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

    private final AnnouncementRepository announcementRepository;

    private PageModule pageModule;

    @Override
    public AnnouncementDTO insertAnnouncement(AnnouncementDTO dto) {
        return entityToDto(announcementRepository.save(dtoToEntity(dto)));
    }

    @Override
    public AnnouncementDTO selectAnnouncement(Long announcement_id) {
        return entityToDto(announcementRepository.findById(announcement_id).get());
    }

    @Override
    public PageResultDTO<AnnouncementDTO, Announcement> selectAnnouncementList(Integer page, Integer size) {

        PageRequestDTO pageRequestDTO = pageModule.makePage(page, size);

        Page<Announcement> entity = announcementRepository.findAll(pageRequestDTO.getPageable(Sort.by("modDate").descending()));
        Function<Announcement, AnnouncementDTO> fn = (data -> entityToDto(data));
        return new PageResultDTO<>(entity, fn);
    }

    @Override
    public AnnouncementDTO updateAnnouncement(AnnouncementDTO dto) {
        Optional<Announcement> entity = announcementRepository.findById(dto.getId());
        entity.get().update(dto.getTitle(), dto.getContents());
        return entityToDto(announcementRepository.save(entity.get()));
    }

    @Override
    public String deleteAnnouncement(Long id) throws Exception {
        Optional<Announcement> entity = announcementRepository.findById(id);
        if (!entity.isPresent()) {
            throw new Exception("없는 id 값 입니다.");
        }
        announcementRepository.deleteById(id);
        return "삭제 완료";
    }
}
