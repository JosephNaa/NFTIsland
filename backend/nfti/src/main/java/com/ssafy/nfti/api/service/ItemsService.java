package com.ssafy.nfti.api.service;

import com.ssafy.nfti.api.request.AddressItemsReq;
import com.ssafy.nfti.api.request.FileUploadReq;
import com.ssafy.nfti.api.request.ItemsReq;
import com.ssafy.nfti.api.response.FileUploadRes;
import com.ssafy.nfti.api.response.ItemsRes;
import com.ssafy.nfti.db.entity.Items;
import java.util.List;

public interface ItemsService {
    Items createItems(String url, FileUploadReq fileUploadReq);
    Items updateItemTokenIdAndOwnerAddress(Long itemId, Long tokenId, String ownerAddress);
    List<ItemsRes> getItems();
    List<ItemsRes> getItemsWithAddress(String address);
    ItemsRes getRecentItems();
    ItemsRes getItemByTokenId(Long tokenId);
    void updateItemOwnerAddress(Long tokenId, Long ownerAddress);
}
