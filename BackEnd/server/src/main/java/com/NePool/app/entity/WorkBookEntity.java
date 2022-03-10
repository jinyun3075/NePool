package com.NePool.app.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@ToString
public class WorkBookEntity extends BaseEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long wno;

    private String title;
    private String content;

    @ManyToOne
    private NePoolUser writer;
}
