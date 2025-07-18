package com.nepool.app.domain.announcement.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nepool.app.domain.announcement.entity.Announcement;

public interface AnnouncementRepository extends JpaRepository<Announcement, Long> {
}