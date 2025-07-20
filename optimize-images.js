async function optimizeImages() {
  try {
    // Dynamic imports for ES modules
    const imagemin = (await import('imagemin')).default;
    const imageminWebp = (await import('imagemin-webp')).default;
    const imageminMozjpeg = (await import('imagemin-mozjpeg')).default;
    const imageminPngquant = (await import('imagemin-pngquant')).default;
    const fs = require('fs');
    const path = require('path');

    // Create directories if they don't exist
    const optimizedDir = 'public/img/optimized';
    const webpDir = 'public/img/webp';
    
    if (!fs.existsSync(optimizedDir)) {
      fs.mkdirSync(optimizedDir, { recursive: true });
    }
    if (!fs.existsSync(webpDir)) {
      fs.mkdirSync(webpDir, { recursive: true });
    }

    // Optimize PNG images
    const pngFiles = await imagemin(['public/img/*.png'], {
      destination: optimizedDir,
      plugins: [
        imageminPngquant({
          quality: [0.6, 0.8],
          speed: 4
        })
      ]
    });

    // Convert to WebP
    const webpFiles = await imagemin(['public/img/*.{jpg,jpeg,png}'], {
      destination: webpDir,
      plugins: [
        imageminWebp({
          quality: 75,
          method: 6
        })
      ]
    });

    // Optimize JPEG images
    const jpegFiles = await imagemin(['public/img/*.{jpg,jpeg}'], {
      destination: optimizedDir,
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