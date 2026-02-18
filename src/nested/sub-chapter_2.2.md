
## Phase 2: The Digital R&A Branch — Agent Architecture (Points 11–25)

**Point 11: Define Your Three Core Agents — Scout, Miner, Auditor.**
Scout runs on Primary and discovers new URLs — job boards, company news pages, VC portfolio pages, GitHub orgs, and niche forums. Miner runs on Secondary and extracts structured data from those URLs. Auditor runs on Primary and scores each extracted opportunity against your Ideal Candidate Profile (ICP) stored in `MEMORIES.md`.

*Weaknesses:* Three-agent pipelines create bottlenecks at the Auditor; if scoring is slow, the queue backs up.
*Opportunities:* Use LangGraph to model the Scout→Miner→Auditor pipeline as a directed acyclic graph (DAG), enabling parallel Miner execution across multiple URLs before Auditor batches the results.

---

**Point 12: Add a Fourth Agent — The Synthesizer (Your "CSCO").**
The Synthesizer runs on Primary after the Auditor clears a lead. It generates a one-page "Strategic Brief" explaining: why this opportunity is a strong match, what specific pain point you solve, and what the first 30-day value delivery looks like. This is your secret weapon — most applicants show up empty-handed.

*Weaknesses:* Synthesizer briefs can be generic if `MEMORIES.md` isn't sufficiently detailed about your specific skills and past wins.
*Opportunities:* Feed the Synthesizer not just the job description but also the company's most recent SEC 10-K risk factors section and any relevant GitHub issues — this grounds the brief in real, verifiable company pain.

---

**Point 13: Configure `SOUL.md` — Your Agent's Strategic Personality.**
Write your `SOUL.md` with clear directives: "You are a strategic intelligence analyst identifying high-leverage opportunities for [Your Name], a specialist in [Your Core Skill]. You prioritize primary data sources over secondary. You flag opportunities where the company has a demonstrable, urgent need that maps to [Your Specific Expertise]." Specificity here is the difference between noise and signal.

*Weaknesses:* A static `SOUL.md` drifts from reality as your skills and market conditions evolve.
*Opportunities:* Version-control `SOUL.md` in a local Git repo and review it monthly. Add a "Quarterly Calibration" ritual where you update it based on which leads actually converted to work.

---

**Point 14: Build `MEMORIES.md` as a Living Structured Document.**
Store your CV in `MEMORIES.md` but go beyond bullets. Write it as a series of "Win Stories" in the format: *Situation → Constraint → Your Action → Measurable Result.* The LLM Auditor will use this to pattern-match opportunities against your proven capabilities, not just keyword-match your title.

*Weaknesses:* Markdown is flat; semantic search over a long MEMORIES.md is slow without embedding.
*Opportunities:* Chunk `MEMORIES.md` into ~500-token sections and embed them into a local ChromaDB instance (runs perfectly on M4). The Auditor can then do vector similarity search to find which of your past wins most closely maps to each new opportunity.

---

**Point 15: Define Your ICP (Ideal Opportunity Profile) Explicitly.**
In `MEMORIES.md`, create a dedicated `## ICP` section. Define: company stage (Series A–C preferred?), team size range, tech stack preferences, engagement type (6-month contract? co-founder? advisory?), minimum rate or equity range, and hard disqualifiers (e.g., "no pure sales roles," "no pre-revenue if not co-founder"). The Auditor can't score without a rubric.

*Weaknesses:* Too-narrow ICPs cause the system to miss adjacent opportunities you'd actually want.
*Opportunities:* Add a "stretch ICP" alongside the core ICP — opportunities that don't tick all boxes but have one exceptional signal (e.g., legendary founding team) that warrants a human review flag rather than auto-reject.

---

**Point 16: Set Up Browser-Use on Secondary with Playwright.**
Install Playwright (`playwright install --with-deps chromium`) on Secondary inside its conda env. Configure it with a persistent browser profile stored in `~/.openclaw/browser_profile/` so session cookies (for platforms requiring login) survive between runs. Add `playwright-stealth` to reduce bot detection fingerprinting.

*Weaknesses:* Persistent profiles accumulate cookies and tracking data that can flag your bot as anomalous over time; some platforms fingerprint canvas and WebGL signatures that stealth plugins don't mask.
*Opportunities:* Rotate browser profiles monthly. For LinkedIn specifically, use their official API where possible; reserve browser automation for sites with no official API and lower ToS risk.

---

**Point 17: RSS Aggregation Skill — Your First "Easy Win."**
Build a skill that aggregates RSS feeds from: Y Combinator's blog, notable VC firm portfolio pages (a16z, Sequoia, First Round), AngelList job alerts, and specific Substack newsletters in your niche. RSS requires no authentication, has no ToS issues, and gives you signal within minutes of publication. This is your system's lowest-friction, highest-value first win.

*Weaknesses:* Many high-value sources have abandoned RSS for email newsletters or X threads.
*Opportunities:* Use `kill-the-newsletter.com` to convert email newsletters into RSS feeds, and RSS Bridge to create feeds from Twitter/X search queries — dramatically expanding what "RSS" can monitor.

---

