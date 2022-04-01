package com.ssafy.nfti.api.response;

import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.ssafy.nfti.db.entity.Board;
import com.ssafy.nfti.db.entity.Community;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@JsonNaming(value = PropertyNamingStrategy.SnakeCaseStrategy.class)
public class CommunityListRes {
    Long id;
    String hostAddress;
    String hostNickName;
    String hostProfile;
    String name;
    String description;
    Boolean payable;
    String logoPath;
    LocalDateTime createdAt;

    public static CommunityListRes of(Community community) {

        return CommunityListRes.builder()
            .id(community.getId())
            .hostAddress(community.getUser().getAddress())
            .hostNickName(community.getUser().getNickname())
            .hostProfile(community.getUser().getProfile_path())
            .name(community.getName())
            .description(community.getDescription())
            .payable(community.getPayable())
            .logoPath(community.getLogoPath())
            .createdAt(community.getCreatedAt())
            .build();
    }
}
