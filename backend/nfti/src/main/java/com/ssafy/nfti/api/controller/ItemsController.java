package com.ssafy.nfti.api.controller;

import com.ssafy.nfti.api.request.ItemsReq;
import com.ssafy.nfti.api.request.UpdateItemReq;
import com.ssafy.nfti.api.response.ItemsRes;
import com.ssafy.nfti.api.service.ItemsService;
import com.ssafy.nfti.common.model.response.BaseResponseBody;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/v1/items")
public class ItemsController {

    @Autowired
    ItemsService itemsService;

    @PostMapping()
    public ResponseEntity<ItemsRes> createItem(ItemsReq itemsReq) {

        ItemsRes res = itemsService.createItems(itemsReq);
        return ResponseEntity.ok(res);
    }

    @PutMapping("/{itemId}")
    public ResponseEntity<BaseResponseBody> updateItemTokenIdAndOwnerAddress(UpdateItemReq updateItemReq) {

        itemsService.updateItemTokenIdAndOwnerAddress(updateItemReq.getItemId(), updateItemReq.getTokenId(), updateItemReq.getOwnerAddress());
        return ResponseEntity.ok(BaseResponseBody.of(200, "작품 정보 업데이트"));
    }

    @GetMapping()
    public ResponseEntity<List<ItemsRes>> getItems(String address) {

        List<ItemsRes> res = itemsService.getItems(address);

        return ResponseEntity.ok(res);
    }

    @GetMapping("/recent")
    public ResponseEntity<List<ItemsRes>> getRecentItems() {

        List<ItemsRes> res = itemsService.getRecentItems();
        return ResponseEntity.ok(res);
    }

    @GetMapping("/{tokenId}")
    public ResponseEntity<ItemsRes> getItemByTokenId(Long tokenId) {

        ItemsRes res = itemsService.getItemByTokenId(tokenId);
        return ResponseEntity.ok(res);
    }
}
