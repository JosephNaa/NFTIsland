package com.ssafy.nfti.api.request;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
public class FileUploadReq {
    MultipartFile image;
    String authorName;
    String itemTitle;
    String itemDescription;
}
