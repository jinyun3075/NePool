package com.NePool.app.dto;

import lombok.Data;

import java.util.List;

@Data
public class WorkResultRealResponseDTO {
    private List<WorkResultResponseDTO> val;
    private int score;
    private int totalScore;
}
