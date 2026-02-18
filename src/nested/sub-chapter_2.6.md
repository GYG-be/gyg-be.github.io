## Phase 6: Maintenance, Security & Strategic Refinement (Points 86–100)

**Point 86: API Key Rotation — Monthly Security Hygiene.**
Store all API keys in macOS Keychain (not YAML files — never YAML files). Write a script that: pulls keys from Keychain, rotates them at each provider (most have one-click rotation), updates Keychain with new values, and notifies you via Telegram when rotation is complete. Schedule this as a monthly LaunchAgent job. A single leaked API key can compromise your entire intelligence operation.

*Weaknesses:* Keychain access from scripts requires specific entitlements and can break after macOS updates that change security policies.
*Opportunities:* Consider HashiCorp Vault (free open-source edition, runs in Podman on Secondary) for more sophisticated secrets management — it provides audit logs of every secret access, which Keychain doesn't.

---

**Point 87: Data Provenance Tagging — Primary vs. Secondary Sources.**
Tag every piece of intelligence in your DuckDB database with a `source_tier` field: `primary` (SEC filings, USPTO, EDGAR, GitHub API), `secondary_verified` (journalism that cites primary sources), or `secondary_unverified` (social media, rumor, analyst opinion). Query filters can then ensure your Auditor weights primary-source signals more heavily than social media noise.

