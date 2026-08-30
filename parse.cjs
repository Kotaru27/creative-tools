const fs = require('fs');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
let html = fs.readFileSync('index.html', 'utf8');
const dom = new JSDOM(html);
const document = dom.window.document;
const pdf = document.getElementById('section-pdf');
if (pdf) {
    console.log("PDF SECTION CHILDREN:");
    pdf.children.forEach ? pdf.children.forEach(c => console.log(c.className, c.id)) : Array.from(pdf.children).forEach(c => console.log(c.className, c.id));
}
