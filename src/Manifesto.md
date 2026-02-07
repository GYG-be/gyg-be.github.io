*Never mind that humans should be taught at a very young age how to make themselves useful, enjoy being productive and, very importantly, negotiate their salary so that they get paid per negotiated contract for their useful efforts, ie THAT difficiency in parenting and educational systems is a topic for another manifesto. The ENTIRE process of educating humans and building educational systems, looking in the rear view mirror, for careers that existed five, ten, twenty-five or even fifty years ago is HOPELESSLY and PAINFULLY broken.* 

**We have to skip right past the backward looking education and jobsearch processes to get to what MUST be done**  

This manifesto focuses on the *professional* and the *opportunity discovery process* and how we find work first and build our careers with education and professional development that is actually relevant in the digital age.

The digital labor market has fractured into a constellation of specialized silos. 

To find temporary short-term work or gig labor, one turns to the location-specific taxonomies of TaskRabbit.

To secure high-value technical work, one must monitor the bidding wars of Upwork or the bounty boards of Gitcoin. 

To find a co-founder, one navigates the "blind" dating mechanics of Y Combinator’s matching platform or the swipe-based interface of CoffeeSpace.

To network the whole thing together, we are supposed to use a creepy business-oriented social network like LinkedIn, which is evidently inspired by the elbow-rubbing techniques that the founder of LinkedIn learned on Jeffrey Epstein's island.

We all know already that finding work has traditionally been a matter of who you know, specifically who you've already worked with and who knows your capabilities ... but in the digital age, it is increasingly necessary to find new connections, to work with new colleagues, to build trust and establish credibility in new communities by doing work that demonstrates an ability to accomplish things and build trust in months rather than decades. 

This fragmentation of the digital labor market imposes a severe cognitive tax on the professional, forcing the professional to act as a human router to optimize one's career progression, constantly switching contexts, normalizing data formats across different platforms, and manually executing repetitive outreach tasks.  

Project GYG proposes a radical reconsideration, simplification and consolidation of this landscape through the development of the "Opportunity Finder"—an autonomous AI agent designed to act as a universal proxy for the user. 

This system is not merely an aggregator; it is an open source collection of prompts and code starters necessary for building personalized agentic entities capable of semantic reasoning, autonomous negotiation, and cross-platform execution. 

The objective is to invert the current "pull" model of opportunity discovery into a "push" model, where the agent continuously scouts, filters, and prepares opportunities for a simple binary decision by the human principal.  

# GYG Project Architectural Vision

The following report details the exhaustive architectural vision in the form of a100-task execution plan required to build the GYG "push" model, in which user configured AI agents continuously scouts, filters, and prepares opportunities for a simple binary decision by the human principal.  

The description of our plan attempts to dissect the technical, legal, and operational challenges of integrating disparate platforms—from the API-friendly ecosystem of Web3 bounties to the "walled gardens" of corporate job boards. The architecture leverages a multi-agent orchestration framework (CrewAI/LangGraph) supported by a robust data acquisition layer (Firecrawl, Apify) and a semantic reasoning core powered by Large Language Models (LLMs).

## **Phase 1: Strategic Reconnaissance and Platform Deconstruction (Tasks 1–15)**

The foundation of the Opportunity Finder lies in a deep, forensic understanding of the platforms it seeks to emulate and integrate. We cannot build a universal interface without first reverse-engineering the logic, data structures, and user flows of the target ecosystems. This phase focuses on dissecting the "Big Three" verticals: Co-founder Matching, Gig Economy, and Employment.

### **1.1 Co-Founder Ecosystem Analysis and Logic Cloning**

The co-founder market is distinct from the job market; it is driven by "potential" rather than "track record," and "chemistry" rather than "skills." Platforms like Y Combinator (YC) Matching and CoffeeSpace have codified these intangible qualities into specific algorithmic interactions.  
**Task 1: Reverse-Engineer YC Co-Founder Matching Attributes** The YC Co-Founder Matching platform represents the gold standard for high-potential networking. Unlike standard job boards, it operates on a "double-blind" logic where interest must be mutual before identities are fully revealed.

* **SMART Objective:** By Week 2, produce a yc\_scoring\_model.json document that identifies 100% of the hidden weighting variables used in YC profiles (e.g., prestige markers, location rigidity) to inform the Agent’s internal scoring algorithm.  
* **Technical Execution:** The agent must recognize that YC profiles prioritize "north star" metrics. Snippets indicate that profiles highlight specific prestige markers: "Harvard Law," "E7 at DoorDash," or "Y Combinator Alum". The agent must be trained to parse these non-standard credentials—identifying that "E7 at DoorDash" implies a specific level of engineering seniority equivalent to a CTO at a smaller startup.  
* **Sub-Task:** Create a taxonomy of "Prestige Signals" extracted from 500 YC profiles to weight the agent's ranking logic.  
* **Sub-Task:** Analyze the "blind" workflow to determine at what stage the agent can intervene. Since the platform requires an invite-accept-match cycle , the agent cannot simply "scrape contact info." It must be designed to manage the *state* of the connection request.

**Task 2: Deconstruct CoffeeSpace’s Semantic Matching Engine** CoffeeSpace differentiates itself by using a "swipe" mechanic similar to dating apps and an underlying semantic matching engine that looks beyond keywords.

