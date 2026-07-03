/**
 * @file utils/image.js
 * @description Image processing utilities using Sharp.
 *
 * Exports:
 *  - resizeToThumbnail(inputPath, outputPath)       resize to 400x400 WebP
 *  - compressImage(inputPath, outputPath, quality)  reduce file size
 *  - convertToWebP(inputPath, outputPath)           format conversion
 *  - getImageMetadata(inputPath)                    width, height, format, size
 *
 * @layer Utils
 * @dependency sharp
 */