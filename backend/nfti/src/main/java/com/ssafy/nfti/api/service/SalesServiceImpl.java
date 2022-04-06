package com.ssafy.nfti.api.service;

import com.ssafy.nfti.api.request.CancelSaleReq;
import com.ssafy.nfti.api.request.CreateSaleReq;
import com.ssafy.nfti.api.request.PurchaseReq;
import com.ssafy.nfti.api.response.GetSaleRes;
import com.ssafy.nfti.api.response.ListCommunitiesOnSaleRes;
import com.ssafy.nfti.api.response.ListSalesOnCommunityIdRes;
import com.ssafy.nfti.api.response.SalesRes;
import com.ssafy.nfti.common.exception.enums.ExceptionEnum;
import com.ssafy.nfti.common.exception.response.ApiException;
import com.ssafy.nfti.db.entity.Community;
import com.ssafy.nfti.db.entity.Items;
import com.ssafy.nfti.db.entity.Sales;
import com.ssafy.nfti.db.entity.User;
import com.ssafy.nfti.db.repository.ItemsRepository;
import com.ssafy.nfti.db.repository.ItemsRepositorySupport;
import com.ssafy.nfti.db.repository.SalesRepository;
import com.ssafy.nfti.db.repository.SalesRepositorySupport;
import com.ssafy.nfti.db.repository.UserRepository;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service("salesService")
public class SalesServiceImpl implements SalesService {

    @Autowired
    SalesRepository salesRepository;

    @Autowired
    SalesRepositorySupport salesRepositorySupport;

    @Autowired
    ItemsRepository itemsRepository;

    @Autowired
    ItemsRepositorySupport itemsRepositorySupport;

    @Autowired
    UserRepository userRepository;

    @Override
    @Transactional
    public SalesRes createSales(CreateSaleReq req) {
        Items item = itemsRepository.findByTokenId(req.getTokenId())
            .orElseThrow(() -> new ApiException(
                ExceptionEnum.NOT_FOUND_ITEM));
        User seller = userRepository.findByAddress(req.getSellerAddress())
            .orElseThrow(() -> new ApiException(ExceptionEnum.NOT_FOUND_USER));

        if (!item.getOwner().getAddress().equals(seller.getAddress())) {
            throw new ApiException(ExceptionEnum.UNAUTHORIZED_SALES);
        }

        Sales sale = salesRepository.findBySaleContractAddress(req.getSaleContractAddress())
            .orElse(null);
        if (sale != null) {
            throw new ApiException(ExceptionEnum.CONFLICT_SALES2);
        }
        sale = new Sales();
        sale.setSaleContractAddress(req.getSaleContractAddress());
        sale.setItem(item);
        sale.setSeller(seller);
        sale.setSaleYn(false);

        Sales resSale = salesRepository.save(sale);
        SalesRes res = SalesRes.of(resSale);

        // item의 onSaleYn 변경
        item.setOnSaleYn(true);
        itemsRepository.save(item);

        return res;
    }

    @Override
    public String getSaleContractAddressByTokenId(Long tokenId) {
        Items item = itemsRepository.findByTokenId(tokenId)
            .orElseThrow(() -> new ApiException(ExceptionEnum.NOT_FOUND_ITEM));

        Sales sale = salesRepository.findByItemAndSaleYn(item, false)
            .orElseThrow(() -> new ApiException(ExceptionEnum.NOT_FOUND_SALES));

        String res = sale.getSaleContractAddress();
        return res;
    }

    @Override
    public List<ListCommunitiesOnSaleRes> listCommunitiesOnSale(Pageable pageable) {
        List<Community> resList = itemsRepositorySupport.findAllCommunityOnSale(pageable);

        List<ListCommunitiesOnSaleRes> res = resList.stream()
            .map(community -> ListCommunitiesOnSaleRes.of(community)).collect(
                Collectors.toList());
        return res;
    }

    @Override
    public List<ListSalesOnCommunityIdRes> listSalesOnCommunityId(Pageable pageable,
        Long communityId) {
        List<Sales> resList = salesRepositorySupport.findAllSalesOnCommunityId(pageable,
            communityId);

        List<ListSalesOnCommunityIdRes> res = resList.stream()
            .map(sales -> ListSalesOnCommunityIdRes.of(sales)).collect(Collectors.toList());
        return res;
    }

    @Override
    public GetSaleRes getSale(String saleContractAddress) {
        Sales sale = salesRepository.findBySaleContractAddress(saleContractAddress)
            .orElseThrow(() -> new ApiException(ExceptionEnum.NOT_FOUND_SALES));
        GetSaleRes res = GetSaleRes.of(sale);
        return res;
    }

    @Override
    @Transactional
    public SalesRes purchase(String saleContractAddress, PurchaseReq req) {
        Sales sale = salesRepository.findBySaleContractAddress(saleContractAddress)
            .orElseThrow(() -> new ApiException(ExceptionEnum.NOT_FOUND_SALES));

        User buyer = userRepository.findByAddress(req.getBuyerAddress())
            .orElseThrow(() -> new ApiException(ExceptionEnum.NOT_FOUND_USER));

        if (sale.getSeller().getAddress().equals(buyer.getAddress())) {
            throw new ApiException(ExceptionEnum.CONFLICT_SALES);
        }

        sale.setBuyer(buyer);
        sale.setSaleYn(true);
        sale.setCompletedAt(LocalDateTime.now());
        Sales resSale = salesRepository.save(sale);

        SalesRes res = SalesRes.of(resSale);

        // item 업데이트
        Items item = sale.getItem();
        item.setOwner(buyer);
        item.setOnSaleYn(false);
        itemsRepository.save(item);

        return res;
    }

    @Override
    @Transactional
    public void cancelSale(String saleContractAddress, CancelSaleReq req) {
        User owner = userRepository.findByAddress(req.getSellerAddress())
            .orElseThrow(() -> new ApiException(ExceptionEnum.NOT_FOUND_USER));
        Sales sale = salesRepository.findBySaleContractAddress(saleContractAddress)
            .orElseThrow(() -> new ApiException(ExceptionEnum.NOT_FOUND_SALES));

        Items item = sale.getItem();

        if (!sale.getSeller().getAddress().equals(owner.getAddress())) {
            throw new ApiException(ExceptionEnum.UNAUTHORIZED_SALES);
        }

        if (sale.getSaleYn() == true || item.getOnSaleYn() == false) {
            throw new ApiException(ExceptionEnum.CONFLICT_SALES3);
        }

        item.setOnSaleYn(false);
        itemsRepository.save(item);

        salesRepository.delete(sale);

        return;
    }

    @Override
    public Long getCommunityItemCount(Long communityId) {
        Long res = itemsRepositorySupport.getCommunityItemCount(communityId);
        return res;
    }

    @Override
    public Long getCommunityOwnerCount(Long communityId) {
        Long res = itemsRepositorySupport.getCommunityOwnerCount(communityId);
        return res;
    }

    @Override
    public Long getCommunityTradedCount(Long communityId) {
        Long res = salesRepositorySupport.getCommunityTradedCount(communityId);
        return res;
    }
}