* **SMART Objective:** Complete a comparative analysis of CoffeeSpace’s "swipe" logic vs. traditional search by Week 3, identifying three specific UX features to clone for the agent’s "Triage Mode."  
* **Strategic Insight:** CoffeeSpace’s value proposition is "mission alignment". The Opportunity Finder must not just match "Python" with "Python"; it must match "Decentralized AI" with "Privacy-First Architecture." The agent requires a "Mission Vector" in its database schema to replicate this.  
* **Sub-Task:** Analyze CoffeeSpace’s onboarding questionnaire to recreate their psychometric profiling (e.g., risk tolerance, work style).  
* **Sub-Task:** Investigate the integration of Proxycurl by CoffeeSpace for automated LinkedIn enrichment. This feature is critical for reducing user onboarding friction and should be cloned.

**Task 3: Analyze Starthawk’s Search and Messaging Protocol** Starthawk offers a more traditional directory-based search with direct messaging capabilities.

* **SMART Objective:** Map the Starthawk messaging API (or DOM structure) to enable the agent to autonomously draft and queue introduction messages.  
* **Strategic Insight:** Starthawk allows filtering by specific criteria like "has idea" vs. "no idea". This binary distinction is crucial for the agent to route opportunities correctly—a user looking to *join* a startup needs different matches than one looking to *found* one.  
* **Sub-Task:** Define a "Readiness State" attribute in the Opportunity Schema based on Starthawk’s filters.

**Task 4: Establish Privacy and "Stealth Mode" Protocols** Many users of co-founder platforms are currently employed and browsing in "stealth mode." The agent acts as a proxy, but its automated behavior must not de-anonymize the principal.

* **SMART Objective:** Define a "Zero-Knowledge" interaction protocol by Week 3 that ensures no identifiable data is transmitted to third-party platforms during the scraping/querying phase.  
* **Technical Constraint:** YC profiles are private to approved users. The agent must operate via an authenticated session that is strictly gated.  
* **Sub-Task:** Implement a "Local-Only" processing rule where profile data is downloaded and analyzed locally, rather than sending candidate data to external LLM APIs without PII redaction.

### **1.2 Gig Economy and Bounty Platform Analysis**

The gig economy presents a different challenge: high volume, low latency, and rigid categorization.  
**Task 5: Map TaskRabbit and Dolly Service Taxonomies** TaskRabbit and Dolly (focused on delivery) utilize strict categorical hierarchies. A user offering "labor" cannot simply be listed; they must be listed under "Heavy Lifting," "Assembly," or "Moving."

* **SMART Objective:** Create a unified GigCategory ontology that maps 100% of TaskRabbit skills and Dolly vehicle types to a standardized internal format.  
* **Research Insight:** Dolly requires specific vehicle attributes (Pickup, Box Truck). The agent needs to know the user's asset inventory (e.g., "Do you own a truck?") to unlock these opportunities.  
* **Sub-Task:** Scrape the full category trees of both platforms to build a translation layer (e.g., "I have a drill" \-\> TaskRabbit "Mounting & Installation").

**Task 6: Deconstruct Upwork’s Bidding and "Connects" Economy** Upwork gamifies the proposal process with "Connects" (a virtual currency required to apply). Indiscriminate auto-applying will drain the user's budget instantly.

* **SMART Objective:** Develop a "Return on Connects" (RoC) scoring model that predicts the probability of a reply before the agent spends credits.  
* **Strategic Insight:** Speed is a factor, but "proposal relevance" is higher. The agent must be capable of parsing the job description and answering specific screening questions, which are common on Upwork.  
* **Sub-Task:** Analyze 100 successful Upwork proposals to identify common structural elements (e.g., "Restating the problem in the first sentence").

**Task 7: Scout Web3 Bounty Ecosystems (Gitcoin & Immunefi)** For technical users, the highest value "gigs" are often bug bounties or development grants on platforms like Gitcoin and Immunefi. These operate on radically different mechanics—often permissionless and result-based.

* **SMART Objective:** Integrate the Gitcoin Allo Protocol data structure into the agent’s scouting radar by Week 4\.  
* **Technical Context:** Gitcoin uses the Allo Protocol for capital allocation. The agent can query indexers or the blockchain directly to find active grant rounds, bypassing the need for UI scraping.  
* **Sub-Task:** Map Immunefi’s severity scales (Critical, High, Medium) to dollar value estimates to normalize them against hourly freelance rates.

### **1.3 Job Market and Niche Platform Analysis**

**Task 8: Analyze "Hidden" Job Markets (Pallet, Community Boards)** High-quality startup roles often appear on curated boards like Pallet or in private Slack/Discord communities before hitting Indeed.

* **SMART Objective:** Identify and catalog the top 50 niche Pallet boards and community servers relevant to the user's domain.  
* **Strategic Insight:** Pallet boards are community-specific (e.g., "Bankless Jobs"). The agent needs a "Community Discovery" module to find these fragmented URLs.  
* **Sub-Task:** Evaluate the feasibility of scraping Pallet, which uses a specific infrastructure distinct from standard ATSs.

