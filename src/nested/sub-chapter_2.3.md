## Phase 3: Primary Data Sensors — The Donovan Edge (Points 26–45)

**Point 26: SEC 8-K Executive Transition Monitor.**
Specifically filter Form 8-K Item 5.02 filings ("Departure of Directors or Certain Officers; Election of Directors; Appointment of Certain Officers"). A CTO departure at a Series B company in your niche is one of the highest-signal events in the universe — it means an urgent need, a decision-making vacuum, and often a willingness to bring in a high-impact contractor rather than wait 6 months to hire a full-time replacement.

*Weaknesses:* Not all departures are announced via 8-K (private companies file nothing); public company roles may be more constrained than startup work.
*Opportunities:* Cross-reference 8-K departures against Crunchbase to find cases where the departed executive was *also* a major shareholder or founder — these are the highest-urgency situations.

---

**Point 27: SEC 10-K Risk Factor Extraction.**
Build a skill that extracts the "Risk Factors" section of any target company's annual 10-K and summarizes it as a list of "pain points I could plausibly address." Before any interview or outreach, you run this skill and use the output to frame your pitch: "I noticed in your last 10-K you identified [specific risk]. Here's how I've solved that before..."

*Weaknesses:* 10-K risk factors are often boilerplate legal language, not operational reality; lawyers write them to minimize liability, not to accurately describe the company's actual problems.
*Opportunities:* Compare risk factors across three consecutive 10-Ks — risks that *increase in specificity* year over year are the ones the company is genuinely wrestling with, as opposed to boilerplate disclosures.

---

**Point 28: USPTO/WIPO Patent Filing Monitor.**
Set up a skill to monitor new patent filings by your target companies (searchable via the USPTO's PatentsView API and WIPO's PATENTSCOPE). A company filing patents in a new technical area is signaling where they're investing 12–24 months out — this is a hiring predictor, not just a competitive intelligence signal.

*Weaknesses:* Patent applications are published 18 months after filing, adding significant lag; many companies file defensively in areas they're not actively building.
*Opportunities:* Focus on continuation patents and patent assignments (when a company *acquires* patents) as these are more immediate signals of active development focus than new applications.

---

**Point 29: GitHub Technical Debt Proxy — Issue/Commit Ratio Analysis.**
For any target company with a public GitHub presence, calculate a "technical debt proxy score": open issues > 90 days old divided by recent commits (last 30 days). A rising ratio indicates a team that's shipping fast but accumulating backlog — exactly the scenario where a specialist contractor to "clean up and stabilize" a specific component gets hired and trusted quickly.

*Weaknesses:* Public repos may not reflect the state of internal private repos; some companies do all serious work privately.
*Opportunities:* Supplement with SonarCloud (many open-source projects have public SonarCloud dashboards) for actual code quality metrics — cyclomatic complexity, duplication percentages, and security hotspot counts.

---

**Point 30: Tech Stack Change Detection via BuiltWith.**
Create a skill that checks target company domains against the BuiltWith API monthly and flags any stack changes (e.g., migrating from Heroku to AWS, adopting Kubernetes, switching from Angular to React). A stack migration is almost always accompanied by a need for specialists who've done that exact migration before.

*Weaknesses:* BuiltWith only detects client-side and DNS-level technology signals; it misses backend infrastructure changes entirely.
*Opportunities:* Combine BuiltWith with job description archaeology — search their historical job postings on LinkedIn and Indeed for the tech they were hiring for 12 months ago vs. now; the delta reveals the migration in progress.

---

**Point 31: Crunchbase + Form D Funding Correlation.**
Build a skill that correlates SEC Form D filings (immediate, primary) with Crunchbase data (delayed, secondary). Use Form D as the trigger, then enrich with Crunchbase's team size, investor list, and product description. The goal: get ahead of the TechCrunch funding announcement by 2–4 weeks, reaching the company before their inbox gets flooded with inbound.

*Weaknesses:* Crunchbase's API is expensive; free tier is severely rate-limited.
*Opportunities:* Use the Crunchbase "Basic" CSV export (available without a paid API subscription) refreshed weekly, combined with Form D as your real-time trigger — you're using Crunchbase for enrichment only, not discovery.

---

**Point 32: LinkedIn Leadership Change Monitoring — Compliant Approach.**
Use LinkedIn's official API (via their Marketing Developer Platform for company data, or their Job Search API) to monitor for new CTO/VP Engineering/Head of Product postings at companies on your target list. A new executive hire often brings in their own "trusted implementation team" within 90 days — you want to be in that network before the hiring decision is made.

