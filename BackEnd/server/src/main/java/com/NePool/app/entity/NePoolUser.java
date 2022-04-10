package com.NePool.app.entity;

import lombok.*;


import javax.persistence.*;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class NePoolUser extends BaseEntity {

    @Id
    private String uno;

    @Column(length = 100, nullable = false, unique = true)
    private String username;

    @Column(length = 100, nullable = false, unique = true)
    private String email;

    @Column(length = 100, nullable = false, unique = true)
    private String name;

    @Column(length = 300, nullable = false)
    private String password;

    @Column(length = 300, nullable = false)
    private String image;

    public void update(String name, String image) {
        this.name = name;
        this.image = image;
    }
}