**Task 9: Assess Technical Limitations of Major Job Boards (LinkedIn, Indeed)** The major platforms are hostile to automation. Official APIs are generally restricted to enterprise partners.

* **SMART Objective:** Determine the "Safe Operating Limits" for scraping LinkedIn and Indeed to avoid account bans.  
* **Research Insight:** PhantomBuster suggests a limit of \~80 profiles/day for LinkedIn scraping. The agent must enforce strict rate-limiting logic.  
* **Sub-Task:** Evaluate the Indeed Job Sync API documentation to see if "Read-Only" access is possible for personal use (unlikely, necessitating scraping).

**Task 10: Define the Unified "Opportunity Schema"** To allow the user to compare a $50k bounty, a $150k job, and a co-founder role with 50% equity, the data must be normalized.

* **SMART Objective:** Draft the JSON schema for the UniversalOpportunity object, covering 95% of fields across all target platforms.  
* **Schema Design:**  
  * type:  
  * compensation\_type:  
  * risk\_profile: \[Low, Medium, High\] (Derived from platform/stage)  
  * remote\_policy:  
  * source\_metadata: {...platform\_specific\_fields }

**Task 11: User Intake Strategy (SMART Goal Conversion)** Users rarely state their goals clearly. "I want a better job" is not actionable.

* **SMART Objective:** Design an onboarding interaction that forces the user to define constraints (e.g., "Min $120k," "Max 30 min commute").  
* **Sub-Task:** Create a "Trade-off Slider" UI (e.g., Equity vs. Salary) to weigh the matching algorithm.

**Task 12: Compliance and Legal Framework**

* **SMART Objective:** Establish a legal compliance matrix for the agent’s operation.  
* **Legal Context:** While scraping public data is generally protected (*HiQ vs LinkedIn*), scraping behind a login (like YC Matching) violates Terms of Service. The agent must be configurable to "Obey TOS" (restrictive) or "User Discretion" (permissive).  
* **Sub-Task:** Implement robots.txt parsing as a default setting.

**Task 13: Human-in-the-Loop (HITL) Architecture**

* **SMART Objective:** Define the intervention points where the agent *must* pause for approval.  
* **Design Principle:** No message is sent and no application is submitted without explicit user sign-off.  
* **Sub-Task:** Design the notification payload for HITL requests (e.g., "Draft Application Ready. Review?").

**Task 14: Select Agentic Framework (CrewAI vs. LangGraph)**

* **SMART Objective:** Finalize the orchestration stack.  
* **Decision:** Use **CrewAI** for the high-level collaboration between "Scout" and "Analyst" agents due to its role-based architecture. Use **LangGraph** for the specific, complex state machines required for form-filling and multi-step application processes, as it offers finer control over loops and retries.

**Task 15: Infrastructure Blueprint**

* **SMART Objective:** Produce a high-level system architecture diagram.  
* **Components:**  
  * *Ingestion:* Firecrawl, Apify.  
  * *Storage:* Vector DB (Weaviate), Relational DB (Postgres).  
  * *Compute:* Docker Containers on AWS Fargate.  
  * *Interface:* Next.js Dashboard.

## **Phase 2: Data Infrastructure and Acquisition Layer (Tasks 16–35)**

The "senses" of the agent. This phase focuses on building the pipelines that ingest raw data from the web and convert it into the structured UniversalOpportunity schema defined in Phase 1\. Given the diversity of sources, a "one size fits all" scraper is impossible. We will implement a tiered acquisition strategy.

### **2.1 Tier 1: Intelligent Web Scraping (The "Universal Scraper")**

**Task 16: Deploy Firecrawl for Generalized LLM-Ready Extraction** Traditional scrapers break when CSS classes change. Firecrawl is designed to convert websites into Markdown, which is the native language of LLMs.

* **SMART Objective:** Deploy a self-hosted Firecrawl instance by Week 5 capable of crawling any given company careers page and extracting job details with 95% accuracy.  
* **Technical Implementation:**  
  * The agent uses the "Map" feature of Firecrawl to find sub-pages (e.g., /careers/engineering).  
  * It uses the "Scrape" feature to extract the content as Markdown.  
  * **Sub-Task:** Configure concurrency limits to avoid overwhelming target servers (Ethical Scraping).

**Task 17: Implement Apify Actors for "Hard Targets"** Platforms like LinkedIn and Wellfound use sophisticated anti-bot measures (fingerprinting, CAPTCHAs). Building custom scrapers for these is a maintenance nightmare.

* **SMART Objective:** Integrate Apify’s specialized actors for LinkedIn, Wellfound, and Glassdoor.  
* **Wellfound Strategy:** Use the radeance/wellfound-job-listings-scraper which handles the complex pagination and infinite scroll of Wellfound’s React application.  
* **LinkedIn Strategy:** Use linkedin-jobs-scraper via Apify. Note the limitation: LinkedIn scrapers often require a valid session cookie. The agent must include a secure vault to store and rotate these cookies.  
* **Sub-Task:** Set up a webhook listener to receive data from Apify actors asynchronously.

**Task 18: Develop Headless Browser Agents (Playwright) for SPAs** Some platforms, particularly YC Matching, act as Single Page Applications (SPAs) where data is loaded dynamically after user interaction (clicks).

