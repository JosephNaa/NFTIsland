package com.ssafy.nfti.api.response;

import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.ssafy.nfti.common.util.BoardComparator;
import com.ssafy.nfti.db.entity.Board;
import com.ssafy.nfti.db.entity.Community;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import io.swagger.annotations.ApiParam;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Builder
@JsonNaming(value = PropertyNamingStrategy.SnakeCaseStrategy.class)
@ApiModel("커뮤니티 Response")
public class CommunityRes {
    Long id;
    String hostAddress;
    String hostNickName;
    String name;
    String description;
    Boolean payable;
    String logoPath;
    LocalDateTime createdAt;
    List<BoardListRes> boards;

    public static CommunityRes of(Community community, String search) {

        List<BoardListRes> boards = new ArrayList<>();
        List<Board> boardList = community.getBoards();
        boardList.sort(new BoardComparator());

        for (Board board : community.getBoards()) {
            if (board.getTitle().contains(search)) {
                boards.add(BoardListRes.of(board));
            }
        }

        return CommunityRes.builder()
            .id(community.getId())
            .hostAddress(community.getUser().getAddress())
            .hostNickName(community.getUser().getNickname())
            .name(community.getName())
            .description(community.getDescription())
            .payable(community.getPayable())
            .logoPath(community.getLogoPath())
            .createdAt(community.getCreatedAt())
            .boards(boards)
            .build();
    }
}
