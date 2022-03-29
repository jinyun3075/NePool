package com.NePool.app.entity;

import com.NePool.app.dto.WorkDTO;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

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
    @Column(length = 500, nullable = false)
    private String correct;

    @Column(length = 2000)
    private String explanation;

    @ManyToOne(
            fetch = FetchType.LAZY
    )
    @OnDelete(action = OnDeleteAction.CASCADE)
    WorkBook workBook;

    public void updateWork(WorkDTO dto) {
        this.question = dto.getQuestion();
        this.answer_a = dto.getAnswer_a();
        this.answer_b = dto.getAnswer_b();
        this.answer_c = dto.getAnswer_c();
        this.answer_d = dto.getAnswer_d();
        this.answer_e = dto.getAnswer_e();
        this.correct = dto.getCorrect();
        this.explanation = dto.getExplanation();
    }
}
