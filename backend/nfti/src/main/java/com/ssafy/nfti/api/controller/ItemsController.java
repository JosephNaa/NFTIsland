package com.ssafy.nfti.api.controller;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.nfti.api.request.AddressItemsReq;
import com.ssafy.nfti.api.request.FileUploadReq;
import com.ssafy.nfti.api.request.ItemsReq;
import com.ssafy.nfti.api.request.UpdateItemReq;
import com.ssafy.nfti.api.response.FileUploadRes;
import com.ssafy.nfti.api.response.ItemsRes;
import com.ssafy.nfti.api.service.AWSS3Service;
import com.ssafy.nfti.api.service.ItemsService;
import com.ssafy.nfti.common.model.response.BaseResponseBody;
import com.ssafy.nfti.db.entity.Items;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/v1/items")
public class ItemsController {

    @Autowired
    ItemsService itemsService;

    @Autowired
    AWSS3Service awss3Service;

    @PostMapping()
    public ResponseEntity<FileUploadRes> createItem(
        @RequestPart(value = "file") MultipartFile file,
        @RequestPart(value = "fileUploadReq") FileUploadReq fileUploadReq) {
//        System.out.println("file: " + fileUploadReq);
        String url = awss3Service.uploadFile(file);

        Items item = itemsService.createItems(url, fileUploadReq);

        FileUploadRes res = new FileUploadRes();

        if (item != null) {
            res.setImageUrl(item.getItemUrl());
            res.setItemId(item.getTokenId());
            res.setResult("Success");

            return ResponseEntity.ok(res);
        } else {
            res.setResult("Fail");

            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(res);
        }
//        return null;
    }

    @PutMapping("/{itemId}")
    public ResponseEntity<BaseResponseBody> updateItemTokenIdAndOwnerAddress(
        UpdateItemReq updateItemReq, @PathVariable Long itemId) {

        itemsService.updateItemTokenIdAndOwnerAddress(itemId, updateItemReq.getTokenId(), updateItemReq.getOwnerAddress());
        return ResponseEntity.ok(BaseResponseBody.of(200, "작품 정보 업데이트"));
    }

    @GetMapping()
    public ResponseEntity<List<ItemsRes>> getItems() {

        List<ItemsRes> res = itemsService.getItems();

        return ResponseEntity.ok(res);
    }

    @GetMapping("/{address}")
    public ResponseEntity<List<ItemsRes>> getItemsWithAddress(@PathVariable String address) {

        System.out.println(address);
        List<ItemsRes> res = itemsService.getItemsWithAddress(address);

        return ResponseEntity.ok(res);
    }

    @GetMapping("/recent")
    public ResponseEntity<ItemsRes> getRecentItems() {

        ItemsRes res = itemsService.getRecentItems();
        return ResponseEntity.ok(res);
    }

    @GetMapping("/{tokenId}")
    public ResponseEntity<ItemsRes> getItemByTokenId(Long tokenId) {

        ItemsRes res = itemsService.getItemByTokenId(tokenId);
        return ResponseEntity.ok(res);
    }
}
