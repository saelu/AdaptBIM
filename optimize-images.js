const imagemin = require('imagemin');
const imageminWebp = require('imagemin-webp');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');
const fs = require('fs');
const path = require('path');

async function optimizeImages() {
  try {
    // Optimize PNG images
    const pngFiles = await imagemin(['public/img/*.png'], {
      destination: 'public/img/optimized',
      plugins: [
        imageminPngquant({
          quality: [0.6, 0.8],
          speed: 4
        })
      ]
    });

    // Convert to WebP
    const webpFiles = await imagemin(['public/img/*.{jpg,jpeg,png}'], {
      destination: 'public/img/webp',
      plugins: [
        imageminWebp({
          quality: 75,
          method: 6
        })
      ]
    });

    // Optimize JPEG images
    const jpegFiles = await imagemin(['public/img/*.{jpg,jpeg}'], {
      destination: 'public/img/optimized',
      plugins: [
        imageminMozjpeg({
          quality: 75,
          progressive: true
        })
      ]
    });

    console.log('Image optimization completed!');
    console.log(`Optimized ${pngFiles.length + jpegFiles.length} images`);
    console.log(`Created ${webpFiles.length} WebP images`);
  } catch (error) {
    console.error('Error optimizing images:', error);
  }
}

optimizeImages(); 