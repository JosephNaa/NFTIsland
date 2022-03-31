package com.ssafy.nfti.api.service;

import com.ssafy.nfti.api.request.LikesReq;
import com.ssafy.nfti.common.model.response.BaseResponseBody;

public interface LikesService {
    BaseResponseBody addLike(LikesReq req);
    BaseResponseBody delLike(LikesReq req);
}
