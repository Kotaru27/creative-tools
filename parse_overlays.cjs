const fs = require('fs');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
let html = fs.readFileSync('index.html', 'utf8');
const dom = new JSDOM(html);
const document = dom.window.document;

document.querySelectorAll('.overlay-fixed').forEach(el => {
    console.log(el.id, "has", el.children.length, "children");
});
