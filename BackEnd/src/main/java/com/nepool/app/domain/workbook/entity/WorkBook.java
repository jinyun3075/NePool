package com.nepool.app.domain.workbook.entity;

import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.nepool.app.domain.user.entity.NePoolUser;
import com.nepool.app.util.entity.BaseEntity;

import jakarta.persistence.*;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@ToString
public class WorkBook extends BaseEntity {

    @Id
    private String wno;

    @Column(length = 200, nullable = false)
    private String title;

    @Column(length = 1000, nullable = false)
    private String content;

    @Column(length = 30, nullable = false)
    private String type;

    private Boolean share;

    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    private NePoolUser writer;

    private Long count;

    public void upCount() {
        count++;
    }

    public void setShare(Boolean share) {
        this.share = share;
    }

    @Column(length = 300, nullable = false)
    private String image;

    public void update(String title, String content, String type, String image) {
        this.title = title;
        this.content = content;
        this.type = type;
        this.image = image;
    }
}
