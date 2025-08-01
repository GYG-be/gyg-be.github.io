// Populate the sidebar
//
// This is a script, and not included directly in the page, to control the total size of the book.
// The TOC contains an entry for each page, so if each page includes a copy of the TOC,
// the total size of the page becomes O(n**2).
class MDBookSidebarScrollbox extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = '<ol class="chapter"><li class="chapter-item expanded "><a href="Manifesto.html"><strong aria-hidden="true">1.</strong> Professional Growth, Financial Fitness, Emotional Fitness</a></li><li class="chapter-item expanded "><a href="chapter_2.html"><strong aria-hidden="true">2.</strong> 100-Day Sprint To Build A Platform-Architecture-as-a-Service</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="nested/sub-chapter_2.1.html"><strong aria-hidden="true">2.1.</strong> Phase 1: Foundation and Architecture</a></li><li class="chapter-item expanded "><a href="nested/sub-chapter_2.2.html"><strong aria-hidden="true">2.2.</strong> Phase 2:AI-Powered Core Features</a></li><li class="chapter-item expanded "><a href="nested/sub-chapter_2.3.html"><strong aria-hidden="true">2.3.</strong> Phase 3: Wellness Integration and Advanced Features</a></li><li class="chapter-item expanded "><a href="nested/sub-chapter_2.4.html"><strong aria-hidden="true">2.4.</strong> Phase 4: Platform Optimization and Market Launch</a></li></ol></li><li class="chapter-item expanded "><a href="chapter_3.html"><strong aria-hidden="true">3.</strong> The Intelligent Resume Analysis Engine: Architecture and 100-Day Implementation Roadmap</a></li><li class="chapter-item expanded "><a href="chapter_4.html"><strong aria-hidden="true">4.</strong> Transforming Talent Acquisition: From Automated Workflows to Market Disruption</a></li><li class="chapter-item expanded "><a href="chapter_1.html"><strong aria-hidden="true">5.</strong> Example Of Professional Bootcamp: HARSH Robotics Development</a></li><li class="chapter-item expanded "><a href="chapter_9.html"><strong aria-hidden="true">6.</strong> Improving Upon Active GitHub Repositories with Both &quot;jobsearch&quot; and &quot;remote-work&quot; Topics</a></li></ol>';
        // Set the current, active page, and reveal it if it's hidden
        let current_page = document.location.href.toString().split("#")[0].split("?")[0];
        if (current_page.endsWith("/")) {
            current_page += "index.html";
        }
        var links = Array.prototype.slice.call(this.querySelectorAll("a"));
        var l = links.length;
        for (var i = 0; i < l; ++i) {
            var link = links[i];
            var href = link.getAttribute("href");
            if (href && !href.startsWith("#") && !/^(?:[a-z+]+:)?\/\//.test(href)) {
                link.href = path_to_root + href;
            }
            // The "index" page is supposed to alias the first chapter in the book.
            if (link.href === current_page || (i === 0 && path_to_root === "" && current_page.endsWith("/index.html"))) {
                link.classList.add("active");
                var parent = link.parentElement;
                if (parent && parent.classList.contains("chapter-item")) {
                    parent.classList.add("expanded");
                }
                while (parent) {
                    if (parent.tagName === "LI" && parent.previousElementSibling) {
                        if (parent.previousElementSibling.classList.contains("chapter-item")) {
                            parent.previousElementSibling.classList.add("expanded");
                        }
                    }
                    parent = parent.parentElement;
                }
            }
        }
        // Track and set sidebar scroll position
        this.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                sessionStorage.setItem('sidebar-scroll', this.scrollTop);
            }
        }, { passive: true });
        var sidebarScrollTop = sessionStorage.getItem('sidebar-scroll');
        sessionStorage.removeItem('sidebar-scroll');
        if (sidebarScrollTop) {
            // preserve sidebar scroll position when navigating via links within sidebar
            this.scrollTop = sidebarScrollTop;
        } else {
            // scroll sidebar to current active section when navigating via "next/previous chapter" buttons
            var activeSection = document.querySelector('#sidebar .active');
            if (activeSection) {
                activeSection.scrollIntoView({ block: 'center' });
            }
        }
        // Toggle buttons
        var sidebarAnchorToggles = document.querySelectorAll('#sidebar a.toggle');
        function toggleSection(ev) {
            ev.currentTarget.parentElement.classList.toggle('expanded');
        }
        Array.from(sidebarAnchorToggles).forEach(function (el) {
            el.addEventListener('click', toggleSection);
        });
    }
}
window.customElements.define("mdbook-sidebar-scrollbox", MDBookSidebarScrollbox);
