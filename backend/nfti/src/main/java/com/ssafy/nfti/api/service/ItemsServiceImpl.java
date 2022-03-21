package com.ssafy.nfti.api.service;

import com.ssafy.nfti.api.request.FileUploadReq;
import com.ssafy.nfti.api.request.ItemsReq;
import com.ssafy.nfti.api.response.FileUploadRes;
import com.ssafy.nfti.api.response.ItemsRes;
import com.ssafy.nfti.db.entity.Items;
import com.ssafy.nfti.db.repository.ItemsRepository;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("itemsService")
public class ItemsServiceImpl implements ItemsService {

    @Autowired
    ItemsRepository itemsRepository;

    @Override
    public FileUploadRes createItems(String url, FileUploadReq file) {
        Items items = new Items();
        items.setItemUrl(url);
        items.setAuthorName(file.getAuthorName());
        items.setItemTitle(file.getItemTitle());
        items.setItemDescription(file.getItemDescription());
        items.setCreatedAt(LocalDateTime.now());

        itemsRepository.save(items);

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
