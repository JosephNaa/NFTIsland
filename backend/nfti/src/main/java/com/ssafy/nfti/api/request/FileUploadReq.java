package com.ssafy.nfti.api.request;

import lombok.Getter;

@Getter
public class FileUploadReq {
    Long tokenId;
    String ownerAddress;
    String authorName;
    String itemTitle;
    String itemDescription;
}
