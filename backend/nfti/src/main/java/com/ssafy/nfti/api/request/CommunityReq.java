package com.ssafy.nfti.api.request;

import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@JsonNaming(value = PropertyNamingStrategy.SnakeCaseStrategy.class)
@ApiModel(value = "커뮤니티 Request")
public class CommunityReq {
    @ApiModelProperty(value = "로고 이미지")
    MultipartFile file;

    @ApiModelProperty(value = "생성자 아이디", name = "host_address")
    String hostAddress;

    @ApiModelProperty(value = "커뮤니티 이름")
    String name;
    @ApiModelProperty(value = "커뮤니티 설명")
    String description;
    @ApiModelProperty(value = "공개 여부")
    Boolean payable;

}
