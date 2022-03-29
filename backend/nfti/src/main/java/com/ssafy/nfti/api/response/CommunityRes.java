package com.ssafy.nfti.api.response;

import com.ssafy.nfti.db.entity.Community;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CommunityRes {
    Long id;
    String hostAddress;
    String name;
    String description;
    Boolean payable;
    String logoPath;
    LocalDateTime createdAt;

    public static CommunityRes of(Community community) {
        CommunityRes res = new CommunityRes();
        res.setId(community.getId());
        res.setHostAddress(community.getHostAddress());
        res.setName(community.getName());
        res.setDescription(community.getDescription());
        res.setPayable(community.getPayable());
        res.setLogoPath(community.getLogoPath());
        res.setCreatedAt(community.getCreatedAt());

        return res;
    }
}
