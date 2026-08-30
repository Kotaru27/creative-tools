const fs = require('fs');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
let html = fs.readFileSync('index.html', 'utf8');
const dom = new JSDOM(html);
const document = dom.window.document;

// 1. Remove all tool headers
document.querySelectorAll('.tool-header').forEach(el => el.remove());

// 2. Add Link Gen to Logo Workspace
const logoSidebar = document.querySelector('#section-logo .sidebar-panel');
if (logoSidebar) {
    logoSidebar.insertAdjacentHTML('afterbegin', `
        <button
          class="liquid-btn"
          title="Generate HTML Links"
          onclick="UI.openTool('section-link-gen')"
          style="margin-bottom: 15px; width: 100%; display: flex; justify-content: center; gap: 8px;"
        >
          <i data-lucide="link" style="width: 18px"></i>
          Generate HTML Links
        </button>
    `);
}

// 3. Helper to split a section
function splitSection(sectionId, tabWrappers, newIds) {
    const section = document.getElementById(sectionId);
    if (!section) return;
    
    // Remove the tabRow entirely
    const tabRow = section.querySelector('[role="tablist"]');
    if (tabRow) tabRow.remove();

    // The section parent is #view-app
    const parent = section.parentNode;
    
    tabWrappers.forEach((wrapperId, index) => {
        const wrapper = document.getElementById(wrapperId);
        if (wrapper) {
            // Create a new section
            const newSection = document.createElement('div');
            newSection.className = 'tool-section';
            newSection.id = newIds[index];
            newSection.style.display = 'none'; // default hidden
            
            // Move wrapper contents directly into new section, OR keep wrapper if it's structural.
            // Wait, wrapper IS just a div that previously toggled display.
            // Let's just move its children.
            while (wrapper.firstChild) {
                newSection.appendChild(wrapper.firstChild);
            }
            
            parent.insertBefore(newSection, section);
            wrapper.remove();
        }
    });
    
    // Remove original section container
    section.remove();
}

splitSection('section-pdf', ['pdfTabContentConvert', 'pdfTabContentSplit'], ['section-pdf-convert', 'section-image-splitter']);
splitSection('section-stills-boards', ['stillsTabContentVideo', 'stillsTabContentStory'], ['section-video-stills', 'section-storyboard']);
splitSection('section-adlinks', ['adlinksTabContentGen', 'adlinksTabContentDl'], ['section-link-gen', 'section-ad-downloader']);

// 4. Update navigation and UI.openTool calls in index.html
document.querySelectorAll('[onclick^="UI.openTool"]').forEach(btn => {
    const onclick = btn.getAttribute('onclick');
    if (onclick.includes("'section-pdf','convert'") || onclick.includes("'section-pdf', 'convert'")) {
        btn.setAttribute('onclick', "UI.openTool('section-pdf-convert')");
    } else if (onclick.includes("'section-pdf','split'") || onclick.includes("'section-pdf', 'split'")) {
        btn.setAttribute('onclick', "UI.openTool('section-image-splitter')");
    } else if (onclick.includes("'section-stills-boards','video'") || onclick.includes("'section-stills-boards', 'video'")) {
        btn.setAttribute('onclick', "UI.openTool('section-video-stills')");
    } else if (onclick.includes("'section-stills-boards','story'") || onclick.includes("'section-stills-boards', 'story'")) {
        btn.setAttribute('onclick', "UI.openTool('section-storyboard')");
    } else if (onclick.includes("'section-adlinks','gen'") || onclick.includes("'section-adlinks', 'gen'")) {
        btn.setAttribute('onclick', "UI.openTool('section-link-gen')");
    } else if (onclick.includes("'section-adlinks','downloader'") || onclick.includes("'section-adlinks', 'downloader'")) {
        btn.setAttribute('onclick', "UI.openTool('section-ad-downloader')");
    }
});

fs.writeFileSync('index.html', dom.serialize());
