package com.ssafy.nfti.api.service;

import org.springframework.web.multipart.MultipartFile;

public interface AWSS3Service {
    String uploadFile(MultipartFile file);
}
