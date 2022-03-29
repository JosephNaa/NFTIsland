package com.ssafy.nfti.api.service;

import com.ssafy.nfti.api.request.FileUploadReq;
import com.ssafy.nfti.api.request.ItemsReq;
import com.ssafy.nfti.api.response.FileUploadRes;
import com.ssafy.nfti.api.response.ItemsRes;
import com.ssafy.nfti.db.entity.Items;
import com.ssafy.nfti.db.repository.ItemsRepository;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service("itemsService")
public class ItemsServiceImpl implements ItemsService {

    @Autowired
    ItemsRepository itemsRepository;

    @Override
    @Transactional
    public Items createItems(String url, FileUploadReq file) {
        Items items = new Items();
        items.setItemUrl(url);
        items.setAuthorName(file.getAuthorName());
        items.setItemTitle(file.getItemTitle());
        items.setItemDescription(file.getItemDescription());
        items.setCreatedAt(LocalDateTime.now());
        items.setTokenId(file.getTokenId());
        items.setOwnerAddress(file.getOwnerAddress());

        return itemsRepository.save(items);
    }

    @Override
    public Items updateItemTokenIdAndOwnerAddress(Long itemId, Long tokenId, String ownerAddress) {
        Items item = itemsRepository.findById(itemId).orElseThrow();
        item.setTokenId(tokenId);
        item.setOwnerAddress(ownerAddress);

        return itemsRepository.save(item);
    }

    @Override
    public List<ItemsRes> getItems() {
        List<Items> list = itemsRepository.findAll();
        List<ItemsRes> res = new ArrayList<>();
        for (Items item : list) {
            res.add(ItemsRes.of(item));
        }

        return res;
    }

    @Override
    public List<ItemsRes> getItemsWithAddress(String address) {
        List<Items> list = itemsRepository.findByOwnerAddress(address);
        List<ItemsRes> res = new ArrayList<>();
        for (Items item : list) {
            res.add(ItemsRes.of(item));
        }

        return res;
    }


    @Override
    public ItemsRes getRecentItems() {
        Items recentItem = itemsRepository.findTopByOrderByIdDesc();
        return ItemsRes.of(recentItem);
    }

    @Override
    public ItemsRes getItemByTokenId(Long tokenId) {
        Items item = itemsRepository.findByTokenId(tokenId);
        return ItemsRes.of(item);
    }

    @Override
    public void updateItemOwnerAddress(Long tokenId, Long ownerAddress) {

    }
}
