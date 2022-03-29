package com.NePool.app.entity.compositekey;

import com.NePool.app.entity.NePoolUser;
import com.NePool.app.entity.WorkBook;
import lombok.Data;

import javax.persistence.Embeddable;
import java.io.Serializable;

@Data
@Embeddable
public class StarId implements Serializable {
    private WorkBook workBook;
    private NePoolUser nePoolUser;
    public StarId(WorkBook workBook, NePoolUser nePoolUser) {
        this.workBook=workBook;
        this.nePoolUser=nePoolUser;
    }
}
