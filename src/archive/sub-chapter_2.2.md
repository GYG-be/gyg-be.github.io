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
