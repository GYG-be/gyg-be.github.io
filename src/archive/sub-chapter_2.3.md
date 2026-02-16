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
