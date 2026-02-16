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
        this.innerHTML = '<ol class="chapter"><li class="chapter-item expanded "><a href="Manifesto.html"><strong aria-hidden="true">1.</strong> 100 Days: Observe. Build. Gather intelligence.</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="nested/sub-chapter_2.1.html"><strong aria-hidden="true">1.1.</strong> Phase 1: Infrastructure &amp; Core Gateway Setup (Points 1–10)</a></li><li class="chapter-item expanded "><a href="nested/sub-chapter_2.2.html"><strong aria-hidden="true">1.2.</strong> Phase 2: Building the &quot;Digital R&amp;A Branch&quot; (Points 11–25)</a></li><li class="chapter-item expanded "><a href="nested/sub-chapter_2.3.html"><strong aria-hidden="true">1.3.</strong> Phase 3: Donovan-Style &quot;Primary Data&quot; Sensors (Points 26–45)</a></li><li class="chapter-item expanded "><a href="nested/sub-chapter_2.4.html"><strong aria-hidden="true">1.4.</strong> Phase 4: Social Graph &amp; Co-founder Discovery (Points 46–65)</a></li><li class="chapter-item expanded "><a href="nested/sub-chapter_2.5.html"><strong aria-hidden="true">1.5.</strong> Phase 5: Opportunity Finder &amp; ROI Engine (Points 66–85)</a></li><li class="chapter-item expanded "><a href="nested/sub-chapter_2.6.html"><strong aria-hidden="true">1.6.</strong> Phase 6: Maintenance &amp; Strategic Refinement (Points 86–100)</a></li><li class="chapter-item expanded "><a href="nested/table_1.html"><strong aria-hidden="true">1.7.</strong> Table 1: Core Technology Stack Summary</a></li><li class="chapter-item expanded "><a href="nested/table_2.html"><strong aria-hidden="true">1.8.</strong> Table 2: Opportunity Normalization Schema Example</a></li><li class="chapter-item expanded "><a href="nested/annotated_bibliography.html"><strong aria-hidden="true">1.9.</strong> Works Cited</a></li><li class="chapter-item expanded "><a href="nested/appendix_1.html"><strong aria-hidden="true">1.10.</strong> Appendix 1: Example Of Professional Bootcamp: HARSH Robotics Development</a></li><li class="chapter-item expanded "><a href="archive/sub-chapter_2.1.html"><strong aria-hidden="true">1.11.</strong> Archived, Now Complementary GYG Plan: Phase 1</a></li><li class="chapter-item expanded "><a href="archive/sub-chapter_2.2.html"><strong aria-hidden="true">1.12.</strong> Archived, Now Complementary GYG Plan: Phase 2</a></li><li class="chapter-item expanded "><a href="archive/sub-chapter_2.3.html"><strong aria-hidden="true">1.13.</strong> Archived, Now Complementary GYG Plan: Phase 3</a></li><li class="chapter-item expanded "><a href="archive/sub-chapter_2.4.html"><strong aria-hidden="true">1.14.</strong> Archived, Now Complementary GYG Plan: Phase 4</a></li><li class="chapter-item expanded "><a href="archive/sub-chapter_2.5.html"><strong aria-hidden="true">1.15.</strong> Archived, Now Complementary GYG Plan: Phase 5</a></li></ol></li></ol>';
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
