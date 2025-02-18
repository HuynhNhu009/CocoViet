package com.cocoviet.backend.service.impl;

import com.cloudinary.Cloudinary;
import com.cocoviet.backend.service.IFileUpload;
import jakarta.annotation.Resource;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class FileUpLoadServiceImpl implements IFileUpload {

    @Resource
    private Cloudinary cloudinary;

    @Override
    public String uploadFile(MultipartFile multipartFile, String folderName) throws IOException {
        HashMap<Object,Object> options = new HashMap<>();
        options.put("folder", folderName);

        if(multipartFile.getOriginalFilename() == null || multipartFile.getOriginalFilename().isEmpty()){
            throw new RuntimeException("Empty file name");
        }

        Map uploadFile = cloudinary.uploader().upload(multipartFile.getBytes(), options);
        String publicId = (String) uploadFile.get("public_id");

        // Tạo URL
        return cloudinary.url().secure(true).generate(publicId);
    }

    @Override
    public String uploadFiles(List<MultipartFile> files, String folderName)  {
        return files.stream()
                .map(file -> {
                    try {
                        return uploadFile(file, folderName);
                    } catch (IOException e) {
                        throw new RuntimeException(e);
                    }
                })
                .filter(url -> url != null && !url.isEmpty()) // Filtering out null or empty URLs
                .collect(Collectors.joining(",")); // Collecting URLs into a comma-separated String
    }
}
