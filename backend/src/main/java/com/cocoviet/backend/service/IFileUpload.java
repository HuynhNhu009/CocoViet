package com.cocoviet.backend.service;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface IFileUpload {
    String uploadFile(MultipartFile multipartFile, String folderName) throws IOException;
}
