package com.nepool.app.domain.announcement.entity;

import lombok.*;

import com.nepool.app.util.entity.BaseEntity;

import jakarta.persistence.*;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Announcement extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(length = 3000)
    private String contents;

    public void update(String title, String contents) {
        this.title = title;
        this.contents = contents;
    }
}