const fs = require('fs');

let js = fs.readFileSync('public/js/app.js', 'utf8');

// 1. charSpeed
js = js.replace(/const charSpeed = 6;/g, 'const charSpeed = 2;');
// 2. progDuration
js = js.replace(/const progDuration = config\.progressDuration \|\| 1000;/g, 'const progDuration = (config.progressDuration || 1000) * 0.25;');
// 3. hideTerminal(callback), 250 -> 50
js = js.replace(/setTimeout\(\(\) => hideTerminal\(callback\), 250\);/g, 'setTimeout(() => hideTerminal(callback), 50);');
// 4. hideTerminal(callback), 150 -> 50
js = js.replace(/setTimeout\(\(\) => hideTerminal\(callback\), 150\);/g, 'setTimeout(() => hideTerminal(callback), 50);');
// 5. switchViews(fn) timeout 160 -> 60
js = js.replace(/setTimeout\(\(\) => \{\n\s*if \(token !== this\._switchToken\) return;\n\s*fn\(\);\n\s*\[this\.els\.viewApp, this\.els\.viewHome\]\.forEach\(\n\s*\(el\) => el && el\.classList\.remove\("leaving"\),\n\s*\);\n\s*\}, 160\);/, `setTimeout(() => {
            if (token !== this._switchToken) return;
            fn();
            [this.els.viewApp, this.els.viewHome].forEach(
              (el) => el && el.classList.remove("leaving"),
            );
          }, 60);`);

fs.writeFileSync('public/js/app.js', js);
