package com.ssafy.nfti.api.service;

import com.ssafy.nfti.api.request.ItemsReq;
import com.ssafy.nfti.api.response.ItemsRes;
import com.ssafy.nfti.db.entity.Items;
import java.util.List;
import org.springframework.stereotype.Service;

@Service("itemsService")
public class ItemsServiceImpl implements ItemsService {

    @Override
    public ItemsRes createItems(ItemsReq itemsReq) {
        return null;
    }

    @Override
    public void updateItemTokenIdAndOwnerAddress(Long itemId, Long tokenId, String ownerAddress) {

    }

    @Override
    public List<ItemsRes> getItems(String address) {
        return null;
    }

    @Override
    public List<ItemsRes> getRecentItems() {
        return null;
    }

    @Override
    public ItemsRes getItemByTokenId(Long tokenId) {
        return null;
    }

    @Override
    public void updateItemOwnerAddress(Long tokenId, Long ownerAddress) {

    }
}
