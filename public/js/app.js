 /* ==========================================================================
    Creative Tools Suite — Extracted Application Logic
    Auto-generated from "Tool kit 3D V3.html" (2 inline script blocks combined)
    ========================================================================== */

/* ---------- Block 1: Main Application (GuideEngine, UI, Core Logic etc.) ---------- */
const GuideEngine = {
        active: false,
        tooltip: null,
        targetEl: null,
        banner: null,
        init() {
          const tooltip = document.createElement("div");
          tooltip.className = "guide-tooltip";
          tooltip.id = "guideTooltipReal";
          tooltip.style.cssText =
            "position:fixed; background:var(--bg-panel); color:var(--text-main); border:1px solid var(--border); padding:12px 18px; border-radius:6px; font-size:0.9rem; z-index:10000; pointer-events:none; opacity:0; transition:opacity 0.2s, transform 0.2s; transform:translateY(10px); box-shadow:var(--shadow-block); max-width:280px; line-height:1.4;";
          document.body.appendChild(tooltip);
          this.tooltip = tooltip;

          const banner = document.createElement("div");
          banner.id = "guideBanner";
          banner.style.cssText =
            "position:fixed; top:0; left:0; width:100%; height:40px; background:var(--bg-panel); color:var(--text-main); border-bottom:1px solid var(--border); z-index:9999; display:none; align-items:center; justify-content:center; gap:20px; box-shadow:var(--shadow-block); font-size:0.85rem; font-weight:500;";
          banner.innerHTML = `
                    <span style="color:var(--accent); display:flex; align-items:center; gap:8px;">
                        <i data-lucide="help-circle" style="width:16px;height:16px;"></i> Interactive Guide Mode
                    </span>
                    <span style="color:var(--text-muted); font-weight:normal;">Hover over any highlighted element below to read instructions.</span>
                    <button class="liquid-btn active-mode" style="height:26px; border-radius:15px; font-size:0.75rem; padding:0 12px; margin-left:20px;" onclick="GuideEngine.close()">Exit Guide</button>
                `;
          document.body.appendChild(banner);
          this.banner = banner;

          const injectLucide = () => {
            if (window.lucide) {
              if (window.MicroGlitchEngine) { MicroGlitchEngine.scanSweep(metadataPanel, 200); } window.lucide.createIcons({ root: banner });
            } else {
              setTimeout(injectLucide, 100);
            }
          };
          injectLucide();

          document.addEventListener("mousemove", (e) => {
            if (!this.active) return;

            this.tooltip.style.left = e.clientX + 15 + "px";
            const tooltipRect = this.tooltip.getBoundingClientRect();
            const topPos = e.clientY + 15;
            if (topPos + tooltipRect.height > window.innerHeight) {
              this.tooltip.style.top =
                e.clientY - tooltipRect.height - 15 + "px";
            } else {
              this.tooltip.style.top = topPos + "px";
            }

            if (e.clientY < 40) {
              if (this.targetEl) {
                this.targetEl.classList.remove("guide-highlight");
                this.targetEl = null;
              }
              this.tooltip.style.opacity = "0";
              this.tooltip.style.transform = "translateY(10px)";
              return;
            }

            const el = document.elementFromPoint(e.clientX, e.clientY);
            const guideEl = el ? el.closest("[data-guide]") : null;
            if (guideEl !== this.targetEl) {
              if (this.targetEl)
                this.targetEl.classList.remove("guide-highlight");
              this.targetEl = guideEl;
              if (this.targetEl) {
                this.targetEl.classList.add("guide-highlight");
                this.tooltip.textContent =
                  this.targetEl.getAttribute("data-guide");
                this.tooltip.style.opacity = "1";
                this.tooltip.style.transform = "translateY(0)";
              } else {
                this.tooltip.style.opacity = "0";
                this.tooltip.style.transform = "translateY(10px)";
              }
            }
          });

          const blockEvent = (e) => {
            if (this.active) {
              if (e.target.closest("#guideBanner")) return;
              if (e.target.closest(".guide-modal-overlay")) return;

              if (e.type === "keydown" && e.key === "Escape") {
                this.close();
                e.preventDefault();
                e.stopPropagation();
                return;
              }

              const isInteractive = e.target.closest(
                "button, input, textarea, select, label, canvas, [onclick]",
              );

              if (
                e.type === "click" ||
                e.type === "keydown" ||
                e.type === "keypress" ||
                ((e.type === "mousedown" ||
                  e.type === "pointerdown" ||
                  e.type === "touchstart") &&
                  isInteractive)
              ) {
                e.preventDefault();
                e.stopPropagation();
              }
            }
          };
          [
            "click",
            "mousedown",
            "pointerdown",
            "touchstart",
            "keydown",
            "keypress",
          ].forEach((evt) => {
            document.addEventListener(evt, blockEvent, true);
          });
        },
        open(triggerBtn) {
          if (!this.tooltip) this.init();
          this.active = true;
          this.banner.style.display = "flex";

          const section = triggerBtn.closest(".tool-section");
          if (section) {
            const guided = section.querySelectorAll("[data-guide]");
            guided.forEach((el) => el.classList.add("guide-available"));
          }
        },
        openOverlayGuide(overlayEl) {
          if (!this.tooltip) this.init();
          this.active = true;
          this.banner.style.display = "flex";

          if (overlayEl) {
            const guided = overlayEl.querySelectorAll("[data-guide]");
            guided.forEach((el) => el.classList.add("guide-available"));
          }
        },
        close() {
          this.active = false;
          this.banner.style.display = "none";
          if (this.targetEl) {
            this.targetEl.classList.remove("guide-highlight");
            this.targetEl = null;
          }
          this.tooltip.style.opacity = "0";
          this.tooltip.style.transform = "translateY(10px)";

          document.querySelectorAll(".guide-available").forEach((el) => {
            el.classList.remove("guide-available");
          });
        },
      };

      
/* ---------- Block 0: Tool Boot Manager ---------- */
const ToolBootManager = (function() {
  const bootConfig = {
    "system": {
      theme: "#7c5cff",
      header: "TK://SYSTEM/BOOT",
      messages: [
        "> WAKING CORE SYSTEM................ [OK]",
        "> INITIALIZING UI RUNTIME........... [OK]",
        "> SCANNING MODULES.................. [OK]",
        "> LOADING ENGINES................... [OK]",
        "> VERIFYING SYSTEM.................. [OK]"
      ],
      progressLabel: "SYSTEM CHECK",
      progressDuration: 1000,
      footer: [
        "> 08 TOOLS DETECTED",
        "> ALL SYSTEMS OPERATIONAL",
        "> TOOLKIT READY"
      ]
    },
    "section-logo": {
      theme: "#8b5cf6",
      header: "TK://LOGO/BOOT",
      messages: [
        "> INITIALIZING CANVAS",
        "> CHECKING PICA RESIZER.............. {pica}",
        "> INITIALIZING IMAGE BUFFER",
        "> CHECKING ZIP EXPORT ENGINE......... {jszip}",
        "> INITIALIZING TEXT COMPOSITOR",
        "> VERIFYING IMAGE PIPELINE.......... [OK]"
      ],
      progressLabel: "IMAGE ENGINE",
      progressDuration: 850,
      footer: [
        "> LOGO ENGINE ONLINE",
        "> LOGO WORKSPACE READY"
      ]
    },
    "section-pdf-convert": {
      theme: "#3b82f6",
      header: "TK://PDF/BOOT",
      messages: [
        "> CHECKING PDF.JS.................... {pdfjs}",
        "> INITIALIZING PDF DOCUMENT PARSER",
        "> INITIALIZING PAGE RENDERER",
        "> INITIALIZING CANVAS ENGINE",
        "> ALLOCATING RENDER BUFFER",
        "> INITIALIZING IMAGE EXPORTER",
        "> VERIFYING PDF PIPELINE.......... [OK]"
      ],
      progressLabel: "PDF.JS",
      progressDuration: 850,
      footer: [
        "> PDF ENGINE ONLINE",
        "> PDF → IMAGE READY"
      ]
    },
    "section-pdf-convert": {
      theme: "#3b82f6",
      header: "TK://PDF-CONVERT/BOOT",
      messages: [
        "> CHECKING PDF.JS.................... {pdfjs}",
        "> INITIALIZING PDF DOCUMENT PARSER",
        "> INITIALIZING PAGE RENDERER",
        "> INITIALIZING CANVAS ENGINE",
        "> ALLOCATING RENDER BUFFER",
        "> INITIALIZING IMAGE EXPORTER",
        "> VERIFYING PDF PIPELINE.......... [OK]"
      ],
      progressLabel: "PDF.JS",
      progressDuration: 850,
      footer: [
        "> PDF ENGINE ONLINE",
        "> PDF → IMAGE READY"
      ]
    },
    "section-image-splitter": {
      theme: "#06b6d4",
      header: "TK://SPLITTER/BOOT",
      messages: [
        "> INITIALIZING CANVAS",
        "> INITIALIZING PIXEL PROCESSOR",
        "> CALCULATING TILE MATRIX",
        "> INITIALIZING CROP ENGINE",
        "> INITIALIZING EXPORT BUFFER",
        "> CHECKING ZIP EXPORTER.............. {jszip}"
      ],
      progressLabel: "SPLIT ENGINE",
      progressDuration: 800,
      footer: [
        "> IMAGE SPLITTER ONLINE",
        "> SPLITTER READY"
      ]
    },
    "section-video-stills": {
      theme: "#10b981",
      header: "TK://VIDEO-STILLS/BOOT",
      messages: [
        "> DETECTING VIDEO DECODER",
        "> INITIALIZING HTML5 VIDEO",
        "> READING MEDIA CAPABILITIES",
        "> INITIALIZING FRAME BUFFER",
        "> INITIALIZING FRAME SEEKER",
        "> INITIALIZING IMAGE EXPORTER"
      ],
      progressLabel: "MEDIA ENGINE",
      progressDuration: 850,
      footer: [
        "> VIDEO ENGINE ONLINE",
        "> VIDEO STILLS READY"
      ]
    },
    "section-storyboard": {
      theme: "#f59e0b",
      header: "TK://STORYBOARD/BOOT",
      messages: [
        "> INITIALIZING CANVAS",
        "> LOADING IMAGE COMPOSITOR",
        "> INITIALIZING GRID ENGINE",
        "> CALCULATING LAYOUT",
        "> INITIALIZING BACKGROUND ENGINE",
        "> INITIALIZING EXPORT ENGINE"
      ],
      progressLabel: "COMPOSITOR",
      progressDuration: 850,
      footer: [
        "> STORYBOARD ENGINE ONLINE",
        "> STORYBOARD READY"
      ]
    },
    "section-link-gen": {
      theme: "#f97316",
      header: "TK://LINK-GEN/BOOT",
      messages: [
        "> INITIALIZING LINK ENGINE",
        "> LOADING BRAND MATCH ENGINE",
        "> INITIALIZING STRING NORMALIZER",
        "> INITIALIZING FUZZY MATCHER",
        "> INITIALIZING LOGO MATCH SYSTEM",
        "> INITIALIZING URL BUILDER",
        "> INITIALIZING HTML GENERATOR"
      ],
      progressLabel: "LINK ENGINE",
      progressDuration: 850,
      footer: [
        "> LINK ENGINE ONLINE",
        "> LINK GENERATOR READY"
      ]
    },
    "section-ad-downloader": {
      theme: "#ec4899",
      header: "TK://AD-DOWNLOADER/BOOT",
      messages: [
        "> CHECKING XLSX PARSER............... {xlsx}",
        "> INITIALIZING WORKBOOK READER",
        "> INITIALIZING AD MAPPING ENGINE",
        "> INITIALIZING URL RESOLVER",
        "> INITIALIZING DOWNLOAD QUEUE",
        "> INITIALIZING FILE VALIDATOR"
      ],
      progressLabel: "DOWNLOAD ENGINE",
      progressDuration: 900,
      footer: [
        "> AD LINK ENGINE ONLINE",
        "> DOWNLOAD ENGINE READY"
      ]
    },
    "section-yt-helper": {
      theme: "#ef4444",
      header: "TK://VIDEO-DOWNLOAD/BOOT",
      messages: [
        "> CONNECTING TO MEDIA ENGINE........ [OK]",
        "> INITIALIZING URL ANALYZER......... [OK]",
        "> INITIALIZING FORMAT DETECTOR...... [OK]",
        "> INITIALIZING COMMAND BUILDER...... [OK]",
        "> CHECKING YT-DLP RUNTIME........... [EXTERNAL]",
        "> CHECKING FFMPEG RUNTIME........... [EXTERNAL]"
      ],
      progressLabel: "MEDIA DOWNLOAD ENGINE",
      progressDuration: 850,
      footer: [
        "> VIDEO DOWNLOAD HELPER READY"
      ]
    }
  };

  const initializedTools = new Set();
  let systemBooted = false;
  let termEl, headerEl, consoleEl, progressCont, progressBar, progressText, footerEl;

  function initEls() {
    if (termEl) return;
    termEl = document.getElementById("tk-boot-terminal");
    headerEl = document.getElementById("tk-boot-header");
    consoleEl = document.getElementById("tk-boot-console");
    progressCont = document.getElementById("tk-boot-progress-container");
    progressBar = document.getElementById("tk-boot-progress-bar");
    progressText = document.getElementById("tk-boot-progress-text");
    footerEl = document.getElementById("tk-boot-footer");
  }
  
  function resolveDependencyText(text) {
    let t = text;
    if (t.includes('{pica}')) t = t.replace('{pica}', window.pica ? '[FOUND]' : '[NOT FOUND]');
    if (t.includes('{pdfjs}')) t = t.replace('{pdfjs}', window.pdfjsLib ? '[FOUND]' : '[NOT FOUND]');
    if (t.includes('{jszip}')) t = t.replace('{jszip}', window.JSZip ? '[FOUND]' : '[NOT FOUND]');
    if (t.includes('{xlsx}')) t = t.replace('{xlsx}', window.XLSX ? '[FOUND]' : '[NOT FOUND]');

    if (t.includes('{ytdlp_check}')) t = t.replace('{ytdlp_check}', '[EXTERNAL]');
    if (t.includes('{ffmpeg_check}')) t = t.replace('{ffmpeg_check}', '[EXTERNAL]');
    if (t.includes('{ytdlp_result}')) t = t.replace('{ytdlp_result}', '> YT-DLP.......................... [EXTERNAL]');
    if (t.includes('{ffmpeg_result}')) t = t.replace('{ffmpeg_result}', '> FFMPEG.......................... [EXTERNAL]');
    return t;
  }

  function typeLines(container, lines, baseCharSpeed, onComplete, isRestore = false) {
    container.innerHTML = '';
    if (!lines || lines.length === 0) return onComplete();
    
    let lineIdx = 0;
    
    function nextLine() {
      if (lineIdx >= lines.length) {
        onComplete();
        return;
      }
      
      const p = document.createElement("p");
      const rawText = resolveDependencyText(lines[lineIdx]);
      let colorClass = "";
      if (rawText.includes('[FAILED]') || rawText.includes('[NOT FOUND]') || rawText.includes('UNAVAILABLE') || rawText.includes('ACTION REQUIRED')) colorClass = "error-line";
      if (colorClass) p.className = colorClass;
      container.appendChild(p);
      
      let charIdx = 0;
      const text = rawText;
      
      const speedMult = isRestore ? 0.2 : 1;
      const lineCharSpeed = (baseCharSpeed + Math.random() * 5) * speedMult;
      
      function typeChar() {
        if (charIdx < text.length) {
          const chunk = Math.floor(Math.random() * 3) + 1; // 1 to 3 chars at a time
          p.innerHTML = text.substring(0, charIdx + chunk).replace(/ /g, "&nbsp;") + '<span class="tk-boot-cursor"></span>';
          charIdx += chunk;
          
          let stutter = (!isRestore && Math.random() > 0.95) ? Math.random() * 15 : 0;
          setTimeout(typeChar, lineCharSpeed + stutter);
        } else {
          p.innerHTML = text.replace(/ /g, "&nbsp;"); // remove cursor from old lines
          lineIdx++;
          
          // Cinematic Delays
          let lineDelay = 0;
          if (isRestore) {
              lineDelay = 30 + Math.random() * 20; // 30-50ms for restore
          } else {
              if (text.length < 25) {
                  lineDelay = 100 + Math.random() * 80; // Short: 100-180ms
              } else if (text.includes('ENGINE') || text.includes('PIPELINE') || text.includes('MODULE') || text.includes('SYSTEM') || text.includes('PROCESSOR')) {
                  lineDelay = 200 + Math.random() * 150; // Important: 200-350ms
              } else {
                  lineDelay = 150 + Math.random() * 100; // Normal: 150-250ms
              }
              
              if (text.includes('READY') || text.includes('COMPLETE') || text.includes('ONLINE') || text.includes('OPERATIONAL') || text.includes('DETECTED') || text.includes('UNAVAILABLE')) {
                  lineDelay = 150 + Math.random() * 100; // Completion message
              }
          }
          
          setTimeout(nextLine, lineDelay);
        }
      }
      typeChar();
    }
    nextLine();
  }

  function animateProgress(duration, onComplete, isRestore = false) {
    if (isRestore) duration = duration * 0.2; // Much faster on restore
    progressCont.style.display = 'block';
    let start = performance.now();
    
    function step(timestamp) {
      let rawProgress = Math.min((timestamp - start) / duration, 1);
      
      // Stutter easing
      let eased = rawProgress;
      if (!isRestore) {
          if (rawProgress < 0.2) eased = rawProgress * 1.5;
          else if (rawProgress < 0.45) eased = 0.3 + (rawProgress - 0.2) * 0.4;
          else if (rawProgress < 0.75) eased = 0.4 + (rawProgress - 0.45) * 1.8;
          else eased = 0.94 + (rawProgress - 0.75) * 0.24;
      }
      
      let p = Math.min(100, Math.floor(eased * 100));
      
      progressBar.style.setProperty('--progress', p + '%');
      progressText.textContent = p + '%';
      if (rawProgress < 1) {
        requestAnimationFrame(step);
      } else {
        setTimeout(onComplete, isRestore ? 50 : 150);
      }
    }
    requestAnimationFrame(step);
  }

  function hideTerminal(callback) {
    termEl.classList.add("glitch-transition");
    setTimeout(() => {
      termEl.classList.add("hidden");
      termEl.classList.remove("glitch-transition");
      document.body.style.setProperty('--tk3d-acc', termEl.dataset.prevColor || '#7c5cff');
      if (callback) callback();
    }, 250); // Glitch dissolve length
  }

  function runSequence(config, isRestore, callback) {
    initEls();
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
       if (callback) callback();
       return;
    }
    
    termEl.dataset.prevColor = document.body.style.getPropertyValue('--tk3d-acc');
    document.body.style.setProperty('--tk3d-acc', config.theme);
    
    termEl.classList.remove("hidden");
    termEl.style.opacity = '1';
    
    if (isRestore) {
       headerEl.innerHTML = config.header.replace('/BOOT', '/RESTORE');
       typeLines(consoleEl, [
         "> RESTORING ENGINE........ [READY]",
         "> RESTORING WORKSPACE...... [READY]",
         "> RESTORING SESSION........ [READY]"
       ], 4, () => {
         typeLines(footerEl, ["> SYSTEM READY"], 4, () => {
            setTimeout(() => hideTerminal(callback), 50); // Fast hold for restore
         }, true);
       }, true);
       return;
    }
    
    headerEl.innerHTML = config.header;
    document.getElementById("tk-boot-progress-label").textContent = config.progressLabel || "SYSTEM CHECK";
    progressCont.style.display = 'none';
    progressBar.style.setProperty('--progress', '0%');
    progressText.textContent = '0%';
    footerEl.innerHTML = '';
    
    // Core timing settings
    const charSpeed = 2;
    const progDuration = (config.progressDuration || 1000) * 0.25;
    
    typeLines(consoleEl, config.messages, charSpeed, () => {
      animateProgress(progDuration, () => {
        typeLines(footerEl, config.footer, charSpeed, () => {
           setTimeout(() => hideTerminal(callback), 50); // Linger on READY state
        }, false);
      }, false);
    }, false);
  }

  return {
    showSystemBoot: function(onComplete) {
      if (systemBooted) {
        onComplete();
        return;
      }
      
      initEls();
      termEl.classList.remove("hidden");
      document.getElementById("tk-boot-header").innerHTML = "TK<br>INITIALIZING...";
      
      // Deliberate initial anticipation reduced to 400ms
      setTimeout(() => {
        runSequence(bootConfig["system"], false, () => {
          systemBooted = true;
          onComplete();
        });
      }, 400);
    },
    
    showToolBoot: function(fullToolId, themeColor, onComplete) {
      const configKey = bootConfig[fullToolId] ? fullToolId : fullToolId.split(':')[0];
      const config = bootConfig[configKey];
      
      if (!config) {
        onComplete();
        return;
      }
      
      if (themeColor) config.theme = themeColor;
      
      const isRestore = initializedTools.has(fullToolId);
      runSequence(config, isRestore, () => {
        initializedTools.add(fullToolId);
        onComplete();
      });
    },
    
    showProcessingStatus: function(title, lines, durationMs, onComplete) {
      initEls();
      termEl.classList.remove("hidden");
      termEl.style.opacity = '1';
      headerEl.innerHTML = title || "TK://PROCESSING";
      document.getElementById("tk-boot-progress-label").textContent = "PROGRESS";
      progressCont.style.display = 'none';
      progressBar.style.setProperty('--progress', '0%');
      progressText.textContent = '0%';
      footerEl.innerHTML = '';
      
      typeLines(consoleEl, lines || ["> PROCESSING..."], 6, () => {
        animateProgress(durationMs || 900, () => {
          typeLines(footerEl, ["> COMPLETE"], 6, () => {
             setTimeout(() => hideTerminal(onComplete), 250);
          }, false);
        }, false);
      }, false);
    }
  };
})();


const MicroGlitchEngine = (function() {
  function isReduced() {
    return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }
  return {
    microGlitch: function(el, durationMs = 80) {
      if (!el) return;
      if (isReduced()) {
         el.style.opacity = '0.7';
         setTimeout(() => { el.style.opacity = ''; }, durationMs);
         return;
      }
      el.style.transform = `translate(${Math.random()*4-2}px, ${Math.random()*4-2}px)`;
      el.style.filter = `contrast(1.2) hue-rotate(${Math.random() > 0.5 ? 90 : -90}deg)`;
      setTimeout(() => {
        el.style.transform = '';
        el.style.filter = '';
      }, durationMs);
    },
    rgbSplit: function(el, durationMs = 80) {
      if (!el) return;
      if (isReduced()) {
         el.style.opacity = '0.8';
         setTimeout(() => { el.style.opacity = ''; }, durationMs);
         return;
      }
      const acc = document.body.style.getPropertyValue('--tk3d-acc') || 'var(--accent)';
      el.style.textShadow = `2px 0 ${acc}, -2px 0 var(--glitch-magenta, #ff0080)`;
      setTimeout(() => {
        el.style.textShadow = '';
      }, durationMs);
    },
    digitalFlicker: function(el, durationMs = 100) {
      if (!el) return;
      if (isReduced()) {
         el.style.opacity = '0.6';
         setTimeout(() => { el.style.opacity = ''; }, durationMs);
         return;
      }
      let i = 0;
      let itv = setInterval(() => {
        el.style.opacity = Math.random() > 0.5 ? '0.5' : '1';
        if (++i > 3) {
           clearInterval(itv);
           el.style.opacity = '';
        }
      }, durationMs / 4);
    },
    scanSweep: function(el, durationMs = 200) {
      if (!el) return;
      if (isReduced()) return;
      
      const scan = document.createElement('div');
      scan.style.position = 'absolute';
      scan.style.top = '0';
      scan.style.left = '0';
      scan.style.width = '100%';
      scan.style.height = '10px';
      scan.style.background = 'var(--tk3d-acc, var(--accent))';
      scan.style.opacity = '0.3';
      scan.style.zIndex = '9999';
      scan.style.pointerEvents = 'none';
      scan.style.transition = `transform ${durationMs}ms linear`;
      scan.style.transform = 'translateY(0)';
      
      if (el.style.position === '' || el.style.position === 'static') {
         el.dataset.oldPos = el.style.position;
         el.style.position = 'relative';
         if (el.style.overflow === '' || el.style.overflow === 'visible') {
            el.dataset.oldOverflow = el.style.overflow;
            el.style.overflow = 'hidden';
         }
      }
      el.appendChild(scan);
      
      requestAnimationFrame(() => {
         const h = el.offsetHeight || 100;
         scan.style.transform = `translateY(${h}px)`;
      });
      
      setTimeout(() => {
         if (scan.parentNode) scan.parentNode.removeChild(scan);
         if (el.dataset.oldPos !== undefined) {
             el.style.position = el.dataset.oldPos;
             delete el.dataset.oldPos;
         }
         if (el.dataset.oldOverflow !== undefined) {
             el.style.overflow = el.dataset.oldOverflow;
             delete el.dataset.oldOverflow;
         }
      }, durationMs + 50);
    },
    dataScramble: function(el, durationMs = 200, originalText) {
      if (!el) return;
      if (isReduced()) return;
      if (!originalText) originalText = el.innerText || el.textContent;
      const chars = "!<>-_\\/[]{}—=+*^?#_";
      let i = 0;
      let itv = setInterval(() => {
         let scrambled = "";
         for(let j=0; j<originalText.length; j++) {
            if (originalText[j] === " ") scrambled += " ";
            else scrambled += chars[Math.floor(Math.random() * chars.length)];
         }
         el.innerText = scrambled;
         if (++i > 4) {
             clearInterval(itv);
             el.innerText = originalText;
         }
      }, durationMs / 5);
    },
    signalTear: function(el, durationMs = 120) {
      if (!el) return;
      if (isReduced()) {
         el.style.opacity = '0.9';
         setTimeout(() => { el.style.opacity = ''; }, durationMs);
         return;
      }
      el.style.transform = `skewX(${Math.random() > 0.5 ? 10 : -10}deg) translateX(${Math.random() > 0.5 ? 5 : -5}px)`;
      setTimeout(() => {
        el.style.transform = '';
      }, durationMs);
    },
    pixelLock: function(el, durationMs = 150) {
      if (!el) return;
      if (isReduced()) return;
      el.style.filter = `brightness(1.5) contrast(1.2)`;
      el.style.transform = `scale(1.02)`;
      setTimeout(() => {
        el.style.filter = '';
        el.style.transform = '';
      }, durationMs);
    }
  };
})();

