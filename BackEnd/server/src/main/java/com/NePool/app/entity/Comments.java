package com.NePool.app.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Comments extends BaseEntity{

    @Id
    private String com_no;

    @Column(length = 500, nullable = false)
    private String content;

    private Long comLike;

    @ManyToOne
    private NePoolUser writer;

    @ManyToOne
    private WorkBook workbook;
}
