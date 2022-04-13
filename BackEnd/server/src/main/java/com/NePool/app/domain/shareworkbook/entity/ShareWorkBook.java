package com.NePool.app.domain.shareworkbook.entity;

import com.NePool.app.util.entity.BaseEntity;
import com.NePool.app.domain.user.entity.NePoolUser;
import com.NePool.app.domain.workbook.entity.WorkBook;
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
