package com.NePool.app.entity;

import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.springframework.boot.context.properties.bind.DefaultValue;

import javax.persistence.*;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@ToString
public class WorkBook extends BaseEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long wno;

    private String title;
    private String content;

    private Boolean share;
    @ManyToOne
    private NePoolUser writer;
}
