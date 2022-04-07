package com.ssafy.nfti.api.service;

import com.ssafy.nfti.api.request.ItemsReq;
import com.ssafy.nfti.api.request.TransferItemReq;
import com.ssafy.nfti.api.response.ItemsCreateRes;
import com.ssafy.nfti.api.response.ItemsRes;
import com.ssafy.nfti.common.exception.enums.ExceptionEnum;
import com.ssafy.nfti.common.exception.response.ApiException;
import com.ssafy.nfti.db.entity.Community;
import com.ssafy.nfti.db.entity.Items;
import com.ssafy.nfti.db.entity.User;
import com.ssafy.nfti.db.repository.CommunityRepository;
import com.ssafy.nfti.db.repository.ItemsRepository;
import com.ssafy.nfti.db.repository.ItemsRepositorySupport;
import com.ssafy.nfti.db.repository.UserRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service("itemsService")
public class ItemsServiceImpl implements ItemsService {

    @Autowired
    ItemsRepository itemsRepository;

    @Autowired
    ItemsRepositorySupport itemsRepositorySupport;

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

        Long itemCount = itemsRepositorySupport.getItemCountByCommunity(req.getCommunityId());
        if (itemCount == null) {
            itemCount = 0L;
        }

        List<Items> items = new ArrayList<>();
        for (Long id : req.getTokenIds()) {
            Items item = new Items();
            item.setTokenId(id);
            item.setOwner(owner);
            item.setCommunity(community);
            item.setItemDescription(req.getItemDescription());
            itemCount += 1;
            item.setItemTitle(req.getItemTitle() + "#" + itemCount.toString());
            item.setItemUrl(req.getItemUrl());
            item.setOnSaleYn(false);

            items.add(item);
        }

        List<Items> resItems = itemsRepository.saveAll(items);
        ItemsCreateRes res = ItemsCreateRes.of(resItems);
        return res;
    }

    @Override
    public List<ItemsRes> listItems(Pageable pageable, String findBy, String search, Long communityId,
        Boolean onSaleYn) {
        if (onSaleYn == null) {
            throw new ApiException(ExceptionEnum.BAD_REQUEST_ITEM);
        }

        List<Items> resList = null;

        if (communityId == null) {
            if ("address".equals(findBy)) {
                resList = itemsRepository.findByOwnerAddressAndOnSaleYn(pageable, search, onSaleYn);
            } else if ("nickname".equals(findBy)) {
                User user = userRepository.findByNickname(search).orElseThrow(() -> new ApiException(ExceptionEnum.NOT_FOUND_USER));
                resList = itemsRepository.findByOwnerAddressAndOnSaleYn(pageable, user.getAddress(), onSaleYn);
            } else {
                throw new ApiException(ExceptionEnum.BAD_REQUEST_OPTION);
            }
        } else {
            if ("address".equals(findBy)) {
                resList = itemsRepository.findByOwnerAddressAndCommunityIdAndOnSaleYn(
                    pageable, search, communityId, onSaleYn);
            } else if ("nickname".equals(findBy)) {
                User user = userRepository.findByNickname(search).orElseThrow(() -> new ApiException(ExceptionEnum.NOT_FOUND_USER));
                resList = itemsRepository.findByOwnerAddressAndCommunityIdAndOnSaleYn(
                    pageable, user.getAddress(), communityId, onSaleYn);
            } else {
                throw new ApiException(ExceptionEnum.BAD_REQUEST_OPTION);
            }
        }
        List<ItemsRes> res = resList.stream().map(items -> ItemsRes.of(items))
            .collect(Collectors.toList());
        return res;
    }

    @Override
    public ItemsRes getItem(Long tokenId) {
        Items item = itemsRepository.findByTokenId(tokenId)
            .orElseThrow(() -> new ApiException(ExceptionEnum.NOT_FOUND_ITEM));
        ItemsRes res = ItemsRes.of(item);
        return res;
    }

    @Override
    public ItemsRes transferItem(Long tokenId, TransferItemReq req) {
        Items item = itemsRepository.findByTokenId(tokenId)
            .orElseThrow(() -> new ApiException(ExceptionEnum.NOT_FOUND_ITEM));

        User from = userRepository.findByAddress(req.getFromAddress())
            .orElseThrow(() -> new ApiException(ExceptionEnum.NOT_FOUND_USER));
        User to = userRepository.findByAddress(req.getToAddress())
            .orElseThrow(() -> new ApiException(ExceptionEnum.NOT_FOUND_USER));

        if (!item.getOwner().getAddress().equals(from.getAddress())) {
            throw new ApiException(ExceptionEnum.UNAUTHORIZED_ITEM);
        }
        if (item.getOnSaleYn()) {
            throw new ApiException(ExceptionEnum.BAD_REQUEST_ITEM2);
        }
        if (item.getOwner().getAddress().equals(to.getAddress())) {
            throw new ApiException(ExceptionEnum.BAD_REQUEST_ITEM3);
        }

        item.setOwner(to);
        Items resItem = itemsRepository.save(item);

        ItemsRes res = ItemsRes.of(resItem);

        return res;
    }

    @Override
    public Boolean checkHasItem(String address, Long communityId) {
        List<Items> resList = itemsRepository.findByOwnerAddressAndCommunityIdAndOnSaleYn(address, communityId, false);

        return resList.size() > 0 ? true : false;
    }
}
