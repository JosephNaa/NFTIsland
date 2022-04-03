package com.ssafy.nfti.api.service;

import com.ssafy.nfti.api.response.CommunityListRes;
import com.ssafy.nfti.api.response.MyActivityRes;
import com.ssafy.nfti.db.entity.Board;
import com.ssafy.nfti.db.entity.Community;
import com.ssafy.nfti.db.repository.BoardRepository;
import com.ssafy.nfti.db.repository.BoardRepositorySupport;
import com.ssafy.nfti.db.repository.ItemsRepositorySupport;
import com.ssafy.nfti.db.repository.UserRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service("myPageService")
public class MyPageServiceImpl implements MyPageService {

    @Autowired
    BoardRepository boardRepository;

    @Autowired
    BoardRepositorySupport boardRepositorySupport;

    @Autowired
    UserRepository userRepository;

    @Autowired
    ItemsRepositorySupport itemsRepositorySupport;

    @Override
    public List<MyActivityRes> myActivityList(Pageable pageable, String findBy, String search) {

        List<Board> boardList = boardRepositorySupport.findAllByPageSortAndUser(pageable, findBy, search);
        List<MyActivityRes> res = new ArrayList<>();
        for (Board board : boardList) {
            res.add(MyActivityRes.of(board));
        }

        return res;
    }

    @Override
    public List<CommunityListRes> myCommunityList(Pageable pageable, String findBy, String search, Boolean onSaleYn) {
        List<Community> resList = itemsRepositorySupport.findAllMyCommunityId(pageable, findBy, search, onSaleYn);

        List<CommunityListRes> res = resList.stream()
            .map(community -> CommunityListRes.of(community)).collect(
                Collectors.toList());
        return res;
    }
}
