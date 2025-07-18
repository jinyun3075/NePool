package com.nepool.app.service;

import com.nepool.app.domain.announcement.dto.AnnouncementDTO;
import com.nepool.app.domain.announcement.entity.Announcement;
import com.nepool.app.util.dto.PageRequestDTO;
import com.nepool.app.util.dto.PageResultDTO;

public interface AnnouncementService {
    AnnouncementDTO insertAnnouncement(AnnouncementDTO dto);

    AnnouncementDTO selectAnnouncement(Long announcement_id);

    PageResultDTO<AnnouncementDTO, Announcement> selectAnnouncementList(Integer page, Integer size);

    AnnouncementDTO updateAnnouncement(AnnouncementDTO dto);

    String deleteAnnouncement(Long id) throws Exception;

    default Announcement dtoToEntity(AnnouncementDTO dto) {
        return Announcement.builder()
                .title(dto.getTitle())
                .contents(dto.getContents())
                .build();
    }

    default AnnouncementDTO entityToDto(Announcement entity) {
        return AnnouncementDTO.builder()
                .id(entity.getId())
                .title(entity.getTitle())
                .contents(entity.getContents())
                .regDate(entity.getRegDate())
                .modDate(entity.getModDate())
                .build();
    }
}
