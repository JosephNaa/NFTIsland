package com.ssafy.nfti.api.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FileUploadRes {
    String result;
    Long itemId;
    String imageUrl;
}
