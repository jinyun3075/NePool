package com.NePool.app.entity;

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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long qno;

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
    private int correct;

    @ManyToOne
    WorkBook workBook;
}
