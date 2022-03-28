package com.ssafy.nfti.api.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CommentReq {
    Long boardId;
    String userAddress;
    String content;

}
