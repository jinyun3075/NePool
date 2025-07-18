package com.nepool.app.service.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.nepool.app.domain.announcement.dto.AnnouncementDTO;
import com.nepool.app.domain.announcement.entity.Announcement;
import com.nepool.app.domain.announcement.repository.AnnouncementRepository;
import com.nepool.app.service.AnnouncementService;
import com.nepool.app.util.dto.PageRequestDTO;
import com.nepool.app.util.dto.PageResultDTO;
import com.nepool.app.util.exception.ServiceExceptionCheck;
import com.nepool.app.util.module.BCryptModule;
import com.nepool.app.util.module.PageModule;

import java.util.Optional;
import java.util.function.Function;

@Service
@RequiredArgsConstructor
@Log4j2
public class AnnouncementServiceImpl extends ServiceExceptionCheck implements AnnouncementService {

    private final AnnouncementRepository announcementRepository;

    private final PageModule pageModule;

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
        checkAnnouncement(entity);

        announcementRepository.deleteById(id);
        return "삭제 완료";
    }
}
