## Phase 4: Social Graph & Co-founder Discovery (Points 46–65)

**Point 46: Indie Hackers & Product Hunt Monitoring.**
Build skills to monitor Indie Hackers (specifically the "I'm building" and "Roast my idea" sections) and Product Hunt's daily launches. Founders who post on Indie Hackers are unusually candid about their revenue, growth problems, and technical struggles. Product Hunt launches reveal what's getting traction — and a successful launch with obvious technical scaling problems is a contractor opportunity within days.

*Weaknesses:* Indie Hackers skews toward solo founders and bootstrapped companies; less relevant if your niche is VC-backed or enterprise.
*Opportunities:* Monitor the Indie Hackers forum's "Looking for" section specifically — founders explicitly post co-founder and contractor searches there with surprisingly detailed briefs.

---

**Point 47: Co-founder Matching — Complementary Skills Analysis.**
Build a "complementary skills scoring" prompt that takes a founder's public technical profile (GitHub repos, blog posts, talks) and your `MEMORIES.md`, and outputs a 0–100 "co-founder complement score" based on: skill overlap (some needed, too much is bad), evidence of shipping (both parties), demonstrated ability to work in the other's domain (mutual respect), and communication style compatibility (inferred from writing).

*Weaknesses:* Writing style analysis for "communication compatibility" is speculative; people communicate very differently in professional vs. casual contexts.
*Opportunities:* Focus the complement score primarily on the skill matrix and shipping evidence — these are more objectively verifiable and more predictive of co-founder success than stylistic matching.

---

**Point 48: Network Graph — Build Your Neo4j Social Map.**
Run a local Neo4j instance (in Podman on Secondary — the community edition is free and runs well on M4) and populate it with nodes for: people you've worked with, founders you're targeting, their investors, their advisors, and any mutual connections you can identify. The graph's primary value is finding 2-hop introduction paths: "Who do I know who knows this founder?"

*Weaknesses:* Building a meaningful graph requires significant manual data entry upfront; the automation can only add public-source nodes.
*Opportunities:* Start by importing your LinkedIn connections export (available in LinkedIn settings) as the seed graph — this immediately gives you a real network to query, before you add any scraped enrichment.

---

**Point 49: Hacker News "Who Wants to Be Hired" Deep Mining.**
The monthly HN "Who Wants to Be Hired" threads contain unusually honest self-descriptions from technical people. Run these threads through an LLM to extract potential co-founders in your complementary skill areas — people who are available, technically credible (they got upvotes from the HN community), and explicitly open to new opportunities.

*Weaknesses:* HN "WWBH" threads skew toward individual contributors, not founders; most posters are looking for employment, not co-founder relationships.
*Opportunities:* Filter for posts that describe entrepreneurial experience ("previously founded," "built and sold," "technical co-founder at") — this subpopulation within WWBH is exactly the talent pool you want.

---

**Point 50: Discord Community Monitoring.**
Many niche technical communities have moved to Discord. Identify 5–10 Discord servers in your domain where serious practitioners gather (e.g., MLOps Community, Rust Programming, specific framework servers). Monitor their `#jobs`, `#help-wanted`, and `#show-your-work` channels for project leads posting about blockers you can unblock.

*Weaknesses:* Discord's API requires a bot with server membership; some servers explicitly ban bots or require manual application.
*Opportunities:* Don't just monitor — participate. Authentic participation in 2–3 Discord communities gives you warm network status that makes any follow-up outreach significantly more effective than cold contact.

---

**Point 51: OSINT Enrichment — Public Sources Only.**
For any high-priority lead (scored above 85), run a structured OSINT enrichment pass using entirely public sources: the company's About page, team LinkedIn profiles, GitHub presence, Crunchbase profile, SEC filings, and any press coverage. The goal is to walk into any conversation knowing more about their situation than they expect from a first contact.

*Weaknesses:* Deep OSINT on individuals raises ethical questions about the boundary between research and surveillance; it can also backfire if the prospect discovers the depth of your research and finds it uncomfortable.
*Opportunities:* Focus OSINT on the *company* and *its problems*, not on the individual's personal life. Research that demonstrates you understand their technical architecture and business constraints is impressive; research that reveals you know their home address is not.

---

**Point 52: Subdomain Discovery — Staging Site Intelligence.**
Use `subfinder` (free, open-source, runs on macOS via Homebrew) to enumerate subdomains of target company domains. Staging sites (`dev.`, `staging.`, `beta.`) often reveal products in development, tech stacks (via error pages), and even job-relevant technical details. A company with an active `api-v2.` subdomain is mid-migration — prime contractor territory.

