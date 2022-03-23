package com.ssafy.nfti.api.controller;

import com.ssafy.nfti.api.request.CreateSaleReq;
import com.ssafy.nfti.api.request.SalesReq;
import com.ssafy.nfti.api.response.SalesRes;
import com.ssafy.nfti.api.service.SalesService;
import com.ssafy.nfti.common.model.response.BaseResponseBody;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/v1/sales")
public class SalesController {

    @Autowired
    SalesService salesService;

    @PostMapping()
    public ResponseEntity<BaseResponseBody> createSales(CreateSaleReq createSaleReq) {

        salesService.createSales(createSaleReq);

        return ResponseEntity.ok(BaseResponseBody.of(200, "판매 정보 등록"));
    }

    @GetMapping("/{tokenId}")
    public ResponseEntity<SalesRes> getSales(@PathVariable Long tokenId) {
        SalesRes res = salesService.getSales(tokenId);
        return ResponseEntity.ok(res);
    }

    @PutMapping("/{tokenId}/purchase")
    public ResponseEntity<BaseResponseBody> purchaseSales(SalesReq salesReq,
        @PathVariable Long tokenId) {
        salesService.completeSales(tokenId, salesReq);
        return ResponseEntity.ok(BaseResponseBody.of(200, "구매자 정보 업데이트"));
    }

    @DeleteMapping("/{saleId}")
    public ResponseEntity<BaseResponseBody> deleteSales(@PathVariable Long saleId) {
        salesService.deleteSales(saleId);
        return ResponseEntity.ok(BaseResponseBody.of(200, "판매 취소"));
    }

    @PutMapping("/{tokenId}/complete")
    public ResponseEntity<BaseResponseBody> completeSales(@PathVariable Long tokenId, SalesReq salesReq) {
        salesService.completeSales(tokenId, salesReq);
        return ResponseEntity.ok(BaseResponseBody.of(200, "판매 완료"));
    }
}