*Weaknesses:* LinkedIn's API is heavily restricted; the full social graph data that would be most useful requires a Recruiter or Sales Navigator subscription.
*Opportunities:* Supplement with X/Twitter searches for founders announcing new executive hires (many post publicly), and monitor for relevant LinkedIn posts via unofficial RSS bridges like `linkedin.rss.app`.

---

**Point 33: Hacker News Signal Extraction.**
Build a dedicated HN monitoring skill that watches three feeds: "Who is Hiring?" (monthly, post-processed to extract roles matching your ICP), "Who Wants to Be Hired?" (useful for finding potential co-founders in your skill complement), and "Ask HN" threads where founders ask for advice about specific technical problems you can solve.

*Weaknesses:* HN's job signal is biased toward early-stage, technical companies; limited coverage of enterprise or non-tech-forward industries.
*Opportunities:* Use HN's Algolia search API (free, fast, full-text) to retroactively mine 5 years of HN job threads — building a database of which companies hired for your skills in the past, which reveals their hiring patterns and timing.

---

**Point 34: Reddit Technical Sentiment Mining.**
Monitor subreddits relevant to your niche for posts complaining about specific technical problems (e.g., `/r/devops` complaining about Kubernetes cost overruns, `/r/MachineLearning` frustrated with MLOps tooling). These are unfiltered primary signals of pain — and the company that built the problematic tool isn't going to fix your complaint; you are.

*Weaknesses:* Reddit's API now charges for access above low rate limits; PRAW (Python Reddit API Wrapper) still works for moderate volumes but throttles heavily.
*Opportunities:* Focus on niche subreddits with lower volume (e.g., `/r/mlops`, `/r/rust`, `/r/webassembly`) where signal-to-noise is higher and API limits are less constraining than broad tech subreddits.

---

**Point 35: Knowledge Graph — Board Member & Investor Overlap Mapping.**
Use OpenCorporates (free API tier available) and SEC proxy statement data (DEF 14A filings list all board members) to build a graph of which board members and investors appear across multiple companies on your target list. A warm introduction from a shared investor is worth 10 cold emails — your graph tells you where to find it.

*Weaknesses:* Building a useful graph requires patience; small networks yield few multi-hop paths.
*Opportunities:* Start with just your top 10 target companies and their investor/board overlap; even this small graph typically reveals 2–3 highly connected nodes who could provide warm introductions across multiple targets.

---

**Point 36: ArXiv Preprint Monitor for Emerging Tech Signals.**
For technology-focused roles, monitor ArXiv for new preprints in your domain. A startup that cites a specific paper in their engineering blog (or whose founders authored it) is signaling their technical direction 12–18 months before it becomes a job posting. Being able to discuss their research intelligently in an outreach message is a powerful differentiator.

*Weaknesses:* ArXiv signal is most useful in AI/ML, systems, and computer science — limited applicability for non-research-oriented niches.
*Opportunities:* Use the ArXiv API (free, no auth required) combined with `arxiv-sanity-lite` for topic-based filtering, and set alerts for when papers your target companies' authors publish get cited by other companies you're tracking.

---

**Point 37: Glassdoor + Blind Sentiment Analysis for Due Diligence.**
Before pursuing any lead, run a sentiment analysis on the company's Glassdoor and Blind reviews (scrape carefully — both have ToS considerations). You're not looking for overall sentiment; you're looking for *specific functional complaints* that match your specialty. "The infrastructure team is underwater" is an opportunity signal, not a reason to avoid the company.

*Weaknesses:* Glassdoor reviews are gamed (companies solicit positive reviews); small companies have too few reviews for statistical validity.
*Opportunities:* Focus on the *content* of negative reviews, not the star rating. An LLM prompt that extracts "specific technical pain points mentioned by engineers" from 20 reviews yields more signal than the aggregate score.

---

**Point 38: Podcast Intelligence — Whisper Transcription Pipeline.**
Set up a pipeline on Secondary that: monitors RSS feeds of 10–20 podcasts where founders and executives in your niche appear as guests, downloads new episodes automatically, transcribes them via Apple's whisper.cpp (optimized for M4's Neural Engine — extremely fast), and runs an LLM extraction prompt to pull out "unsolved problems the guest mentioned."

*Weaknesses:* Podcast production lags reality by weeks; by air date, the founder's situation may have already changed.
*Opportunities:* Focus on live recordings and recent episodes (<30 days old), and prioritize podcasts where hosts ask guests "what's your biggest challenge right now" — these prompts reliably elicit unfiltered pain points.

---

