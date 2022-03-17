package com.NePool.app.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Comment extends BaseEntity{

    @Id
    private String cno;

    @Column(length = 500, nullable = false)
    private String content;

    private Long like;

    @ManyToOne(fetch = FetchType.LAZY)
    private NePoolUser writer;

    @ManyToOne(fetch = FetchType.LAZY)
    private WorkBook workBook;
}
