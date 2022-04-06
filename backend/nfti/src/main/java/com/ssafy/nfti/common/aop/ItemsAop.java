package com.ssafy.nfti.common.aop;

import com.ssafy.nfti.api.request.BoardReq;
import com.ssafy.nfti.api.request.CommentReq;
import com.ssafy.nfti.api.request.DeleteReq;
import com.ssafy.nfti.api.request.LikesReq;
import com.ssafy.nfti.api.request.ValidReq;
import com.ssafy.nfti.api.service.ItemsService;
import com.ssafy.nfti.common.exception.enums.ExceptionEnum;
import com.ssafy.nfti.common.exception.response.ApiException;
import java.lang.reflect.Method;
import java.util.Arrays;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class ItemsAop {

    private final ItemsService itemsService;

    @Autowired
    public ItemsAop(ItemsService itemsService) {
        this.itemsService = itemsService;
    }

    @Pointcut(
        "execution(* com.ssafy.nfti.api.controller.CommentController.*(..)) "
            + "|| execution(* com.ssafy.nfti.api.controller.LikesController.*(..))"
    )
    private void cut() {}

    @Before("cut()")
    public void before(JoinPoint joinPoint) {
        Boolean flag = false;
        Object[] args = joinPoint.getArgs();

        for (Object obj : args) {
            if (obj instanceof ValidReq) {
                flag = itemsService.checkHasItem(((ValidReq) obj).getUserAddress(),
                    ((ValidReq) obj).getCommunityId());
            } else if (obj instanceof BoardReq) {
                flag = itemsService.checkHasItem(((BoardReq) obj).getUserAddress(),
                    ((BoardReq) obj).getCommunityId());
            } else if (obj instanceof CommentReq) {
                flag = itemsService.checkHasItem(((CommentReq) obj).getUserAddress(),
                    ((CommentReq) obj).getCommunityId());
            } else if (obj instanceof LikesReq) {
                flag = itemsService.checkHasItem(((LikesReq) obj).getUserAddress(),
                    ((LikesReq) obj).getCommunityId());
            } else {
                flag = false;
            }
        }

        if (!flag) {
            throw new ApiException(ExceptionEnum.CONFLICT_USER);
        }
    }

    @AfterReturning(value = "cut()", returning = "obj")
    public void afterReturn(JoinPoint joinPoint, Object obj) {
        System.out.println(obj);

    }
}
