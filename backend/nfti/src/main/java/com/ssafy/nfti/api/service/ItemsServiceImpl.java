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

        System.out.println("files: " + file.getAuthorName());
        System.out.println("items: " + items.getAuthorName());

        itemsRepository.save(items);

        return null;
    }

    @Override
    public void updateItemTokenIdAndOwnerAddress(Long itemId, Long tokenId, String ownerAddress) {

    }

    @Override
    public List<ItemsRes> getItems() {
        List<Items> list = itemsRepository.findAll();
        List<ItemsRes> res = new ArrayList<>();
        for (Items item : list) {
            res.add(ItemsRes.of(item));
//            System.out.println(item.getAuthorName() + " " + item.getItemDescription() + " " + item.getItemTitle() + " " + item.getItemUrl());
        }

        return res;
    }

    @Override
    public List<ItemsRes> getItemsWithAddress(String address) {
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