* **SMART Objective:** Build a Playwright-based agent to navigate the YC Co-Founder Matching portal.  
* **Technical Implementation:**  
  * The agent launches a browser context with storageState injected (pre-authenticated cookies).  
  * It simulates human-like mouse movements to avoid bot detection.  
  * It intercepts network responses (XHR/Fetch) to capture the JSON data payloads directly, rather than parsing the DOM.

**Task 19: Integrate Exa.ai for Semantic Discovery** Keyword search is insufficient. A user looking for "companies building AI agents" might miss a company that describes itself as "automating workflows with LLMs."

* **SMART Objective:** Integrate Exa.ai (formerly Metaphor) to enable embedding-based search for company discovery.  
* **Value Proposition:** Exa allows the agent to search for "link similar to this one," enabling it to expand a seed list of interesting companies into a broader market map.  
* **Sub-Task:** Implement a nightly "Discovery Routine" that queries Exa for new domains matching the user's interest vector.

### **2.2 Tier 2: Official and Quasi-Official APIs**

**Task 20: Upwork API and RSS Hybrid Strategy** Upwork’s API is restrictive. However, they provide RSS feeds for specific search queries.

* **SMART Objective:** Implement a polling engine that checks Upwork RSS feeds every 15 minutes for new gigs.  
* **Sub-Task:** Use the Upwork API (if access granted) only for the "Apply" phase to conserve rate limits. Use RSS for the "Discovery" phase.

**Task 21: Web3 Data Ingestion (Allo Protocol & Immunefi)**

* **SMART Objective:** Build an indexer for the Gitcoin Allo Protocol.  
* **Technical Implementation:** The Allo Protocol emits events on-chain when new pools are created. The agent can listen to these events or query a subgraph (The Graph) to detect new grant rounds instantly.  
* **Sub-Task:** Scrape Immunefi’s bounty list JSON (often exposed in their frontend app bundle) to get real-time bounty data.

**Task 22: TaskRabbit and Dolly Location Monitoring**

* **SMART Objective:** Build a location-aware scraper for local gigs.  
* **Technical Implementation:**  
  * TaskRabbit shows different tasks based on Zip Code. The agent must iterate through the user's target zip codes.  
  * For Dolly, the agent simulates a "Get Quote" request to see availability and pricing in the area.

### **2.3 Data Processing and Storage Layer**

**Task 23: Vector Database Implementation (Weaviate)** To match opportunities semantically, we need a Vector DB. Weaviate is selected for its hybrid search capabilities (combining symbolic filters with vector similarity).

* **SMART Objective:** specific Weaviate schema deployment by Week 6\.  
* **Schema Strategy:**  
  * **Class:** Opportunity  
  * **Vector:** Embedding of the description \+ title.  
  * **Properties:** salary (int), equity (float), skills (text array), source (string).  
  * **Sub-Task:** Configure the text2vec-openai module for automatic embedding generation.

**Task 24: Opportunity Normalization Engine**

* **SMART Objective:** Develop a Python pipeline to normalize disparate compensation models.  
* **Logic:**  
  * Convert "Hourly Rate" to "Annualized Salary" (Rate \* 2000).  
  * Convert "Equity %" to "Estimated Value" (Equity \* Estimated\_Valuation).  
  * *Note:* Estimated Valuation can be fetched from a minimalist Crunchbase lookup or heuristic based on funding stage (Seed \= $10M cap).

**Task 25: Deduplication and Entity Resolution**

* **SMART Objective:** Eliminate duplicate listings across platforms.  
* **Logic:** If Company Name (fuzzy match) AND Job Title (fuzzy match) are \> 90% similar, merge the records. Prefer the source with more data (e.g., prefer Wellfound over a LinkedIn aggregators).

**Task 26: Skill and Attribute Extraction (LLM-Based)**

* **SMART Objective:** Extract structured attributes from unstructured text.  
* **Implementation:** Pass the job description to a small, fast LLM (e.g., gpt-4o-mini).  
  * **Prompt:** "Extract the following as JSON: required\_skills, years\_experience, remote\_policy (Remote/Hybrid/Onsite), visa\_sponsorship (True/False)."

**Task 27: Sentiment and "Vibe" Analysis**

* **SMART Objective:** Score every opportunity for "Culture Signals."  
* **Implementation:** Analyze text for keywords indicating toxicity ("fast-paced," "rockstar," "work hard play hard") vs. health ("work-life balance," "learning budget").  
* **Sub-Task:** Cross-reference company name with Glassdoor ratings if scraped.

**Task 28: Proxy Rotation Infrastructure**

* **SMART Objective:** Achieve \< 1% failure rate due to IP blocks.  
* **Technical Implementation:** Route all scraping traffic through a residential proxy network (e.g., Bright Data). Implement exponential backoff for retries.

**Task 29: User Profile Vectorization**

* **SMART Objective:** Create a detailed vector representation of the user.  
* **Implementation:** Ingest the user’s Resume, LinkedIn PDF, and Portfolio. Chunk this text and embed it into the same vector space as the opportunities.

**Task 30: Automated Scheduler (n8n Integration)**

