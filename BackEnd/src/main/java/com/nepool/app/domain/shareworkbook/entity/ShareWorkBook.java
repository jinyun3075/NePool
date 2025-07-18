package com.nepool.app.domain.shareworkbook.entity;

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
