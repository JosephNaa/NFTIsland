package com.ssafy.nfti.api.controller;

import com.ssafy.nfti.api.request.ItemsReq;
import com.ssafy.nfti.api.response.ItemListRes;
import com.ssafy.nfti.api.response.ItemsCreateRes;
import com.ssafy.nfti.api.service.AWSS3Service;
import com.ssafy.nfti.api.service.ItemsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
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

    @PostMapping("/image")
    public ResponseEntity<String> uploadItemImage(
        @RequestPart(value = "file") MultipartFile file) {
        String url = awss3Service.uploadFile(file);

        return ResponseEntity.ok(url);
    }

    @PostMapping()
    public ResponseEntity<ItemsCreateRes> createItems(
        @RequestBody ItemsReq req) {
        ItemsCreateRes res = itemsService.createItems(req);

        return ResponseEntity.ok(res);
    }

//    @GetMapping()
//    public ResponseEntity<ItemListRes> getItems(
//        @RequestParam String address
//    ) {
//        return null;
//    }
}
