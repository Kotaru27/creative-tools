const fs = require('fs');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
let html = fs.readFileSync('index.html', 'utf8');
const dom = new JSDOM(html);
const document = dom.window.document;

function wrapChildren(overlayId) {
    const overlay = document.getElementById(overlayId);
    if (!overlay || overlay.children.length === 1) return;
    
    const wrapper = document.createElement('div');
    wrapper.className = 'overlay-content';
    wrapper.style.display = 'flex';
    wrapper.style.flexDirection = 'column';
    wrapper.style.width = '100%';
    wrapper.style.height = '100%';
    wrapper.style.background = 'var(--bg-panel)';
    wrapper.style.padding = '20px';
    
    while(overlay.firstChild) {
        wrapper.appendChild(overlay.firstChild);
    }
    overlay.appendChild(wrapper);
}

wrapChildren('pdfDetailOverlay');
wrapChildren('stillsDetailOverlay');

fs.writeFileSync('index.html', dom.serialize());
