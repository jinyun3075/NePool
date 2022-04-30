package com.NePool.app.util.module;


import com.NePool.app.util.dto.PageRequestDTO;

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
