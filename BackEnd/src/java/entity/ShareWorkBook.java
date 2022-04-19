package com.NePool.app.entity;

import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

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
    @OnDelete(action = OnDeleteAction.CASCADE)
    private WorkBook workBook;

    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    private NePoolUser nePoolUser;
}
