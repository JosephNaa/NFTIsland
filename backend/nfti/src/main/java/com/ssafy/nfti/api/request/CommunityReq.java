package com.ssafy.nfti.api.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CommunityReq {
    String hostAddress;
    String name;
    String description;
    Boolean payable;

}
