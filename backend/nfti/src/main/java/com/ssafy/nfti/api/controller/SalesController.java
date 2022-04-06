package com.ssafy.nfti.api.controller;

import com.ssafy.nfti.api.request.CancelSaleReq;
import com.ssafy.nfti.api.request.CreateSaleReq;
import com.ssafy.nfti.api.request.PurchaseReq;
import com.ssafy.nfti.api.response.GetSaleRes;
import com.ssafy.nfti.api.response.ListCommunitiesOnSaleRes;
import com.ssafy.nfti.api.response.ListSalesOnCommunityIdRes;
import com.ssafy.nfti.api.response.SalesRes;
import com.ssafy.nfti.api.service.SalesService;
import com.ssafy.nfti.common.model.response.BaseResponseBody;
import io.swagger.annotations.Api;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/v1/sales")
@Api(value = "마켓 플레이스 API", tags = {"Sales."})
public class SalesController {

    @Autowired
    SalesService salesService;

    @PostMapping()
    public ResponseEntity<SalesRes> createSales(@RequestBody CreateSaleReq createSaleReq) {

        SalesRes res = salesService.createSales(createSaleReq);

        return ResponseEntity.ok(res);
    }

    @GetMapping("/item/{tokenId}")
    public ResponseEntity<String> getSaleContractAddressByTokenId(
        @PathVariable Long tokenId
    ) {
        String res = salesService.getSaleContractAddressByTokenId(tokenId);
        return ResponseEntity.ok(res);
    }

    @GetMapping("/community")
    public ResponseEntity<List<ListCommunitiesOnSaleRes>> listCommunitiesOnSale(
        @PageableDefault(size = 30) Pageable pageable
    ) {
        List<ListCommunitiesOnSaleRes> res = salesService.listCommunitiesOnSale(pageable);

        return ResponseEntity.ok(res);
    }

    @GetMapping("/community/{communityId}")
    public ResponseEntity<List<ListSalesOnCommunityIdRes>> listSalesOnCommunityId(
        @PageableDefault(size = 30) Pageable pageable,
        @PathVariable Long communityId
    ) {
        List<ListSalesOnCommunityIdRes> res = salesService.listSalesOnCommunityId(pageable,
            communityId);

        return ResponseEntity.ok(res);
    }

    @GetMapping("/info/{saleContractAddress}")
    public ResponseEntity<GetSaleRes> getSale(@PathVariable String saleContractAddress) {
        GetSaleRes res = salesService.getSale(saleContractAddress);

        return ResponseEntity.ok(res);
    }

    @PutMapping("/info/{saleContractAddress}")
    public ResponseEntity<SalesRes> purchase(@PathVariable String saleContractAddress,
        @RequestBody PurchaseReq req) {
        SalesRes res = salesService.purchase(saleContractAddress, req);

        return ResponseEntity.ok(res);
    }

    @PostMapping("/info/{saleContractAddress}")
    public ResponseEntity<? extends ResponseEntity> cancelSale(
        @PathVariable String saleContractAddress,
        @RequestBody CancelSaleReq req) {
        salesService.cancelSale(saleContractAddress, req);

        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @GetMapping("/community/{communityId}/count/items")
    public ResponseEntity<Long> getCommunityItemCount(@PathVariable Long communityId) {
        Long res = salesService.getCommunityItemCount(communityId);
        return ResponseEntity.ok(res);
    }

    @GetMapping("/community/{communityId}/count/owners")
    public ResponseEntity<Long> getCommunityOwnerCount(@PathVariable Long communityId) {
        Long res = salesService.getCommunityOwnerCount(communityId);
        return ResponseEntity.ok(res);
    }

    @GetMapping("/community/{communityId}/count/traded")
    public ResponseEntity<Long> getCommunityTradedCount(@PathVariable Long communityId) {
        Long res = salesService.getCommunityTradedCount(communityId);
        return ResponseEntity.ok(res);
    }
}
