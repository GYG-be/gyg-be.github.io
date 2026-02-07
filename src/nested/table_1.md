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
