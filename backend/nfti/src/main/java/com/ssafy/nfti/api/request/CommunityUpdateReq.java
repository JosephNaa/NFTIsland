package com.ssafy.nfti.api.request;

import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
@JsonNaming(value = PropertyNamingStrategy.SnakeCaseStrategy.class)
public class CommunityUpdateReq {
    @ApiModelProperty(value = "로고 이미지")
    MultipartFile file;

    @ApiModelProperty(value = "생성자 아이디", name = "host_address")
    String hostAddress;

    @ApiModelProperty(value = "커뮤니티 이름")
    String name;
    @ApiModelProperty(value = "커뮤니티 설명")
    String description;

}
