const fs = require('fs');
let text = fs.readFileSync('public/js/app.js', 'utf8');

text = text.replace(/toolDisplayName\(section\) \{[\s\S]*?return map\[section\] \|\| "He Tool";[\s\S]*?\}/, `toolDisplayName(section) {
          const map = {
            home: "Home",
            "section-logo": "Logo Workspace",
            "section-pdf-convert": "PDF to Image",
            "section-image-splitter": "Image Splitter",
            "section-video-stills": "Video Stills",
            "section-storyboard": "Storyboard",
            "section-link-gen": "Link Gen",
            "section-ad-downloader": "Ad Link Downloader",
            "section-yt-helper": "Video Downloads",
          };
          return map[section] || "Tool";
        }`);

fs.writeFileSync('public/js/app.js', text);
