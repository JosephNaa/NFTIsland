package com.ssafy.nfti.api.service;

import com.ssafy.nfti.api.response.MyActivityRes;
import java.util.List;

public interface MyPageService {
    List<MyActivityRes> myActivityList(String address);
}