**Point 39: Job Posting Archaeology — Historical JD Mining.**
Use the Wayback Machine API and job board historical data to find roles your target companies posted 6–18 months ago that were never filled (or filled but reposted). A role that keeps reappearing is one of three things: a high-bar position they can't staff (opportunity for a contractor to solve the immediate need), a toxic role nobody stays in (avoid), or an indicator of rapid growth (verify with funding data).

*Weaknesses:* Historical job data is incomplete and requires manual interpretation to distinguish the three cases.
*Opportunities:* Cross-reference persistent unfilled roles against the company's headcount growth on LinkedIn — if headcount is growing but this specific role keeps reposting, it's a genuine capability gap, not a culture problem.

---

**Point 40: Domain Registration Monitoring for Stealth Startups.**
Monitor newly registered domains containing keywords in your niche using Certificate Transparency logs (crt.sh — free API) and newly registered domain feeds (DomainTools, or free alternatives like WhoisDS). A stealth startup registering `[your-niche]-[product-verb].com` three months before they launch is findable long before they post their first job.

*Weaknesses:* Certificate transparency produces massive volume; filtering for relevant signals requires precise keyword selection.
*Opportunities:* Narrow to domains registered by individuals (not privacy-protected registrars) who have LinkedIn profiles in your niche — the intersection of crt.sh data and LinkedIn is a powerful stealth-startup filter.

---

**Point 41: Substack & Newsletter Intelligence.**
Many of the best operators in any niche write detailed Substack newsletters where they share their actual strategic thinking. Build a skill that monitors 20–30 newsletters in your domain, runs each new post through an LLM with the prompt "What specific operational problems does the author reveal they are wrestling with?", and surfaces any that map to your ICP.

*Weaknesses:* Most Substack newsletters are paid; free tiers often exclude the most substantive posts.
*Opportunities:* Many authors post "greatest hits" or summaries publicly even if the full post is paywalled. Additionally, their Twitter/X threads often summarize newsletter content — monitor both.

---

**Point 42: Financial Health Proxy — Headcount Velocity Analysis.**
Combine LinkedIn employee count data (sampled monthly) with funding dates and amounts from Form D filings to calculate a rough burn rate proxy: `monthly_burn_proxy = (headcount × average_salary_estimate) / months_since_last_funding`. Companies where this number suggests 6–9 months of runway are in the "urgency zone" — motivated to hire high-impact contractors who deliver fast, not patient enough to do a 6-month executive search.

*Weaknesses:* Average salary estimates are geography-dependent and highly variable; proxy can be off by 2x or more.
*Opportunities:* Calibrate against actual job postings (which often include compensation ranges in states that mandate disclosure), and use `levels.fyi` data for tech roles to get better sector-specific salary benchmarks.

---

**Point 43: Conference & Event Signal Mining.**
Monitor conference speaker announcement pages and event agendas in your niche (many are public HTML pages, easily scraped). Companies sending multiple engineers to present at a specific conference are investing in that technology area. A company that speaks about a problem you solve is a warm lead — you share a vocabulary and a context.

*Weaknesses:* Conference schedules are often published close to the event, reducing lead time.
*Opportunities:* Monitor CFP (Call for Papers) submissions — many conferences post accepted talk titles months before the event, giving you earlier signal about what companies are building and who their technical thought leaders are.

---

**Point 44: CEO/Founder X (Twitter) Contradiction Analysis.**
Build a skill that compares the semantic content of a founder's recent X posts against their company's most recent 10-K risk factors or public press releases. Material contradictions — a CEO tweeting "we're crushing it" while the 10-K discloses customer concentration risk exceeding 40% — are both due diligence flags *and* opportunity signals (they're managing a problem they haven't solved).

*Weaknesses:* CEO social media is often managed by PR; "contradictions" may be deliberate narrative management rather than actual cognitive dissonance.
*Opportunities:* Focus on technical founders who tend to post more authentically about product and engineering reality than go-to-market founders who are more likely to have a polished PR persona.

---

**Point 45: Monday Morning "Meticulously Prepared Study" — Top 3 Targets.**
Every Monday at 7:00 AM, trigger an automated pipeline that: pulls the latest intelligence on your top 3 active targets, runs the Synthesizer agent to generate a fresh one-page brief for each, and delivers all three to your Telegram as a formatted morning briefing. This is your intelligence officer's morning report — start every week fully situationally aware.

*Weaknesses:* Three targets may be too narrow if you're in an active search; too broad (10+) and the quality of each brief degrades.
*Opportunities:* Structure the brief in a consistent "BLUF" format (Bottom Line Up Front, from military intelligence): one sentence conclusion, then supporting evidence. Brevity enforces quality.

---