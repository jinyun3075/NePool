package com.NePool.app.service;

import com.NePool.app.dto.AnnouncementDTO;
import com.NePool.app.dto.PageRequestDTO;
import com.NePool.app.dto.PageResultDTO;
import com.NePool.app.entity.Announcement;

public interface AnnouncementService {
    AnnouncementDTO register(AnnouncementDTO dto);

    PageResultDTO<AnnouncementDTO, Announcement> getList(PageRequestDTO dto);

    AnnouncementDTO update(AnnouncementDTO dto);

    Long delete(Long id) throws Exception;

    AnnouncementDTO getAnnouncement(Long announcement_id);

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
