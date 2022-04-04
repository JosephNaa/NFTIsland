package com.ssafy.nfti.api.controller;

import com.ssafy.nfti.api.request.CreateSaleReq;
import com.ssafy.nfti.api.request.PurchaseReq;
import com.ssafy.nfti.api.response.CommunityListRes;
import com.ssafy.nfti.api.response.SalesRes;
import com.ssafy.nfti.api.service.SalesService;
import io.swagger.annotations.Api;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
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

    @GetMapping("/community")
    public ResponseEntity<List<CommunityListRes>> listCommunitiesOnSale(
        @PageableDefault(size = 30) Pageable pageable
    ) {
        List<CommunityListRes> res = salesService.listCommunitiesOnSale(pageable);

        return ResponseEntity.ok(res);
    }

    @GetMapping("/community/{communityId}")
    public ResponseEntity<List<SalesRes>> listSalesOnCommunityId(
        @PageableDefault(size = 30) Pageable pageable,
        @PathVariable Long communityId
    ) {
        List<SalesRes> res = salesService.listSalesOnCommunityId(pageable, communityId);

        return ResponseEntity.ok(res);
    }

    @GetMapping("/info/{saleContractAddress}")
    public ResponseEntity<SalesRes> getSale(@PathVariable String saleContractAddress) {
        SalesRes res = salesService.getSale(saleContractAddress);

        return ResponseEntity.ok(res);
    }

    @PutMapping("/info/{saleContractAddress}")
    public ResponseEntity<SalesRes> purchase(@PathVariable String saleContractAddress, @RequestBody PurchaseReq req) {
        SalesRes res = salesService.purchase(saleContractAddress, req);

        return ResponseEntity.ok(res);
    }
}
