package com.fuelapp.util;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.EncodeHintType;
import com.google.zxing.MultiFormatWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.qrcode.decoder.ErrorCorrectionLevel;

import java.nio.file.*;
import java.util.HashMap;

public class QRCodeGenerator {

    public static String generateQRCode(String text) {
        try {
            int width = 250;
            int height = 250;
            String fileType = "png";

            Path path = Paths.get("qrcodes/" + text + ".png");

            HashMap<EncodeHintType, Object> hints = new HashMap<>();
            hints.put(EncodeHintType.ERROR_CORRECTION, ErrorCorrectionLevel.H);

            BitMatrix bitMatrix = new MultiFormatWriter().encode(
                    text, BarcodeFormat.QR_CODE, width, height, hints);

            Files.createDirectories(path.getParent());
            MatrixToImageWriter.writeToPath(bitMatrix, fileType, path);

            // Return path as URL or relative path based on your setup
            return path.toString();

        } catch (Exception e) {
            throw new RuntimeException("Error generating QR code", e);
        }
    }
}
