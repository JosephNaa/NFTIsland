package com.ssafy.nfti.api.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FileUploadReq {
    Long tokenId;
    String ownerAddress;
    String authorName;
    String itemTitle;
    String itemDescription;
}
