package com.NePool.app.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ShareWorkBook extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long sno;

    @ManyToOne
    private WorkBook workBook;

    @ManyToOne
    private NePoolUser nePoolUser;
}