*Weaknesses:* Many staging environments are IP-whitelisted or require VPN access; subdomain enumeration without authorization may violate CFAA in the US.
*Opportunities:* Stay strictly within passive enumeration (certificate transparency logs, DNS records) rather than active scanning — this is unambiguously legal and gives you most of the signal without the risk.

---

**Point 53: Alumni Network Targeting — "Mafia" Pattern Recognition.**
Build a skill that identifies the "alumni network" patterns in your niche — e.g., former Stripe engineers who've gone on to found or join companies, former Google Brain researchers, ex-Databricks employees. These alumni networks have high trust among members and move together. Being known to one member gives you warm access to others.

*Weaknesses:* Alumni networks are not always as cohesive as their reputation suggests; cold outreach citing shared alumni status can feel presumptuous without a genuine connection.
*Opportunities:* Instead of name-dropping the alumni connection in cold outreach, use it to *identify* who to ask for an introduction — the warm intro from a mutual alum is the play, not the cold email that mentions it.

---

**Point 54: Network Centrality — Find the Connectors.**
In your Neo4j graph, run a PageRank query to identify the most connected nodes in your target network — people who appear as investors in multiple target companies, advisors to several founders you're tracking, or frequent collaborators in your GitHub data. A single strong relationship with a high-centrality connector can provide warm introductions across your entire target list.

*Weaknesses:* High-centrality connectors are frequently approached by many people; they're protective of their network and highly selective about introductions they'll make.
*Opportunities:* Provide value to connectors first — contribute to their open-source projects, write a thoughtful reply to their newsletter, or share genuinely useful intelligence — before making any ask. This is the only reliable way to earn an introduction from a busy, well-networked person.

---

**Point 55: Podcast Guest Outreach Intelligence.**
After your Whisper transcription pipeline processes a podcast episode where a relevant founder discusses a problem you can solve, don't just log it — build a "conversation brief" that: quotes their exact framing of the problem, maps it to your specific past experience addressing that class of problem, and drafts a one-paragraph outreach message that opens with their words, not yours.

*Weaknesses:* Quoting someone's podcast back at them in an outreach email can feel surveillance-like if not done with care.
*Opportunities:* Frame it as shared context, not research: "I was listening to your appearance on [podcast] and your point about [problem] resonated — I've been working on exactly that challenge." This is natural and flattering, not creepy.

---

**Point 56: Stealth Mode Discovery — Certificate Transparency + GitHub Org Sweep.**
Combine two signals to find pre-announcement startups: crt.sh (Certificate Transparency logs) for new TLS certificate registrations in your niche keywords, and the GitHub "recently created organizations" heuristic (new orgs that follow established OSS projects in your domain, have >3 contributors, and have made >10 commits in the first month). These are teams that are serious but haven't launched publicly yet.

*Weaknesses:* False positive rate is high; most new GitHub orgs and domain registrations are not funded startups.
*Opportunities:* Add a third filter — cross-check founders' LinkedIn profiles for "Stealth Startup" in their current title, which is surprisingly common and a direct signal.

---

