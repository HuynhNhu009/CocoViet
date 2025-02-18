package com.cocoviet.backend.service;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface IFileUpload {
    String uploadFile(MultipartFile multipartFile, String folderName) throws IOException;
    String uploadFiles(List<MultipartFile> files, String folderName);

}