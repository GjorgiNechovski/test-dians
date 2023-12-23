package mk.dians.finki.backend.service.impl;

import mk.dians.finki.backend.service.ImageService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

@Service
public class ImageServiceImpl implements ImageService {
    @Value("${file.upload.directory}")
    private String uploadDirectory;
    @Override
    public String uploadFile(MultipartFile file) throws IOException {
        String fileName = file.getOriginalFilename();
        String filePath = Paths.get(uploadDirectory, fileName).toString();
        Files.write(Paths.get(filePath), file.getBytes());

        return "assets/" + fileName;
    }
}
