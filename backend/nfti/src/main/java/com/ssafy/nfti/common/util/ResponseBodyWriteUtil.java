package com.ssafy.nfti.common.util;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.nfti.common.model.response.BaseResponseBody;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Calendar;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;

/**
 * 컨트롤러(controller)가 아닌곳에서, 서버 응답값(바디) 직접 변경 및 전달 하기위한 유틸 정의.
 */
public class ResponseBodyWriteUtil {
	
	public static void sendApiResponse(HttpServletResponse response, BaseResponseBody apiResponse) throws IOException {
        response.setStatus(HttpStatus.OK.value());
        response.setContentType(APPLICATION_JSON_VALUE);
        response.setCharacterEncoding("UTF-8");
        response.getOutputStream().write(new ObjectMapper().writeValueAsString(apiResponse).getBytes());
    }
}