* **SMART Objective:** Orchestrate the data pipeline.  
* **Tool:** n8n.  
* **Workflow:**  
  * Trigger: Every 6 hours.  
  * Step 1: Run Apify Actors.  
  * Step 2: Run Firecrawl on tracked company lists.  
  * Step 3: Run Normalizer.  
  * Step 4: Update Vector DB.

**Task 31: PII Redaction Module**

* **SMART Objective:** Automatically strip emails/phones from scraped co-founder profiles before storage.  
* **Reasoning:** Minimizes GDPR liability.

**Task 32: Secure Credential Vault**

* **SMART Objective:** Implement AWS Secrets Manager to store LinkedIn cookies and Upwork API keys.

**Task 33: Compliance Logging**

* **SMART Objective:** Maintain an immutable log of every URL scraped and the robots.txt status at the time of access.

**Task 34: "Stealth" Browser Fingerprinting**

* **SMART Objective:** Configure Playwright to pass strict bot detection tests (e.g., pixelscan.net).  
* **Technique:** Use puppeteer-extra-plugin-stealth techniques adapted for Playwright.

**Task 35: Data Retention Policy**

* **SMART Objective:** Auto-archive opportunities older than 30 days to ensure freshness.

## **Phase 3: The Intelligence Core – Agentic Workflows (Tasks 36–65)**

With the data ingested and structured, we build the "brain." This phase utilizes **CrewAI** to create a team of specialized AI agents that mimic a human recruiting team: a Researcher (Scout), an Analyst (Matchmaker), and a Copywriter (Outreach).

### **3.1 Orchestration Framework Setup**

**Task 36: Initialize CrewAI Environment**

* **SMART Objective:** Configure the CrewAI runtime environment by Week 7\.  
* **Configuration:** Define the agents.yaml and tasks.yaml files.  
* **Framework Choice:** CrewAI is selected for its ability to define "Personas". A "Senior Recruiter" persona performs better at evaluating resumes than a generic LLM.

**Task 37: Develop "The Scout" Agent (Researcher)**

* **Role:** Market Researcher.  
* **Goal:** "Find the top 20 new opportunities today that match the User's Vector."  
* **Tools:** VectorSearchTool (queries Weaviate), ExaSearchTool (queries the web).  
* **Logic:** The Scout filters the raw stream. It creates a shortlist.

**Task 38: Develop "The Matchmaker" Agent (Analyst)**

* **Role:** Career Coach / Venture Associate.  
* **Goal:** "Rigorously evaluate the shortlist. Calculate a Match Score (0-100) based on the user's hard constraints and soft preferences."  
* **Chain of Thought:** "The user wants a remote job. This job is remote. The user knows React. This job needs Vue. Score penalty: \-10. Final Score: 85."

**Task 39: Develop "The Networker" Agent (Outreach)**

* **Role:** PR Specialist.  
* **Goal:** "Draft the initial communication for the approved matches."  
* **Capabilities:** Must be able to switch tone—formal for a bank job, casual for a crypto bounty, passionate for a co-founder intro.

### **3.2 specialized Workflows (LangGraph)**

For complex, multi-step processes where the agent might need to "go back" or handle errors, **LangGraph** is the superior tool.  
**Task 40: Job Application State Machine**

* **SMART Objective:** Map the application lifecycle.  
* **States:** New \-\> Researched \-\> Drafted \-\> User\_Approved \-\> Applied \-\> FollowUp\_Scheduled.  
* **Error Handling:** If the "Apply" step fails (e.g., form error), the state reverts to Error\_Review for human intervention.

**Task 41: Co-Founder Dating Workflow**

* **SMART Objective:** Manage the delicate "warm intro" process.  
* **Logic:**  
  * Step 1: Check user's LinkedIn connections for mutuals.  
  * Step 2: If Mutuals \> 0, draft an "Ask for Intro" message to the connection.  
  * Step 3: If Mutuals \= 0, draft a cold message referencing a specific detail in the target's profile ("I saw your talk at PyCon...").

**Task 42: Bounty Hunter Workflow**

* **SMART Objective:** Real-time reaction.  
* **Logic:**  
  * Event: New Bounty Detected via RSS.  
  * Check: Does user have required skills?  
  * Action: If Match \> 90%, send immediate Telegram push notification. (Bounties are time-sensitive).

### **3.3 Advanced Matching and Filtering Logic**

**Task 43: "North Star" Alignment Scoring**

* **SMART Objective:** Implement mission-based matching.  
* **Technique:** Calculate the semantic distance between the User’s "Manifesto" (a text blob describing their values) and the Company’s "Mission Statement."

**Task 44: "Anti-Goal" Filtering**

* **SMART Objective:** Filter out deal-breakers.  
* **Logic:** Hard filters for industries (e.g., "Gambling," "Defense") or keywords ("Legacy Code," "On-call").

**Task 45: Tech Stack Compatibility Matrix**

* **SMART Objective:** Granular skill matching.  
* **Logic:** Differentiate between "Required" and "Nice to have."  
  * User has React, Job wants React \-\> \+20 points.  
  * User has React, Job wants Angular \-\> \-5 points (transferable skill).  
  * User has React, Job wants C++ \-\> \-50 points (mismatch).

**Task 46: Experience Calibration (Inflation/Deflation)**

