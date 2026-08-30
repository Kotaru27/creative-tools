const fs = require('fs');

let app = fs.readFileSync('public/js/app.js', 'utf8');

// Replace ToolColors
app = app.replace(/ToolColors: \{[\s\S]*?\},/, `ToolColors: {
          home: { accent: "#7c5cff" },
          "section-logo": { accent: "#8b5cf6" },
          "section-pdf-convert": { accent: "#3b82f6" },
          "section-image-splitter": { accent: "#06b6d4" },
          "section-video-stills": { accent: "#10b981" },
          "section-storyboard": { accent: "#f59e0b" },
          "section-link-gen": { accent: "#f97316" },
          "section-ad-downloader": { accent: "#ec4899" },
          "section-yt-helper": { accent: "#ef4444" },
        },`);

// Replace _showHome
app = app.replace(/_showHome\(\) \{/, `_showHome() {
          const header = document.querySelector('.header');
          if (header) header.style.display = 'none';`);

// Replace _openTool completely
app = app.replace(/_openTool\(id, mode\) \{[\s\S]*?openTool\(id, mode\) \{[\s\S]*?const core = \(\) => this\._openTool\(id, mode\);[\s\S]*?if \(this\.els\.viewApp\.classList\.contains\("active"\)\) this\.switchViews\(core\);[\s\S]*?else core\(\);[\s\S]*?\}/, `_openTool(id) {
          const header = document.querySelector('.header');
          if (header) header.style.display = 'flex';
          
          const navMap = {
            "section-logo": "nav-logo",
            "section-pdf-convert": "nav-pdf-image",
            "section-image-splitter": "nav-pdf-split",
            "section-video-stills": "nav-stills",
            "section-storyboard": "nav-story",
            "section-link-gen": "nav-adlinks-gen",
            "section-ad-downloader": "nav-adlinks-dl",
            "section-yt-helper": "nav-yt-helper",
          };
          
          if (!id) id = "section-logo";
          const themeColor = this.ToolColors[id] ? this.ToolColors[id].accent : "#7c5cff";
          
          ToolBootManager.showToolBoot(id, themeColor, () => {
            document.body.classList.add("tool-active");
            this.els.sidebar.classList.add("visible");
            this.els.viewHome.classList.add("hidden");
            document.querySelectorAll(".tool-section").forEach((e) => {
                e.classList.remove("active");
                e.style.display = "none";
            });
            
            const activeSection = document.getElementById(id);
            if(activeSection) {
                activeSection.style.display = 'block';
                activeSection.classList.add("active");
            }
            
            this.els.viewApp.classList.remove("hidden");
            this.els.viewApp.classList.add("active");
            
            this.updateNav(navMap[id]);
            this.applyTheme(id);
            Core.AppState.save("activeTool", id);
          });
        },
        openTool(id) {
          const core = () => this._openTool(id);
          if (this.els.viewApp.classList.contains("active")) this.switchViews(core);
          else core();
        }`);

// Clean up switchPdfTab, switchStillsTab, switchAdlinksTab, syncTabAria
app = app.replace(/switchPdfTab\(tabId\) \{[\s\S]*?switchStillsTab\(tabId\) \{[\s\S]*?switchAdlinksTab\(tabId\) \{[\s\S]*?syncTabAria\(activeBtn, inactiveBtn, activeContent, inactiveContent\) \{[\s\S]*?\},/, '');

fs.writeFileSync('public/js/app.js', app);
