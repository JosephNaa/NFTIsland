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
    String logoPath;
    String ownerProfilePath;
    String name;
    String ownerNickname;
    Long id;
    String description;

    public static ListCommunitiesOnSaleRes of(Community community) {
        ListCommunitiesOnSaleRes res = new ListCommunitiesOnSaleRes();
        res.setLogoPath(community.getLogoPath());
        res.setName(community.getName());
        res.setId(community.getId());
        res.setDescription(community.getDescription());

        User owner = community.getUser();
        res.setOwnerProfilePath(owner.getProfile_path());
        res.setOwnerNickname(owner.getNickname());

        return res;
    }
}
