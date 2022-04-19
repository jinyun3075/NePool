package com.NePool.app.domain.announcement.entity;

import com.NePool.app.util.entity.BaseEntity;
import lombok.*;

import javax.persistence.*;

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