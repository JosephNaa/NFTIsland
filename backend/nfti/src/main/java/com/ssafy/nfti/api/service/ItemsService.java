package com.ssafy.nfti.api.service;

import com.ssafy.nfti.api.request.ItemsReq;
import com.ssafy.nfti.api.response.ItemsRes;
import com.ssafy.nfti.db.entity.Items;
import java.util.List;

public interface ItemsService {
    ItemsRes createItems(ItemsReq itemsReq);
    void updateItemTokenIdAndOwnerAddress(Long itemId, Long tokenId, String ownerAddress);
    List<ItemsRes> getItems(String address);
    List<ItemsRes> getRecentItems();
    ItemsRes getItemByTokenId(Long tokenId);
    void updateItemOwnerAddress(Long tokenId, Long ownerAddress);
}