*Weaknesses:* Tiering requires judgment calls; some "secondary" sources (e.g., a FOIA-sourced investigative piece) are more reliable than some "primary" sources (e.g., a company's press release).
*Opportunities:* Add a `verifiability` score alongside the tier: primary sources that are machine-readable and consistent (SEC filings) score higher than primary sources that are self-reported and potentially selective (company blog posts).

---

**Point 88: Hallucination Mitigation — Ground All Agent Outputs.**
Configure every agent prompt to include: "Ground every factual claim in a specific, citable source. If you cannot cite a source, flag the claim as 'inference' rather than stating it as fact." Run a post-processing validation step that checks each claim in the Synthesizer's output against your source database — any claim without a matching source gets flagged for human review before the output is used.

*Weaknesses:* Strict citation requirements slow down agent outputs and can make briefs feel stilted; not every inference needs a citation.
*Opportunities:* Distinguish between "factual claims about the company" (require citation) and "analytical conclusions" (clearly labeled as your assessment). The goal is traceable facts, not a legal brief.

---

**Point 89: Adversarial Testing — "Poison Pill" Leads.**
Monthly, manually inject 3–5 "poison pill" leads into the system: fake job postings that match your ICP on the surface but contain disqualifying signals buried in the description, or leads from companies you know are bad fits. Measure whether the Auditor correctly scores and rejects these. This is your system's "fire drill" — don't wait for a real failure to discover your filters aren't working.

*Weaknesses:* Manually constructed poison pills may not match the actual distribution of misleading real-world leads.
*Opportunities:* Use LLM-generated adversarial examples: prompt an LLM to "write a job description that superficially matches the following ICP but contains subtle red flags that a careful reader would identify." This produces more realistic test cases than manual construction.

---

**Point 90: Ethical Guardrails — The OSINT Line.**
Explicitly configure `clawctl` to enforce: (1) no access to password-protected content without explicit authorization, (2) no use of data obtained through unauthorized scraping of platforms that prohibit it in their ToS, (3) no storage of personally identifiable information beyond what's publicly available and professional in nature (no personal addresses, no non-work phone numbers), and (4) no automated outreach to individuals who have not expressed openness to contact. Log all policy decisions.

*Weaknesses:* These guardrails require manual configuration and can be inadvertently bypassed by overly permissive skill definitions.
*Opportunities:* Implement Constitutional AI-style prompting across all agents: include your ethical constraints directly in the system prompt, not just as external policy configuration. Constraints that are internalized in the prompt are harder to accidentally bypass than external rule sets.

---

**Point 91: Model Drift Monitoring — Keep the Auditor Calibrated.**
Monthly, re-score 20 leads from 90 days ago using your current Auditor configuration and compare against the original scores. If the distribution of scores shifts by more than 10 points on average, something has drifted — either the model, the prompts, or (importantly) your actual ICP preferences. Identify which and recalibrate accordingly.

*Weaknesses:* Monthly recalibration is resource-intensive; if your situation is stable, the drift may not justify the effort.
*Opportunities:* Automate the recalibration check — it's just a batch re-scoring job that can run overnight on Secondary. The human work is only in interpreting the drift report, not running it.

---

**Point 92: Temporal Knowledge Graph — Track Company Evolution.**
Use Graphiti (or a custom solution in Neo4j) to maintain time-stamped versions of each company's tech stack, team size, funding status, and key personnel. This lets you query: "What changed about this company between 6 months ago and today?" A company that has shifted stack, raised, and lost its CTO in the past 6 months is in maximum flux — and maximum flux is maximum opportunity.

*Weaknesses:* Maintaining temporal state in a graph database requires careful schema design; naive implementations create "version explosion" as every update creates new nodes.
*Opportunities:* Use a "property graph with timestamps" approach (add `valid_from` and `valid_to` properties to relationship edges) rather than creating new nodes for each state change — this keeps the graph manageable while preserving the full history.

---

**Point 93: Prompt Engineering Iteration — Chain of Thought for Complex Matching.**
For your most important agent prompt (the Auditor's ICP matching logic), implement a Chain of Thought approach: require the model to reason step by step through each scoring dimension before producing a final score. This improves scoring consistency and, crucially, produces an interpretable "reasoning trail" that you can review when a score surprises you.

*Weaknesses:* Chain of Thought prompts are longer and use more tokens; at scale, this adds meaningful cost.
*Opportunities:* Use CoT prompting for the Auditor (high-value decisions) and standard prompting for the Scout (high-volume, lower-stakes triage). Reserve your best inference horsepower for the decisions that matter most.

---

**Point 94: Local Vector Search — Qdrant for Hybrid Retrieval.**
Replace ChromaDB with Qdrant (runs as a Docker container, has an official macOS binary, and provides better performance at scale) for your primary vector store. Qdrant's hybrid search (dense vectors + sparse keyword matching) dramatically improves recall for technical queries where exact terminology matters alongside semantic similarity.

*Weaknesses:* Qdrant is more complex to operate than ChromaDB; the client library has a steeper learning curve.
*Opportunities:* Use Qdrant's built-in collection snapshots for daily backups to your Secondary node — this gives you a complete, restorable archive of your entire intelligence base without writing custom backup code.

---

**Point 95: Docker/OCI Container Packaging — Portability Insurance.**
Package your entire OpenClaw configuration (not the models, which are too large, but the skills, configurations, agent definitions, and support services like Redis and Qdrant) as a set of `docker-compose` (or Podman Compose) files. This ensures that if you need to migrate to cloud infrastructure (e.g., a CoreWeave GPU instance for scale) or hand this setup to a collaborator, the entire non-model stack deploys in a single command.

*Weaknesses:* Container images for macOS ARM64 are still not universal; some containers require Rosetta translation, adding latency.
*Opportunities:* Build `linux/arm64` container images explicitly using Podman's `--platform` flag — this ensures your containers run natively on M4 without any translation overhead, and will also run natively on AWS Graviton instances if you scale to cloud.

---

**Point 96: HITL Scaling — Tiered Human Involvement.**
As your lead volume grows, your Human-in-the-Loop strategy must evolve. Configure three tiers: Tier 1 (auto-execute, no human needed — RSS monitoring, scoring, filing to database), Tier 2 (human review before action — outreach drafts, CV customizations), Tier 3 (human-initiated only — co-founder conversations, large contract negotiations). The system handles Tier 1 at machine speed; you stay focused on Tier 2 review and Tier 3 execution.

*Weaknesses:* Tier boundaries require judgment calls that are hard to encode precisely; edge cases will repeatedly fall in the wrong tier.
*Opportunities:* Add an "escalation vote" mechanism — if the Auditor is uncertain about which tier an action belongs in (confidence below a threshold), it automatically routes to Tier 2 for human review rather than defaulting to the lower tier. When in doubt, ask.

---

**Point 97: Source Provenance Policy — Synthetic Data Controls.**
Establish a standing rule: no "synthetic" or LLM-generated data about companies (inferred facts, hallucinated details, speculative financial figures) is ever stored in your primary intelligence database without a human validation flag. Your DuckDB schema should have a `synthetic_flag` boolean and a `validation_status` field on every record. This prevents the insidious compounding of errors where synthetic "facts" feed future synthesis that produces more synthetic "facts."

*Weaknesses:* Flagging every synthetic datum requires discipline and slows data entry.
*Opportunities:* Make the `synthetic_flag` default to `TRUE` and require an explicit override to store something as verified fact — this flips the default from "trust everything" to "verify before trusting," which is the correct epistemic posture for intelligence work.

---

**Point 98: Continuous Benchmarking — Monthly System Report Card.**
On the first Monday of each month, generate an automated system performance report covering: lead discovery volume and quality trend, Auditor scoring accuracy (based on outcome data), outreach response rates, time from discovery to first contact, and total infrastructure cost for the month. This is your system's "performance review" — treat it with the same seriousness you'd bring to a business P&L.

*Weaknesses:* Monthly reports are backward-looking; they tell you what happened but don't necessarily prescribe what to change.
*Opportunities:* Add a "recommended adjustments" section to the report, generated by the Synthesizer agent reviewing all the metrics and suggesting specific configuration changes. This closes the loop from data to action.

---

**Point 99: Lay the Keel — Start with One Sensor, Build from There.**
The most important lesson across all 100 points: start with one thing that works reliably before adding the next. The recommended starting point for the dual M4 setup is the SEC EDGAR monitor (Point 26) — it requires no browser automation, no ToS concerns, no login credentials, and produces high-quality primary-source intelligence. Get it running, scoring leads, and alerting you reliably. Then add the next sensor. *Resist the impulse to build all 100 at once.*

*Weaknesses:* Starting narrow means slow initial coverage; you'll miss opportunities in areas you haven't yet instrumented.
*Opportunities:* The discipline of getting one thing right before adding the next builds your understanding of how the system fails and how to fix it. The engineers who build reliable intelligence systems are the ones who've debugged each component thoroughly in isolation before integrating it into the mesh.

---

**Point 100: The Monthly Self-Intelligence Audit — Are You Winning the Information War?**
On the last Friday of each month, conduct a structured 45-minute self-review: How many opportunities did your system surface that you wouldn't have found manually? How many of the conversations you had this month came from intelligence your system generated? What is your "information advantage score" — are you consistently learning about opportunities before they become public knowledge? This audit is the capstone of the entire system. The two Mac Mini M4s, the LLMs, the agents, the sensors — all of it exists to answer one question: *are you, right now, in possession of a definitive information advantage?*

*Weaknesses:* "Information advantage" is inherently comparative and hard to quantify without knowing what your competitors know.
*Opportunities:* The most reliable proxy metric is "first mover rate" — what percentage of your successful engagements came from outreach you initiated before the opportunity was widely publicized? Track this monthly. If it's rising, the system is working. If it's flat or falling, something in the sensor mesh needs recalibration.

---

