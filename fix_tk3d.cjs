const fs = require('fs');

let app = fs.readFileSync('public/js/app.js', 'utf8');
app = app.replace(/var ACC = \{[\s\S]*?\}\;/, `var ACC = {
          home: "#7c5cff",
          "section-logo": "#8b5cf6",
          "section-pdf-convert": "#3b82f6",
          "section-image-splitter": "#06b6d4",
          "section-video-stills": "#10b981",
          "section-storyboard": "#f59e0b",
          "section-link-gen": "#f97316",
          "section-ad-downloader": "#ec4899",
          "section-yt-helper": "#ef4444"
        };`);

fs.writeFileSync('public/js/app.js', app);
