//package com.ssafy.nfti.api.response;
//
//import com.fasterxml.jackson.databind.PropertyNamingStrategy;
//import com.fasterxml.jackson.databind.annotation.JsonNaming;
//import com.ssafy.nfti.db.entity.Likes;
//import lombok.Builder;
//import lombok.Getter;
//import lombok.Setter;
//
//@Getter
//@Setter
//@Builder
//@JsonNaming(value = PropertyNamingStrategy.SnakeCaseStrategy.class)
//public class LikesRes {
//
//    String userAddress;
//
//    public static LikesRes of(Likes likes) {
//
//        return LikesRes.builder()
//            .userAddress(likes.getUser().getAddress())
//            .build();
//    }
//}
