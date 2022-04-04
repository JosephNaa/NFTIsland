package com.ssafy.nfti.api.response;

import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.ssafy.nfti.db.entity.Community;
import com.ssafy.nfti.db.entity.User;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@JsonNaming(value = PropertyNamingStrategy.SnakeCaseStrategy.class)
public class ListCommunitiesOnSaleRes {
    Long communityId;
    String communityLogoPath;
    String communityName;
    String communityDescription;

    String ownerAddress;
    String ownerProfilePath;
    String ownerNickname;

    public static ListCommunitiesOnSaleRes of(Community community) {
        ListCommunitiesOnSaleRes res = new ListCommunitiesOnSaleRes();
        res.setCommunityId(community.getId());
        res.setCommunityLogoPath(community.getLogoPath());
        res.setCommunityName(community.getName());
        res.setCommunityDescription(community.getDescription());

        User owner = community.getUser();
        res.setOwnerAddress(owner.getAddress());
        res.setOwnerProfilePath(owner.getProfile_path());
        res.setOwnerNickname(owner.getNickname());

        return res;
    }
}