* **SMART Objective:** Normalize titles.  
* **Insight:** A "VP" at a 5-person startup is equivalent to a "Senior" at Google. The agent must calibrate titles based on company size data (fetched via Firecrawl/Apify).

**Task 47: Founder "Psychometric" Profiling**

* **SMART Objective:** Analyze co-founder bios for red flags.  
* **Implementation:** LLM analysis of bios. Flags: "Vague about equity," "History of failed ventures," "Aggressive language."

### **3.4 LLM Integration and Optimization**

**Task 48: LLM Selection (OpenAI vs Claude)**

* **Decision:** Use **Claude 3.5 Sonnet** for the "Networker" agent (better nuance/writing) and **GPT-4o** for the "Matchmaker" (better reasoning/json-mode).

**Task 49: Semantic Caching**

* **SMART Objective:** Reduce API costs by 30%.  
* **Implementation:** Use GPTCache. If the agent analyzes the same job description twice (e.g., from two different boards), return the cached analysis.

**Task 50: Fine-Tuning "The Coach" (Optional)**

* **Objective:** If base models fail to capture the user's voice, fine-tune a Llama-3-8B model on the user's past emails and cover letters.

### **3.5 Autonomous Action Execution**

**Task 51: Resume Customization Engine**

* **SMART Objective:** Generate a tailored resume for every application.  
* **Implementation:** The agent maintains a "Master Resume" JSON. It selects the relevant projects/bullets for the specific job and renders a new PDF using a LaTeX template.

**Task 52: Cover Letter Generator**

* **Technique:** "One-Shot" prompting. "Here is the job. Here is the user's writing style. Write a cover letter that mentions \[Company News X\]."

**Task 53: LinkedIn Connection Request Personalizer**

* **Constraint:** 300 characters max.  
* **Logic:** "Hi \[Name\], I saw you're building \[Product\]. I'm a dev dealing with \[Problem\] and would love to connect."

**Task 54: Proposal Generator for Upwork**

* **Logic:** Address the client's problem in the *first line*. "I see you need a Python script to scrape YC. I have a Firecrawl setup ready to do this..."

**Task 55: Calendar Scheduling Agent**

* **Objective:** Coordinate meetings.  
* **Integration:** Google Calendar API. When a positive reply is detected, the agent sends a Calendly link or proposes times.

**Task 56: "Form Filler" Scripts (Selenium)**

* **SMART Objective:** Automate Greenhouse/Lever forms.  
* **Implementation:** Maintain a library of Selenium scripts for the top 5 ATS platforms. These have predictable DOMs (id="first\_name").

**Task 57: CAPTCHA Solving Integration**

* **Tool:** 2Captcha or CapSolver API.  
* **Logic:** If CAPTCHA detected \-\> Pause \-\> Send to API \-\> Wait for Token \-\> Inject Token.

**Task 58: Cold Email Infrastructure**

* **SMART Objective:** Ensure deliverability.  
* **Implementation:** Use a dedicated subdomain for agentic outreach to protect the user's main domain reputation.

**Task 59: Follow-Up Management**

* **Logic:** If no reply in 3 days \-\> Send polite bump. Max 2 follow-ups.

**Task 60: Interview Prep Agent**

* **Output:** A "Dossier" PDF. Contains: Interviewer bios, recent company news, potential culture questions, and suggested questions to ask.

**Task 61: Negotiation Advisor**

* **Logic:** When an offer is received, the agent searches levels.fyi for comparable salaries and suggests a counter-offer range.

**Task 62: Portfolio "Project" Generator**

* **Logic:** For gig work, auto-select the 3 most relevant portfolio items to attach to the bid.

**Task 63: Reference Checker**

* **Logic:** For potential co-founders, the agent searches for "Back-channel" references—people in the user's network who overlap with the target's past companies.

**Task 64: "Stealth" Mode Operations**

* **Logic:** Ensure all LinkedIn views are done in "Private Mode" (if possible) or via the API to prevent "XYZ viewed your profile" notifications revealing the user.

**Task 65: Error Handling and Retry Logic**

* **Implementation:** Dead Letter Queue. If an application fails, log it, alert the user, and retry later.

## **Phase 4: User Interface and Control (Tasks 66–80)**

The agent needs a cockpit. The user experience should be "High-Level Direction, Low-Level Automation."  
**Task 66: Build "Command Center" Dashboard**

* **Tech Stack:** Next.js (Frontend) \+ FastAPI (Backend).  
* **Views:**  
  * **Inbox:** New matches waiting for triage.  
  * **Active:** Applications sent, awaiting reply.  
  * **Scheduled:** Upcoming interviews.

**Task 67: "Swipe" Interface (Tinder for Jobs)**

* **SMART Objective:** Implement the CoffeeSpace mechanic.  
* **Value:** Swiping is faster than reading lists. It also generates training data (Right Swipe \= Positive Signal) to update the User Vector.

**Task 68: Telegram/Slack Bot Integration**

* **Objective:** Push notifications.  
* **Flow:** Agent sends: "New High Match (95%).. Apply?" User replies: "Yes." Agent executes.

**Task 69: Profile Editor & Document Vault**

* **Functionality:** Drag-and-drop interface for Resumes, Transcripts, and Portfolios.

**Task 70: "Agent Logs" Transparency Viewer**

