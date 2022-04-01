package com.ssafy.nfti.api.service;

import com.ssafy.nfti.api.request.ItemsReq;
import com.ssafy.nfti.api.response.ItemsCreateRes;
import com.ssafy.nfti.common.exception.enums.ExceptionEnum;
import com.ssafy.nfti.common.exception.response.ApiException;
import com.ssafy.nfti.db.entity.Community;
import com.ssafy.nfti.db.entity.Items;
import com.ssafy.nfti.db.entity.User;
import com.ssafy.nfti.db.repository.CommunityRepository;
import com.ssafy.nfti.db.repository.ItemsRepository;
import com.ssafy.nfti.db.repository.UserRepository;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("itemsService")
public class ItemsServiceImpl implements ItemsService {

    @Autowired
    ItemsRepository itemsRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    CommunityRepository communityRepository;

    @Override
    public ItemsCreateRes createItems(ItemsReq req) {
        User owner = userRepository.findByAddress(req.getOwnerAddress())
            .orElseThrow(() -> new ApiException(
                ExceptionEnum.NOT_FOUND_USER));
        Community community = communityRepository.findById(req.getCommunityId())
            .orElseThrow(() -> new ApiException(ExceptionEnum.NOT_FOUND_COMMUNITY));

        List<Items> items = new ArrayList<>();
        for (Long id : req.getTokenIds()) {
            Items item = new Items();
            item.setTokenId(id);
            item.setOwner(owner);
            item.setCommunity(community);
            item.setItemDescription(req.getItemDescription());
            item.setItemTitle(req.getItemTitle());
            item.setItemUrl(req.getItemUrl());

            items.add(item);
        }

        List<Items> resItems = itemsRepository.saveAll(items);
        ItemsCreateRes res = ItemsCreateRes.of(resItems);
        return res;
    }
}
