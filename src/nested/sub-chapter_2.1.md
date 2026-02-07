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
