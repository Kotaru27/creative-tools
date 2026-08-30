const fs = require('fs');
let text = fs.readFileSync('public/js/app.js', 'utf8');

text = text.replace(/section-pdf:convert/g, 'section-pdf-convert');
text = text.replace(/section-pdf:split/g, 'section-image-splitter');
text = text.replace(/section-stills-boards:video/g, 'section-video-stills');
text = text.replace(/section-stills-boards:story/g, 'section-storyboard');
text = text.replace(/section-adlinks:gen/g, 'section-link-gen');
text = text.replace(/section-adlinks:downloader/g, 'section-ad-downloader');
text = text.replace(/'section-pdf'/g, "'section-pdf-convert'");
text = text.replace(/'section-stills-boards'/g, "'section-video-stills'");
text = text.replace(/'section-adlinks'/g, "'section-link-gen'");
text = text.replace(/"section-pdf"/g, '"section-pdf-convert"');
text = text.replace(/"section-stills-boards"/g, '"section-video-stills"');
text = text.replace(/"section-adlinks"/g, '"section-link-gen"');

fs.writeFileSync('public/js/app.js', text);