**Point 57: Freelance Platform Deep Search — Beyond Upwork's Surface.**
Most contractors search Upwork and Toptal with the same basic queries. Build skills that: search for *client profiles* (not job postings) of companies that have spent >$50K on Upwork and have open contracts in your niche (they're proven to hire contractors and have budget), monitor Toptal's public client case studies (which reveal companies using top-tier contractors and their technical areas), and track `Freelancer.com` contest briefs (which reveal exactly what a company wants to build and their budget range).

*Weaknesses:* Upwork's API access for scraping client profiles requires violating their ToS; stick to their official Job Search API.
*Opportunities:* The highest-value gig leads rarely come from gig boards at all — they come from warm network referrals. Use the platforms for market intelligence (what are companies paying? what skills are in demand?) more than as a direct lead source.

---

**Point 58: Technical Blog Monitoring — Engineering Blog Intelligence.**
Build a skill that monitors engineering blogs of your target companies (most maintain one: `engineering.company.com`, or Medium publications). A post about "how we solved X" reveals what problems they've recently tackled; a post about "our approach to Y" reveals what they're actively working on; a post listing "what we're hiring for" in the conclusion is the most direct signal of all.

*Weaknesses:* Engineering blogs are notoriously inconsistent — many companies post 3 articles and then go dark for 2 years.
*Opportunities:* Check the *frequency* of blog posts as a signal in itself — a company that starts posting more engineering content is in a growth phase that typically precedes hiring.

---

**Point 59: Open Source Contribution as Inbound Marketing.**
Identify the key open-source projects used by your target companies (findable via their engineering blogs and GitHub stars/watches). Make substantive contributions — not trivial PRs, but genuine fixes or features. This creates a warm introduction vector: "I noticed your company uses [framework] — I recently contributed [specific thing] to it. I'm exploring opportunities where I could bring that depth to bear on your specific challenges."

*Weaknesses:* High-quality OSS contributions take significant time; this is a medium-term play, not a quick win.
*Opportunities:* Focus on documentation improvements and example code — these are often more visible to decision-makers than core framework contributions, and they're faster to complete while still demonstrating genuine competency.

---

**Point 60: Calendly & Public Calendar Intelligence.**
Some founders and executives publish their Calendly links publicly on their websites or X bios. A publicly bookable calendar tells you: they're open to inbound meetings (low barrier to outreach), what types of calls they're offering (office hours, co-founder chats, investor calls), and sometimes their timezone and availability patterns (useful for timing outreach for when they're actively checking their calendar).

*Weaknesses:* Public Calendly availability doesn't necessarily mean *high-quality* availability — anyone can book these slots.
*Opportunities:* If a target founder offers public "office hours" Calendly slots, this is the highest-leverage outreach path available — book a slot with a specific, compelling agenda rather than sending a cold email. It's still competitive, but your conversion rate will be dramatically higher.

---

**Point 61: BlueSky & Mastodon — Emerging Technical Communities.**
Set up monitoring for BlueSky (via their AT Protocol API — well-documented and free) and Mastodon instances relevant to your niche (e.g., `fosstodon.org` for open-source developers, `sigmoid.social` for ML practitioners). These platforms have disproportionate concentrations of serious technical practitioners relative to their overall user counts, and they're less saturated with outreach than LinkedIn or X.

*Weaknesses:* Smaller audiences mean fewer leads in absolute terms; BlueSky and Mastodon are still niche for business-critical conversations in most industries.
*Opportunities:* Be an *authentic participant* in these communities, not just a monitor. The smaller, more intimate nature of these platforms means that consistent, valuable contributions can make you genuinely well-known within a niche in ways that are nearly impossible on larger platforms.

---

**Point 62: Conference "Hallway Track" Simulation.**
The most valuable networking at conferences happens informally — the hallway conversations, the dinner tables, the Slack channels that spin up around events. Build a skill that monitors the official Slack/Discord workspaces of major conferences in your niche (most are created ~1 month before the event and kept open afterward) for the same signals you'd look for in-person: people complaining about problems, asking for recommendations, or posting "Does anyone know someone who does X?"

*Weaknesses:* Event Slack workspaces typically die within weeks of the conference ending.
*Opportunities:* The connections made in those workspaces outlive the workspace; follow up with the most interesting conversations via LinkedIn or email within 48 hours of initial contact while context is fresh.

---

**Point 63: Due Diligence Agent — "Trust Verification" for Co-founders.**
Before any serious co-founder conversation, run a structured verification pass using: OpenCorporates (for historical business registrations), court records (PACER for US federal, or state court search APIs where available), and the SEC's EDGAR EDGAR litigation releases. You're not looking for disqualifying skeletons; you're verifying that the person's professional history matches their stated narrative.

*Weaknesses:* Court records and corporate filings require interpretation; a lawsuit doesn't automatically mean a bad actor, and many legitimate business disputes result in filings.
*Opportunities:* If you find something ambiguous, address it directly in conversation early — founders who've navigated difficult situations and can discuss them openly are often *more* trustworthy partners than those with a spotless but thin history.

---

**Point 64: Anomaly Detection on Job Descriptions.**
Build a skill that embeds all job descriptions in your niche into ChromaDB and flags the *outliers* — job descriptions with unusual combinations of requirements or unusually high compensation for their stated seniority level. These anomalies often signal either a company that's struggling to define what they actually need (consulting opportunity) or a company that knows exactly what rare combination they need and is willing to pay for it (high-value contract opportunity).

*Weaknesses:* Anomaly detection requires a sufficiently large corpus of job descriptions to establish a baseline; in narrow niches, the corpus may be too small.
*Opportunities:* Start with a rolling 90-day corpus refreshed weekly; 500+ job descriptions in your niche is usually sufficient to establish reliable anomaly detection baselines.

---

**Point 65: Obfuscated Role Search — Decoding Unusual Job Titles.**
Some of the best opportunities are hidden behind unusual or internally-invented job titles: "Chief of Staff (Technical)," "Founding Engineer - Infrastructure," "Technical Advisor - Series A." Build a skill that normalizes these unusual titles into standard categories and scores them against your ICP. The companies that invent their own titles are often the most interesting to work with.

*Weaknesses:* Normalization of unusual titles introduces classification error; "Head of Special Projects" at one company means very different things than at another.
*Opportunities:* Use an LLM with a chain-of-thought prompt that reads the *full job description* before normalizing the title — the description usually makes the actual role clear regardless of how the title is labeled.

---

