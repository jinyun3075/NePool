package com.NePool.app.domain.announcement.repository;

import com.NePool.app.domain.announcement.entity.Announcement;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnnouncementRepository extends JpaRepository<Announcement, Long> {
}