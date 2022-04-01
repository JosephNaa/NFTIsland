package com.ssafy.nfti.api.response;

import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.ssafy.nfti.db.entity.Items;
import java.util.List;
import java.util.stream.Collectors;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@JsonNaming(value = PropertyNamingStrategy.SnakeCaseStrategy.class)
public class ItemsCreateRes {
    List<Long> ids;

    public static ItemsCreateRes of(List<Items> items) {
        List<Long> idList = items.stream().map(item -> item.getTokenId()).collect(Collectors.toList());

        return ItemsCreateRes.builder()
            .ids(idList)
            .build();
    }
}
