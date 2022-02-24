package com.NePool.app.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "me_memo")
@ToString
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Memo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long mno;

    @Column(length = 200, nullable = false)
    private String memoText;
}
