package com.ssafy.nfti.api.controller;

import com.ssafy.nfti.api.request.CreateSaleReq;
import com.ssafy.nfti.api.response.SalesRes;
import com.ssafy.nfti.api.service.SalesService;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
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
}
