const fs = require('fs');

let css = fs.readFileSync('public/css/styles.css', 'utf8');

// Replace .main-layout static padding-top with body.tool-active context
css = css.replace(/\.main-layout \{\s*padding-top: 80px !important;\s*\/\* Space for the floating header \*\/\s*\}/, `body.tool-active .main-layout {
    padding-top: 80px !important; /* Space for the floating header */
}`);

fs.writeFileSync('public/css/styles.css', css);