const Core = {
        AdaptiveRenderer: {
          getResampledImage(source, targetW, targetH, fitMode) {
            const srcW =
              source.naturalWidth || source.videoWidth || source.width;
            const srcH =
              source.naturalHeight || source.videoHeight || source.height;
            let dx = 0,
              dy = 0,
              dw = targetW,
              dh = targetH;
            let sx = 0,
              sy = 0,
              sw = srcW,
              sh = srcH;
            const iR = srcW / srcH,
              cR = targetW / targetH;
            if (fitMode === "contain") {
              if (iR > cR) {
                dw = targetW;
                dh = dw / iR;
                dy = (targetH - dh) / 2;
              } else {
                dh = targetH;
                dw = dh * iR;
                dx = (targetW - dw) / 2;
              }
            } else {
              if (iR > cR) {
                sh = srcH;
                sw = sh * cR;
                sx = (srcW - sw) / 2;
              } else {
                sw = srcW;
                sh = sw / cR;
                sy = (srcH - sh) / 2;
              }
            }
            const c = document.createElement("canvas");
            c.width = targetW;
            c.height = targetH;
            const ctx = c.getContext("2d");
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = "high";
            if (sw > dw * 2 || sh > dh * 2) {
              let curW = sw,
                curH = sh;
              let curC = document.createElement("canvas");
              curC.width = curW;
              curC.height = curH;
              let curCtx = curC.getContext("2d");
              curCtx.imageSmoothingEnabled = true;
              curCtx.imageSmoothingQuality = "high";
              curCtx.drawImage(source, sx, sy, sw, sh, 0, 0, curW, curH);
              while (curW > dw * 2 && curH > dh * 2) {
                const nextW = Math.floor(curW / 2),
                  nextH = Math.floor(curH / 2);
                const nextC = document.createElement("canvas");
                nextC.width = nextW;
                nextC.height = nextH;
                const nextCtx = nextC.getContext("2d");
                nextCtx.imageSmoothingEnabled = true;
                nextCtx.imageSmoothingQuality = "high";
                nextCtx.drawImage(curC, 0, 0, nextW, nextH);
                curC = nextC;
                curW = nextW;
                curH = nextH;
              }
              ctx.drawImage(curC, 0, 0, curW, curH, dx, dy, dw, dh);
            } else {
              ctx.drawImage(source, sx, sy, sw, sh, dx, dy, dw, dh);
            }
            return c;
          },
          renderBoard(images, options) {
            const count = images.length;
            if (count === 0) return null;
            let cols = options.cols || 0,
              rows = options.rows || 0;
            if (cols <= 0) {
              if (count === 4) {
                cols = 2;
                rows = 2;
              } else if (count === 9) {
                cols = 3;
                rows = 3;
              } else if (count === 16) {
                cols = 4;
                rows = 4;
              } else {
                cols = Math.ceil(Math.sqrt(count));
                rows = Math.ceil(count / cols);
              }
            } else if (rows <= 0) {
              rows = Math.ceil(count / cols);
            }
            
            let maxSrcW = 0,
              maxSrcH = 0,
              aspectRatios = [];
              
            let orientation = "square";
            images.forEach((item) => {
              const source = item.img || item;
              const w =
                source.naturalWidth || source.videoWidth || source.width;
              const h =
                source.naturalHeight || source.videoHeight || source.height;
              if (w > maxSrcW) maxSrcW = w;
              if (h > maxSrcH) maxSrcH = h;
              if (h > 0) aspectRatios.push(w / h);
            });
            aspectRatios.sort((a, b) => a - b);
            const medianAspect =
              aspectRatios[Math.floor(aspectRatios.length / 2)] || 1;
              
            if (medianAspect > 1.1) orientation = "landscape";
            else if (medianAspect < 0.9) orientation = "portrait";
            
            const gap = options.gap || 0;
            const outerMargin = 0;
            
            // 1. Create an Adaptive Resolution Planner.
            const planner = {
              exportWidth: 0,
              exportHeight: 0,
              tileWidth: 0,
              tileHeight: 0
            };
            
            if (options.autoWidth) {
              // Viewport-constrained layout model (Document Layout Engine)
              const maxLongEdge = 1800; // Configurable maximum long edge
              const minReadableTileW = 280; // Absolute minimum width for text readability
              
              // Calculate tile dimensions assuming we fit the entire storyboard inside maxLongEdge
              let tileW_widthConstrained = cols > 0 ? (maxLongEdge - outerMargin * 2 - gap * (cols - 1)) / cols : maxLongEdge;
              let tileW_heightConstrained = rows > 0 ? (maxLongEdge - outerMargin * 2 - gap * (rows - 1)) / (rows / medianAspect) : maxLongEdge;
              
              // Scale the entire storyboard to fit inside this bounding box while preserving aspect ratio
              let tileW = Math.min(tileW_widthConstrained, tileW_heightConstrained);
              
              // When multiple resolutions satisfy readability, always choose the smallest one.
              // This prevents unnecessarily upscaling low-resolution source images to fill the max viewport.
              if (maxSrcW > 0 && maxSrcW < tileW) {
                tileW = maxSrcW;
              }
              
              // Only exceed the maximum long edge if the planner can prove that readability would otherwise fail.
              if (tileW < minReadableTileW) {
                console.warn(`Adaptive Planner: Layout density too high. Bypassing max viewport to maintain minimum readability of ${minReadableTileW}px.`);
                tileW = minReadableTileW;
              }
              
              planner.tileWidth = tileW;
              planner.tileHeight = planner.tileWidth / medianAspect;
              
              planner.exportWidth = planner.tileWidth * cols + gap * (cols - 1) + outerMargin * 2;
              planner.exportHeight = planner.tileHeight * rows + gap * (rows - 1) + outerMargin * 2;
            } else {
              planner.exportWidth = options.targetWidth || 1920;
              planner.tileWidth = (planner.exportWidth - outerMargin * 2 - gap * (cols - 1)) / cols;
              planner.tileHeight = planner.tileWidth / medianAspect;
              planner.exportHeight = planner.tileHeight * rows + gap * (rows - 1) + outerMargin * 2;
            }
            
            const MAX_DIM = 8192;
            if (planner.exportWidth > MAX_DIM || planner.exportHeight > MAX_DIM) {
              const scale = Math.min(MAX_DIM / planner.exportWidth, MAX_DIM / planner.exportHeight);
              planner.exportWidth *= scale;
              planner.exportHeight *= scale;
              planner.tileWidth *= scale;
              planner.tileHeight *= scale;
            }
            
            planner.exportWidth = Math.round(planner.exportWidth);
            planner.exportHeight = Math.round(planner.exportHeight);
            planner.tileWidth = Math.round(planner.tileWidth);
            planner.tileHeight = Math.round(planner.tileHeight);
            
            console.log(
              `Adaptive Planner\nRows: ${rows}\nColumns: ${cols}\nImages: ${count}\nMedian Resolution: ${Math.round(maxSrcW)}x${Math.round(maxSrcH)}\nTile Size: ${planner.tileWidth}x${planner.tileHeight}\nExport Width: ${planner.exportWidth}\nExport Height: ${planner.exportHeight}\nFinal JPEG Size: ${planner.exportWidth}x${planner.exportHeight}`
            );
            
            const compCanvas = document.createElement("canvas");
            compCanvas.width = planner.exportWidth;
            compCanvas.height = planner.exportHeight;
            const ctx = compCanvas.getContext("2d");
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = "high";
            ctx.fillStyle = options.bgColor || "#ffffff";
            ctx.fillRect(0, 0, planner.exportWidth, planner.exportHeight);
            
            for (let r = 0; r < rows; r++) {
              const rem = count - r * cols;
              const countInRow = Math.min(cols, rem);
              if (countInRow <= 0) break;
              const shiftX = ((cols - countInRow) * (planner.tileWidth + gap)) / 2;
              for (let c = 0; c < countInRow; c++) {
                const item = images[r * cols + c];
                const source = item.img || item;
                const x = Math.round(
                  outerMargin + c * (planner.tileWidth + gap) + shiftX,
                );
                const y = Math.round(outerMargin + r * (planner.tileHeight + gap));
                const tileCanvas = this.getResampledImage(
                  source,
                  planner.tileWidth,
                  planner.tileHeight,
                  options.fitMode || "cover",
                );
                ctx.drawImage(tileCanvas, x, y);
              }
            }
            return compCanvas;
          },
        },
        BlobRegistry: {
          urls: [],
          create(blob) {
            const url = URL.createObjectURL(blob);
            this.urls.push(url);
            return url;
          },
          revokeAll() {
            this.urls.forEach((url) => URL.revokeObjectURL(url));
            this.urls = [];
          },
        },
        AppState: {
          save(key, value) {
            if (window.MicroGlitchEngine) { MicroGlitchEngine.signalTear(resultEl, 150); } try {
              localStorage.setItem("cts_" + key, value);
            } catch (e) {}
          },
          load(key) {
            if (window.MicroGlitchEngine) { MicroGlitchEngine.signalTear(resultEl, 150); } try {
              return localStorage.getItem("cts_" + key);
            } catch (e) {
              return null;
            }
          },
          restoreInputs() {
            document.querySelectorAll(".persist-val").forEach((el) => {
              const saved = this.load(el.id);
              if (saved !== null) {
                el.value = saved;
              }
              el.addEventListener("change", () => this.save(el.id, el.value));
            });
            // Clear legacy local storage for dimensions
            localStorage.removeItem("exportWidth");
            localStorage.removeItem("exportHeight");
            document.querySelectorAll(".persist-chk").forEach((el) => {
              const saved = this.load(el.id);
              if (saved !== null) el.checked = saved === "true";
              el.addEventListener("change", () => this.save(el.id, el.checked));
            });
          },
        },
        Presets: {
          /* Control IDs captured per tool section. type: 'val' (input value)
             or 'chk' (checkbox checked). Only these are snapshotted/applied. */
          sections: {
            "section-logo": [
              { id: "globalFontFamily", type: "val" },
              { id: "fontSizeInput", type: "val" },
              { id: "fontColorPicker", type: "val" },
              { id: "boldToggle", type: "chk" },
              { id: "syncFilenameToggle", type: "chk" },
              { id: "globalPadding", type: "val" },
              { id: "globalImgPos", type: "val" },
              { id: "exportWidth", type: "val" },
              { id: "exportHeight", type: "val" },
              { id: "exportFormat", type: "val" },
            ],
            "section-pdf-convert": [
              { id: "pdfFormat", type: "val" },
              { id: "splitMode", type: "val" },
              { id: "splitRows", type: "val" },
              { id: "splitCols", type: "val" },
            ],
            "section-video-stills": [
              { id: "storyCols", type: "val" },
              { id: "storyFitMode", type: "val" },
              { id: "storyBgColor", type: "val" },
            ],
            "section-link-gen": [],
            "section-yt-helper": [],
          },
          storageKey(section) {
            return "cts_preset_" + section;
          },
          controlsFor(section) {
            return this.sections[section] || [];
          },
          list(section) {
            if (window.MicroGlitchEngine) { MicroGlitchEngine.signalTear(resultEl, 150); } try {
              const raw = localStorage.getItem(this.storageKey(section));
              const arr = raw ? JSON.parse(raw) : [];
              return Array.isArray(arr) ? arr : [];
            } catch (e) {
              return [];
            }
          },
          save(section, name) {
            const title = (name || "").trim();
            if (!title || !section) return { ok: false, error: "Enter a preset name." };
            const controls = this.controlsFor(section);
            if (controls.length === 0)
              return { ok: false, error: "This tool has no saved settings yet." };
            const data = {};
            controls.forEach((c) => {
              const el = document.getElementById(c.id);
              if (!el) return;
              data[c.id] = c.type === "chk" ? (el.checked ? "1" : "0") : el.value;
            });
            const all = this.list(section).filter((p) => p.name !== title);
            all.push({ name: title, values: data });
            if (window.MicroGlitchEngine) { MicroGlitchEngine.signalTear(resultEl, 150); } try {
              localStorage.setItem(this.storageKey(section), JSON.stringify(all));
            } catch (e) {
              return { ok: false, error: "Could not save preset." };
            }
            return { ok: true };
          },
          del(section, name) {
            const all = this.list(section).filter((p) => p.name !== name);
            if (window.MicroGlitchEngine) { MicroGlitchEngine.signalTear(resultEl, 150); } try {
              localStorage.setItem(this.storageKey(section), JSON.stringify(all));
            } catch (e) {}
            return true;
          },
          apply(section, name) {
            const p = this.list(section).find((x) => x.name === name);
            if (!p || !p.values) return false;
            const controls = this.controlsFor(section);
            controls.forEach((c) => {
              const el = document.getElementById(c.id);
              if (!el || !(c.id in p.values)) return;
              if (c.type === "chk") {
                el.checked = p.values[c.id] === "1";
              } else {
                el.value = p.values[c.id];
              }
              el.dispatchEvent(new Event("input", { bubbles: true }));
              el.dispatchEvent(new Event("change", { bubbles: true }));
            });
            return true;
          },
        },
        Utils: {
          sanitize(s) {
            return (s || "").replace(/\s+/g, "_").replace(/[\\\/:*?"<>|]/g, "");
          },
          debounce(func, wait) {
            let timeout;
            return function (...args) {
              clearTimeout(timeout);
              timeout = setTimeout(() => func.apply(this, args), wait);
            };
          },
          createDropZone(el, onFiles) {
            if (!el) return;
            el.ondragover = (e) => {
              e.preventDefault();
              el.classList.add("drag-over");
            };
            el.ondragleave = () => el.classList.remove("drag-over");
            el.ondrop = (e) => {
              e.preventDefault();
              el.classList.remove("drag-over");
              onFiles([...e.dataTransfer.files]);
            };
          },
        },
      };

      const UI = {
        ToolColors: {
          home: { accent: "#7c5cff" },
          "section-logo": { accent: "#8b5cf6" },
          "section-pdf-convert": { accent: "#3b82f6" },
          "section-image-splitter": { accent: "#06b6d4" },
          "section-video-stills": { accent: "#10b981" },
          "section-storyboard": { accent: "#f59e0b" },
          "section-link-gen": { accent: "#f97316" },
          "section-ad-downloader": { accent: "#ec4899" },
          "section-yt-helper": { accent: "#ef4444" }
        },
        els: {
          sidebar: document.getElementById("mainSidebar"),
          viewApp: document.getElementById("view-app"),
          viewHome: document.getElementById("view-home"),
          lightbox: document.getElementById("lightbox"),
          lightboxImg: document.getElementById("lightboxImg"),
          toast: document.getElementById("errorToast"),
        },
        switchViews(fn) {
          const token = (this._switchToken = (this._switchToken || 0) + 1);
          [this.els.viewApp, this.els.viewHome].forEach((el) =>
            el && el.classList.add("leaving")
          );
          setTimeout(() => {
            if (token !== this._switchToken) return;
            fn();
            [this.els.viewApp, this.els.viewHome].forEach(
              (el) => el && el.classList.remove("leaving"),
            );
          }, 60);
        },
        _showHome() {
          const header = document.querySelector('.header');
          if (header) header.style.display = 'none';
          document.body.classList.remove("tool-active");
          this.els.sidebar.classList.remove("visible");
          this.els.viewApp.classList.remove("active");
          this.els.viewHome.classList.remove("hidden");
          this.updateNav("nav-home");
          this.applyTheme("home");
          document.querySelectorAll(".home-card").forEach((card) => {
            const m = (card.getAttribute("onclick") || "").match(/openTool\('([^']+)'(?:,\s*'([^']+)')?\)/);
            const toolId = m ? (m[2] ? m[1] + ":" + m[2] : m[1]) : null;
            const c = toolId && this.ToolColors[toolId];
            if (c) {
              const tint = this.accentTint(c.accent);
              card.style.setProperty("--accent", c.accent);
              card.style.setProperty("--accent-soft", tint.soft);
              card.style.setProperty("--accent-glow", tint.glow);
            }
          });
          Core.AppState.save("activeTool", "home");
          Object.values(Tools).forEach((tool) => {
            if (tool.destroy) tool.destroy();
          });
          if (window.HomeTypewriters) {
            window.HomeTypewriters.forEach((tw) => tw.type());
            document.getElementById("homeContent").style.pointerEvents = "all";
            document.querySelectorAll(".home-item").forEach((item) => {
              item.style.transition =
                "color 0.4s ease, text-shadow 0.4s ease, transform 0.6s cubic-bezier(0.25, 1, 0.5, 1), filter 0.4s ease";
            });
          }
        },
        showHome() {
          const core = () => this._showHome();
          if (this.els.viewApp.classList.contains("active")) this.switchViews(core);
          else core();
        },

        _openTool(id) {
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
        },
        switchPdfTab(tabId) {
          const convertTab = document.getElementById("pdfTabConvert");
          const splitTab = document.getElementById("pdfTabSplit");
          const convertContent = document.getElementById(
            "pdfTabContentConvert",
          );
          const splitContent = document.getElementById("pdfTabContentSplit");
          this.applyTheme('section-pdf:' + tabId);
          Core.AppState.save("activeTool", 'section-pdf:' + tabId);
          if (tabId === "convert") {
            convertTab.classList.add("active-mode");
            convertTab.style.background = "";
            convertTab.style.border = "";
            splitTab.classList.remove("active-mode");
            splitTab.style.background = "transparent";
            splitTab.style.border = "1px solid transparent";
            convertContent.style.display = "block";
            splitContent.style.display = "none";
            this.syncTabAria(convertTab, splitTab, convertContent, splitContent);
          } else if (tabId === "split") {
            splitTab.classList.add("active-mode");
            splitTab.style.background = "";
            splitTab.style.border = "";
            convertTab.classList.remove("active-mode");
            convertTab.style.background = "transparent";
            convertTab.style.border = "1px solid transparent";
            splitContent.style.display = "block";
            convertContent.style.display = "none";
            this.syncTabAria(splitTab, convertTab, splitContent, convertContent);
          }
        },
        switchStillsTab(tabId) {
          const storyTab = document.getElementById("stillsTabStory");
          const videoTab = document.getElementById("stillsTabVideo");
          const storyContent = document.getElementById("stillsTabContentStory");
          const videoContent = document.getElementById("stillsTabContentVideo");
          this.applyTheme('section-stills-boards:' + tabId);
          Core.AppState.save("activeTool", 'section-stills-boards:' + tabId);
          if (tabId === "story") {
            storyTab.classList.add("active-mode");
            storyTab.style.background = "";
            storyTab.style.border = "";
            videoTab.classList.remove("active-mode");
            videoTab.style.background = "transparent";
            videoTab.style.border = "1px solid transparent";
            storyContent.style.display = "block";
            videoContent.style.display = "none";
            this.syncTabAria(storyTab, videoTab, storyContent, videoContent);
          } else if (tabId === "video") {
            videoTab.classList.add("active-mode");
            videoTab.style.background = "";
            videoTab.style.border = "";
            storyTab.classList.remove("active-mode");
            storyTab.style.background = "transparent";
            storyTab.style.border = "1px solid transparent";
            videoContent.style.display = "block";
            storyContent.style.display = "none";
            this.syncTabAria(videoTab, storyTab, videoContent, storyContent);
          }
        },
        switchAdlinksTab(tabId) {
          const genTab = document.getElementById("adlinksTabGen");
          const dlTab = document.getElementById("adlinksTabDownloader");
          const genContent = document.getElementById("adlinksTabContentGen");
          const dlContent = document.getElementById(
            "adlinksTabContentDownloader",
          );
          this.applyTheme('section-adlinks:' + tabId);
          Core.AppState.save("activeTool", 'section-adlinks:' + tabId);
          this.applyTheme('section-adlinks:' + tabId);
          Core.AppState.save("activeTool", 'section-adlinks:' + tabId);
          if (tabId === "gen") {
            genTab.classList.add("active-mode");
            genTab.style.background = "";
            genTab.style.border = "";
            dlTab.classList.remove("active-mode");
            dlTab.style.background = "transparent";
            dlTab.style.border = "1px solid transparent";
            genContent.style.display = "block";
            dlContent.style.display = "none";
            this.syncTabAria(genTab, dlTab, genContent, dlContent);
          } else if (tabId === "downloader") {
            dlTab.classList.add("active-mode");
            dlTab.style.background = "";
            dlTab.style.border = "";
            genTab.classList.remove("active-mode");
            genTab.style.background = "transparent";
            genTab.style.border = "1px solid transparent";
            dlContent.style.display = "block";
            genContent.style.display = "none";
            this.syncTabAria(dlTab, genTab, dlContent, genContent);
          }
        },
        syncTabAria(activeTab, inactiveTab, activePanel, inactivePanel) {
          if (activeTab) activeTab.setAttribute("aria-selected", "true");
          if (inactiveTab) {
            inactiveTab.setAttribute("aria-selected", "false");
            inactiveTab.setAttribute("tabindex", "-1");
          }
          if (activePanel) activePanel.setAttribute("aria-hidden", "false");
          if (inactivePanel) inactivePanel.setAttribute("aria-hidden", "true");
        },
        updateNav(id) {
          document
            .querySelectorAll(".nav-item")
            .forEach((e) => e.classList.remove("active"));
          if (id) { const el = document.getElementById(id); if (el) el.classList.add("active"); }
        },
        accentTint(accentHex) {
          const isLight = document.body.classList.contains("light-mode");
          // Same per-tool hue in both themes; only the strength of the
          // translucent soft/glow tints differs so the tint reads equally
          // on dark (black) vs light (near-white) surfaces.
          const softA = isLight ? 0.24 : 0.16;
          const glowA = isLight ? 0.32 : 0.45;
          const p =
            accentHex.length === 4
              ? accentHex.slice(1).split("").map((x) => x + x)
              : accentHex.slice(1).match(/.{2}/g);
          const r = parseInt(p[0], 16),
            g = parseInt(p[1], 16),
            b = parseInt(p[2], 16);
          return {
            soft: `rgba(${r}, ${g}, ${b}, ${softA})`,
            glow: `rgba(${r}, ${g}, ${b}, ${glowA})`,
          };
        },
        applyTheme(toolId) {
          const c = this.ToolColors[toolId] || this.ToolColors["home"];
          const tint = this.accentTint(c.accent);
          // Apply on <body> too: body.light-mode declares --accent directly on
          // the body element, which would otherwise shadow the inherited value
          // set on <html> and force every tool to the light-mode purple.
          const targets = [document.documentElement, document.body];
          targets.forEach((t) => {
            if (!t) return;
            const s = t.style;
            s.setProperty("--accent", c.accent);
            s.setProperty("--accent-hover", c.accent);
            s.setProperty("--accent-soft", tint.soft);
            s.setProperty("--accent-glow", tint.glow);
            s.setProperty("--glitch-cyan", c.accent);
            s.setProperty("--glitch-cyan-soft", tint.soft);
            s.setProperty("--glitch-cyan-glow", tint.glow);
          });
        },
        toggleEmptyState(container, isEmpty) {
          if (container)
            container.querySelector(".empty-state-msg").style.display = isEmpty
              ? "flex"
              : "none";
        },
        showSuccess(btn, text = "Done") {
          const old = btn.innerText;
          btn.innerText = text;
          btn.style.borderColor = "var(--success)";
          setTimeout(() => {
            btn.innerText = old;
            btn.style.borderColor = "var(--border)";
          }, 1500);
        },
        showError(msg) {
          this.els.toast.innerText = msg;
          this.els.toast.classList.add("visible");
          setTimeout(() => this.els.toast.classList.remove("visible"), 4000);
        },
        /* In-app confirmation dialog (replaces native confirm()).
           Returns a Promise<boolean>. options: { title, message, okLabel, cancelLabel } */
        confirm(options) {
          const o = options || {};
          const overlay = document.getElementById("confirmOverlay");
          const title = document.getElementById("confirmTitle");
          const body = document.getElementById("confirmBody");
          const okBtn = document.getElementById("confirmOkBtn");
          const cancelBtn = document.getElementById("confirmCancelBtn");
          if (!overlay) return Promise.resolve(true);
          title.textContent = o.title || "Are you sure?";
          body.textContent = o.message || "This action cannot be undone.";
          if (o.okLabel) okBtn.textContent = o.okLabel;
          if (o.cancelLabel) cancelBtn.textContent = o.cancelLabel;
          if (window.lucide) if (window.MicroGlitchEngine) { MicroGlitchEngine.scanSweep(metadataPanel, 200); } window.lucide.createIcons({ root: overlay });

          return new Promise((resolve) => {
            let settled = false;
            let lastFocus = document.activeElement;
            const done = (val) => {
              if (settled) return;
              settled = true;
              overlay.hidden = true;
              document.removeEventListener("keydown", onKey, true);
              overlay.removeEventListener("click", onOverlayBg);
              okBtn.removeEventListener("click", onOk);
              cancelBtn.removeEventListener("click", onCancel);
              resolve(val);
              if (lastFocus && lastFocus.focus) lastFocus.focus();
            };
            const onOk = () => done(true);
            const onCancel = () => done(false);
            const onKey = (e) => {
              if (e.key === "Escape") { e.preventDefault(); done(false); }
              else if (e.key === "Enter") { e.preventDefault(); done(true); }
            };
            const onOverlayBg = (e) => {
              if (e.target === overlay) done(false);
            };
            overlay.addEventListener("click", onOverlayBg);
            okBtn.addEventListener("click", onOk);
            cancelBtn.addEventListener("click", onCancel);
            document.addEventListener("keydown", onKey, true);
            overlay.hidden = false;
            cancelBtn.focus();
          });
        },
        /* Undo toast: shows a message with an Undo button that triggers callback. */
        undoToast(message, onUndo) {
          const toast = document.getElementById("undoToast");
          const msg = document.getElementById("undoToastMsg");
          const btn = document.getElementById("undoToastBtn");
          if (!toast) return;
          if (this._undoTimer) clearTimeout(this._undoTimer);
          msg.textContent = message;
          btn.onclick = () => {
            toast.hidden = true;
            if (typeof onUndo === "function") onUndo();
          };
          toast.hidden = false;
          this._undoTimer = setTimeout(() => { toast.hidden = true; }, 7000);
        },
        activeToolId() {
          return Core.AppState.load("activeTool") || "home";
        },
        toolDisplayName(section) {
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
        },
        openPresets() {
          const overlay = document.getElementById("presetsOverlay");
          if (!overlay) return;
          const section = this.activeToolId();
          if (!Core.Presets.controlsFor(section) ||
              Core.Presets.controlsFor(section).length === 0) {
            this.showError("No reusable settings for the current view yet.");
            return;
          }
          this._presetReturnFocus = document.activeElement;
          const nameInput = document.getElementById("presetsNameInput");
          if (nameInput) nameInput.value = "";
          document.getElementById("presetsSub").textContent =
            "Save and reuse settings for " + this.toolDisplayName(section) + ".";
          this.renderPresets(section);
          overlay.hidden = false;
          document.getElementById("presetsCloseBtn").focus();
          if (window.lucide) if (window.MicroGlitchEngine) { MicroGlitchEngine.scanSweep(metadataPanel, 200); } window.lucide.createIcons({ root: overlay });
        },
        closePresets() {
          const overlay = document.getElementById("presetsOverlay");
          if (!overlay) return;
          overlay.hidden = true;
          if (this._presetReturnFocus && this._presetReturnFocus.focus) {
            const target = this._presetReturnFocus;
            this._presetReturnFocus = null;
            target.focus();
          }
        },
        renderPresets(section) {
          const list = document.getElementById("presetsList");
          const empty = document.getElementById("presetsEmpty");
          const items = Core.Presets.list(section);
          list.innerHTML = "";
          if (items.length === 0) {
            if (empty) empty.style.display = "block";
            return;
          }
          if (empty) empty.style.display = "none";
          items.forEach((p) => {
            const row = document.createElement("div");
            row.className = "preset-item";
            const name = document.createElement("span");
            name.className = "preset-item-name";
            name.textContent = p.name;
            name.title = p.name;
            const actions = document.createElement("div");
            actions.className = "preset-item-actions";
            const applyBtn = document.createElement("button");
            applyBtn.type = "button";
            applyBtn.className = "preset-btn apply";
            applyBtn.textContent = "Apply";
            applyBtn.addEventListener("click", () => {
              Core.Presets.apply(section, p.name);
              this.closePresets();
              this.showSuccess(applyBtn, "Applied");
            });
            const delBtn = document.createElement("button");
            delBtn.type = "button";
            delBtn.className = "preset-btn";
            delBtn.textContent = "Delete";
            delBtn.addEventListener("click", () => {
              Core.Presets.del(section, p.name);
              this.renderPresets(section);
            });
            actions.appendChild(applyBtn);
            actions.appendChild(delBtn);
            row.appendChild(name);
            row.appendChild(actions);
            list.appendChild(row);
          });
        },
        savePreset() {
          const section = this.activeToolId();
          const nameInput = document.getElementById("presetsNameInput");
          const name = nameInput ? nameInput.value.trim() : "";
          if (!name) { this.showError("Enter a preset name."); if (nameInput) nameInput.focus(); return; }
          const res = Core.Presets.save(section, name);
          if (!res.ok) { this.showError(res.error || "Could not save preset."); return; }
          this.renderPresets(section);
          if (nameInput) nameInput.value = "";
          const ok = document.getElementById("presetsSaveBtn");
          this.showSuccess(ok, "Saved");
        },
        openUpdatesOverlay() {
          document.getElementById("dontShowUpdatesOverlay").checked =
            Core.AppState.load("hideUpdatesOverlay") === "true";
          document.getElementById("updatesOverlay").classList.add("active");
          const btn = document.getElementById("whatsNewBtn");
          if (btn) btn.classList.remove("whats-new-highlight");
          Core.AppState.save(
            "lastSeenUpdateVersion",
            window.CURRENT_APP_VERSION || "v1",
          );
        },
        closeUpdatesOverlay() {
          const checked = document.getElementById(
            "dontShowUpdatesOverlay",
          ).checked;
          Core.AppState.save("hideUpdatesOverlay", checked);
          document.getElementById("updatesOverlay").classList.remove("active");
        },
        openKeywordGuide() {
          const overlay = document.getElementById("keywordGuideOverlay");
          const list = document.getElementById("keywordGuideList");
          const tools = [
            {
              id: "section-logo",
              keyword: "logo",
              title: "Logo Workspace",
              desc: "Resize & Brand Images",
              icon: "image",
            },
            {
              id: "section-pdf-convert",
              tab: "convert",
              keyword: "pdf",
              title: "pdf to image",
              desc: "Split & Convert PDFs",
              icon: "file-text",
            },
            {
              id: "section-pdf-convert",
              tab: "split",
              keyword: "image",
              title: "image splitter",
              desc: "Slice images into grid files",
              icon: "crop",
            },
            {
              id: "section-video-stills",
              tab: "video",
              keyword: "stills",
              title: "video stills",
              desc: "Process Video Frames",
              icon: "film",
            },
            {
              id: "section-video-stills",
              tab: "story",
              keyword: "story",
              title: "storyboards",
              desc: "Create custom layout boards",
              icon: "clapperboard",
            },
            {
              id: "section-link-gen",
              tab: "gen",
              keyword: "link",
              title: "link gen",
              desc: "Generate campaign tracking shortlinks",
              icon: "link-2",
            },
            {
              id: "section-link-gen",
              tab: "downloader",
              keyword: "downloader",
              title: "ad link downloader",
              desc: "Bulk download sheets media assets",
              icon: "download",
            },
            {
              id: "section-yt-helper",
              keyword: "yt",
              title: "Video Downloads",
              desc: "Extract YouTube Visuals",
              icon: "play-square",
            },
          ];

          // Keep the introductory text if it exists
          const p = list.querySelector("p");
          list.innerHTML = "";
          if (p) list.appendChild(p);

          const grid = document.createElement("div");
          grid.style.display = "grid";
          grid.style.gridTemplateColumns = "1fr";
          grid.style.gap = "10px";

          tools.forEach((t) => {
            const item = document.createElement("div");
            item.style.display = "flex";
            item.style.alignItems = "center";
            item.style.padding = "12px";
            item.style.border = "2px solid var(--border)";
            item.style.background = "var(--bg-panel)";

            item.innerHTML = `
                        <div style="flex:1;">
                            <div style="font-weight:bold; font-size:1.1rem; margin-bottom:4px; display:flex; align-items:center; gap:8px;">
                                <i data-lucide="${t.icon}" style="width:16px; height:16px;"></i> ${t.title}
                            </div>
                            <div style="font-size:0.8rem; color:var(--text-muted);">${t.desc}</div>
                        </div>
                        <div style="background:var(--bg-input); padding:6px 12px; font-family:'Inter', sans-serif; font-size:0.7rem; border:1px solid var(--border);">
                            ${t.keyword}
                        </div>
                    `;
            grid.appendChild(item);
          });

          list.appendChild(grid);

          if (window.lucide) if (window.MicroGlitchEngine) { MicroGlitchEngine.scanSweep(metadataPanel, 200); } window.lucide.createIcons({ root: grid });

          document.getElementById("dontShowKeywordGuide").checked =
            Core.AppState.load("hideKeywordGuide") === "true";

          overlay.classList.add("active");
        },
        closeKeywordGuide() {
          const overlay = document.getElementById("keywordGuideOverlay");
          const checked = document.getElementById(
            "dontShowKeywordGuide",
          ).checked;
          Core.AppState.save("hideKeywordGuide", checked);
          overlay.classList.remove("active");
        },
        openLightbox(src) {
          this.els.lightboxImg.src = src;
          this.els.lightbox.classList.add("active");
        },
        closeLightbox() {
          this.els.lightbox.classList.remove("active");
        },
        openCommandPalette() {
          document
            .getElementById("commandPaletteOverlay")
            .classList.add("active");
          document.getElementById("commandPaletteInput").focus();
          document.getElementById("commandPaletteInput").value = "";
          this.filterCommandPalette("");
        },
        closeCommandPalette() {
          document
            .getElementById("commandPaletteOverlay")
            .classList.remove("active");
        },
        filterCommandPalette(term) {
          const query = term.toLowerCase();
          const items = document.querySelectorAll(
            "#commandPaletteList .cmd-item",
          );
          let firstVisible = null;
          items.forEach((item) => {
            item.classList.remove("selected");
            if (item.innerText.toLowerCase().includes(query)) {
              item.style.display = "flex";
              if (!firstVisible) firstVisible = item;
            } else {
              item.style.display = "none";
            }
          });
          if (firstVisible) firstVisible.classList.add("selected");
        },
        handlePaletteKeyDown(e) {
          const overlay = document.getElementById("commandPaletteOverlay");
          if (!overlay.classList.contains("active")) return;

          const items = Array.from(
            document.querySelectorAll("#commandPaletteList .cmd-item"),
          ).filter((i) => i.style.display !== "none");
          if (items.length === 0) return;

          let selectedIdx = items.findIndex((i) =>
            i.classList.contains("selected"),
          );

          if (e.key === "ArrowDown") {
            e.preventDefault();
            if (selectedIdx >= 0)
              items[selectedIdx].classList.remove("selected");
            selectedIdx = (selectedIdx + 1) % items.length;
            items[selectedIdx].classList.add("selected");
            items[selectedIdx].scrollIntoView({ block: "nearest" });
          } else if (e.key === "ArrowUp") {
            e.preventDefault();
            if (selectedIdx >= 0)
              items[selectedIdx].classList.remove("selected");
            selectedIdx = (selectedIdx - 1 + items.length) % items.length;
            items[selectedIdx].classList.add("selected");
            items[selectedIdx].scrollIntoView({ block: "nearest" });
          } else if (e.key === "Enter") {
            e.preventDefault();
            if (selectedIdx >= 0) items[selectedIdx].click();
          } else if (e.key === "Escape") {
            e.preventDefault();
            this.closeCommandPalette();
          }
        },
        initTheme() {
          document.body.classList.remove("light-mode");
          document.querySelectorAll(".nav-item").forEach((btn) => {
            const m = (btn.getAttribute("onclick") || "").match(/openTool\('([^']+)'(?:,\s*'([^']+)')?\)/);
            const toolId = m ? (m[2] ? m[1] + ':' + m[2] : m[1]) : null;
            const c = toolId && this.ToolColors[toolId];
            if (c) {
              const tint = this.accentTint(c.accent);
              btn.style.setProperty("--accent", c.accent);
              btn.style.setProperty("--accent-soft", tint.soft);
              btn.style.setProperty("--accent-glow", tint.glow);
            }
          });
          const activeTool = Core.AppState.load("activeTool") || "home";
          this.applyTheme(activeTool);
        },
      };

      const Tools = {
        Logo: {
          picaRunner: window.pica ? window.pica() : null,
          cards: [],
          activeDetailIndex: null,
          els: {},
          init() {
            this.els = {
              input: document.getElementById("logoInput"),
              dropZone: document.getElementById("dropZone"),
              grid: document.getElementById("logoGrid"),
              empty: document.getElementById("logoEmpty"),
              fontSize: document.getElementById("fontSizeInput"),
              bold: document.getElementById("boldToggle"),
              syncFilename: document.getElementById("syncFilenameToggle"),
              color: document.getElementById("fontColorPicker"),
              width: document.getElementById("exportWidth"),
              height: document.getElementById("exportHeight"),
              pos: document.getElementById("globalImgPos"),
              padding: document.getElementById("globalPadding"),
              fontFamily: document.getElementById("globalFontFamily"),
              exportBtn: document.getElementById("exportAllBtn"),
              clearBtn: document.getElementById("clearLogoBtn"),
              format: document.getElementById("exportFormat"),
              mOverlay: document.getElementById("logoDetailOverlay"),
              mCanvas: document.getElementById("logoDetailCanvas"),
              mClose: document.getElementById("logoDetailClose"),
              mDown: document.getElementById("logoDetailDownload"),
              mTitle: document.getElementById("logoDetailTitle"),
              mIndex: document.getElementById("logoDetailIndex"),
              mFname: document.getElementById("logoDetailFname"),
              mText: document.getElementById("logoDetailText"),
              mFontSize: document.getElementById("logoDetailFontSize"),
              mImgSlider: document.getElementById("logoDetailImgSlider"),
              mTxtSlider: document.getElementById("logoDetailTxtSlider"),
              mPaddingSlider: document.getElementById(
                "logoDetailPaddingSlider",
              ),
              mResetPadding: document.getElementById("logoDetailResetPadding"),
              mDelete: document.getElementById("logoDetailDelete"),
            };
            Core.Utils.createDropZone(this.els.dropZone, (f) =>
              this.handleFiles(f),
            );
            this.els.input.onchange = (e) => {
              this.handleFiles([...e.target.files]);
              this.els.input.value = "";
            };
            const redrawAll = () => this.cards.forEach((c) => this.draw(c));
            const redrawAllDebounced = Core.Utils.debounce(redrawAll, 50);
            this.els.fontSize.oninput = redrawAllDebounced;
            this.els.bold.addEventListener("change", redrawAll);
            this.els.color.oninput = redrawAllDebounced;
            this.els.pos.oninput = redrawAllDebounced;
            this.els.padding.oninput = redrawAllDebounced;
            this.els.fontFamily.onchange = redrawAll;
            
            const resizeDebounced = Core.Utils.debounce(() => {
              if (window.MicroGlitchEngine) {
                 this.cards.forEach(c => {
                    MicroGlitchEngine.signalTear(c.card, 120);
                    MicroGlitchEngine.microGlitch(c.card, 100);
                 });
              }
              redrawAll();
            }, 200);
            this.els.width.oninput = resizeDebounced;
            this.els.height.oninput = resizeDebounced;
            
            this.els.exportBtn.onclick = () => {
               if (window.MicroGlitchEngine) {
                  MicroGlitchEngine.scanSweep(this.els.grid, 250);
                  MicroGlitchEngine.pixelLock(this.els.grid, 200);
               }
               this.exportAll();
            };
            this.els.clearBtn.onclick = () => {
              const savedFiles = this.cards
                .map((c) => c.file)
                .filter((f) => f && typeof f === "object");
              UI.confirm({
                title: "Clear logo workspace?",
                message: "This removes every uploaded image and resets the workspace. You can undo this action.",
                okLabel: "Clear",
                cancelLabel: "Cancel",
              }).then((ok) => {
                if (!ok) return;
                const cards = Array.from(this.els.grid.children).filter(
                  (el) => !el.id.includes("Empty"),
                );
                window.applyThanosSnap(cards).then(() => {
                  this.destroy();
                  if (savedFiles.length > 0) {
                    UI.undoToast("Logo workspace cleared", () => {
                      this.handleFiles(savedFiles);
                    });
                  }
                });
              });
            };
            this.els.mClose.onclick = () => this.closeDetail();
            this.els.mDown.onclick = () => this.downloadActiveDetail();
            this.els.mDelete.onclick = () => {
              const obj = this.cards[this.activeDetailIndex];
              if (obj) {
                window
                  .applyThanosSnap(this.els.mOverlay.firstElementChild)
                  .then(() => {
                    this.removeCard(obj);
                  });
              }
            };
            const redrawModal = () => {
              const obj = this.cards[this.activeDetailIndex];
              if (obj) this.draw(obj);
            };
            const dRedrawModal = Core.Utils.debounce(redrawModal, 20);
            this.els.mFname.oninput = () => {
              const obj = this.cards[this.activeDetailIndex];
              if (obj) {
                obj.fname = Core.Utils.sanitize(this.els.mFname.value.trim());
                obj.els.fname.value = obj.fname || "Untitled";
              }
            };
            this.els.mText.oninput = () => {
              const obj = this.cards[this.activeDetailIndex];
              if (obj) {
                obj.text = this.els.mText.value;
                if (window.MicroGlitchEngine) {
                   MicroGlitchEngine.dataScramble(this.els.mText, 200, obj.text);
                   MicroGlitchEngine.pixelLock(obj.card, 150);
                }
                obj.els.textInput.value = obj.text;
                if (this.els.syncFilename.checked && obj.text.trim()) {
                  obj.fname = Core.Utils.sanitize(
                    obj.text.trim().substring(0, 30),
                  );
                  this.els.mFname.value = obj.fname;
                  obj.els.fname.value = obj.fname;
                }
                dRedrawModal();
              }
            };
            this.els.mFontSize.oninput = () => {
              const obj = this.cards[this.activeDetailIndex];
              if (obj) {
                const val = parseInt(this.els.mFontSize.value, 10);
                obj.fontValOverride = isNaN(val) ? null : val;
                obj.els.localFontInp.value = obj.fontValOverride || "";
                dRedrawModal();
              }
            };
            this.els.mImgSlider.oninput = () => {
              const obj = this.cards[this.activeDetailIndex];
              if (obj) {
                obj.imgSlider = parseInt(this.els.mImgSlider.value, 10);
                dRedrawModal();
              }
            };
            this.els.mTxtSlider.oninput = () => {
              const obj = this.cards[this.activeDetailIndex];
              if (obj) {
                obj.txtSlider = parseInt(this.els.mTxtSlider.value, 10);
                dRedrawModal();
              }
            };
            this.els.mPaddingSlider.oninput = () => {
              const obj = this.cards[this.activeDetailIndex];
              if (obj) {
                obj.padding = parseInt(this.els.mPaddingSlider.value, 10);
                this.els.mResetPadding.style.display = "block";
                dRedrawModal();
              }
            };
            this.els.mResetPadding.onclick = () => {
              const obj = this.cards[this.activeDetailIndex];
              if (obj) {
                window.applyThanosSnap(this.els.mCanvas, 0.4).then(() => {
                  obj.padding = null;
                  this.els.mPaddingSlider.value = this.els.padding.value;
                  this.els.mResetPadding.style.display = "none";
                  dRedrawModal();
                });
              }
            };
            window.addEventListener("keydown", (e) => {
              if (
                this.activeDetailIndex !== null &&
                this.els.mOverlay.classList.contains("active")
              ) {
                if (e.key === "ArrowLeft") this.goDetail(-1);
                if (e.key === "ArrowRight") this.goDetail(1);
                if (e.key === "Escape") this.closeDetail();
              }
            });
          },
          destroy() {
            this.cards.forEach((c) => URL.revokeObjectURL(c.img.src));
            this.cards = [];
            this.els.grid.innerHTML = "";
            this.els.grid.appendChild(this.els.empty);
            UI.toggleEmptyState(this.els.grid, true);
            this.els.exportBtn.disabled = true;
            this.closeDetail();
          },
          async handleFiles(files) {
            if (files.length > 0) {
              UI.toggleEmptyState(this.els.grid, false);
              this.els.exportBtn.disabled = false;
            }
            for (const f of files) {
              const nameLower = f.name.toLowerCase();
              if (f.type.startsWith("image/")) {
                this.createCard(f);
              } else if (nameLower.endsWith(".pptx") || nameLower.endsWith(".xlsx") || nameLower.endsWith(".xlsm")) {
                await this.extractMediaFromFile(f);
              }
            }
          },
          async extractMediaFromFile(file) {
            const JSZip = window.JSZip;
            if (!JSZip) return alert("JSZip library not found.");
            
            const progress = document.getElementById("logoProgress");
            const statusText = document.getElementById("logoStatusText");
            if (progress) progress.classList.add("active");
            if (statusText) statusText.innerText = "Extracting images from " + file.name + "...";
            
            if (window.MicroGlitchEngine) { MicroGlitchEngine.signalTear(resultEl, 150); } try {
              const zip = await JSZip.loadAsync(file);
              const ctx = { hashes: new Set(), dupes: 0 };
              const nameLower = file.name.toLowerCase();
              if (nameLower.endsWith(".pptx")) {
                await this.extractPptx(zip, ctx, file.name);
              } else if (nameLower.endsWith(".xlsx") || nameLower.endsWith(".xlsm")) {
                await this.extractXlsx(zip, ctx, file.name);
              }
            } catch (err) {
              console.error(err);
              alert("Failed to extract images from " + file.name);
            } finally {
              if (progress) progress.classList.remove("active");
            }
          },
          async processExtractedBlob(blob, filename, ctx) {
            if (window.MicroGlitchEngine) { MicroGlitchEngine.signalTear(resultEl, 150); } try {
              const buf = await blob.arrayBuffer();
              const dig = await crypto.subtle.digest('SHA-256', buf);
              const hex = [...new Uint8Array(dig)].map(b => b.toString(16).padStart(2, '0')).join('');
              if (ctx.hashes.has(hex)) {
                ctx.dupes++;
                return;
              }
              ctx.hashes.add(hex);
            } catch(e) {}
            
            const extMatch = filename.match(/\.([a-zA-Z0-9]+)$/);
            const ext = extMatch ? extMatch[1].toLowerCase() : 'png';
            const type = ext === 'jpg' || ext === 'jpeg' ? 'image/jpeg' : 
                         ext === 'svg' ? 'image/svg+xml' : 'image/png';
            
            const newFile = new File([blob], filename, { type: type });
            this.createCard(newFile);
          },
          resolveZipPath(base, target) {
            if(!target) return '';
            if(target.startsWith('/')) return target.replace(/^\/+/, '');
            const parts = (base + '/' + target).split('/'); 
            const out = [];
            for (const p of parts) { 
              if (p === '..') out.pop(); 
              else if (p !== '.' && p !== '') out.push(p); 
            }
            return out.join('/');
          },
          async extractPptx(zip, ctx, sourceFileName) {
            const parser = new DOMParser();
            const slideFiles = Object.keys(zip.files)
              .filter(p => /^ppt\/slides\/slide\d+\.xml$/.test(p))
              .sort((a,b) => parseInt(a.match(/\d+/g).pop()) - parseInt(b.match(/\d+/g).pop()));
            
            let imgCount = 1;
            for (let si = 0; si < slideFiles.length; si++) {
              const slidePath = slideFiles[si];
              const slideNum = parseInt(slidePath.match(/slide(\d+)\.xml/)[1], 10);
              const xmlText = await zip.file(slidePath).async('string');
              const xml = parser.parseFromString(xmlText, 'application/xml');
              
              const relPath = `ppt/slides/_rels/slide${slideNum}.xml.rels`;
              const rels = {};
              if (zip.file(relPath)) {
                const rx = parser.parseFromString(await zip.file(relPath).async('string'), 'application/xml');
                for (const r of rx.getElementsByTagName('Relationship')) rels[r.getAttribute('Id')] = r.getAttribute('Target');
              }
              
              const blips = xml.getElementsByTagNameNS('http://schemas.openxmlformats.org/drawingml/2006/main', 'blip');
              for (let i = 0; i < blips.length; i++) {
                const b = blips[i];
                let rid = null;
                
                // Prioritize high-resolution SVGs over PNG fallbacks
                const svgBlip = b.getElementsByTagNameNS('*', 'svgBlip')[0] || b.getElementsByTagName('asvg:svgBlip')[0];
                if (svgBlip) {
                  rid = svgBlip.getAttributeNS('http://schemas.openxmlformats.org/officeDocument/2006/relationships', 'embed') || svgBlip.getAttribute('r:embed');
                }
                
                // Fallback to standard raster image
                if (!rid) {
                  rid = b.getAttributeNS('http://schemas.openxmlformats.org/officeDocument/2006/relationships', 'embed') || b.getAttribute('r:embed');
                }
                
                if (!rid) continue;
                const target = this.resolveZipPath('ppt/slides', rels[rid] || '');
                if (!target || !zip.file(target)) continue;
                const blob = await zip.file(target).async('blob');
                const ext = (target.split('.').pop() || 'png').toLowerCase();
                const filename = `Slide${slideNum}_IMG${imgCount++}.${ext}`;
                await this.processExtractedBlob(blob, filename, ctx);
              }
            }
          },
          async extractXlsx(zip, ctx, sourceFileName) {
            const parser = new DOMParser();
            
            const wbXmlText = await zip.file('xl/workbook.xml').async('string');
            const wb = parser.parseFromString(wbXmlText, 'application/xml');
            const wbrXmlText = await zip.file('xl/_rels/workbook.xml.rels').async('string');
            const wbr = parser.parseFromString(wbrXmlText, 'application/xml');
            
            const wrel = {};
            for (const r of wbr.getElementsByTagName('Relationship')) wrel[r.getAttribute('Id')] = r.getAttribute('Target');
            
            const sheets = [];
            for (const s of wb.getElementsByTagName('sheet')) {
              const rid = s.getAttributeNS('http://schemas.openxmlformats.org/officeDocument/2006/relationships', 'id') || s.getAttribute('r:id');
              let t = (wrel[rid] || '').replace(/^\//, '');
              if (t && !t.startsWith('xl/')) t = 'xl/' + t;
              if (t && zip.file(t)) sheets.push({name: s.getAttribute('name') || t, path: t});
            }
            
            const extractedMedia = new Set();
            let imgCount = 1;
            
            for (const sh of sheets) {
              const base = sh.path.substring(0, sh.path.lastIndexOf('/'));
              const relPath = base + '/_rels/' + sh.path.split('/').pop() + '.rels';
              if (!zip.file(relPath)) continue;
              
              const srels = parser.parseFromString(await zip.file(relPath).async('string'), 'application/xml');
              let drawTarget = null;
              for (const r of srels.getElementsByTagName('Relationship')) {
                if ((r.getAttribute('Type') || '').endsWith('/drawing')) drawTarget = r.getAttribute('Target');
              }
              if (!drawTarget) continue;
              
              const drawPath = this.resolveZipPath(base, drawTarget);
              if (!zip.file(drawPath)) continue;
              
              const dbase = drawPath.substring(0, drawPath.lastIndexOf('/'));
              const drp = dbase + '/_rels/' + drawPath.split('/').pop() + '.rels';
              const drel = {};
              if (zip.file(drp)) {
                const dx = parser.parseFromString(await zip.file(drp).async('string'), 'application/xml');
                for (const r of dx.getElementsByTagName('Relationship')) drel[r.getAttribute('Id')] = r.getAttribute('Target');
              }
              
              const dxml = parser.parseFromString(await zip.file(drawPath).async('string'), 'application/xml');
              const blips = dxml.getElementsByTagNameNS('http://schemas.openxmlformats.org/drawingml/2006/main', 'blip');
              for (let i = 0; i < blips.length; i++) {
                const b = blips[i];
                let rid = null;
                
                // Prioritize high-resolution SVGs over PNG fallbacks
                const svgBlip = b.getElementsByTagNameNS('*', 'svgBlip')[0] || b.getElementsByTagName('asvg:svgBlip')[0];
                if (svgBlip) {
                  rid = svgBlip.getAttributeNS('http://schemas.openxmlformats.org/officeDocument/2006/relationships', 'embed') || svgBlip.getAttribute('r:embed');
                }
                
                // Fallback to standard raster image
                if (!rid) {
                  rid = b.getAttributeNS('http://schemas.openxmlformats.org/officeDocument/2006/relationships', 'embed') || b.getAttribute('r:embed');
                }
                
                if (!rid || !drel[rid]) continue;
                const mediaPath = this.resolveZipPath(dbase, drel[rid]);
                const mf = zip.file(mediaPath);
                if (!mf) continue;
                
                const blob = await mf.async('blob');
                extractedMedia.add(mediaPath);
                
                const ext = (mediaPath.split('.').pop() || 'png').toLowerCase();
                const safeSheet = (sh.name || 'Sheet').replace(/[^a-zA-Z0-9]/g, '');
                const filename = `${safeSheet}_IMG${imgCount++}.${ext}`;
                await this.processExtractedBlob(blob, filename, ctx);
              }
            }
            
            if (zip.file('xl/richData/richValueRel.xml')) {
              if (window.MicroGlitchEngine) { MicroGlitchEngine.signalTear(resultEl, 150); } try {
                const rvb = [];
                if (zip.file('xl/metadata.xml')) {
                  const md = await zip.file('xl/metadata.xml').async('string');
                  const re1 = /<xlrd:rvb i="(\d+)"\/>/g; let m;
                  while((m = re1.exec(md))) rvb.push(parseInt(m[1],10));
                }
                const rvLocalId = [];
                if (zip.file('xl/richData/rdrichvalue.xml')) {
                  const rv = await zip.file('xl/richData/rdrichvalue.xml').async('string');
                  const re2 = /<rv\b[^>]*>\s*<v>(\d+)<\/v>/g; let m;
                  while((m = re2.exec(rv))) rvLocalId.push(parseInt(m[1],10));
                }
                const relIds = [];
                const rvr = await zip.file('xl/richData/richValueRel.xml').async('string');
                const re3 = /<rel\s+r:id="(rId\d+)"/g; let m3;
                while((m3 = re3.exec(rvr))) relIds.push(m3[1]);
                const relMap = {};
                if (zip.file('xl/richData/_rels/richValueRel.xml.rels')) {
                  const rr = parser.parseFromString(await zip.file('xl/richData/_rels/richValueRel.xml.rels').async('string'), 'application/xml');
                  for (const r of rr.getElementsByTagName('Relationship')) relMap[r.getAttribute('Id')] = r.getAttribute('Target');
                }
                
                for (let i = 0; i < sheets.length; i++) {
                  const sh = sheets[i];
                  const sxml = parser.parseFromString(await zip.file(sh.path).async('string'), 'application/xml');
                  for (const c of sxml.getElementsByTagName('c')) {
                    const vm = c.getAttribute('vm');
                    if (!vm) continue;
                    const vmIdx = parseInt(vm, 10);
                    if (vmIdx < 1 || vmIdx > rvb.length) continue;
                    
                    const rvIdx = rvb[vmIdx - 1];
                    const localId = rvLocalId[rvIdx];
                    if (localId == null) continue;
                    
                    const rid = relIds[localId];
                    const target = relMap[rid];
                    if (!target) continue;
                    
                    const mediaPath = this.resolveZipPath('xl/richData', target);
                    if (!mediaPath || !zip.file(mediaPath)) continue;
                    
                    const blob = await zip.file(mediaPath).async('blob');
                    extractedMedia.add(mediaPath);
                    const ext = (mediaPath.split('.').pop() || 'png').toLowerCase();
                    const safeSheet = (sh.name || 'Sheet').replace(/[^a-zA-Z0-9]/g, '');
                    const filename = `${safeSheet}_CellIMG${imgCount++}.${ext}`;
                    await this.processExtractedBlob(blob, filename, ctx);
                  }
                }
              } catch(e) { console.error("Rich media extraction failed", e); }
            }
            
            const leftovers = Object.keys(zip.files).filter(p => /^xl\/media\//.test(p) && !extractedMedia.has(p));
            for (const p of leftovers) {
              const blob = await zip.file(p).async('blob');
              const ext = (p.split('.').pop() || 'png').toLowerCase();
              const filename = `Unanchored_IMG${imgCount++}.${ext}`;
              await this.processExtractedBlob(blob, filename, ctx);
            }
          },
          getGlobalFont() {
            const v = parseInt(this.els.fontSize.value, 10);
            return isNaN(v) ? 28 : Math.max(8, Math.min(v, 200));
          },
          createCard(file) {
            const card = document.createElement("div");
            card.className = "logo-card-item";
            card.style.cssText =
              "display:flex; flex-direction:column; border-radius:6px; overflow:hidden; transition:none; position:relative;";
            let baseName = file.name.replace(/\.[^/.]+$/, "").substring(0, 30);
            card.innerHTML = `<div style="display:flex; justify-content:space-between; align-items:center; padding:12px; border-bottom:1px solid var(--border);"><input data-guide="Edit the exported filename for this individual logo." class="card-fname-lbl liquid-input" style="font-size:0.75rem; color:var(--text-muted); font-weight:600; padding:2px 6px; height:24px; max-width:150px; background:transparent; outline:none;" value="${baseName}" /><button data-guide="Remove this logo from the workspace." class="liquid-btn icon-only danger-btn card-rm" style="width:28px; height:28px; padding:0; display:flex; align-items:center; justify-content:center;"><i data-lucide="trash-2" style="width:14px; height:14px;"></i></button></div><div data-guide="Click to open Focus Mode to inspect or copy this logo in full detail." class="card-preview-area" style="background-image:radial-gradient(var(--border) 1px, transparent 1px); background-size:15px 15px; position:relative; display:flex; justify-content:center; align-items:center; padding:3px; cursor:pointer; min-height:220px; flex:1; border-bottom:1px solid var(--border);"><canvas style="max-width:100%; max-height:100%; object-fit:contain; border:1px solid var(--border); background:#fff;"></canvas><div class="hover-overlay" style="position:absolute; inset:0; background:rgba(0,0,0,0.5); opacity:0; display:flex; align-items:center; justify-content:center; transition:opacity 0.2s;"><span style="background:var(--bg-panel); border:1px solid var(--border); padding:6px 12px; border-radius:6px; font-size:0.75rem; text-transform:uppercase; letter-spacing:1px; font-weight:bold;">Focus Mode</span></div></div><div style="padding:16px; display:flex; flex-direction:column; gap:12px;"><div style="display:flex; flex-direction:column; gap:6px;"><span style="font-size:0.8rem; font-weight:bold; color:var(--text-muted);">Overlay Label</span><textarea data-guide="Type a custom label or notation to overlay on this logo." class="liquid-input card-text" rows="1" placeholder="Type design label..." style="resize:none; padding:8px; font-size:0.75rem; height:34px;"></textarea></div><div style="display:flex; justify-content:space-between; align-items:center; gap:10px;"><div style="display:flex; align-items:center; gap:8px;"><span style="font-size:0.8rem; font-weight:bold; color:var(--text-muted);">Size Override:</span><input data-guide="Set a specific font size for this logo. Overrides global settings." type="number" class="liquid-input card-local-font-inp" placeholder="Auto" style="width:60px; height:26px; font-size:0.7rem; text-align:center; padding:4px;" /></div><button data-guide="Download this individual resized logo." class="liquid-btn icon-only active-mode card-dl" style="width:28px; height:28px; padding:0; display:flex; align-items:center; justify-content:center;"><i data-lucide="download" style="width:14px; height:14px;"></i></button></div></div>`;
            const canvas = card.querySelector("canvas");
            const hoverOverlay = card.querySelector(".hover-overlay");
            const textInput = card.querySelector(".card-text");
            const localFontInp = card.querySelector(".card-local-font-inp");
            const dlBtn = card.querySelector(".card-dl");
            const rmBtn = card.querySelector(".card-rm");
            const fnameLbl = card.querySelector(".card-fname-lbl");
            lucide.createIcons({ root: card });
            const img = new Image();
            img.src = Core.BlobRegistry.create(file);
            const obj = {
              file,
              img,
              canvas,
              fname: baseName,
              text: "",
              fontValOverride: null,
              padding: null,
              imgSlider: 0,
              txtSlider: 90,
              card,
              els: { fname: fnameLbl, textInput, localFontInp },
            };
            this.cards.unshift(obj);
            img.onload = () => {
              this.draw(obj);
              if (window.MicroGlitchEngine) {
                 MicroGlitchEngine.scanSweep(card, 250);
                 MicroGlitchEngine.rgbSplit(card, 100);
                 MicroGlitchEngine.pixelLock(card, 150);
              }
              if (this.activeDetailIndex !== null)
                this.draw(this.cards[this.activeDetailIndex]);
            };
            fnameLbl.oninput = () => {
              obj.fname = Core.Utils.sanitize(fnameLbl.value);
              if (this.activeDetailIndex === this.cards.indexOf(obj)) {
                this.els.mFname.value = obj.fname;
              }
            };
            textInput.oninput = Core.Utils.debounce(() => {
              obj.text = textInput.value;
              if (window.MicroGlitchEngine) {
                 MicroGlitchEngine.dataScramble(textInput, 200, obj.text);
                 MicroGlitchEngine.pixelLock(card, 150);
              }
              if (this.els.syncFilename.checked && obj.text.trim()) {
                obj.fname = Core.Utils.sanitize(
                  obj.text.trim().substring(0, 30),
                );
                obj.els.fname.value = obj.fname;
                if (this.activeDetailIndex === this.cards.indexOf(obj)) {
                  this.els.mFname.value = obj.fname;
                }
              }
              if (this.activeDetailIndex === this.cards.indexOf(obj)) {
                this.els.mText.value = obj.text;
              }
              this.draw(obj);
            }, 50);
            localFontInp.oninput = () => {
              const val = parseInt(localFontInp.value, 10);
              obj.fontValOverride = isNaN(val) ? null : val;
              if (this.activeDetailIndex === this.cards.indexOf(obj)) {
                this.els.mFontSize.value = obj.fontValOverride || "";
              }
              this.draw(obj);
            };
            dlBtn.onclick = () => this.downloadSingle(obj);
            rmBtn.onclick = () => {
              window.applyThanosSnap(obj.card).then(() => this.removeCard(obj));
            };
            const previewArea = card.querySelector(".card-preview-area");
            previewArea.onmouseenter = () => (hoverOverlay.style.opacity = "1");
            previewArea.onmouseleave = () => (hoverOverlay.style.opacity = "0");
            previewArea.onclick = () =>
              this.openDetail(this.cards.indexOf(obj));
            const animId = setTimeout(() => {
              this.els.grid.prepend(card);
            }, 0);
          },
          removeCard(obj) {
            const idx = this.cards.indexOf(obj);
            if (idx > -1) {
              obj.card.remove();
              URL.revokeObjectURL(obj.img.src);
              this.cards.splice(idx, 1);
              if (!this.cards.length) {
                UI.toggleEmptyState(this.els.grid, true);
                this.els.exportBtn.disabled = true;
                this.closeDetail();
              } else if (this.activeDetailIndex === idx) {
                if (idx >= this.cards.length) this.goDetail(-1);
                else this.openDetail(idx);
              } else if (this.activeDetailIndex > idx) {
                this.activeDetailIndex--;
                this.els.mIndex.innerText = `${this.activeDetailIndex + 1} of ${this.cards.length}`;
              }
            }
          },
          draw(c) {
            if (!c.img.complete) return;
            requestAnimationFrame(() => {
              let tW = parseInt(this.els.width.value, 10);
              let tH = parseInt(this.els.height.value, 10);
              
              if (isNaN(tW) || tW <= 0) tW = c.img.naturalWidth || 300;
              if (isNaN(tH) || tH <= 0) tH = c.img.naturalHeight || 400;
              
              const globFont = this.getGlobalFont();
              c.els.localFontInp.placeholder = `Auto (${globFont}px)`;
              c.canvas.width = tW;
              c.canvas.height = tH;
              this.performDraw(c.canvas, c, tW, tH);
              if (
                this.activeDetailIndex === this.cards.indexOf(c) &&
                this.els.mOverlay.classList.contains("active")
              ) {
                this.els.mFontSize.placeholder = `Auto (${globFont}px)`;
                this.els.mCanvas.width = tW;
                this.els.mCanvas.height = tH;
                this.performDraw(this.els.mCanvas, c, tW, tH);
              }
            });
          },
          performDraw(canvas, c, tW, tH) {
            const ctx = canvas.getContext("2d");
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = "high";
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(0, 0, tW, tH);
            const pad =
              c.padding !== null
                ? c.padding
                : parseInt(this.els.padding.value, 10) || 0;
            const aW = Math.max(1, tW - pad * 2),
              aH = Math.max(1, tH - pad * 2);
            const rawScale = Math.min(
              aW / c.img.naturalWidth,
              aH / c.img.naturalHeight,
            );
            const isVector = c.file && c.file.type === "image/svg+xml";
            const scale = isVector ? rawScale : Math.min(rawScale, 1);
            const rW = c.img.naturalWidth * scale,
              rH = c.img.naturalHeight * scale;
            const gPos =
              c.imgSlider !== 0
                ? c.imgSlider
                : parseInt(this.els.pos.value, 10) || 0;
            const x = (tW - rW) / 2,
              y = (tH - rH) / 2 + (gPos / 100) * tH;

            let sourceImg = c.img;
            let sW = c.img.naturalWidth;
            let sH = c.img.naturalHeight;
            if (sW > 0 && sH > 0) {
              if (!isVector && scale < 0.5) {
                let curWidth = sW;
                let curHeight = sH;
                let tmpCanvas = document.createElement("canvas");
                tmpCanvas.width = curWidth;
                tmpCanvas.height = curHeight;
                tmpCanvas.getContext("2d").drawImage(c.img, 0, 0);
                while (curWidth * 0.5 > rW && curHeight * 0.5 > rH) {
                  let nextWidth = Math.max(1, Math.floor(curWidth * 0.5));
                  let nextHeight = Math.max(1, Math.floor(curHeight * 0.5));
                  if (nextWidth >= curWidth && nextHeight >= curHeight) break;
                  let nextCanvas = document.createElement("canvas");
                  nextCanvas.width = nextWidth;
                  nextCanvas.height = nextHeight;
                  let nextCtx = nextCanvas.getContext("2d");
                  nextCtx.imageSmoothingEnabled = true;
                  nextCtx.imageSmoothingQuality = "high";
                  nextCtx.drawImage(tmpCanvas, 0, 0, nextWidth, nextHeight);
                  tmpCanvas = nextCanvas;
                  curWidth = nextWidth;
                  curHeight = nextHeight;
                }
                sourceImg = tmpCanvas;
                sW = curWidth;
                sH = curHeight;
              }
              ctx.drawImage(sourceImg, 0, 0, sW, sH, x, y, rW, rH);
            }

            if (c.text) {
              ctx.fillStyle = this.els.color.value;
              ctx.textAlign = "center";
              ctx.textBaseline = "middle";
              const fontFam = this.els.fontFamily.value || "Arial";
              const fontSize =
                c.fontValOverride !== null
                  ? c.fontValOverride
                  : this.getGlobalFont();
              ctx.font = `${this.els.bold.checked ? "700" : "400"} ${fontSize}px "${fontFam}"`;
              const lines = c.text.split("\n"),
                lh = fontSize * 1.25;
              const yS =
                (tH * (c.txtSlider || 90)) / 100 -
                (lh * lines.length) / 2 +
                lh / 2;
              lines.forEach((l, i) => ctx.fillText(l, tW / 2, yS + i * lh));
            }
            return !isVector && rawScale > 1;
          },
          async performHighQualityDraw(canvas, c, tW, tH) {
            const ctx = canvas.getContext("2d");
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(0, 0, tW, tH);
            const pad =
              c.padding !== null
                ? c.padding
                : parseInt(this.els.padding.value, 10) || 0;
            const aW = Math.max(1, tW - pad * 2),
              aH = Math.max(1, tH - pad * 2);
            const rawScale = Math.min(
              aW / c.img.naturalWidth,
              aH / c.img.naturalHeight,
            );
            const isVector = c.file && c.file.type === "image/svg+xml";
            const scale = isVector ? rawScale : Math.min(rawScale, 1);
            const rW = c.img.naturalWidth * scale,
              rH = c.img.naturalHeight * scale;
            const gPos =
              c.imgSlider !== 0
                ? c.imgSlider
                : parseInt(this.els.pos.value, 10) || 0;
            const x = (tW - rW) / 2,
              y = (tH - rH) / 2 + (gPos / 100) * tH;

            if (
              rW > 0 &&
              rH > 0 &&
              c.img.naturalWidth > 0 &&
              c.img.naturalHeight > 0
            ) {
              const offscreenCanvas = document.createElement("canvas");
              offscreenCanvas.width = rW;
              offscreenCanvas.height = rH;

              if (this.picaRunner && !isVector) {
                await this.picaRunner.resize(c.img, offscreenCanvas, {
                  unsharpAmount: 80,
                  unsharpRadius: 0.6,
                  unsharpThreshold: 2,
                });
              } else {
                offscreenCanvas.getContext("2d").drawImage(c.img, 0, 0, rW, rH);
              }

              ctx.drawImage(offscreenCanvas, x, y, rW, rH);
            }

            if (c.text) {
              ctx.fillStyle = this.els.color.value;
              ctx.textAlign = "center";
              ctx.textBaseline = "middle";
              const fontFam = this.els.fontFamily.value || "Arial";
              const fontSize =
                c.fontValOverride !== null
                  ? c.fontValOverride
                  : this.getGlobalFont();
              ctx.font = `${this.els.bold.checked ? "700" : "400"} ${fontSize}px "${fontFam}"`;
              const lines = c.text.split("\n"),
                lh = fontSize * 1.25;
              const yS =
                (tH * (c.txtSlider || 90)) / 100 -
                (lh * lines.length) / 2 +
                lh / 2;
              lines.forEach((l, i) => ctx.fillText(l, tW / 2, yS + i * lh));
            }
          },
          openDetail(index) {
            if (index < 0 || index >= this.cards.length) return;
            this.activeDetailIndex = index;
            const obj = this.cards[index];
            this.els.mOverlay.classList.add("active");
            this.els.mIndex.innerText = `${index + 1} of ${this.cards.length}`;
            this.els.mFname.value = obj.fname;
            this.els.mText.value = obj.text;
            this.els.mFontSize.value = obj.fontValOverride || "";
            this.els.mImgSlider.value = obj.imgSlider;
            this.els.mTxtSlider.value = obj.txtSlider;
            if (obj.padding !== null) {
              this.els.mPaddingSlider.value = obj.padding;
              this.els.mResetPadding.style.display = "block";
            } else {
              this.els.mPaddingSlider.value =
                parseInt(this.els.padding.value, 10) || 0;
              this.els.mResetPadding.style.display = "none";
            }
            this.draw(obj);
          },
          closeDetail() {
            this.activeDetailIndex = null;
            this.els.mOverlay.classList.remove("active");
          },
          goDetail(dir) {
            if (this.activeDetailIndex === null || !this.cards.length) return;
            let next = this.activeDetailIndex + dir;
            if (next < 0) next = this.cards.length - 1;
            if (next >= this.cards.length) next = 0;
            this.openDetail(next);
          },
          async downloadSingle(c) {
            const canvas = document.createElement("canvas");
            let tW = parseInt(this.els.width.value, 10);
            let tH = parseInt(this.els.height.value, 10);
            
            if (isNaN(tW) || tW <= 0) tW = c.img.naturalWidth || 300;
            if (isNaN(tH) || tH <= 0) tH = c.img.naturalHeight || 400;
            
            canvas.width = tW;
            canvas.height = tH;
            await this.performHighQualityDraw(canvas, c, tW, tH);
            const format = this.els.format ? this.els.format.value : "png";
            const mimeType = format === "jpeg" ? "image/jpeg" : "image/png";
            const ext = format === "jpeg" ? "jpg" : "png";
            const blob = await new Promise((r) =>
              canvas.toBlob(r, mimeType, 0.95),
            );
            const name = Core.Utils.sanitize(c.fname || "logo") || "logo";
            const a = document.createElement("a");
            a.href = URL.createObjectURL(blob);
            a.download = `${name}.${ext}`;
            a.click();
          },
          async downloadActiveDetail() {
            if (
              this.activeDetailIndex !== null &&
              this.cards[this.activeDetailIndex]
            ) {
              await this.downloadSingle(this.cards[this.activeDetailIndex]);
            }
          },
          openLinkGen() {
            document
              .getElementById("logoLinkGenOverlay")
              .classList.add("active");
            document.getElementById("logoLinkBrands").value = "";
            document.getElementById("logoLinkOutput").value = "";
            document.getElementById("logoLinkStatus").innerText =
              `${this.cards.length} logos loaded.`;
          },
          closeLinkGen() {
            document
              .getElementById("logoLinkGenOverlay")
              .classList.remove("active");
          },
          generateLinks() {
            const brandsText = document.getElementById("logoLinkBrands").value;
            const brands = brandsText
              .split("\n")
              .map((b) => b.trim())
              .filter((b) => b);
            const logos = this.cards;

            if (brands.length === 0) {
              return UI.showError("Please provide at least one brand name.");
            }

            if (logos.length === 0) {
              document
                .getElementById("logoLinkWarningOverlay")
                .classList.add("active");
              return;
            }

            this.executeGenerateLinks(false);
          },
          executeGenerateLinks(forceNoLogos) {
            const server = document.querySelector(
              'input[name="logoLinkServer"]:checked',
            ).value;
            const folder = (
              document.getElementById("logoLinkFolder").value || ""
            ).trim();
            const brandsText = document.getElementById("logoLinkBrands").value;

            const baseUrl =
              server === "s3"
                ? "https://s3media-ml-eu.surveycenter.com/"
                : "https://aldimediaeu.blob.core.windows.net/aldimediaeu/";

            const cleanFolder = folder.replace(/^\/+|\/+$/g, "");
            const folderPath = cleanFolder ? `${cleanFolder}/` : "";

            const brands = brandsText
              .split("\n")
              .map((b) => b.trim())
              .filter((b) => b);
            const logos = [...this.cards];

            const norm = (s) =>
              s
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .toLowerCase()
                .replace(/[^a-z0-9]/g, "");
            const levenshtein = (a, b) => {
              const matrix = Array(a.length + 1)
                .fill()
                .map(() => Array(b.length + 1).fill(0));
              for (let i = 0; i <= a.length; i++) matrix[i][0] = i;
              for (let j = 0; j <= b.length; j++) matrix[0][j] = j;
              for (let i = 1; i <= a.length; i++) {
                for (let j = 1; j <= b.length; j++) {
                  if (a[i - 1] === b[j - 1])
                    matrix[i][j] = matrix[i - 1][j - 1];
                  else
                    matrix[i][j] =
                      Math.min(
                        matrix[i - 1][j - 1],
                        matrix[i][j - 1],
                        matrix[i - 1][j],
                      ) + 1;
                }
              }
              return matrix[a.length][b.length];
            };

            let pairs = [];
            for (let i = 0; i < brands.length; i++) {
              for (let j = 0; j < logos.length; j++) {
                const bNorm = norm(brands[i]);
                const lNorm = norm(logos[j].fname || "");
                let score = 0;
                if (bNorm === lNorm) {
                  score = 1;
                } else if (lNorm.includes(bNorm) || bNorm.includes(lNorm)) {
                  score =
                    0.8 +
                    (Math.min(lNorm.length, bNorm.length) /
                      Math.max(lNorm.length, bNorm.length)) *
                      0.1;
                } else {
                  const dist = levenshtein(bNorm, lNorm);
                  const maxLen = Math.max(bNorm.length, lNorm.length);
                  score = maxLen === 0 ? 0 : 1 - dist / maxLen;
                }
                pairs.push({ brandIdx: i, logoIdx: j, score });
              }
            }

            pairs.sort((a, b) => b.score - a.score);

            let usedBrands = new Set();
            let usedLogos = new Set();
            let brandToLogo = {};

            for (const pair of pairs) {
              if (
                !usedBrands.has(pair.brandIdx) &&
                !usedLogos.has(pair.logoIdx)
              ) {
                brandToLogo[pair.brandIdx] = logos[pair.logoIdx];
                usedBrands.add(pair.brandIdx);
                usedLogos.add(pair.logoIdx);
              }
            }

            for (let i = 0; i < brands.length; i++) {
              if (!usedBrands.has(i)) {
                let fallback = null;
                for (let j = 0; j < logos.length; j++) {
                  if (!usedLogos.has(j)) {
                    fallback = logos[j];
                    usedLogos.add(j);
                    break;
                  }
                }
                brandToLogo[i] = fallback;
              }
            }

            let output = "";
            const format = this.els.format ? this.els.format.value : "png";
            const ext = format === "jpeg" ? "jpg" : "png";

            for (let i = 0; i < brands.length; i++) {
              const brand = brands[i];
              const logo = brandToLogo[i];
              let logoName = "";

              if (logo) {
                logoName = (logo.fname || `logo_${i + 1}`) + "." + ext;
              } else {
                logoName =
                  Core.Utils.sanitize(
                    brand.substring(0, 30).replace(/-/g, "_"),
                  ) +
                  "." +
                  ext;
              }

              const url = `${baseUrl}${folderPath}${logoName}`;
              const link = `<center><img src="${url}" style="max-width:100%" align ="center"></center><span style="display:none;">${brand}</span>`;
              output += link + "\n";
            }

            document.getElementById("logoLinkOutput").value = output.trim();
            document.getElementById("logoLinkStatus").innerText =
              `Generated ${brands.length} links.`;
          },
          copyLinks() {
            const text = document.getElementById("logoLinkOutput").value;
            if (!text) return UI.showError("Nothing to copy!");
            navigator.clipboard
              .writeText(text)
              .then(() => {
                UI.showSuccess(
                  document.getElementById("logoLinkCopyBtn"),
                  "Copied HTML",
                );
              })
              .catch(() => UI.showError("Failed to copy text."));
          },
          async exportAll() {
            if (!this.cards.length) return;
            this.els.exportBtn.innerText = "Processing...";
            this.els.exportBtn.disabled = true;
            const toast = document.getElementById("errorToast");
            toast.innerText = "Generating high-fidelity ZIP archive...";
            toast.style.borderColor = "var(--accent)";
            toast.classList.add("visible");
            const zip = new JSZip();
            const format = this.els.format ? this.els.format.value : "png";
            const mimeType = format === "jpeg" ? "image/jpeg" : "image/png";
            const ext = format === "jpeg" ? "jpg" : "png";
            for (let i = 0; i < this.cards.length; i++) {
              const c = this.cards[i];
              const canvas = document.createElement("canvas");
              let tW = parseInt(this.els.width.value, 10);
              let tH = parseInt(this.els.height.value, 10);
              
              if (isNaN(tW) || tW <= 0) tW = c.img.naturalWidth || 300;
              if (isNaN(tH) || tH <= 0) tH = c.img.naturalHeight || 400;
              canvas.width = tW;
              canvas.height = tH;
              await this.performHighQualityDraw(canvas, c, tW, tH);
              const b = await new Promise((r) =>
                canvas.toBlob(r, mimeType, 0.95),
              );
              const name = Core.Utils.sanitize(c.fname || `logo_${i + 1}`);
              zip.file(`${name}.${ext}`, b);
            }
            zip
              .generateAsync({ type: "blob" })
              .then((c) => {
                const a = document.createElement("a");
                a.href = URL.createObjectURL(c);
                a.download = "batch_logos.zip";
                a.click();
                this.els.exportBtn.innerText = "Download Zip";
                this.els.exportBtn.disabled = false;
                UI.showSuccess(this.els.exportBtn);
                toast.classList.remove("visible");
                toast.style.borderColor = "";
              })
              .catch((err) => {
                toast.classList.remove("visible");
                toast.style.borderColor = "";
                UI.showError("Export failed: " + err);
                this.els.exportBtn.innerText = "Download Zip";
                this.els.exportBtn.disabled = false;
              });
          },
        },
        Pdf: {
          collection: {},
          currentId: null,
          abortCtrl: null,
          els: {
            dropZone: document.getElementById("pdfDropZone"),
            input: document.getElementById("pdfInput"),
            stacks: document.getElementById("pdfStacksContainer"),
            empty: document.getElementById("pdfEmptyState"),
            format: document.getElementById("pdfFormat"),
            clearBtn: document.getElementById("clearPdfBtn"),
            cancelBtn: document.getElementById("cancelPdfBtn"),
            progress: document.getElementById("pdfProgress"),
            status: document.getElementById("pdfStatusText"),
            percent: document.getElementById("pdfStatusPercent"),
            bar: document.getElementById("pdfProgressBar"),
            overlay: document.getElementById("pdfDetailOverlay"),
            title: document.getElementById("pdfOverlayTitle"),
            count: document.getElementById("pdfOverlayCount"),
            grid: document.getElementById("pdfOverlayGrid"),
            selectAll: document.getElementById("pdfSelectAll"),
            dlSelected: document.getElementById("pdfDownloadSelected"),
          },
          init() {
            Core.Utils.createDropZone(this.els.dropZone, (f) =>
              this.handleFiles(f),
            );
            this.els.input.onchange = (e) => {
              this.handleFiles([...e.target.files]);
              this.els.input.value = "";
            };
            this.els.clearBtn.onclick = () => {
              const savedFiles = this._sourceFiles || [];
              UI.confirm({
                title: "Clear all PDFs?",
                message: "This removes every loaded PDF and its converted pages. You can undo this action.",
                okLabel: "Clear",
                cancelLabel: "Cancel",
              }).then((ok) => {
                if (!ok) return;
                const items = Array.from(this.els.stacks.children).filter(
                  (el) => !el.id.includes("Empty"),
                );
                window.applyThanosSnap(items).then(() => {
                  this.destroy();
                  if (savedFiles.length > 0) {
                    UI.undoToast("PDFs cleared", () => {
                      this._sourceFiles = savedFiles;
                      this.handleFiles(savedFiles);
                    });
                  }
                });
              });
            };
            this.els.cancelBtn.onclick = () => {
              if (this.abortCtrl) this.abortCtrl.abort();
            };
            this.els.selectAll.onchange = (e) =>
              this.toggleAll(e.target.checked);
            this.els.dlSelected.onclick = () => this.downloadSelected();
            document.addEventListener("keydown", (e) => {
              if (
                !this.currentId ||
                !this.els.overlay.classList.contains("active")
              )
                return;
              if (e.ctrlKey && e.key === "a") {
                e.preventDefault();
                this.els.selectAll.click();
              }
              if (e.ctrlKey && e.key === "s") {
                e.preventDefault();
                this.downloadSelected();
              }
            });
          },
          destroy() {
            this.collection = {};
            this.els.stacks.innerHTML = "";
            this.els.stacks.appendChild(this.els.empty);
            UI.toggleEmptyState(this.els.stacks, true);
            Core.BlobRegistry.revokeAll();
          },
          async handleFiles(files) {
            const pdfFiles = files.filter((f) => f.type === "application/pdf");
            this._sourceFiles = pdfFiles.slice();
            if (pdfFiles.length === 0)
              return UI.showError("Please upload valid PDF files.");
            UI.toggleEmptyState(this.els.stacks, false);
            this.els.progress.classList.add("active");
            this.els.cancelBtn.style.display = "inline-flex";
            this.abortCtrl = new AbortController();
            const signal = this.abortCtrl.signal;
            if (window.MicroGlitchEngine) { MicroGlitchEngine.signalTear(resultEl, 150); } try {
              for (const file of pdfFiles) {
                if (signal.aborted) break;
                await this.processSinglePdf(
                  file,
                  this.els.format.value,
                  signal,
                );
              }
            } catch (e) {
              if (e.name !== "AbortError") UI.showError(e.message);
            } finally {
              this.els.progress.classList.remove("active");
              this.els.cancelBtn.style.display = "none";
              this.abortCtrl = null;
            }
          },
          async processSinglePdf(file, format, signal) {
            const pdfId = `pdf-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
            this.els.status.innerText = `Loading ${file.name}...`;
            this.els.bar.style.width = "0%";
            if (window.MicroGlitchEngine) { MicroGlitchEngine.signalTear(resultEl, 150); } try {
              const arrayBuffer = await file.arrayBuffer();
              const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;
              const stack = document.createElement("div");
              stack.className = "pdf-stack-wrapper";
              stack.innerHTML = `<div class="processing-pulse" style="width:100%; height:200px; background:var(--bg-input); display:flex; align-items:center; justify-content:center; color:var(--text-muted);">Processing...</div><div class="stack-meta"><div class="stack-title">${file.name}</div><div class="stack-count">0/${pdf.numPages}</div></div>`;
              stack.onclick = () => this.openDetail(pdfId);
              this.els.stacks.prepend(stack);
              if (window.MicroGlitchEngine) {
                 MicroGlitchEngine.scanSweep(stack, 250);
                 MicroGlitchEngine.rgbSplit(stack, 120);
                 MicroGlitchEngine.pixelLock(stack, 200);
              }
              this.collection[pdfId] = {
                name: file.name,
                total: pdf.numPages,
                pages: [],
                format: format,
              };
              for (let i = 1; i <= pdf.numPages; i++) {
                if (signal.aborted)
                  throw new DOMException("Aborted", "AbortError");
                await new Promise((resolve) => setTimeout(resolve, 0));
                
                if (window.MicroGlitchEngine && (i % 3 === 1)) {
                   MicroGlitchEngine.digitalFlicker(this.els.bar, 100);
                }
                
                this.els.status.innerText = `Rendering ${file.name} (Page ${i}/${pdf.numPages})`;
                const pct = Math.round((i / pdf.numPages) * 100) + "%";
                this.els.percent.innerText = pct;
                this.els.bar.style.width = pct;
                stack.querySelector(".stack-count").innerText =
                  `${i}/${pdf.numPages}`;
                const page = await pdf.getPage(i);
                const viewport = page.getViewport({ scale: 2.0 });
                const canvas = document.createElement("canvas");
                canvas.width = viewport.width;
                canvas.height = viewport.height;
                await page.render({
                  canvasContext: canvas.getContext("2d"),
                  viewport,
                }).promise;
                if (i === 1) {
                  stack.querySelector("div").replaceWith(
                    Object.assign(new Image(), {
                      src: canvas.toDataURL(format, 0.5),
                    }),
                  );
                }
                const blob = await new Promise((r) =>
                  canvas.toBlob(r, format, 0.9),
                );
                const url = Core.BlobRegistry.create(blob);
                this.collection[pdfId].pages.push({
                  num: i,
                  blob,
                  url,
                  checked: true,
                });
                
                if (window.MicroGlitchEngine && (i % 5 === 0 || i === pdf.numPages)) {
                   MicroGlitchEngine.scanSweep(stack, 150);
                   MicroGlitchEngine.signalTear(stack, 120);
                   MicroGlitchEngine.pixelLock(stack, 100);
                }
              }
              stack.querySelector(".stack-count").innerText =
                `${pdf.numPages} Pages`;
            } catch (err) {
              if (err.name !== "AbortError") {
                console.error(err);
                UI.showError(`Failed to process ${file.name}: ${err.message}`);
              }
            }
          },
          closeDetail() {
            this.els.overlay.classList.remove("active");
            this.currentId = null;
          },
          toggleAll(val) {
            if (!this.currentId) return;
            this.collection[this.currentId].pages.forEach(
              (p) => (p.checked = val),
            );
            this.els.grid
              .querySelectorAll(".detail-check")
              .forEach((c) => (c.checked = val));
          },
          downloadSingle(url, name) {
            const a = document.createElement("a");
            a.href = url;
            a.download = name;
            a.click();
          },
          async downloadSelected() {
            if (!this.currentId) return;
            const data = this.collection[this.currentId];
            const selected = data.pages.filter((p) => p.checked);
            if (selected.length === 0)
              return UI.showError("No pages selected.");
              
            if (window.MicroGlitchEngine) {
               MicroGlitchEngine.digitalFlicker(this.els.dlSelected, 150);
               MicroGlitchEngine.scanSweep(this.els.grid, 250);
            }
            this.els.dlSelected.innerText = "Zipping...";
            const zip = new JSZip();
            const ext = data.format.split("/")[1] === "jpeg" ? "jpg" : "png";
            selected.forEach((p) => zip.file(`${p.num}.${ext}`, p.blob));
            const content = await zip.generateAsync({ type: "blob" });
            const a = document.createElement("a");
            a.href = URL.createObjectURL(content);
            a.download = `${data.name}_images.zip`;
            a.click();
            this.els.dlSelected.innerText = "Download Selected (Ctrl+S)";
          },
        },
        Split: {
          items: [],
          els: {
            drop: document.getElementById("splitDropZone"),
            input: document.getElementById("splitInput"),
            grid: document.getElementById("splitGrid"),
            processBtn: document.getElementById("processSplitBtn"),
            dlBtn: document.getElementById("downloadSplitBtn"),
            clearBtn: document.getElementById("clearSplitBtn"),
            mode: document.getElementById("splitMode"),
            rows: document.getElementById("splitRows"),
            cols: document.getElementById("splitCols"),
          },
          init() {
            Core.Utils.createDropZone(this.els.drop, (f) =>
              this.handleFiles(f),
            );
            this.els.input.onchange = (e) => {
              this.handleFiles([...e.target.files]);
              this.els.input.value = "";
            };
            this.els.processBtn.onclick = () => this.process();
            this.els.dlBtn.onclick = () => this.download();
            this.els.clearBtn.onclick = () => {
              const savedFiles = this.items.map((i) => i.file).filter(Boolean);
              UI.confirm({
                title: "Reset splitter?",
                message: "This removes the loaded image and resets split settings. You can undo this action.",
                okLabel: "Reset",
                cancelLabel: "Cancel",
              }).then((ok) => {
                if (!ok) return;
                const items = Array.from(this.els.grid.children).filter(
                  (el) => !el.id.includes("Empty"),
                );
                window.applyThanosSnap(items).then(() => {
                  this.destroy();
                  if (savedFiles.length > 0) {
                    UI.undoToast("Splitter reset", () => {
                      this.handleFiles(savedFiles);
                    });
                  }
                });
              });
            };
            [this.els.mode, this.els.rows, this.els.cols].forEach((el) =>
              el.addEventListener("input", () => this.updateGridLines()),
            );
          },
          destroy() {
            this.items.forEach((i) => URL.revokeObjectURL(i.url));
            this.items = [];
            this.render();
          },
          handleFiles(files) {
            const valid = files.filter((f) => f.type.startsWith("image/"));
            if (!valid.length) return;
            valid.forEach((file) =>
              this.items.push({
                file,
                img: null,
                url: Core.BlobRegistry.create(file),
                checked: true,
                splitBlobs: [],
              }),
            );
            this.render();
            this.els.processBtn.disabled = false;
          },
          updateGridLines() {
            const mode = this.els.mode.value,
              rIn = parseInt(this.els.rows.value) || 1,
              cIn = parseInt(this.els.cols.value) || 1;
            let rows = mode === "horz" || mode === "grid" ? rIn : 1;
            let cols = mode === "vert" || mode === "grid" ? cIn : 1;
            document
              .querySelectorAll(".split-preview-overlay")
              .forEach((el) => {
                el.style.setProperty("--rows", rows);
                el.style.setProperty("--cols", cols);
                el.innerHTML = "";
                for (let i = 0; i < rows * cols; i++) {
                  el.appendChild(document.createElement("div")).className =
                    "split-cell";
                }
                if (window.MicroGlitchEngine) {
                   MicroGlitchEngine.scanSweep(el, 150);
                   MicroGlitchEngine.pixelLock(el, 150);
                }
              });
          },
          render() {
            this.els.grid.innerHTML = "";
            if (this.items.length === 0) {
              this.els.grid.innerHTML =
                '<div class="empty-state-msg" id="splitEmpty"><i data-lucide="scissors" style="width:50px; height:50px; opacity:0.5;"></i><p>No images</p></div>';
              this.els.processBtn.disabled = true;
              this.els.dlBtn.disabled = true;
              lucide.createIcons({ root: this.els.grid });
              return;
            }
            this.items.forEach((item) => {
              const card = document.createElement("div");
              card.className = "logo-card-item";
              card.innerHTML = `<div class="preview-box"><img src="${item.url}"><div class="split-preview-overlay"></div></div><div class="card-controls"><div style="font-size:0.8rem; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; font-weight:600;">${item.file.name}</div><label style="display:flex; gap:8px; align-items:center; font-size:0.9rem;"><input type="checkbox" class="split-check toggle-switch small" ${item.checked ? "checked" : ""}> Split</label><div class="split-status" style="font-size:0.75rem; color:var(--text-muted);">${item.splitBlobs.length > 0 ? "Done" : "Ready"}</div></div>`;
              this.els.grid.appendChild(card);
              item.card = card;
              card.querySelector(".split-check").onchange = (e) =>
                (item.checked = e.target.checked);
            });
            this.updateGridLines();
          },
          async process() {
            if (window.MicroGlitchEngine) {
               this.items.forEach(item => MicroGlitchEngine.signalTear(item.card, 150));
            }
            this.els.processBtn.innerText = "Processing...";
            await new Promise((r) => setTimeout(r, 100));
            const mode = this.els.mode.value;
            const rInput = parseInt(this.els.rows.value) || 1;
            const cInput = parseInt(this.els.cols.value) || 1;
            let rows = 1,
              cols = 1;
            if (mode === "grid") {
              rows = rInput;
              cols = cInput;
            } else if (mode === "vert") {
              cols = cInput;
            } else if (mode === "horz") {
              rows = rInput;
            }
            for (const item of this.items) {
              if (!item.checked) continue;
              if (!item.img) {
                item.img = new Image();
                item.img.src = item.url;
                await new Promise((r) => (item.img.onload = r));
              }
              item.splitBlobs = [];
              const pW = item.img.naturalWidth / cols;
              const pH = item.img.naturalHeight / rows;
              for (let r = 0; r < rows; r++) {
                for (let c = 0; c < cols; c++) {
                  const cvs = document.createElement("canvas");
                  cvs.width = pW;
                  cvs.height = pH;
                  cvs
                    .getContext("2d")
                    .drawImage(item.img, c * pW, r * pH, pW, pH, 0, 0, pW, pH);
                  item.splitBlobs.push({
                    blob: await new Promise((res) =>
                      cvs.toBlob(res, item.file.type),
                    ),
                  });
                }
              }
              item.card.querySelector(".split-status").innerText =
                `Done (${rows * cols})`;
              if (window.MicroGlitchEngine) {
                 MicroGlitchEngine.pixelLock(item.card, 150);
              }
            }
            this.els.processBtn.innerText = "Process";
            this.els.dlBtn.disabled = false;
          },
          async download() {
            if (window.MicroGlitchEngine) {
               MicroGlitchEngine.digitalFlicker(this.els.dlBtn, 150);
               MicroGlitchEngine.scanSweep(this.els.grid, 250);
            }
            this.els.dlBtn.innerText = "Zipping...";
            const zip = new JSZip();
            let count = 1;
            this.items.forEach((item) => {
              const ext = item.file.name.split(".").pop();
              if (item.checked && item.splitBlobs.length > 0)
                item.splitBlobs.forEach((b) => {
                  zip.file(`${count}.${ext}`, b.blob);
                  count++;
                });
              else {
                zip.file(`${count}.${ext}`, item.file);
                count++;
              }
            });
            const a = document.createElement("a");
            a.href = URL.createObjectURL(
              await zip.generateAsync({ type: "blob" }),
            );
            a.download = "split_images.zip";
            a.click();
            this.els.dlBtn.innerText = "Download Zip";
          },
        },
        Story: {
          projects: [],
          active: null,
          canvas: null,
          els: {
            tabs: document.getElementById("storyProjectTabs"),
            list: document.getElementById("storyFileList"),
            preview: document.getElementById("storyPreview"),
            name: document.getElementById("storyNameInput"),
            drop: document.getElementById("storyDropZone"),
            input: document.getElementById("storyInput"),
          },
          init() {
            Core.Utils.createDropZone(this.els.drop, (f) =>
              this.handleFiles(f),
            );
            this.els.input.onchange = (e) => {
              this.handleFiles([...e.target.files]);
              this.els.input.value = "";
            };
            this.els.name.oninput = () => {
              this.els.name.value = Core.Utils.sanitize(this.els.name.value);
              this.saveSettings();
              this.renderTabs();
            };
            [
              "storyGap",
              "storyWidth",
              "storyAutoWidth",
              "storyCols",
              "storyFitMode",
              "storyBgColor",
            ].forEach((id) => {
              document.getElementById(id).addEventListener(
                "change",
                Core.Utils.debounce(() => {
                  if (id === "storyAutoWidth") {
                    document.getElementById(
                      "storyWidthContainer",
                    ).style.display = document.getElementById("storyAutoWidth")
                      .checked
                      ? "none"
                      : "block";
                  }
                  this.saveSettings();
                  this.draw();
                  if (window.MicroGlitchEngine) {
                     MicroGlitchEngine.microGlitch(this.els.preview, 100);
                     MicroGlitchEngine.pixelLock(this.els.preview, 150);
                  }
                }, 150),
              );
            });
            document.getElementById("generateStoryBtn").onclick = () => {
              if (window.MicroGlitchEngine) {
                 MicroGlitchEngine.microGlitch(this.els.preview, 100);
                 MicroGlitchEngine.pixelLock(this.els.preview, 150);
              }
              this.draw();
            };
            document.getElementById("downloadStoryBtn").onclick = () => {
              if (this.canvas) {
                if (window.MicroGlitchEngine) {
                   MicroGlitchEngine.scanSweep(this.els.preview, 200);
                   MicroGlitchEngine.digitalFlicker(document.getElementById("downloadStoryBtn"), 150);
                }
                const a = document.createElement("a");
                a.href = this.canvas.toDataURL("image/jpeg", 0.95);
                a.download = `${this.active.name}.jpg`;
                a.click();
              }
            };
            document.getElementById("downloadAllStoryBtn").onclick = () =>
              this.downloadAll();
            document.getElementById("clearStoryBtn").onclick = () => {
              UI.confirm({
                title: "Clear storyboard?",
                message: "This removes every frame from the current board. This action cannot be undone.",
                okLabel: "Clear",
                cancelLabel: "Cancel",
              }).then((ok) => {
                if (!ok) return;
                const items = Array.from(this.els.list.children).filter(
                  (el) => !el.id.includes("Empty"),
                );
                if (this.canvas) items.push(this.canvas);
                window.applyThanosSnap(items).then(() => this.destroy());
              });
            };
            this.addNewProject();
          },
          destroy() {
            this.active.images.forEach((i) => URL.revokeObjectURL(i.img.src));
            this.active.images = [];
            this.canvas = null;
            this.updateList();
            this.els.preview.innerHTML =
              '<span class="text-muted">Preview</span>';
          },
          addNewProject() {
            const id = Date.now();
            this.projects.push({
              id,
              name: `Board_${this.projects.length + 1}`,
              images: [],
              settings: {
                gap: 0,
                width: 1920,
                autoWidth: true,
                cols: 0,
                bgColor: "#ffffff",
                fitMode: "cover",
              },
            });
            this.switchProject(id);
          },
          switchProject(id) {
            if (this.active) this.saveSettings();
            this.active = this.projects.find((p) => p.id === id);
            this.loadSettings();
            this.renderTabs();
            this.updateList();
            if (this.active.images.length > 0) {
              this.draw();
            } else {
              this.els.preview.innerHTML =
                '<span class="text-muted">Preview</span>';
            }
          },
          saveSettings() {
            if (!this.active) return;
            const s = this.active.settings;
            s.gap = parseInt(document.getElementById("storyGap").value) || 0;
            s.width =
              parseInt(document.getElementById("storyWidth").value) || 1920;
            s.autoWidth = document.getElementById("storyAutoWidth").checked;
            s.cols = parseInt(document.getElementById("storyCols").value) || 0;
            s.bgColor = document.getElementById("storyBgColor").value;
            s.fitMode = document.getElementById("storyFitMode").value;
            this.active.name = this.els.name.value;
          },
          loadSettings() {
            if (!this.active) return;
            const s = this.active.settings;
            document.getElementById("storyGap").value = s.gap;
            document.getElementById("storyWidth").value = s.width;
            document.getElementById("storyCols").value = s.cols || 0;
            document.getElementById("storyAutoWidth").checked = s.autoWidth;
            document.getElementById("storyBgColor").value =
              s.bgColor || "#ffffff";
            document.getElementById("storyFitMode").value =
              s.fitMode || "cover";
            this.els.name.value = this.active.name;
            document.getElementById("storyWidthContainer").style.display =
              s.autoWidth ? "none" : "block";
          },
          renderTabs() {
            this.els.tabs.innerHTML = "";
            this.projects.forEach((p) => {
              const tab = document.createElement("div");
              tab.style.cssText = `padding:6px 12px; background:${p.id === this.active.id ? "var(--text-main)" : "var(--bg-panel)"}; color:${p.id === this.active.id ? "var(--bg-main)" : "var(--text-main)"}; border: 1px solid var(--border); font-size:0.75rem; cursor:pointer; display:flex; gap:6px; align-items:center; `;
              tab.innerHTML = `<span>${p.name}</span><span style="opacity:0.5;" title="Delete">&times;</span>`;
              tab.querySelector("span:last-child").onclick = (e) => {
                e.stopPropagation();
                this.deleteProject(p.id);
              };
              tab.onclick = () => this.switchProject(p.id);
              this.els.tabs.appendChild(tab);
            });
          },
          deleteProject(id) {
            UI.confirm({
              title: "Delete this board?",
              message: "This board and all of its frames will be permanently removed.",
              okLabel: "Delete",
              cancelLabel: "Cancel",
            }).then((ok) => {
              if (!ok) return;
              const idx = this.projects.findIndex((p) => p.id === id);
              if (idx < 0) return;
              this.projects.splice(idx, 1);
              if (this.projects.length === 0) this.addNewProject();
              else this.switchProject(this.projects[Math.max(0, idx - 1)].id);
            });
          },
          async handleFiles(files) {
            for (const file of files) {
              let img;
              if (file.type.startsWith("video/")) {
                if (window.MicroGlitchEngine) { MicroGlitchEngine.signalTear(resultEl, 150); } try {
                  img = await this.getVideoFrame(file);
                } catch (e) {
                  continue;
                }
              } else if (file.type.startsWith("image/")) {
                img = new Image();
                img.src = Core.BlobRegistry.create(file);
              } else {
                continue;
              }
              this.active.images.push({ file, img });
            }
            this.saveSettings();
            this.updateList();
            this.draw();
            if (window.MicroGlitchEngine) {
               MicroGlitchEngine.scanSweep(this.els.preview, 150);
               MicroGlitchEngine.microGlitch(this.els.preview, 100);
               MicroGlitchEngine.pixelLock(this.els.preview, 150);
            }
          },
          getVideoFrame(file) {
            return new Promise((resolve) => {
              const video = document.createElement("video");
              video.src = URL.createObjectURL(file);
              video.muted = true;
              video.currentTime = 1.0;
              video.onseeked = () => {
                const c = document.createElement("canvas");
                c.width = video.videoWidth;
                c.height = video.videoHeight;
                c.getContext("2d").drawImage(video, 0, 0);
                const img = new Image();
                img.src = c.toDataURL("image/jpeg");
                img.onload = () => resolve(img);
              };
            });
          },
          updateList() {
            this.els.list.innerHTML = "";
            this.active.images.forEach((item, index) => {
              const div = document.createElement("div");
              div.style.cssText =
                "display:flex; justify-content:space-between; align-items:center; padding:10px 12px; background:var(--bg-panel); border:1px solid var(--border); font-size:0.85rem; border-radius:6px; margin-bottom:6px; transition: none;";
              div.innerHTML = `<div style="display:flex; align-items:center; gap:10px;"><img src="${item.img.src}" title="${item.label || ""}" style="width:30px; height:30px; object-fit:cover; border-radius:6px;"><span>${index + 1}</span></div><div style="display:flex; gap:5px;"><button class="liquid-btn" style="padding:0 8px; height:28px;" onclick="Tools.Story.moveImage(${index},-1)">↑</button><button class="liquid-btn" style="padding:0 8px; height:28px;" onclick="Tools.Story.moveImage(${index},1)">↓</button><button class="liquid-btn danger-btn" style="padding:0 8px; height:28px;" onclick="Tools.Story.removeImage(${index})">×</button></div>`;
              this.els.list.appendChild(div);
            });
          },
          moveImage(idx, dir) {
            const t = idx + dir;
            if (t < 0 || t >= this.active.images.length) return;
            [this.active.images[idx], this.active.images[t]] = [
              this.active.images[t],
              this.active.images[idx],
            ];
            this.updateList();
            this.draw();
          },
          removeImage(idx) {
            const row = this.els.list.children[idx];
            const items = [];
            if (row) items.push(row);
            if (this.canvas) items.push(this.canvas);
            const performRemove = () => {
              URL.revokeObjectURL(this.active.images[idx].img.src);
              this.active.images.splice(idx, 1);
              this.saveSettings();
              this.updateList();
              this.draw();
            };
            if (items.length) {
              window.applyThanosSnap(items).then(performRemove);
            } else {
              performRemove();
            }
          },
          draw() {
            if (!this.active || !this.active.images.length) {
              if (this.canvas) {
                this.els.preview.innerHTML =
                  '<span class="text-muted">Preview</span>';
                this.canvas = null;
              }
              return;
            }
            const imgs = this.active.images;
            if (!imgs[0].img.complete) return;
            const s = this.active.settings;

            const c = Core.AdaptiveRenderer.renderBoard(imgs, {
              cols: s.cols ? parseInt(s.cols) : 0,
              rows: 0,
              autoWidth: s.autoWidth,
              targetWidth: parseFloat(s.width) || 1920,
              gap: s.gap ? parseInt(s.gap) : 0,
              bgColor: s.bgColor,
              fitMode: s.fitMode,
            });

            if (!c) return;
            c.onclick = () => UI.openLightbox(c.toDataURL("image/jpeg", 0.95));
            this.canvas = c;
            this.els.preview.innerHTML = "";
            this.els.preview.appendChild(c);
            const badge = document.createElement("div");
            badge.innerHTML = `<span style="opacity:0.7">SIZE:</span> ${Math.round(c.width)} <span style="opacity:0.7">x</span> ${Math.round(c.height)}`;
            badge.style.cssText =
              "position:absolute; top:20px; right:20px; background:var(--bg-panel); color:var(--text-main); padding:6px 10px; border-radius:6px; font-size:1.2rem; font-family:'Inter', sans-serif; font-weight:600; border:1px solid var(--border); pointer-events:none; letter-spacing:1px; z-index:10; box-shadow:var(--shadow-block);";
            this.els.preview.appendChild(badge);
          },
          async downloadAll() {
            if (!this.projects.some((p) => p.images.length > 0)) return;
            const btn = document.getElementById("downloadAllStoryBtn");
            btn.innerText = "Processing...";
            const zip = new JSZip();
            const origId = this.active.id;
            for (let i = 0; i < this.projects.length; i++) {
              const p = this.projects[i];
              if (p.images.length === 0) continue;
              this.active = p;
              this.draw();
              if (this.canvas) {
                const blob = await new Promise((r) =>
                  this.canvas.toBlob(r, "image/jpeg", 0.95),
                );
                zip.file(`${p.name}.jpg`, blob);
              }
            }
            this.switchProject(origId);
            const content = await zip.generateAsync({ type: "blob" });
            const a = document.createElement("a");
            a.href = URL.createObjectURL(content);
            a.download = "boards.zip";
            a.click();
            btn.innerText = "Download All (Zip)";
          },
        },
        Stills: {
          collection: {},
          currentId: null,
          queue: [],
          els: {
            drop: document.getElementById("stillsDropZone"),
            input: document.getElementById("stillsInput"),
            stacks: document.getElementById("stillsStacksContainer"),
            empty: document.getElementById("stillsEmpty"),
            procBtn: document.getElementById("createStillsBtn"),
            dlBtn: document.getElementById("downloadStillsBtn"),
            clearBtn: document.getElementById("clearStillsBtn"),
            overlay: document.getElementById("stillsDetailOverlay"),
            title: document.getElementById("stillsOverlayTitle"),
            count: document.getElementById("stillsOverlayCount"),
            grid: document.getElementById("stillsOverlayGrid"),
            selectAll: document.getElementById("stillsSelectAll"),
            xlBtn: document.getElementById("stillsGenAll"),
            storyBtn: document.getElementById("stillsGenStory"),
            storyGrid: document.getElementById("stillsStoryGrid"),
            dlSel: document.getElementById("stillsDownloadSelected"),
            toBoardBtn: document.getElementById("stillsToBoardBtn"),
            boardMenu: document.getElementById("stillsBoardMenu"),
          },
          init() {
            Core.Utils.createDropZone(this.els.drop, (f) =>
              this.handleFiles(f),
            );
            this.els.input.onchange = (e) => {
              this.handleFiles([...e.target.files]);
              this.els.input.value = "";
            };
            this.els.procBtn.onclick = () => this.process();
            this.els.clearBtn.onclick = () => {
              UI.confirm({
                title: "Clear workspace?",
                message: "This removes all loaded assets and resets the workspace. This action cannot be undone.",
                okLabel: "Clear",
                cancelLabel: "Cancel",
              }).then((ok) => {
                if (!ok) return;
                const items = Array.from(this.els.stacks.children).filter(
                  (el) => !el.id.includes("Empty"),
                );
                window.applyThanosSnap(items).then(() => this.destroy());
              });
            };
            this.els.selectAll.onchange = (e) => {
              if (!this.currentId) return;
              this.collection[this.currentId].frames.forEach(
                (f) => (f.checked = e.target.checked),
              );
              document
                .querySelectorAll("#stillsOverlayGrid .detail-check")
                .forEach((cb) => (cb.checked = e.target.checked));
            };
            this.els.dlSel.onclick = () => this.downloadSelected();
            this.els.dlBtn.onclick = () => this.downloadAll();
            this.els.toBoardBtn.onclick = (e) => {
              e.stopPropagation();
              this.toggleBoardMenu();
            };
            document.addEventListener("click", () => this.closeBoardMenu());
            document.addEventListener("keydown", (e) => {
              if (
                !this.els.boardMenu.style.display ||
                this.els.boardMenu.style.display === "none"
              )
                return;
              if (e.key === "Escape") this.closeBoardMenu();
            });
            document.addEventListener("keydown", (e) => {
              if (
                !this.currentId ||
                !this.els.overlay.classList.contains("active")
              )
                return;
              if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "b") {
                e.preventDefault();
                this.toggleBoardMenu();
                return;
              }
              if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
                const active = Array.from(this.els.grid.children).findIndex(
                  (el) => el.classList.contains("active-still"),
                );
                if (active > 0) {
                  this.els.grid.children[active - 1].click();
                  this.els.grid.children[active - 1].scrollIntoView({
                    behavior: "smooth",
                    block: "nearest",
                  });
                }
              }
              if (e.key === "ArrowRight" || e.key === "ArrowDown") {
                const active = Array.from(this.els.grid.children).findIndex(
                  (el) => el.classList.contains("active-still"),
                );
                if (active >= 0 && active < this.els.grid.children.length - 1) {
                  this.els.grid.children[active + 1].click();
                  this.els.grid.children[active + 1].scrollIntoView({
                    behavior: "smooth",
                    block: "nearest",
                  });
                }
              }
            });
          },
          destroy() {
            this.collection = {};
            this.els.stacks.innerHTML = "";
            this.els.stacks.appendChild(this.els.empty);
            UI.toggleEmptyState(this.els.stacks, true);
          },
          handleFiles(files) {
            const valid = files.filter((f) => f.type.startsWith("video/"));
            if (!valid.length) return;
            this.queue.push(...valid);
            this.els.empty.innerHTML = `${this.queue.length} video(s) queued.`;
          },
          async process() {
            if (!this.queue.length) return;
            this.els.procBtn.innerText = "Processing...";
            UI.toggleEmptyState(this.els.stacks, false);

            const genAllStills = this.els.xlBtn.checked;
            const genStory = this.els.storyBtn.checked;
            const storyFramesCount = parseInt(this.els.storyGrid.value, 10);

            for (let i = 0; i < this.queue.length; i++) {
              if (window.MicroGlitchEngine) { MicroGlitchEngine.signalTear(resultEl, 150); } try {
                const file = this.queue[i];
                const name = file.name
                  .replace(/\.[^/.]+$/, "")
                  .replace(/\s+/g, "_");
                const vid = document.createElement("video");
                vid.src = Core.BlobRegistry.create(file);
                vid.muted = true;
                await new Promise((r) => {
                  vid.onloadedmetadata = r;
                  vid.onerror = r;
                });

                const id = `vid-${Date.now()}`;
                this.collection[id] = { name: name, frames: [] };
                vid.currentTime = 0.5;
                await new Promise((r) => (vid.onseeked = r)); if(window.MicroGlitchEngine){ MicroGlitchEngine.signalTear(stack, 80); }

                if (vid.duration < 1.0) {
                  UI.showError(
                    `Storyboard cannot be generated, file too small.`,
                  );
                  continue;
                }

                const stack = document.createElement("div");
                stack.className = "pdf-stack-wrapper";
                stack.innerHTML = `<img src=""><div class="stack-meta"><div class="stack-title">${name}</div><div class="stack-count">Processing...</div></div>`;
                stack.onclick = () => this.openDetail(id);
                this.els.stacks.appendChild(stack); if (window.MicroGlitchEngine) { MicroGlitchEngine.signalTear(stack, 150); MicroGlitchEngine.rgbSplit(stack, 100); }

                const totalFramesToExtract = Math.floor(vid.duration) || 1;
                const interval = vid.duration / (totalFramesToExtract + 1);
                let previewDataUrl = null;

                for (let f = 1; f <= totalFramesToExtract; f++) {
                  await new Promise((resolve) => setTimeout(resolve, 0));
                  vid.currentTime = f * interval;
                  await new Promise((r) => (vid.onseeked = r)); if(window.MicroGlitchEngine){ MicroGlitchEngine.signalTear(stack, 80); }

                  const c = document.createElement("canvas");
                  c.width = vid.videoWidth;
                  c.height = vid.videoHeight;
                  c.getContext("2d").drawImage(vid, 0, 0); if(window.MicroGlitchEngine && (f % 5 === 1)) { MicroGlitchEngine.rgbSplit(stack, 80); MicroGlitchEngine.pixelLock(stack, 100); }

                  if (f === 1) {
                    previewDataUrl = c.toDataURL("image/jpeg", 0.5);
                    stack.querySelector("img").src = previewDataUrl;
                  }

                  if (genAllStills) {
                    const blob = await new Promise((r) =>
                      c.toBlob(r, "image/jpeg", 0.9),
                    );
                    const url = Core.BlobRegistry.create(blob);
                    this.collection[id].frames.push({
                      num: f,
                      type: "still",
                      blob,
                      url,
                      checked: true,
                    });
                  }
                }

                if (genStory) {
                  const storyInterval = vid.duration / (storyFramesCount + 1);

                  let storyThumbs = [];
                  for (let f = 1; f <= storyFramesCount; f++) {
                    vid.currentTime = f * storyInterval;
                    await new Promise((r) => (vid.onseeked = r)); if(window.MicroGlitchEngine){ MicroGlitchEngine.signalTear(stack, 80); }
                    const tc = document.createElement("canvas");
                    tc.width = vid.videoWidth;
                    tc.height = vid.videoHeight;
                    tc.getContext("2d").drawImage(vid, 0, 0); if(window.MicroGlitchEngine && (f % 5 === 1)) { MicroGlitchEngine.rgbSplit(stack, 80); MicroGlitchEngine.pixelLock(stack, 100); }
                    storyThumbs.push(tc);
                  }

                  let cols = 2;
                  if (storyFramesCount === 6) {
                    cols = 3;
                  } else if (storyFramesCount === 9) {
                    cols = 3;
                  }

                  const compCanvas = Core.AdaptiveRenderer.renderBoard(
                    storyThumbs,
                    {
                      cols: cols,
                      rows: 0,
                      autoWidth: true,
                      gap: 0,
                      bgColor: "#ffffff",
                      fitMode: "cover",
                    },
                  );

                  const compositeBlob = await new Promise((r) =>
                    compCanvas.toBlob(r, "image/jpeg", 0.95),
                  );
                  const compUrl = Core.BlobRegistry.create(compositeBlob);
                  this.collection[id].frames.push({
                    num: "storyboard",
                    type: "storyboard",
                    blob: compositeBlob,
                    url: compUrl,
                    checked: true,
                  });
                  if (!previewDataUrl || !genAllStills)
                    stack.querySelector("img").src = compUrl;
                }

                stack.querySelector(".stack-count").innerText =
                  `${this.collection[id].frames.length} Items`;
              } catch (e) {
                console.error(e);
              }
            }
            this.els.procBtn.innerText = "Process Videos";
            this.queue = [];
            this.els.dlBtn.disabled = false;
          },
          openDetail(id) {
            this.closeBoardMenu();
            this.currentId = id;
            const data = this.collection[id];
            this.els.title.innerText = data.name;
            this.els.count.innerText = `${data.frames.length} Items`;
            this.els.grid.innerHTML = "";
            const previewArea = document.getElementById("stillsOverlayPreview");
            previewArea.innerHTML =
              '<span style="color:var(--text-muted); font-size:0.9rem;">Select a still to preview</span>';

            data.frames.forEach((f) => {
              const card = document.createElement("div");
              card.style.cssText =
                "display:flex; align-items:center; gap:10px; padding:10px; border-bottom:1px solid var(--border); cursor:pointer; transition:background 0.2s; border-radius:6px; margin-bottom:4px;";
              card.innerHTML = `<img src="${f.url}" style="width:50px; height:50px; object-fit:cover; border-radius:4px; flex-shrink:0;"><div style="flex:1; font-size:0.85rem; font-family:monospace; color:var(--text-main);">${f.type === "storyboard" ? "Storyboard" : "#" + f.num}</div><input data-guide="Select or deselect this frame for batch downloading." type="checkbox" class="detail-check toggle-switch small" ${f.checked ? "checked" : ""}>`;

              card.onclick = (e) => {
                if (e.target.tagName !== "INPUT") {
                  Array.from(this.els.grid.children).forEach((el) => {
                    el.classList.remove("active-still");
                    el.style.background = "transparent";
                    el.querySelector("div").style.color = "var(--text-main)";
                  });
                  card.classList.add("active-still");
                  card.style.background = "var(--text-main)";
                  card.querySelector("div").style.color = "var(--bg-main)";
                  previewArea.innerHTML = `<img src="${f.url}" style="max-width:100%; max-height:100%; object-fit:contain; border-radius:8px;">`;
                }
              };
              card.querySelector(".detail-check").onchange = (e) =>
                (f.checked = e.target.checked);
              this.els.grid.appendChild(card);
            });

            if (data.frames.length > 0) {
              this.els.grid.firstChild.click();
            }

            this.els.overlay.classList.add("active");
          },
          closeDetail() {
            this.els.overlay.classList.remove("active");
            this.currentId = null;
          },
          closeBoardMenu() {
            if (this.els.boardMenu) this.els.boardMenu.style.display = "none";
          },
          toggleBoardMenu() {
            const menu = this.els.boardMenu;
            const willOpen = menu.style.display === "none";
            this.closeBoardMenu();
            if (willOpen) {
              this.renderBoardMenu();
              menu.style.display = "block";
            }
          },
          renderBoardMenu() {
            const menu = this.els.boardMenu;
            menu.innerHTML = "";
            const story = Tools.Story;
            const sel = this.currentId
              ? this.collection[this.currentId].frames.filter(
                  (f) => f.checked && f.type !== "storyboard",
                )
              : [];
            const header = document.createElement("div");
            header.textContent = `Send ${sel.length} still${sel.length === 1 ? "" : "s"} to board`;
            header.style.cssText =
              "font-size:0.72rem; text-transform:uppercase; letter-spacing:0.8px; color:var(--text-muted); padding:8px 10px 4px;";
            menu.appendChild(header);

            const rowStyle =
              "display:flex; align-items:center; gap:10px; padding:8px 10px; font-size:0.85rem; cursor:pointer; border-radius:6px; color:var(--text-main); background:transparent;";
            const rowHover = (el) => {
              el.addEventListener("mouseenter", () => {
                el.style.background = "var(--text-main)";
                el.style.color = "var(--bg-main)";
                const svg = el.querySelector("svg");
                if (svg) svg.style.color = "var(--bg-main)";
              });
              el.addEventListener("mouseleave", () => {
                el.style.background = "transparent";
                el.style.color = "var(--text-main)";
                const svg = el.querySelector("svg");
                if (svg) svg.style.color = "var(--text-main)";
              });
            };

            const newRow = document.createElement("div");
            newRow.style.cssText = rowStyle;
            newRow.innerHTML =
              '<i data-lucide="plus" style="width:14px; height:14px; flex-shrink:0; color:var(--text-main);"></i><span>New board from selection</span>';
            newRow.onclick = () => this.sendToBoard("__new__");
            rowHover(newRow);
            menu.appendChild(newRow);

            const divider = document.createElement("div");
            divider.style.cssText =
              "height:1px; background:var(--border); margin:6px 8px;";
            menu.appendChild(divider);

            (story.projects || []).forEach((p) => {
              const row = document.createElement("div");
              row.style.cssText = rowStyle;
              const isActive = story.active && p.id === story.active.id;
              row.innerHTML = `<i data-lucide="layout-grid" style="width:14px; height:14px; flex-shrink:0; color:var(--text-main);"></i><span style="flex:1; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${p.name}</span>${
                isActive
                  ? '<span style="font-size:0.7rem; opacity:0.6;">active</span>'
                  : ""
              }`;
              row.onclick = () => this.sendToBoard(p.id);
              rowHover(row);
              menu.appendChild(row);
            });

            if (window.lucide) if (window.MicroGlitchEngine) { MicroGlitchEngine.scanSweep(metadataPanel, 200); } window.lucide.createIcons({ root: menu });
          },
          async sendToBoard(projectId) {
            this.closeBoardMenu();
            if (!this.currentId) return;
            const data = this.collection[this.currentId];
            const sel = data.frames.filter(
              (f) => f.checked && f.type !== "storyboard",
            );
            if (!sel.length) {
              UI.showError("Select at least one still to send to a board.");
              return;
            }
            const story = Tools.Story;
            const alreadyHas = story.projects.some((b) =>
              b.images.some(
                (im) => im.label && im.label.indexOf(data.name + " #") === 0,
              ),
            );
            if (alreadyHas) {
              const confirmDialog = document.getElementById("confirmDialog");
              confirmDialog.style.maxWidth = "min-content";
              let proceed;
              if (window.MicroGlitchEngine) { MicroGlitchEngine.signalTear(resultEl, 150); } try {
                proceed = await UI.confirm({
                  title: "Same video detected",
                  message: `You are creating a storyboard for the same video ("${data.name}") again. A board already contains frames from it. Cancel keeps the boards unchanged; Proceed adds these frames anyway.`,
                  okLabel: "Proceed",
                  cancelLabel: "Cancel",
                });
              } finally {
                confirmDialog.style.maxWidth = "";
              }
              if (!proceed) return;
            }
            let target = story.active;
            if (projectId === "__new__") {
              story.addNewProject();
              target = story.active;
            } else if (projectId) {
              const p = story.projects.find((x) => x.id === projectId);
              if (!p) {
                UI.showError("Board not found.");
                return;
              }
              target = p;
            }
            const wasEmpty = target.images.length === 0;
            if (wasEmpty) {
              let base = data.name || "Board";
              let boardName = base;
              for (
                let n = 2;
                story.projects.some(
                  (b) => b.id !== target.id && b.name === boardName,
                );
                n++
              ) {
                boardName = `${base} ${n}`;
              }
              target.name = boardName;
              story.loadSettings();
            }
            for (const f of sel) {
              const img = new Image();
              img.src = URL.createObjectURL(f.blob);
              await new Promise((res) => {
                img.onload = res;
                img.onerror = res;
              });
              target.images.push({
                file: f.blob,
                img,
                label: `${data.name} #${f.num}`,
              });
            }
            if (story.active !== target) story.switchProject(target.id);
            story.updateList();
            story.draw();
            story.renderTabs();
            {
              const btn = this.els.toBoardBtn;
              btn.style.borderColor = "var(--success)";
              if (wasEmpty) {
                if (btn.getAttribute("data-created") !== "1") {
                  btn.setAttribute("data-created", "1");
                  const orig = btn.innerHTML;
                  btn.innerHTML = '<i data-lucide="check"></i> Board created';
                  if (window.lucide) if (window.MicroGlitchEngine) { MicroGlitchEngine.scanSweep(metadataPanel, 200); } window.lucide.createIcons({ root: btn });
                  setTimeout(() => {
                    btn.setAttribute("data-created", "0");
                    btn.innerHTML = orig;
                    if (window.lucide) if (window.MicroGlitchEngine) { MicroGlitchEngine.scanSweep(metadataPanel, 200); } window.lucide.createIcons({ root: btn });
                  }, 1600);
                }
              }
              setTimeout(
                () => (btn.style.borderColor = "var(--border)"),
                1500,
              );
            }
          },
          async downloadSelected() {
            if (!this.currentId) return;
            const data = this.collection[this.currentId];
            const sel = data.frames.filter((f) => f.checked);
            const zip = new JSZip();
            let imgIdx = 1;
            sel.forEach((f) => {
              if (f.type === "storyboard") {
                zip.file(`storyboard.jpg`, f.blob);
              } else {
                zip.file(`${imgIdx++}.jpg`, f.blob);
              }
            });
            const a = document.createElement("a");
            a.href = URL.createObjectURL(
              await zip.generateAsync({ type: "blob" }),
            );
            a.download = `${data.name.replace(/[^a-z0-9]/gi, "_")}_stills.zip`;
            a.click();
          },
          async downloadAll() {
            this.els.dlBtn.innerText = "Zipping...";
            const zip = new JSZip();
            Object.values(this.collection).forEach((v) => {
              const topFolder = zip.folder(v.name);
              const sel = v.frames.filter((f) => f.checked);
              let imgIdx = 1;
              sel.forEach((frame) => {
                if (frame.type === "storyboard")
                  topFolder.file(`storyboard.jpg`, frame.blob);
                else topFolder.file(`${imgIdx++}.jpg`, frame.blob);
              });
            });
            const a = document.createElement("a");
            a.href = URL.createObjectURL(
              await zip.generateAsync({ type: "blob" }),
            );
            a.download = "video_extras.zip";
            a.click();
            this.els.dlBtn.innerText = "Download All";
          },
        },
        AdLinkGen: {
          base: {
            aldi: "https://aldimediaeu.blob.core.windows.net/aldimediaeu/",
            s3: "https://s3media-ml-eu.surveycenter.com/",
          },
          normFolder(v) {
            return (
              v
                .trim()
                .replace(/\s+/g, "/")
                .replace(/\/+/g, "/")
                .replace(/^\/|\/$/g, "") + "/"
            );
          },
          generate() {
            const server = document.getElementById("alg-server").value;
            const modeNew = document.getElementById("alg-mode-toggle")
              ? document.getElementById("alg-mode-toggle").checked
              : false;
            const folder = this.normFolder(
              document.getElementById("alg-folder").value,
            );
            const lines = document
              .getElementById("alg-input")
              .value.split("\n")
              .map((l) => l.trim())
              .filter(Boolean);
            let ads = [],
              story = [];
            lines.forEach((name) => {
              const ext = name.split(".").pop().toLowerCase();
              const url = this.base[server] + folder + name;
              if (ext === "jpg" || ext === "png") {
                ads.push(
                  `<img src="${url}" class="zoomImage" style="max-width:80%">`,
                );
                story.push(
                  `<img src="${url}" class="zoomImage" style="max-height:280px">`,
                );
              } else if (ext === "mp4") {
                let outUrl = url;
                if (modeNew) {
                  outUrl = outUrl.replace(/^https:/, "").replace(/\.mp4$/i, "");
                }
                ads.push(outUrl);
                story.push(
                  `<img src="${this.base[server] + folder + name.replace(".mp4", ".jpg")}" class="zoomImage" style="max-height:280px">`,
                );
              } else if (ext === "mp3") {
                ads.push(url);
                story.push(name);
              }
            });
            document.getElementById("alg-out-ads").value = ads.join("\n");
            document.getElementById("alg-out-story").value = story.join("\n");
            if (window.MicroGlitchEngine) {
               MicroGlitchEngine.digitalFlicker(document.getElementById("alg-out-ads"), 150);
               MicroGlitchEngine.digitalFlicker(document.getElementById("alg-out-story"), 150);
            }
          },
          copy(id, btn) {
            const el = document.getElementById(id);
            el.select();
            el.setSelectionRange(0, 99999);
            navigator.clipboard.writeText(el.value).then(() => {
              UI.showSuccess(btn, "Copied");
            });
          },
        },
        AdDownloader: {
          workbookData: null,
          allNames: [],
          adTypeMap: {},
          init() {
            document
              .getElementById("adDlInput")
              .addEventListener("change", (e) => {
                const file = e.target.files[0];
                if (file) {
                  document.getElementById("adDlFileNameDisplay").innerText =
                    file.name;
                } else {
                  document.getElementById("adDlFileNameDisplay").innerText =
                    "Select Excel (.xlsx)";
                }
              });
          },
          normalize(text) {
            return text
              .toString()
              .replace(/\s+/g, "")
              .replace(/_/g, "")
              .toUpperCase();
          },
          loadExcel() {
            const file = document.getElementById("adDlInput").files[0];
            if (!file) {
              alert("Please upload an Excel file first.");
              return;
            }
            if (window.MicroGlitchEngine) {
               MicroGlitchEngine.scanSweep(document.getElementById("adDlTableBody"), 250);
            }
            const reader = new FileReader();
            reader.onload = (e) => {
              const data = new Uint8Array(e.target.result);
              this.workbookData = window.XLSX.read(data, { type: "array" });
              this.generateDashboard();
            };
            reader.readAsArrayBuffer(file);
          },
          generateDashboard() {
            const sheet =
              this.workbookData.Sheets[this.workbookData.SheetNames[0]];
            const range = window.XLSX.utils.decode_range(sheet["!ref"]);
            const tbody = document.getElementById("adDlTableBody");
            const downloadedBody =
              document.getElementById("adDlDownloadedBody");
            const downloadedHeaderRow = document.getElementById(
              "adDlDownloadedHeaderRow",
            );
            tbody.innerHTML = "";
            Array.from(downloadedBody.children).forEach((child) => {
              if (child.id !== "adDlDownloadedHeaderRow") {
                downloadedBody.removeChild(child);
              }
            });
            downloadedHeaderRow.style.display = "none";
            this.allNames = [];
            this.adTypeMap = {};
            let fragment = document.createDocumentFragment();
            for (let r = 1; r <= range.e.r; r++) {
              let adCell = sheet[window.XLSX.utils.encode_cell({ r: r, c: 0 })];
              let linkCell =
                sheet[window.XLSX.utils.encode_cell({ r: r, c: 1 })];
              let typeCell =
                sheet[window.XLSX.utils.encode_cell({ r: r, c: 2 })];
              if (!typeCell) continue;
              let adNo = adCell.v;
              let adType = typeCell.v;
              this.adTypeMap[this.normalize(adType)] = adNo;
              let link = "";
              if (linkCell && linkCell.l) link = linkCell.l.Target;
              else if (linkCell) link = linkCell.v;
              let linkString = link ? link.toString().trim() : "";
              let displayText = ((linkCell && linkCell.v) || "")
                .toString()
                .trim();
              let extRegex =
                /\.(mp4|mov|avi|mkv|webm|flv|wmv|mp3|wav|ogg|m4a|aac|flac|jpg|jpeg|png|gif|webp|svg|bmp)\b/i;
              let extMatch =
                displayText.match(extRegex) || linkString.match(extRegex);
              if (!extMatch) {
                extMatch = displayText.match(/\.([a-zA-Z0-9]{2,4})$/i);
                if (!extMatch) {
                  if (window.MicroGlitchEngine) { MicroGlitchEngine.signalTear(resultEl, 150); } try {
                    let urlObj = new URL(linkString);
                    extMatch = urlObj.pathname.match(/\.([a-zA-Z0-9]{2,4})$/i);
                  } catch (e) {
                    extMatch = linkString.match(/\.([a-zA-Z0-9]{2,4})$/i);
                  }
                }
              }
              let ext = extMatch ? extMatch[0].toLowerCase() : "";
              const ignoredExts = [
                ".com",
                ".org",
                ".net",
                ".co",
                ".io",
                ".de",
                ".uk",
                ".us",
                ".info",
                ".biz",
                ".html",
                ".htm",
                ".php",
                ".asp",
                ".aspx",
                ".jsp",
              ];
              if (ignoredExts.includes(ext)) {
                ext = "";
              }
              let clean = displayText
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .replace(/ß/g, "ss");
              if (ext) {
                if (clean.toLowerCase().endsWith(ext)) {
                  clean = clean.substring(0, clean.length - ext.length);
                }
} else {
                 let typeLower = adType.toLowerCase().trim();
                 const imageTypes = [
                   "print", "ooh", "out of home", "outdoor", "billboard", "poster",
                   "img", "image", "picture", "photo", "static", "display", "banner",
                   "pic", "jpeg", "jpg", "png", "gif", "webp", "creative", "visual"
                 ];
                 const audioTypes = [
                   "radio", "audio", "podcast", "sound", "voice", "music", "spot"
                 ];
                 const videoTypes = [
                   "tv", "television", "video", "cinema", "pre-roll", "preroll",
                   "mid-roll", "midroll", "post-roll", "postroll", "bumper",
                   "in-stream", "instream", "ott", "ctv", "connected tv",
                   "social video", "reels", "tiktok", "shorts", "story", "stories"
                 ];

                 let matched = false;
                 for (const t of imageTypes) {
                   if (typeLower === t || typeLower.includes(" " + t + " ") || typeLower.startsWith(t + " ") || typeLower.endsWith(" " + t)) {
                     ext = ".jpg";
                     matched = true;
                     break;
                   }
                 }
                 if (!matched) {
                   for (const t of audioTypes) {
                     if (typeLower === t || typeLower.includes(" " + t + " ") || typeLower.startsWith(t + " ") || typeLower.endsWith(" " + t)) {
                       ext = ".mp3";
                       matched = true;
                       break;
                     }
                   }
                 }
                 if (!matched) {
                   for (const t of videoTypes) {
                     if (typeLower === t || typeLower.includes(" " + t + " ") || typeLower.startsWith(t + " ") || typeLower.endsWith(" " + t)) {
                       ext = ".mp4";
                       matched = true;
                       break;
                     }
                   }
                 }
                 if (!matched) {
                   ext = ".mp4";
                 }
               }
              clean = clean
                .replace(/[^a-zA-Z0-9]/g, "_")
                .replace(/_+/g, "_")
                .replace(/^_|_$/g, "");
              let typeNumberMatch = adType.match(/\d+/);
              let typeNumber = typeNumberMatch ? typeNumberMatch[0] : "";
              let typeBase = adType.replace(/\d+/g, "").trim();
              let typeBaseClean = typeBase
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .replace(/[^a-zA-Z0-9]/g, "_")
                .replace(/_+/g, "_")
                .replace(/^_|_$/g, "");
              if (typeNumber) {
                let regex = new RegExp(typeBaseClean, "i");
                clean = clean.replace(regex, typeBaseClean + typeNumber);
              }
              let finalName = `AD${adNo}_${clean}${ext}`;
              this.allNames.push(finalName);
              let tr = document.createElement("tr");
              tr.id = `adDl-row-${adNo}`;
              tr.innerHTML = `<td style="padding: 16px; border-bottom: 1px solid var(--border); font-family: monospace;">${adNo}</td><td style="padding: 16px; border-bottom: 1px solid var(--border); font-family: monospace; color: #10b981;">AD${adNo}_${clean}<span style="color: var(--text-muted); opacity: 0.7;">${ext}</span></td><td style="padding: 16px; border-bottom: 1px solid var(--border); text-align: right;"><div style="display:flex; gap:8px; justify-content:flex-end;"><button class="liquid-btn" style="padding:4px 8px; font-size:0.75rem;" onclick="Tools.AdDownloader.copySingleName('${finalName}')"><i data-lucide="copy" style="width:14px; height:14px; margin-right:4px;"></i>Copy</button><button class="liquid-btn active-mode" style="padding:4px 8px; font-size:0.75rem;" onclick="Tools.AdDownloader.downloadPopup('${link}', '${adNo}', '${finalName}')"><i data-lucide="download" style="width:14px; height:14px; margin-right:4px;"></i>Download</button></div></td>`;
              tr.style.transition = "background 0.2s";
              tr.onmouseover = () => {
                if (!tr.classList.contains("downloaded"))
                  tr.style.background = "var(--bg-input)";
              };
              tr.onmouseout = () => {
                if (!tr.classList.contains("downloaded"))
                  tr.style.background = "transparent";
              };
              fragment.appendChild(tr);
            }
            tbody.appendChild(fragment);
            document.getElementById("adDlTableContainer").style.display =
              "block";
            document.getElementById("adDlSummaryBar").style.display = "block";
            document.getElementById("adDlCountText").innerText =
              this.allNames.length + " Ads Detected";
            document.getElementById("adDlEmptyState").style.display = "none";
            if (window.lucide) {
              window.lucide.createIcons();
            }
          },
          copyToClipboardFallback(text) {
            const textArea = document.createElement("textarea");
            textArea.value = text;
            textArea.style.position = "fixed";
            textArea.style.top = "-9999px";
            textArea.style.left = "-9999px";
            textArea.style.width = "2em";
            textArea.style.height = "2em";
            textArea.style.padding = "0";
            textArea.style.border = "none";
            textArea.style.outline = "none";
            textArea.style.boxShadow = "none";
            textArea.style.background = "transparent";
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            if (window.MicroGlitchEngine) { MicroGlitchEngine.signalTear(resultEl, 150); } try {
              document.execCommand("copy");
            } catch (err) {}
            document.body.removeChild(textArea);
          },
          copySingleName(name) {
            if (window.MicroGlitchEngine) { MicroGlitchEngine.pixelLock(btn, 150); } if (navigator.clipboard && window.isSecureContext) {
              navigator.clipboard.writeText(name).catch(() => {
                this.copyToClipboardFallback(name);
              });
            } else {
              this.copyToClipboardFallback(name);
            }
            alert("Copied: " + name);
          },
          copyAllNames() {
            if (this.allNames.length === 0) return;
            const text = this.allNames.join("\n");
            if (window.MicroGlitchEngine) { MicroGlitchEngine.pixelLock(btn, 150); } if (navigator.clipboard && window.isSecureContext) {
              navigator.clipboard.writeText(text).catch(() => {
                this.copyToClipboardFallback(text);
              });
            } else {
              this.copyToClipboardFallback(text);
            }
            alert("All " + this.allNames.length + " names copied!");
          },
          downloadPopup(url, adNo, finalName) {
            let downloadUrl = url;
            if (downloadUrl && !downloadUrl.includes("download=")) {
              if (downloadUrl.includes("?")) {
                downloadUrl = downloadUrl.split("?")[0] + "?download=1";
              } else {
                downloadUrl += "?download=1";
              }
            }
            if (finalName) {
              if (window.MicroGlitchEngine) { MicroGlitchEngine.pixelLock(btn, 150); } if (navigator.clipboard && window.isSecureContext) {
                navigator.clipboard.writeText(finalName).catch(() => {
                  this.copyToClipboardFallback(finalName);
                });
              } else {
                this.copyToClipboardFallback(finalName);
              }
            }
            if (downloadUrl) {
              window.open(
                downloadUrl,
                "downloadWindow",
                "width=900,height=700,left=200,top=100",
              );
            }
            if (adNo) {
              const row = document.getElementById(`adDl-row-${adNo}`);
              if (row) {
                if (window.MicroGlitchEngine) {
                   MicroGlitchEngine.digitalFlicker(row, 150);
                }
                const downloadedBody =
                  document.getElementById("adDlDownloadedBody");
                const downloadedHeaderRow = document.getElementById(
                  "adDlDownloadedHeaderRow",
                );
                row.classList.add("downloaded");
                row.style.opacity = "0.6";
                row.style.background = "rgba(255,255,255,0.01)";
                const nameCell = row.querySelector("td:nth-child(2)");
                if (nameCell) nameCell.style.textDecoration = "line-through";
                downloadedHeaderRow.style.display = "table-row";
                downloadedBody.appendChild(row);
              }
            }
          },
          getBucketData() {
            if (this.workbookData.SheetNames.length < 2) return [];
            const sheet =
              this.workbookData.Sheets[this.workbookData.SheetNames[1]];
            if (!sheet) return [];
            const range = window.XLSX.utils.decode_range(sheet["!ref"]);
            let rows = [];
            for (let r = 1; r <= range.e.r; r++) {
              let bucketCell =
                sheet[window.XLSX.utils.encode_cell({ r: r, c: 0 })];
              if (!bucketCell) continue;
              let bucket = bucketCell.v.toString().trim();
              let ads = [];
              for (let c = 1; c <= range.e.c; c++) {
                let adCell =
                  sheet[window.XLSX.utils.encode_cell({ r: r, c: c })];
                if (!adCell || !adCell.v) continue;
                let name = this.normalize(adCell.v);
                let adNo = this.adTypeMap[name];
                if (adNo) ads.push(adNo);
              }
              if (ads.length > 0) rows.push({ bucket: bucket, ads: ads });
            }
            return rows;
          },
          copyBucketTable() {
            let rows = this.getBucketData();
            if (rows.length === 0) {
              alert("No bucket data found on Sheet 2.");
              return;
            }
            let output = "Bucket\tAds\n";
            rows.forEach((r) => {
              output +=
                r.bucket +
                "\t" +
                r.ads.map((a) => "'" + a + "'").join(",") +
                "\n";
            });
            if (window.MicroGlitchEngine) { MicroGlitchEngine.pixelLock(btn, 150); } if (navigator.clipboard && window.isSecureContext) {
              navigator.clipboard.writeText(output).catch(() => {
                this.copyToClipboardFallback(output);
              });
            } else {
              this.copyToClipboardFallback(output);
            }
            alert("Bucket table copied!");
          },
          copyForstaScript() {
            let rows = this.getBucketData();
            if (rows.length === 0) {
              alert("No bucket data found on Sheet 2.");
              return;
            }
            let script = "var s = set()\n\n";
            rows.forEach((r) => {
              script += "// Bucket " + r.bucket + "\n";
              script += "if (f('cq42000').any('" + r.bucket + "')) {\n";
              script +=
                "    s = s.union(set(" +
                r.ads.map((a) => "'" + a + "'").join(",") +
                "))\n";
              script += "}\n\n";
            });
            if (window.MicroGlitchEngine) { MicroGlitchEngine.pixelLock(btn, 150); } if (navigator.clipboard && window.isSecureContext) {
              navigator.clipboard.writeText(script).catch(() => {
                this.copyToClipboardFallback(script);
              });
            } else {
              this.copyToClipboardFallback(script);
            }
            alert("Script copied!");
          },
        },
      };

      const YouTubeHelper = {
        parseUrl(url) {
          const patterns = {
            video: [
              /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/shorts\/|youtube\.com\/embed\/)([^&\n?#]+)/,
              /youtube\.com\/live\/([^&\n?#]+)/,
            ],
            playlist: [
              /youtube\.com\/playlist\?list=([^&\n#]+)/,
              /youtube\.com\/watch\?.*[&?]list=([^&\n#]+)/,
            ],
            channel: [/youtube\.com\/(?:c\/|channel\/|user\/|@)([^&\n?#\/]+)/],
          };
          for (const [type, regexes] of Object.entries(patterns)) {
            for (const re of regexes) {
              const match = url.match(re);
              if (match) return { type, id: match[1], originalUrl: url };
            }
          }
          return null;
        },
        async fetchMetadata(id, type = "video") {
          const endpoints = {
            video: [
              `https://noembed.com/embed?url=https://youtube.com/watch?v=${id}`,
              `https://www.youtube.com/oembed?url=https://youtube.com/watch?v=${id}&format=json`,
            ],
            playlist: [
              `https://yewtu.be/api/v1/playlists/${id}`,
            ],
            channel: [
              `https://noembed.com/embed?url=https://youtube.com/channel/${id}`,
            ],
          };
          
          const urls = endpoints[type] || endpoints.video;
          
          for (const endpoint of urls) {
            if (window.MicroGlitchEngine) { MicroGlitchEngine.signalTear(resultEl, 150); } try {
              const res = await fetch(endpoint);
              if (!res.ok) continue;
              const data = await res.json();
              return {
                title: data.title || data.name || "Unknown",
                author: data.author_name || data.uploader || "Unknown",
                authorUrl: data.author_url || data.uploader_url || "",
                thumbnail:
                  data.thumbnail_url ||
                  data.thumbnail ||
                  `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
                duration: data.duration
                  ? this.formatDuration(data.duration)
                  : null,
                type,
                id,
              };
            } catch (e) {
              continue;
            }
          }
          
          return {
            title: "Unknown",
            author: "Unknown",
            type,
            id,
            thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
            error: "Failed to fetch metadata from all endpoints",
          };
        },
        generateCommands(parsed, options = {}) {
          const {
            format = "mp4",
            quality = "best",
            embedSubs = false,
            metadata = true,
            thumbnail = false,
            outputPath = "",
          } = options;
          
          const base = "yt-dlp";
          
          const qualityPresets = {
            best: "bv*[height<=1080]+ba/b[height<=1080]",
            "1080p": "bv*[height<=1080]+ba/b[height<=1080]",
            "720p": "bv*[height<=720]+ba/b[height<=720]",
            "480p": "bv*[height<=480]+ba/b[height<=480]",
            audio: "bestaudio/b",
          };
          
          const qualityStr = qualityPresets[quality] || qualityPresets.best;

          const safePath = outputPath
            .trim()
            .replace(/\\+$/, "")
            .replace(/"/g, '\\"');
          const outPathArg = safePath ? `-P "${safePath}" ` : "";

          const commonFlags = [
            `--extractor-args "youtube:player_client=web_embedded"`,
            `--merge-output-format ${format}`,
            embedSubs ? "--embed-subs" : "",
            metadata ? "--embed-metadata" : "",
            thumbnail ? "--embed-thumbnail" : "",
            "--no-playlist",
            "--restrict-filenames",
            "-o",
            `"%(title)s.%(ext)s"`,
            "-f",
            `"${qualityStr}"`,
          ]
            .filter(Boolean)
            .join(" ");

          const baseCmd = `${base} ${outPathArg}`;

          return {
            video: `${baseCmd}${commonFlags} "${parsed.originalUrl}"`,
            audio: `${base} ${outPathArg}--extractor-args "youtube:player_client=web_embedded" -x --audio-format mp3 --restrict-filenames -o "%(title)s.%(ext)s" "${parsed.originalUrl}"`,
            fixCache: `${base} --rm-cache-dir`,
          };
        },
        formatDuration(seconds) {
          if (!seconds) return null;
          const h = Math.floor(seconds / 3600);
          const m = Math.floor((seconds % 3600) / 60);
          const s = seconds % 60;
          return [h, m, s].map((v) => v.toString().padStart(2, "0")).join(":");
        },
      };

      const YouTubeHelperUI = {
        handlePaste(e) {
          const html = e.clipboardData.getData("text/html");
          if (html) {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, "text/html");
            const links = Array.from(doc.querySelectorAll("a"))
              .map((a) => a.href)
              .filter(
                (href) =>
                  href.includes("youtube.com") || href.includes("youtu.be"),
              );
            if (links.length > 0) {
              e.preventDefault();
              const target = e.target;
              const insertText = links.join("\n") + "\n";
              const start = target.selectionStart;
              const end = target.selectionEnd;
              target.value =
                target.value.substring(0, start) +
                insertText +
                target.value.substring(end);
              target.selectionStart = target.selectionEnd =
                start + insertText.length;
            }
          }
        },
        async analyze() {
          const urlText = document.getElementById("ytUrlInput").value.trim();
          const resultEl = document.getElementById("ytResult");
          const metadataPanel = document.getElementById("ytMetadataPanel");
          if (!urlText) return UI.showError("Enter YouTube URLs");
          const urls = urlText.split(/\s+/).filter(Boolean);

          resultEl.style.display = "block";
          resultEl.innerHTML =
            '<div style="padding:15px; text-align:center; color:var(--text-muted);"><span class="processing-pulse">Analyzing...</span></div>';

          if (window.MicroGlitchEngine) { MicroGlitchEngine.signalTear(resultEl, 150); } try {
            let htmlContent = "";
            metadataPanel.style.display = "block";

            for (const url of urls) {
              const parsed = YouTubeHelper.parseUrl(url);
              if (!parsed) {
                htmlContent += `<div class="glass-panel" style="padding:15px; border:1px solid rgba(255,255,255,0.08); margin-bottom:10px; color:var(--danger);">Invalid YouTube URL: ${url}</div>`;
                continue;
              }
              const meta = await YouTubeHelper.fetchMetadata(
                parsed.id,
                parsed.type,
              );
              const cmds = YouTubeHelper.generateCommands(parsed, {
                outputPath: "~/Downloads",
                quality: "best",
                format: "mp4",
              });

              htmlContent += `<div class="glass-panel" style="padding:15px; border:1px solid rgba(255,255,255,0.08); margin-bottom:10px;">
                            <div style="display:flex; gap:12px; align-items:flex-start; flex-wrap:wrap;">
                                <img src="${meta.thumbnail}" style="width:120px; height:68px; object-fit:cover; border-radius:6px; flex-shrink:0;" onerror="this.style.display='none'">
                                <div style="flex:1; min-width:0;">
                                    <h4 style="margin:0 0 6px; font-size:0.95rem; word-break:break-word;">${meta.title}</h4>
                                    <div style="font-size:0.8rem; color:var(--text-muted); display:flex; flex-wrap:wrap; gap:10px; margin-bottom:12px;">
                                        <span><i data-lucide="user" style="width:12px;height:12px;"></i> ${meta.author}</span>
                                        ${meta.duration ? `<span><i data-lucide="clock" style="width:12px;height:12px;"></i> ${meta.duration}</span>` : ""}
                                        <span style="text-transform:capitalize;">${parsed.type}</span>
                                    </div>
                                    <div style="display:flex; gap:8px; flex-wrap:wrap;">
                                        <button class="liquid-btn copy-cmd-btn" data-cmd="${cmds.video.replace(/"/g, "&quot;")}" onclick="YouTubeHelperUI.copySpecificCommand(this)" style="padding:6px 12px; font-size:0.8rem;"><i data-lucide="copy" style="width:14px;height:14px;margin-right:6px;"></i> Copy Video Command</button>
                                        <button class="liquid-btn copy-cmd-btn" data-cmd="${cmds.audio.replace(/"/g, "&quot;")}" onclick="YouTubeHelperUI.copySpecificCommand(this)" style="padding:6px 12px; font-size:0.8rem;"><i data-lucide="music" style="width:14px;height:14px;margin-right:6px;"></i> Copy Audio Command</button>
                                    </div>
                                </div>
                            </div>
                        </div>`;
            }

            document.getElementById("ytMetadataContent").innerHTML =
              htmlContent;
            resultEl.style.display = "none";
            if (window.MicroGlitchEngine) { MicroGlitchEngine.scanSweep(metadataPanel, 200); } window.lucide.createIcons({
              root: document.getElementById("ytMetadataContent"),
            });
          } catch (e) {
            resultEl.innerHTML = `<div style="padding:15px; color:var(--danger);">Error: ${e.message}</div>`;
          }
        },
        copySpecificCommand(btn) {
          const text = btn.getAttribute("data-cmd");
          if (text) {
            if (window.MicroGlitchEngine) { MicroGlitchEngine.pixelLock(btn, 150); } if (navigator.clipboard && window.isSecureContext) {
              navigator.clipboard
                .writeText(text)
                .then(() => {
                  UI.showSuccess(btn, "Copied!");
                })
                .catch(() => {
                  this.copyToClipboardFallback(text);
                  UI.showSuccess(btn, "Copied!");
                });
            } else {
              this.copyToClipboardFallback(text);
              UI.showSuccess(btn, "Copied!");
            }
          }
        },
        copyToClipboardFallback(text) {
          const textArea = document.createElement("textarea");
          textArea.value = text;
          textArea.style.position = "fixed";
          textArea.style.top = "-9999px";
          textArea.style.left = "-9999px";
          textArea.style.width = "2em";
          textArea.style.height = "2em";
          textArea.style.padding = "0";
          textArea.style.border = "none";
          textArea.style.outline = "none";
          textArea.style.boxShadow = "none";
          textArea.style.background = "transparent";
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();
          if (window.MicroGlitchEngine) { MicroGlitchEngine.signalTear(resultEl, 150); } try {
            document.execCommand("copy");
          } catch (err) {}
          document.body.removeChild(textArea);
        },
      };

            window.CURRENT_APP_VERSION = "v1.1";

      ToolBootManager.showSystemBoot(() => {
        // Initialize All Tools
        Object.values(Tools).forEach((tool) => {
          if (tool.init) tool.init();
        });
        
        UI.initTheme();
        Core.AppState.restoreInputs();
        UI.showHome();
      });
      

      

      // Command Palette Listeners
      document.addEventListener("keydown", (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
          e.preventDefault();
          const overlay = document.getElementById("commandPaletteOverlay");
          if (overlay.classList.contains("active")) {
            UI.closeCommandPalette();
          } else {
            UI.openCommandPalette();
          }
        } else {
          UI.handlePaletteKeyDown(e);
        }
      });

      document
        .getElementById("commandPaletteInput")
        .addEventListener("input", (e) => {
          UI.filterCommandPalette(e.target.value);
        });

      // Close on overlay click
      document
        .getElementById("commandPaletteOverlay")
        .addEventListener("click", (e) => {
          if (e.target.id === "commandPaletteOverlay") {
            UI.closeCommandPalette();
          }
        });

      // ================= PRESETS PANEL WIRING =================
      document.getElementById("presetsSaveBtn").addEventListener("click", () => UI.savePreset());
      document.getElementById("presetsCloseBtn").addEventListener("click", () => UI.closePresets());
      document.getElementById("presetsOverlay").addEventListener("click", (e) => {
        if (e.target.id === "presetsOverlay") UI.closePresets();
      });
      document.getElementById("presetsNameInput").addEventListener("keydown", (e) => {
        if (e.key === "Enter") { e.preventDefault(); UI.savePreset(); }
        if (e.key === "Escape") { e.preventDefault(); UI.closePresets(); }
      });
      document.addEventListener("keydown", (e) => {
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === "p") {
          e.preventDefault();
          const overlay = document.getElementById("presetsOverlay");
          if (overlay && overlay.hidden) UI.openPresets();
          else UI.closePresets();
        }
        if (e.key === "Escape") {
          const overlay = document.getElementById("presetsOverlay");
          if (overlay && !overlay.hidden) {
            e.preventDefault();
            UI.closePresets();
          }
        }
      });

      // ================= TAB ARROW-KEY NAVIGATION =================
      document.addEventListener("keydown", (e) => {
        if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
        const tab = e.target.closest && e.target.closest('[role="tab"]');
        if (!tab) return;
        e.preventDefault();
        const tablist = tab.closest('[role="tablist"]');
        if (!tablist) return;
        const tabs = Array.prototype.slice.call(
          tablist.querySelectorAll('[role="tab"]'),
        );
        const idx = tabs.indexOf(tab);
        if (idx === -1) return;
        const next =
          e.key === "ArrowRight"
            ? tabs[(idx + 1) % tabs.length]
            : tabs[(idx - 1 + tabs.length) % tabs.length];
        if (!next) return;
        next.focus();
        const targetId = next.getAttribute("aria-controls");
        if (targetId && next.onclick) next.onclick();
        else if (targetId) next.click();
      });

      // ================= ORIGIN BUTTON EFFECT (VANILLA JS PORT) =================
      (function () {
        function getCoverDiameter(width, height, x, y) {
          return Math.ceil(
            2 *
              Math.max(
                Math.hypot(x, y),
                Math.hypot(width - x, y),
                Math.hypot(x, height - y),
                Math.hypot(width - x, height - y),
              ),
          );
        }

        function setupOriginButton(btn) {
          if (btn.hasAttribute("data-origin-setup")) return;
          btn.setAttribute("data-origin-setup", "true");
          btn.style.position = "relative";
          btn.style.overflow = "hidden";
          btn.style.zIndex = "1";

          const isLightText = !btn.classList.contains("active-mode");

          btn.style.transition =
            "color 0.4s cubic-bezier(0.16,1,0.3,1), transform 0.2s cubic-bezier(0.22, 1, 0.36, 1), background 0.2s, border-color 0.2s";

          let contentWrap = document.createElement("span");
          contentWrap.style.position = "relative";
          contentWrap.style.zIndex = "10";
          contentWrap.style.display = "inline-flex";
          contentWrap.style.alignItems = "center";
          contentWrap.style.justifyContent = "center";
          contentWrap.style.gap = "8px";
          contentWrap.style.pointerEvents = "none";

          while (btn.firstChild) {
            contentWrap.appendChild(btn.firstChild);
          }

          let fillElement = document.createElement("span");
          fillElement.className = "origin-fill";
          fillElement.style.position = "absolute";
          fillElement.style.borderRadius = "50%";

          if (btn.classList.contains("active-mode")) {
            fillElement.style.backgroundColor = "#000000";
          } else if (btn.classList.contains("danger-btn")) {
            fillElement.style.backgroundColor = "#2a0a0a";
          } else {
            fillElement.style.backgroundColor = "#ffffff";
          }

          fillElement.style.pointerEvents = "none";
          fillElement.style.transformOrigin = "center";
          fillElement.style.transform = "translate(-50%, -50%) scale(0)";
          fillElement.style.transition =
            "transform 0.85s cubic-bezier(0.16,1,0.3,1)";
          fillElement.style.zIndex = "0";
          fillElement.style.left = "50%";
          fillElement.style.top = "50%";
          fillElement.style.width = "0px";
          fillElement.style.height = "0px";

          btn.appendChild(fillElement);
          btn.appendChild(contentWrap);

          btn._originState = {
            hovered: false,
            pressed: false,
            fillElement: fillElement,
            contentWrap: contentWrap,
            originalColor: window.getComputedStyle(btn).color,
          };
        }

        function updateFillState(btn) {
          let state = btn._originState;
          let showFill = !btn.disabled && (state.hovered || state.pressed);

          if (showFill) {
            state.fillElement.style.transform = `translate(-50%, -50%) scale(1)`;
            if (btn.classList.contains("active-mode")) {
              btn.style.color = "#ffffff";
            } else if (btn.classList.contains("danger-btn")) {
              btn.style.color = "var(--danger)";
            } else {
              btn.style.color = "#000000";
            }
          } else {
            state.fillElement.style.transform = `translate(-50%, -50%) scale(0)`;
            btn.style.color = ""; // reset
          }
        }

        function updateOriginPosition(btn, clientX, clientY) {
          let rect = btn.getBoundingClientRect();
          let x = clientX - rect.left;
          let y = clientY - rect.top;
          if (clientX === undefined) {
            x = rect.width / 2;
            y = rect.height / 2;
          }

          let coverSize = getCoverDiameter(rect.width, rect.height, x, y);
          let state = btn._originState;

          if (state.fillElement.style.transform.includes("scale(0)")) {
            state.fillElement.style.transition = "none";
            state.fillElement.style.left = x + "px";
            state.fillElement.style.top = y + "px";
            state.fillElement.style.width = coverSize + "px";
            state.fillElement.style.height = coverSize + "px";
            void state.fillElement.offsetWidth; // force reflow
            state.fillElement.style.transition =
              "transform 0.85s cubic-bezier(0.16,1,0.3,1)";
          }
        }

        document.addEventListener("pointerover", (e) => {
          let btn = e.target.closest(".liquid-btn");
          if (!btn || btn.disabled) return;
          setupOriginButton(btn);
          if (!btn._originState) return;

          btn._originState.hovered = true;
          updateOriginPosition(btn, e.clientX, e.clientY);
          updateFillState(btn);
        });

        document.addEventListener("pointerout", (e) => {
          let btn = e.target.closest(".liquid-btn");
          if (!btn || !btn._originState) return;
          if (e.relatedTarget && btn.contains(e.relatedTarget)) return;

          btn._originState.hovered = false;
          btn._originState.pressed = false;
          updateFillState(btn);
        });

        document.addEventListener("pointerdown", (e) => {
          let btn = e.target.closest(".liquid-btn");
          if (!btn || btn.disabled) return;
          setupOriginButton(btn);
          if (!btn._originState) return;

          btn._originState.pressed = true;
          updateOriginPosition(btn, e.clientX, e.clientY);
          updateFillState(btn);
        });

        document.addEventListener("pointerup", (e) => {
          let btn = e.target.closest(".liquid-btn");
          if (!btn || !btn._originState) return;

          btn._originState.pressed = false;
          updateFillState(btn);
        });
      })();

      window.applyThanosSnap = function (elements, duration = 0.6) {
        return new Promise((resolve) => {
          const els = Array.isArray(elements) ? elements : [elements];
          const validEls = els.filter(
            (el) => el && el.dataset.isAnimating !== "true",
          );
          if (validEls.length === 0) {
            resolve();
            return;
          }

          validEls.forEach((el) => {
            if (el.parentNode) {
              el.parentNode.removeChild(el);
            }
          });
          resolve();
        });
      };

      if (window.lucide) {
        lucide.createIcons();
      }
      window.addEventListener("beforeunload", (e) => {
        if (Core.BlobRegistry.urls.length > 0) e.preventDefault();
      });

      /* Dependency resilience guard (additive, non-destructive).
         If a CDN library failed to load, surface a clear notice with a
         retry that remounts the script rather than silently breaking. */
      (function () {
        function initDependencyGuard() {
          var required = [
            { name: "Lucide Icons", global: "lucide", lib: "lucide" },
            { name: "Image Resizer (Pica)", global: "pica", lib: "pica" },
            { name: "JSZip", global: "JSZip", lib: "jszip" },
            { name: "Excel (SheetJS)", global: "XLSX", lib: "xlsx" },
            { name: "PDF.js", global: "pdfjsLib", lib: "pdfjs" },
          ];
          var missing = required.filter(function (r) {
            return !(r.lib === "lucide"
              ? window.lucide
              : r.lib === "pica"
                ? window.pica
                : r.lib === "jszip"
                  ? window.JSZip
                  : r.lib === "xlsx"
                    ? window.XLSX
                    : r.lib === "pdfjs"
                      ? window.pdfjsLib
                      : null);
          });
          if (missing.length === 0) return;
          if (document.getElementById("cts-dep-guard")) return;

          var box = document.createElement("div");
          box.id = "cts-dep-guard";
          box.setAttribute("role", "alert");
          box.style.cssText =
            "position:fixed;bottom:24px;right:24px;left:24px;max-width:560px;margin:0 auto;" +
            "background:var(--bg-panel,#0b0b0f);border:1px solid var(--danger,#ff5c7c);" +
            "border-left:5px solid var(--danger,#ff5c7c);border-radius:12px;padding:18px 20px;" +
            "color:var(--text-main,#ececf3);font:500 .92rem/1.5 Inter,sans-serif;z-index:3000;" +
            "box-shadow:0 24px 60px -12px rgba(0,0,0,.75);display:flex;gap:14px;align-items:flex-start;";

          var text = document.createElement("div");
          text.style.cssText = "flex:1;min-width:0;";
          var head = document.createElement("div");
          head.style.cssText = "font-weight:600;margin-bottom:4px;";
          head.textContent = "A required component did not load";
          var body = document.createElement("div");
          body.style.cssText = "color:var(--text-muted,#9a9ab2);";
          body.textContent =
            "Missing: " + missing.map(function (m) { return m.name; }).join(", ") +
            ". Your connection or a CDN may be unavailable. Retrying may restore full functionality.";

          var actions = document.createElement("div");
          actions.style.cssText = "display:flex;gap:8px;flex-shrink:0;align-items:center;";
          var retry = document.createElement("button");
          retry.type = "button";
          retry.textContent = "Retry";
          retry.style.cssText =
            "background:var(--danger,#ff5c7c);border:none;color:#fff;font-weight:600;" +
            "border-radius:8px;padding:8px 14px;cursor:pointer;font:600 .9rem Inter,sans-serif;";
          retry.addEventListener("click", function () {
            var table = {
              lucide: "https://unpkg.com/lucide@latest",
              pica: "https://cdnjs.cloudflare.com/ajax/libs/pica/9.0.1/pica.min.js",
              jszip: "https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js",
              xlsx: "https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js",
              pdfjs: "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js",
            };
            var remaining = required.filter(function (r) { return !(r.lib === "lucide" ? window.lucide : r.lib === "pica" ? window.pica : r.lib === "jszip" ? window.JSZip : r.lib === "xlsx" ? window.XLSX : window.pdfjsLib); });
            remaining.forEach(function (r) {
              var s = document.createElement("script");
              s.src = table[r.lib];
              s.async = true;
              document.head.appendChild(s);
            });
            box.remove();
            setTimeout(initDependencyGuard, 2500);
          });
          var close = document.createElement("button");
          close.type = "button";
          close.setAttribute("aria-label", "Dismiss");
          close.textContent = "Dismiss";
          close.style.cssText =
            "background:transparent;border:1px solid var(--border-strong,#2c2c36);color:var(--text-muted,#9a9ab2);" +
            "border-radius:8px;padding:8px 12px;cursor:pointer;font:600 .9rem Inter,sans-serif;";
          close.addEventListener("click", function () { box.remove(); });

          actions.appendChild(retry);
          actions.appendChild(close);
          text.appendChild(head);
          text.appendChild(body);
          box.appendChild(text);
          box.appendChild(actions);
          document.body.appendChild(box);
        }

        if (document.readyState === "loading") {
          document.addEventListener("DOMContentLoaded", initDependencyGuard);
        } else {
          initDependencyGuard();
        }
      })();

/* ---------- Block 2: TK3D Layer (3D skin tilt, aurora, tool accent) ---------- */
(function () {
        "use strict";
        if (!window.document || document.getElementById("tk3dLayer")) return;
        var reduce = !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
        var ACC = {
          home: "#7c5cff",
          "section-logo": "#8b5cf6",
          "section-pdf-convert": "#3b82f6",
          "section-image-splitter": "#06b6d4",
          "section-video-stills": "#10b981",
          "section-storyboard": "#f59e0b",
          "section-link-gen": "#f97316",
          "section-ad-downloader": "#ec4899",
          "section-yt-helper": "#ef4444"
        };
        var body = document.body;
        var aurora = null;
        var mo = null;
        var observersBound = false;

        function currentTool() {
          var app = document.getElementById("view-app");
          if (app && !app.classList.contains("active")) return "home";
          var sec = document.querySelector(".tool-section.active");
          return Core && Core.AppState ? Core.AppState.load("activeTool") || "home" : "home";
        }

        function applyTool() {
          var tool = currentTool();
          body.setAttribute("data-tool", tool);
          body.style.setProperty("--tk3d-acc", ACC[tool] || ACC.home);
        }

        function resetTilt(el) {
          if (!el) return;
          el.style.setProperty("--tk-rx", "0deg");
          el.style.setProperty("--tk-ry", "0deg");
        }

        function bindTilt() {
          var lastEl = null;
          document.addEventListener("pointermove", function (e) {
            var t = (e.target && e.target.closest) ? e.target.closest(".home-card, .logo-card-item, .pdf-stack-wrapper") : null;
            if (t !== lastEl) {
              if (lastEl) resetTilt(lastEl);
              lastEl = t;
            }
            if (!t) return;
            var r = t.getBoundingClientRect();
            if (!r.width || !r.height) return;
            var px = (e.clientX - r.left) / r.width - 0.5;
            var py = (e.clientY - r.top) / r.height - 0.5;
            t.style.setProperty("--tk-rx", (py * -6).toFixed(2) + "deg");
            t.style.setProperty("--tk-ry", (px * 8).toFixed(2) + "deg");
          }, { passive: true });
          document.addEventListener("pointerout", function (e) {
            if (lastEl && (!e.relatedTarget || !lastEl.contains(e.relatedTarget))) {
              resetTilt(lastEl);
              lastEl = null;
            }
          }, { passive: true });
          observersBound = true;
        }

        function init() {
          body.classList.add("tk3d");
          aurora = document.createElement("div");
          aurora.className = "tk3d-aurora";
          aurora.id = "tk3dLayer";
          body.appendChild(aurora);
          applyTool();
          if (window.MutationObserver) {
            mo = new MutationObserver(applyTool);
            mo.observe(body, {
              attributes: true,
              attributeFilter: ["class"],
              subtree: true,
              childList: true
            });
          }
          document.addEventListener("visibilitychange", function () {
            if (!document.hidden) applyTool();
          });
          if (!reduce) bindTilt();
        }

        if (window.MicroGlitchEngine) { MicroGlitchEngine.signalTear(resultEl, 150); } try {
          init();
        } catch (err) {
          if (window.MicroGlitchEngine) { MicroGlitchEngine.signalTear(resultEl, 150); } try {
            if (window.console && console.warn) console.warn("TK3D skin disabled:", err);
            body.classList.remove("tk3d");
            if (aurora && aurora.parentNode) aurora.parentNode.removeChild(aurora);
            if (mo) mo.disconnect();
          } catch (_) { /* keep original app fully working */ }
        }
      })();