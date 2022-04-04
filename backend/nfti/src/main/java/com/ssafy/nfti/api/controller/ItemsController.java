package com.ssafy.nfti.api.controller;

import com.ssafy.nfti.api.request.ItemsReq;
import com.ssafy.nfti.api.request.TransferItemReq;
import com.ssafy.nfti.api.response.ItemsCreateRes;
import com.ssafy.nfti.api.response.ItemsRes;
import com.ssafy.nfti.api.service.AWSS3Service;
import com.ssafy.nfti.api.service.ItemsService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
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
@Api(value = "토큰 API", tags = {"Items."})
public class ItemsController {

    @Autowired
    ItemsService itemsService;

    @Autowired
    AWSS3Service awss3Service;

    @PostMapping("/image")
    @ApiOperation(value = "민팅", notes = "토큰을 S3에 업로드한다.")
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

    @GetMapping()
    public ResponseEntity<List<ItemsRes>> listItems(
        @PageableDefault(sort = "community_id", size = 30) Pageable pageable,
        @RequestParam(required = true) String findBy,
        @RequestParam(required = true) String search,
        @RequestParam(required = false) Long communityId,
        @RequestParam(required = true) Boolean onSaleYn
    ) {
        List<ItemsRes> res = itemsService.listItems(pageable, findBy, search, communityId, onSaleYn);
        return ResponseEntity.ok(res);
    }

    @GetMapping("/{tokenId}")
    public ResponseEntity<ItemsRes> getItem(@PathVariable Long tokenId) {
        ItemsRes res = itemsService.getItem(tokenId);
        return ResponseEntity.ok(res);
    }

    @PutMapping("/{tokenId}")
    public ResponseEntity<ItemsRes> transferItem(
        @PathVariable Long tokenId,
        @RequestBody TransferItemReq req
    ) {
        ItemsRes res = itemsService.transferItem(tokenId, req);
        return ResponseEntity.ok(res);
    }

    @GetMapping("/hasItem")
    public ResponseEntity<Boolean> checkHasItem(@RequestParam String address, @RequestParam Long communityId) {
        Boolean res = itemsService.checkHasItem(address, communityId);
        return ResponseEntity.ok(res);
    }
}
