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
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
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

        FileUploadRes res = itemsService.createItems(url, fileUploadReq);
        return ResponseEntity.ok(res);
//        return null;
    }

    @PutMapping("/{itemId}")
    public ResponseEntity<BaseResponseBody> updateItemTokenIdAndOwnerAddress(UpdateItemReq updateItemReq) {

        itemsService.updateItemTokenIdAndOwnerAddress(updateItemReq.getItemId(), updateItemReq.getTokenId(), updateItemReq.getOwnerAddress());
        return ResponseEntity.ok(BaseResponseBody.of(200, "작품 정보 업데이트"));
    }

    @GetMapping()
    public ResponseEntity<List<ItemsRes>> getItems(@RequestParam(required = false) AddressItemsReq addressItemsReq) {

        System.out.println(addressItemsReq.getAddress());
        List<ItemsRes> res = itemsService.getItems();

        return ResponseEntity.ok(res);
    }

//    @GetMapping()
//    public ResponseEntity<List<ItemsRes>> getItemsWithAddress(AddressItemsReq addressItemsReq) {
//
//        System.out.println(addressItemsReq.getAddress());
//        List<ItemsRes> res = itemsService.getItemsWithAddress(addressItemsReq.getAddress());
//
//        return ResponseEntity.ok(res);
//    }

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
