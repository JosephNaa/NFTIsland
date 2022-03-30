package com.ssafy.nfti.api.service;

import com.ssafy.nfti.api.request.LikesReq;

public interface LikesService {
    String addLike(LikesReq req);
    String delLike(LikesReq req);
}
