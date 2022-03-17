package com.ssafy.nfti.api.response;

import com.ssafy.nfti.db.entity.Items;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SalesRes {
    Long id;

    public static ItemsRes of(Items items) {
        ItemsRes res = new ItemsRes();
        res.setId(items.getId());

        return res;
    }
}