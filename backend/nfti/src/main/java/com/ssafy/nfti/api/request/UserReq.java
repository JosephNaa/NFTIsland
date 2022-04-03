package com.ssafy.nfti.api.request;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;


@Getter
@Setter
public class UserReq {
    String address;
    String nickname;
    MultipartFile profile_path;
}
