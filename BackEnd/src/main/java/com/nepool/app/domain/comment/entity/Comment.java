package com.nepool.app.domain.comment.entity;

import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.nepool.app.domain.user.entity.NePoolUser;
import com.nepool.app.domain.workbook.entity.WorkBook;
import com.nepool.app.util.entity.BaseEntity;

import jakarta.persistence.*;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Comment extends BaseEntity {

    @Id
    private String com_no;

    @Column(length = 2000, nullable = false)
    private String content;

    private Long comLike;

    @ManyToOne(
            fetch = FetchType.LAZY
    )
    @OnDelete(action = OnDeleteAction.CASCADE)
    private NePoolUser writer;

    @ManyToOne(
            fetch = FetchType.LAZY
    )
    @OnDelete(action = OnDeleteAction.CASCADE)
    private WorkBook workbook;
}
