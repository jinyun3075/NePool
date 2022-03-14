package com.NePool.app.entity;

import com.NePool.app.dto.WorkDTO;
import lombok.*;

import javax.persistence.*;

@Entity
@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Work {

    @Id
    private String qno;

    @Column(length = 500, nullable = false)
    private String question;
    @Column(length = 500, nullable = false)
    private String answer_a;
    @Column(length = 500, nullable = false)
    private String answer_b;
    @Column(length = 500, nullable = false)
    private String answer_c;
    @Column(length = 500, nullable = false)
    private String answer_d;
    @Column(length = 500, nullable = false)
    private String answer_e;
    @Column(length = 10, nullable = false)
    private String correct;

    @ManyToOne
    WorkBook workBook;

    public void updateWork(WorkDTO dto) {
        this.question=dto.getQuestion();
        this.answer_a=dto.getAnswer_a();
        this.answer_b=dto.getAnswer_b();
        this.answer_c=dto.getAnswer_c();
        this.answer_d=dto.getAnswer_d();
        this.answer_e=dto.getAnswer_e();
        this.correct=dto.getCorrect();
    }
}
