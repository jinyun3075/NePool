package com.nepool.app.util.module;


import com.nepool.app.util.dto.PageRequestDTO;

public class PageModule {
    public PageRequestDTO makePage(Integer page, Integer size) {
        PageRequestDTO pageRequestDTO = new PageRequestDTO();
        if (page != null && size != null) {
            pageRequestDTO.setSize(size);
            pageRequestDTO.setPage(page);
        }
        return pageRequestDTO;
    }
}