* **Objective:** Trust building.  
* **Display:** A terminal-like stream showing the agent's actions: "Scraping YC... Found 5 profiles... Filtering... 1 Match."

**Task 71: Approval Queue Implementation**

* **Logic:** A "Drafts" folder. The user can bulk-approve or edit messages before they are sent.

**Task 72: Analytics Dashboard**

* **Metrics:** Funnel visualization. Matches \-\> Swiped Right \-\> Applied \-\> Interviewed \-\> Offers.

**Task 73: "Magic Link" Authentication**

* **Tool:** Auth0 or Supabase Auth. Passwordless login for ease of use.

**Task 74: Mobile-Responsive Design**

* **Objective:** Triage on the go. The "Swipe" interface must be mobile-first.

**Task 75: Voice Interface (Whisper API)**

* **Objective:** "Agent, pause the search for co-founders, I'm going on vacation."

**Task 76: "Daily Digest" Email Generator**

* **Format:** A structured email summary at 8:00 AM. "3 new jobs, 1 co-founder match, 2 interview requests."

**Task 77: Granular Settings & Preferences**

* **Controls:** Sliders for "Risk Tolerance," "Equity vs Salary," "Remote Importance."

**Task 78: "Vacation Mode" Toggle**

* **Logic:** Pauses all outgoing actions and auto-replies to incoming messages with a delay notice.

**Task 79: Data Export Feature**

* **Format:** CSV/JSON export of all applications for the user's records.

**Task 80: Integration with Productivity Tools (Notion/Airtable)**

* **SMART Objective:** Sync status.  
* **Logic:** When the agent applies, it creates a row in the user's Notion "Job Search" database.

## **Phase 5: Deployment, Security, and Scale (Tasks 81–100)**

**Task 81: Unit Testing of Scrapers**

* **Strategy:** Maintain "Golden HTML" files (static snapshots of target sites). Run tests against these to ensure parsing logic works even if the live site is down.

**Task 82: Integration Testing of Workflows**

* **Strategy:** Mock the LLM responses to test the state machine logic without incurring API costs.

**Task 83: Load Testing**

* **Objective:** Ensure the system can handle scraping 50 sites concurrently without crashing.

**Task 84: Rate Limit Simulation**

* **Strategy:** Simulate 429 errors from APIs to ensure the backoff logic works.

**Task 85: OWASP Security Audit**

* **Focus:** Prevent SQL Injection in the dashboard and XSS in the description renderer.

**Task 86: GDPR/CCPA Compliance**

* **Action:** Ensure the "Delete Account" button actually wipes all scraped data associated with the user.

**Task 87: Dockerization**

* **Deliverable:** docker-compose.yml defining the Agent, DB, Scraper Service, and UI.

**Task 88: Cloud Deployment (AWS/GCP)**

* **Architecture:** Deploy on AWS ECS (Fargate) for serverless container management. Use RDS for the relational DB.

**Task 89: CI/CD Pipelines (GitHub Actions)**

* **Flow:** Commit \-\> Test \-\> Build Image \-\> Deploy to Staging.

**Task 90: Monitoring & Observability (Prometheus/Grafana)**

* **Metrics:** "Scraper Success Rate," "LLM Latency," "API Cost per Day."

**Task 91: Cost Monitoring and Alerts**

* **Objective:** Alert if OpenAI spend exceeds $5/day.

**Task 92: "Kill Switch" Implementation**

* **Importance:** Immediate hardware/software stop if the agent goes rogue (e.g., spamming applications).

**Task 93: Beta User Onboarding**

* **Objective:** Recruit 5 "Alpha" users to test the match quality.

**Task 94: Feedback Loop (RLHF)**

* **Logic:** Use the "Swipe" data to fine-tune the embedding model (retrieval ranking).

**Task 95: Documentation**

* **Deliverable:** API docs and a "User Guide" explaining how to write a "Manifesto" for the agent.

**Task 96: Open Source Strategy**

* **Decision:** Open source the generic scrapers (to get community fixes) but keep the matching logic proprietary.

**Task 97: Community Building**

* **Action:** Create a Discord for users to share "Agent Wins."

**Task 98: Roadmap Planning (V2)**

* **Future:** "Auto-Interview" with AI avatars? "Salary Negotiation" bot?

**Task 99: Final System Polish**

* **Action:** UI cleanup, loading states, error messages.

**Task 100: Launch**

* **Action:** Release the Kraken.

### **Table 1: Core Technology Stack Summary**

| Component | Technology | Rationale |
| :---- | :---- | :---- |
| **Orchestration** | CrewAI \+ LangGraph | CrewAI for high-level roles; LangGraph for complex state machines. |
| **Scraping** | Firecrawl \+ Apify | Firecrawl for LLM-ready markdown; Apify for difficult SPAs (LinkedIn). |
| **Discovery** | Exa.ai | Semantic search finds companies keyword search misses. |
| **Database** | Weaviate | Hybrid search (Vector \+ Keyword) is essential for job matching. |
| **LLM** | GPT-4o / Claude 3.5 | GPT-4o for logic/JSON; Claude 3.5 Sonnet for writing/nuance. |
| **UI** | Streamlit / Next.js | Streamlit for rapid internal tools; Next.js for production dashboard. |
| **Browser** | Playwright | Robust handling of dynamic content and stealth plugins. |

