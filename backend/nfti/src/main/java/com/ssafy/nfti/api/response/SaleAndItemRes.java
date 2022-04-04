package com.ssafy.nfti.api.response;

import com.ssafy.nfti.db.entity.Items;
import com.ssafy.nfti.db.entity.Sales;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SaleAndItemRes {
    private SalesRes sale;
    private ItemsRes item;

    public static SaleAndItemRes of(Sales sales, Items items) {
        SaleAndItemRes res = new SaleAndItemRes();
        res.setSale(SalesRes.of(sales));
        res.setItem(ItemsRes.of(items));

        return res;
    }
}