**Point 18: SEC EDGAR Monitor — Your Most Underused Edge.**
Build a skill on Secondary that polls the SEC EDGAR full-text search API for filings containing keywords relevant to your niche (e.g., "chief technology officer" + "resigned" in Form 8-K, or mentions of specific technology terms in new S-1 filings). Most job hunters don't read SEC filings. You will.

*Weaknesses:* EDGAR's EFTS (full-text search) has rate limits; complex queries can time out.
*Opportunities:* Use the `sec-api` Python library which handles pagination and rate limiting, and set up a local SQLite cache of filing metadata so you never re-process the same document.

---

**Point 19: GitHub Opportunity Mining.**
Build a skill that monitors GitHub for: new repositories in your niche with >100 stars in their first week (signals hot new projects that will need contributors), issues labeled "help wanted" or "good first issue" in repos from companies on your target list, and new GitHub organizations created by founders you're tracking.

*Weaknesses:* GitHub's REST API has a 5,000 requests/hour authenticated limit — easy to hit with broad searches.
*Opportunities:* Use GitHub's GraphQL API instead — you can get significantly more structured data per request, staying well within limits while getting richer context (e.g., contributor counts, issue response times).

---

**Point 20: Funding Alert Pipeline — Form D as Primary Source.**
Build a skill that monitors SEC Form D filings (these are filed when a company raises a round and they're public, immediate, and primary). A new Form D from a company in your niche is a leading indicator of a hiring wave 30–90 days out — before Crunchbase even updates.

*Weaknesses:* Form D doesn't always specify the company's tech focus; name-only filings require enrichment to assess relevance.
*Opportunities:* Cross-reference Form D filers against LinkedIn company pages (via API) and their domain's technology stack (via BuiltWith API) to auto-enrich with tech context before the Auditor scores them.

---

**Point 21: ChromaDB Vector Store — Index Everything.**
Run a ChromaDB instance on Primary (it's a pure Python library, no separate server needed for local use). Every piece of processed intelligence — lead summaries, company briefs, conversation notes — gets embedded and stored. This turns your growing archive into a searchable semantic memory that compounds over time.

*Weaknesses:* ChromaDB's default embedding model (all-MiniLM-L6-v2) is competent but not specialized; domain-specific terms may not cluster well.
*Opportunities:* Swap to `nomic-embed-text` (available via Ollama, runs natively on M4) for a more capable embedding model — it's significantly better for technical and business language.

---

**Point 22: Persistent Lead Storage — SQLite + Markdown Hybrid.**
Store all raw leads in a local SQLite database (Primary, backed up to Secondary daily) with fields: `source`, `url`, `extracted_text`, `audit_score`, `synthesis_brief`, `status`, `first_seen`, `last_updated`. Also export each scored lead to a Markdown file in `~/.openclaw/leads/` for grep-ability and easy human review.

*Weaknesses:* SQLite can't handle concurrent writes well if both nodes are writing simultaneously.
*Opportunities:* Use DuckDB instead of SQLite — it handles analytical queries (e.g., "show me all leads from Series A companies in fintech scored above 80 in the last 30 days") far better, and its concurrency model is more forgiving.

---

**Point 23: Rejection Memory — Close the Feedback Loop.**
Configure the Auditor to store "rejection reasons" for every lead it scores below threshold: "Score: 62/100. Disqualifiers: pre-revenue, no technical co-founder, stack mismatch (PHP vs. your Python/Rust)." This rejection memory is then fed back into the Scout's discovery parameters to refine future searches toward better-fit signals.

*Weaknesses:* Without enough volume, rejection patterns are statistically meaningless; early system may over-prune good leads.
*Opportunities:* Add a "human override" flag — when you manually pursue a lead the system rejected, log it. After 20+ overrides, run a feature importance analysis to identify what the system is systematically undervaluing.

---

**Point 24: Read-Only Policy Enforcement via `clawctl`.**
During the discovery phase, configure all agent skills with `policy: read-only` in their YAML frontmatter. No agent should send any email, submit any form, or modify any external state without first passing through your HITL (Human-in-the-Loop) approval queue. The M4 cluster is fast enough to buffer weeks of opportunities; you don't need to rush automated outreach.

*Weaknesses:* HITL creates a human bottleneck; if you're traveling or sick, the outreach queue stalls.
*Opportunities:* Add a tiered escalation: low-priority leads auto-drafted but held for 72 hours (you can batch-approve weekly), high-priority leads ping you immediately via Telegram with a one-tap approve/reject button using Telegram's inline keyboards.

---

**Point 25: Weekly Self-Correction Prompt — "Why Did I Miss the Last Three Good Ones?"**
Every Monday morning, trigger a structured prompt that reviews the last week's activity: which opportunities did you pursue that didn't pan out, which did you miss that in retrospect you should have caught, and what systematic change to the ICP, search parameters, or scoring weights would fix that. Log the output to `~/.openclaw/weekly_reviews/`.

*Weaknesses:* LLM self-correction is only as good as the quality of feedback signals fed into it; if you don't log outcomes, the system has nothing to learn from.
*Opportunities:* Create a dead-simple "outcome logging" habit — a single Telegram command (`/log won`, `/log lost`, `/log irrelevant`) that updates the lead's status in DuckDB, giving the system ground truth to improve against.

---