### **Table 2: Opportunity Normalization Schema Example**

| Field | Co-Founder Role | Freelance Gig | Full-Time Job |
| :---- | :---- | :---- | :---- |
| **compensation\_cash** | $0 (initially) | $500 (fixed) | $150,000 (annual) |
| **compensation\_equity** | 10% \- 50% | 0% | 0.01% \- 0.5% |
| **risk\_score** | High (9/10) | Low (2/10) | Medium (5/10) |
| **commitment** | 5+ Years | 1 Week | Indefinite |
| **key\_asset** | Vision/Chemistry | Output/Deliverable | Skills/Experience |
| **source\_platform** | YC Matching | Upwork | LinkedIn |

This plan provides a comprehensive roadmap for building the Opportunity Finder. By rigorously executing these 100 tasks, we can create a system that fundamentally alters the economics of professional opportunity discovery, giving the user a decisive advantage in the market.

#### **Works cited**

1\. Y Combinator Co-Founder Matching Platform \- find a co-founder ..., https://www.ycombinator.com/cofounder-matching 2\. CoffeeSpace: Connect & Build – Apps on Google Play, https://play.google.com/store/apps/details?id=com.coffeespace.cofoundermatch\&hl=en\_GB 3\. How CoffeeSpace Powers Its Tinder-Like Cofounder Matching App with Proxycurl, https://nubela.co/blog/coffeespace-powers-its-cofounder-matching-app-with-proxycurl/ 4\. StartHawk \- Online Community for Entrepreneurship, Cofounder \- Hive Index, https://thehiveindex.com/communities/starthawk/ 5\. Top 10 Taskrabbit Alternatives & Competitors in 2026 \- G2, https://www.g2.com/products/taskrabbit/competitors/alternatives 6\. Overview, https://developer.taskrabbit.com/docs/overview 7\. The Best Gig Work Websites in 2026 \- Upwork, https://www.upwork.com/resources/best-gig-economy-platforms 8\. Gitcoin \+ Chainlink: Bug Bounty Program, https://www.gitcoin.co/blog/gitcoin-chainlink-bug-bounty-program 9\. Immunefi Bug Bounties | Immunefi, https://immunefi.com/bug-bounty/immunefi/information/ 10\. Allo Protocol – Allo Docs \- Gitcoin, https://docs.allo.gitcoin.co/ 11\. Gitcoin Grants 24: Fund What Matters, https://grants.gitcoin.co/ 12\. Pallet \- Features, Reviews, Alternatives \- VC Stack, https://www.vcstack.io/product/pallet 13\. Company | Pallet.com, https://www.pallet.com/company 14\. Integrate with the Job Sync API | Indeed Partner Docs, https://docs.indeed.com/job-sync-api/integrate-with-job-sync-api 15\. How to use the LinkedIn Job Scraper \- PhantomBuster, https://support.phantombuster.com/hc/en-us/articles/26970965144338-How-to-use-the-LinkedIn-Job-Scraper 16\. Radeance/wellfound-jobs-scraper-public: Premium jobs ... \- GitHub, https://github.com/Radeance/wellfound-jobs-scraper-public 17\. Framework for orchestrating role-playing, autonomous AI agents. By fostering collaborative intelligence, CrewAI empowers agents to work together seamlessly, tackling complex tasks. \- GitHub, https://github.com/crewAIInc/crewAI 18\. CrewAI vs LangGraph vs n8n | AI Agent Framework Comparison \- 3Pillar Global, https://www.3pillarglobal.com/insights/blog/comparison-crewai-langgraph-n8n/ 19\. Firecrawl MCP \+ n8n: The Ultimate Web Scraping AI Agent Tutorial \- YouTube, https://www.youtube.com/watch?v=5nA14JLCWfU 20\. Scrape ANYTHING with Firecrawl's NEW AI Agent (+Scraping Guide) \- YouTube, https://www.youtube.com/watch?v=kt8Ow7ujdSA 21\. LinkedIn Job Scraper tutorial \- PhantomBuster, https://phantombuster.com/automations/linkedin/6772788738377011/linkedin-job-scraper/tutorial 22\. Track down all Devpost Hackathon Projects via Participant List (when project gallery isn't released) \- GitHub Gist, https://gist.github.com/ThePyProgrammer/c69bcca827c9509486256b081090abc3 23\. LLM \+ Web Search API Demos and Tutorials \- Exa, https://exa.ai/demos 24\. Web Search API and Crawling for AI \- Exa, https://exa.ai/exa-api 25\. MDalamin5/End-to-End-Agentic-Ai-Automation-Lab: This ... \- GitHub, https://github.com/MDalamin5/End-to-End-Agentic-Ai-Automation-Lab 26\. Automated signal-based prospecting with n8n (Firecrawl \+ AI search \+ AI assessment), https://www.reddit.com/r/n8n/comments/1p79c7w/automated\_signalbased\_prospecting\_with\_n8n/ 27\. Automate competitor research with Exa.ai, Notion and AI agents | n8n workflow template, https://n8n.io/workflows/2354-automate-competitor-research-with-exaai-notion-and-ai-agents/