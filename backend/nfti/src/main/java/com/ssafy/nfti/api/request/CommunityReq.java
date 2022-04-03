package com.ssafy.nfti.api.request;

import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Getter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@JsonNaming(value = PropertyNamingStrategy.SnakeCaseStrategy.class)
public class CommunityReq {
    MultipartFile file;
    String hostAddress;
    String name;
    String description;
    Boolean payable;

}
