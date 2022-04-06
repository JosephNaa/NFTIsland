package com.ssafy.nfti.api.service;

import com.ssafy.nfti.api.request.LikesReq;
import com.ssafy.nfti.common.model.response.BaseResponseBody;
import com.ssafy.nfti.db.entity.Likes;
import java.util.List;

public interface LikesService {
    BaseResponseBody addLike(LikesReq req);
    BaseResponseBody delLike(LikesReq req);
    List<Likes> getListByBoardId(Long id);
}
