# **An Implementation Plan for the GYG-Resume-Tailor: A System for Continuous Career Branding and AI-Powered Resume Generation**

### **Executive Summary**

This document presents a detailed implementation plan for the GYG-Resume-Tailor, a next-generation, AI-assisted career management system. The system is designed to fundamentally shift the paradigm of resume creation from a static, document-editing task to a dynamic, continuous process of professional brand management. It is architecturally and philosophically grounded in the 'Git-Your-Gig' (GYG-be) ethos, which champions professional autonomy, disciplined self-improvement, and the strategic use of technology to navigate the modern gig economy.

The core innovation of the GYG-Resume-Tailor is its use of a user's MDBook repository as the single source of truth for their professional portfolio. This "Portfolio-as-Code" approach treats a professional's skills, projects, and experiences as a version-controlled knowledge base. The system acts as a sophisticated CI/CD pipeline for this knowledge base, analyzing it against specific job descriptions to produce highly tailored, ATS-optimized resumes.

Technologically, the system employs a high-performance, hybrid architecture. The core application services, data ingestion pipelines, and API layer will be built in Rust, leveraging its safety, concurrency, and efficiency. This choice is synergistic with the use of MDBook, a Rust-native tool. The advanced Natural Language Processing (NLP) and machine learning capabilities, inspired by tools like Resume-Matcher, will be powered by the mature Python ecosystem, specifically the Hugging Face Transformers library. The critical integration between these two languages will be achieved through PyO3, enabling a seamless combination of Rust's systems-level robustness and Python's AI/ML prowess.

The user experience is designed as a continuous feedback loop. Rather than editing a document, the user interacts with a dashboard that provides a deep analysis of their MDBook content against a job description. It offers a quantitative match score, identifies skill gaps, and provides actionable recommendations for improving the source portfolio. The final output is a dynamically rendered, professional PDF resume, tailored with AI-generated content for maximum impact. This document provides a phased roadmap for development, beginning with a core data pipeline and culminating in a polished, feature-rich platform that redefines how professionals manage and present their careers.

---

## **Part I: Foundational Concepts and System Architecture**

### **1\. The 'Git-Your-Gig' (GYG-be) Paradigm: From Philosophy to Features**

The design and function of the GYG-Resume-Tailor are not arbitrary; they are a direct translation of a guiding philosophy. To build this system correctly, one must first deconstruct the principles of 'Git-Your-Gig' (GYG-be) and embed them into the core architecture and user experience. This philosophy transforms the tool from a simple resume builder into a comprehensive system for disciplined career management.

#### **Deconstructing the GYG-be Philosophy**

With the primary GYG-be website being inaccessible 1, the GitHub repository serves as the canonical source for its principles.3 The philosophy is not merely a set of suggestions but a "training regimen" for professional life, emphasizing continuous, recursive improvement.

Key tenets include:

* **Recursive Self-Improvement:** The central mantra is, "to work on your own GYG, you must work harder ON your own GYG".3 This implies a process of constant refinement. The work is not in creating a single resume, but in continuously improving the underlying professional self. The system must facilitate and reward this iterative process.  
* **Professional Autonomy and the Gig Mindset:** The philosophy explicitly encourages users to "Manage your own time; avoid wage slavery" and to pursue freelance work or short-term "throwaway jobs" for income when necessary.3 This necessitates a tool that is fast, agile, and capable of generating highly targeted applications for a variety of roles, from full-time positions to short-term gigs, without a lengthy re-authoring process.  
* **"Dogfooding" Your Career:** The concept of "dogfooding," or using one's own products, is applied to career management itself. The philosophy states, "Dogfood your life by improving the automation and AI to ensure your workflow toolchain is simpler and more effective".3 In this model, the user's MDBook repository is their career's "source code." The GYG-Resume-Tailor is the CI/CD pipeline that "builds" and "deploys" artifacts (resumes) from that source. All improvements are made to the source, ensuring a single, version-controlled truth.  
* **Proactive Brand Management:** The approach is to "Avoid cold calling, begging or asking for a job; make your attractive skills contactable with link pages".3 This positions the user's MDBook as their primary, in-depth professional hub. The resume is a targeted, exported  
  *view* of this larger brand identity, designed to secure an initial conversation, after which the richer MDBook can be shared.  
* **Disciplined Use of Technology:** The GYG-be philosophy is explicitly technical, advocating for the use of Git, pull requests, CI/CD, ReadTheDocs for documentation, and AI tools like Copilot.3 The GYG-Resume-Tailor is the ultimate expression of this principle, integrating these concepts into a cohesive career development workflow.

#### **Translating Philosophy into System Requirements**

These philosophical tenets translate directly into hard system requirements that differentiate this tool from all others on the market.

1. **Source-Controlled and Version-Aware:** The system's state must be tied directly to the user's Git repository. Every analysis and generated resume must be linked to a specific commit hash. This provides a historical record of the user's professional evolution and allows for A/B testing of different versions of their portfolio.  
2. **No Direct Resume Editing:** The user interface must not be a WYSIWYG editor for the resume document itself. This is a critical design choice. The UI will be an analytical dashboard that provides feedback and guidance. It will highlight gaps and suggest improvements, but the user must implement these changes in their local MDBook source files and push them to their repository. This enforces the "improve the source" discipline.  
3. **Dynamic and Composable Output:** From the single MDBook source, the system must be able to generate numerous resume variations. The user should be able to select which projects, skills, or accomplishments to include for a specific job application, allowing for hyper-targeting without altering the canonical source.  
4. **Holistic Professional Development:** The tool should not exist in a vacuum. It must incorporate concepts of broader professional branding, offering guidance on how to improve a GitHub profile, write effective project READMEs, and contribute to open source, thereby reinforcing the user's brand across multiple platforms.4

#### **Comparative Analysis of Existing Resume-Matching Tools**

Existing tools like Resume-Matcher, Jobscan, and Teal offer powerful features for optimizing a resume against a job description.7 They excel at data parsing, keyword matching, and generating a "match score" to help applicants pass through Applicant Tracking Systems (ATS).10 These tools provide valuable functionality and serve as a functional benchmark for the analysis component of the GYG-Resume-Tailor.

However, their underlying paradigm is fundamentally different. They treat the resume document as the primary artifact to be manipulated. The user uploads a resume, and the tool suggests edits to that specific document. This workflow, while effective for a single application, does not promote the continuous, source-controlled development ethos of GYG-be. Each new application requires starting the process over or maintaining multiple, divergent versions of the resume document, leading to fragmentation and inconsistency.

The GYG-Resume-Tailor, by contrast, treats the MDBook as the source of truth. The analysis and recommendations are designed to improve the user's central professional knowledge base. By enhancing the source, every subsequent resume generated from it is inherently better. This creates a virtuous cycle of improvement that aligns perfectly with the GYG-be philosophy, representing a conceptual leap beyond the current market offerings.

### **2\. High-Level System Architecture**

The architecture of the GYG-Resume-Tailor is designed for performance, scalability, and maintainability, directly reflecting the project's unique blend of high-performance data processing and advanced AI. A hybrid Rust-and-Python stack is chosen to leverage the best of both ecosystems, orchestrated through a set of microservices.

#### **C4 Model: System Context and Containers**

The C4 model provides a clear, hierarchical view of the system's structure.

* **Level 1: System Context Diagram:** At the highest level, the **GYG-Resume-Tailor System** is a single entity. It interacts with three external actors:  
  1. The **User**, who interacts with the system via a web application to manage their profile and trigger analyses.  
  2. The **Git Repository Host** (e.g., GitHub, GitLab), from which the system pulls the user's MDBook portfolio.  
  3. The **Job Posting Source**, which is typically a public URL that the user provides for analysis.  
* **Level 2: Container Diagram:** Decomposing the system reveals several interacting containers (services), each with a distinct responsibility and technology choice.


1\.  \*\*Web Application (Frontend):\*\* A Single-Page Application (SPA) delivered to the user's browser. It is built using \*\*Rust compiled to WebAssembly (WASM)\*\*, likely with a framework like Yew or Leptos. This choice enables high performance, a responsive UI, and potential code sharing with the backend, aligning with the GYG-be ethos of using modern, efficient technology.  
2\.  \*\*API Gateway (Rust):\*\* A backend service built with a Rust web framework like \*\*Axum\*\*.\[12\] It serves as the single entry point for the frontend, exposing a secure REST or GraphQL API. It authenticates requests and orchestrates calls to the various internal microservices. Axum is chosen for its tight integration with the Tokio ecosystem, strong community support, and ergonomic design.  
3\.  \*\*MDBook Ingestion Service (Rust):\*\* This service is responsible for all interactions with external Git repositories. It uses the \`git2-rs\` library to clone or pull user portfolios, tracks commit hashes, and passes the file structure to the parsing logic.  
4\.  \*\*Canonical Profile Service (Rust):\*\* This service owns the core business logic related to the Canonical User Profile (CUP). It manages the database schema and all CRUD (Create, Read, Update, Delete) operations on the user's structured professional data, which is stored in a \*\*PostgreSQL\*\* database.  
5\.  \*\*AI Engine Service (Rust with PyO3 Bridge):\*\* This is the system's analytical core. It's a Rust service that exposes a high-level API for analysis (e.g., \`match\_profile\_to\_jd\`). Internally, it prepares data and uses the \*\*PyO3\*\* library to call Python functions that execute the complex NLP models from the Hugging Face ecosystem. This design encapsulates the Python dependency, treating it as an implementation detail.  
6\.  \*\*Resume Rendering Service (Rust):\*\* This service takes a tailored data set from the Canonical Profile Service and a template name, uses the \*\*Tera\*\* templating engine to generate HTML, and then calls a headless browser via the \*\*\`headless\_chrome\`\*\* crate to produce a final PDF document.

#### **Rationale for the Hybrid Rust-Python Stack**

The choice of a hybrid Rust-Python architecture is a deliberate engineering decision designed to optimize for both performance and access to cutting-edge AI capabilities.

* **Rust for Core System Logic:** Rust is selected for the primary backend services due to its unparalleled combination of performance, memory safety, and concurrency.13 For a system that will perform intensive data processing—cloning repositories, parsing large text files, and managing database connections—Rust's zero-cost abstractions and compile-time guarantees prevent entire classes of bugs like null pointer errors and data races, leading to a highly reliable and efficient system.15 The project's deep integration with MDBook, a tool from the Rust ecosystem, further solidifies this choice.16  
* **Python for Specialized AI/ML:** While the Rust machine learning ecosystem is growing, it is not yet as mature as Python's.17 The Python ecosystem, through libraries like Hugging Face Transformers, provides immediate access to thousands of state-of-the-art, pre-trained models for tasks like Named Entity Recognition (NER), text summarization, and semantic similarity.19 Attempting to re-implement these complex models in Rust would be a monumental and unnecessary effort. The pragmatic approach is to leverage the best-in-class tools where they exist.17  
* **PyO3 as the Critical Bridge:** The PyO3 project is the linchpin of this hybrid strategy.22 It provides robust, safe, and efficient bindings between Rust and Python, allowing Rust code to call Python functions and handle data seamlessly. This pattern—using Rust as the high-performance orchestrator and Python for specialized, computationally heavy tasks—is a common and effective strategy in production machine learning systems.17

The decision to isolate the Python-dependent code within a dedicated "AI Engine Service" is a crucial architectural pattern. This approach treats the AI models as a swappable component with a well-defined interface. The rest of the Rust-based system interacts with this service through a clean API (e.g., sending a structured CUP and Job Description, and receiving a structured Analysis Result). It does not need to be aware that the implementation involves Python. This abstraction offers significant long-term benefits. It simplifies testing, as the AI Engine can be mocked or stubbed out. More importantly, it future-proofs the system. As the Rust ML ecosystem matures with libraries like candle-core or burn 25, it becomes possible to migrate specific AI models from Python to native Rust by only changing the internal workings of the AI Engine Service, without impacting any other part of the application. This design ensures adaptability and maintainability, aligning with the disciplined engineering principles championed by the GYG-be philosophy.

---

## **Part II: Data Ingestion and Canonical Representation**

### **3\. The MDBook Ingestion and Parsing Pipeline**

The first and most critical stage of the system is the ingestion pipeline, which transforms the user's semi-structured MDBook portfolio into a structured, machine-readable format. The reliability and accuracy of this pipeline dictate the quality of all subsequent AI analysis.

#### **Git Repository Interaction**

The process begins by accessing the user's portfolio source code. The MDBook Ingestion Service will be responsible for this interaction.

* **Repository Cloning and Fetching:** The service will utilize a mature Rust Git library, such as git2-rs, to programmatically interact with Git repositories. Upon a user's initial setup, the service will perform a git clone of the provided repository URL. For all subsequent analyses, it will execute a git pull to fetch the latest changes, ensuring the system is always working with the most up-to-date version of the user's portfolio.  
* **Commit Hash Tracking:** A key feature, aligned with the GYG-be versioning ethos, is the meticulous tracking of the Git commit hash. Every piece of ingested content will be associated with the specific commit from which it was parsed. This allows the system to link analysis results directly to a point in the user's development history, enabling features like comparing analysis results across different commits to visualize professional growth.

#### **MDBook Structure Parsing**

Once the repository files are available locally, the service must parse the MDBook structure. A naive approach of manually reading files is brittle and error-prone. Instead, the system will leverage the mdbook crate itself as a library, which is a documented and supported use case.27

1. **Configuration Loading:** The process starts by loading and parsing the book.toml file. This provides essential book-level metadata, such as the project's title, authors, and other configuration options specified by the user.29  
2. **Skeleton Parsing:** Next, the service parses the SUMMARY.md file. This file defines the skeleton of the book, including the order and hierarchy of chapters.29 By parsing this, the system understands the contextual structure of the portfolio. For example, a Markdown file listed under a top-level chapter titled "Projects" can be reliably inferred to be a project description.  
3. **Programmatic Book Loading:** Using the mdbook crate's API, the service will call a function like MDBook::load() to create a complete, in-memory representation of the book. This provides type-safe, programmatic access to the book's contents, structure, and configuration, which is far more robust than parsing text output or raw files.27

#### **Semantic Tagging Convention for Markdown**

A significant challenge is that Markdown, by design, is structurally flexible. To reliably extract specific data points (e.g., the summary of a specific project, the list of technologies used), a convention must be established. The proposed solution is a system of custom HTML comments used as semantic tags. This method is ideal because the tags are invisible in the final rendered MDBook, preserving the aesthetic and readability of the user's portfolio, yet they are easily parsable from the raw source files.

The parser, likely built using the pulldown-cmark crate 31 to walk the Markdown Abstract Syntax Tree (AST), will identify these tags.

Example Tagging Schema:  
A user would annotate their .md files as follows:

# **Project: The GYG-Resume-Tailor**

This project involved building a next-generation, AI-assisted career management system using a hybrid Rust and Python architecture. The system leverages a user's MDBook repository as a canonical source for their professional portfolio.

* Rust, Python, Axum, PyO3, Hugging Face Transformers, PostgreSQL, Docker  
* Designed and implemented a multi-stage AI pipeline that reduced resume tailoring time by 90% compared to manual methods.  
* Architected a hybrid Rust-Python system, achieving a 5x performance improvement in data ingestion over a pure Python prototype.

This convention provides the necessary structure for the parser to accurately map content to the system's internal data model.

#### **Error Handling and Resilience**

The ingestion pipeline must be robust. It will be designed to handle common failure modes gracefully, such as invalid Git repository URLs, repositories missing the required book.toml or SUMMARY.md files, or Markdown files with malformed or incomplete gyg: tags. In each case, the system will log the specific error and provide clear, actionable feedback to the user through the UI, guiding them on how to correct their repository's structure.

### **4\. The Canonical User Profile (CUP): A Structured Model of Professional Identity**

After the MDBook is parsed, its contents are transformed and stored in a structured, normalized format called the Canonical User Profile (CUP). The CUP is the central data model for the entire application, serving as the definitive source for all subsequent AI analysis and resume generation. It represents a clean, machine-readable version of the user's professional life.

#### **Data Model and Database Schema**

The CUP will be persisted in a PostgreSQL database. PostgreSQL is chosen for its proven reliability, rich feature set (including excellent support for JSONB data types), and strong performance, making it well-suited for this application. The schema is designed to be granular, allowing for precise and flexible querying.

The core entities of the CUP data model include:

* **UserProfile:** Contains top-level information about the user, such as name, contact details, and links to their MDBook and other professional profiles.  
* **WorkExperience:** Represents a specific job held by the user, including company name, job title, start and end dates, and a general summary of the role.  
* **Project:** A detailed record of a specific project undertaken by the user. This includes the project's name, a comprehensive summary, and a direct link back to the source .md file and Git commit hash in their MDBook repository.  
* **Accomplishment:** This is one of the most important entities. It represents a single, impact-oriented achievement or bullet point. Each accomplishment is linked to either a WorkExperience or a Project. This fine-grained atomicity is crucial, as it allows the AI to select the most relevant accomplishments for a given job application, rather than being forced to include an entire job or project description.  
* **Skill:** A canonical entry for a single skill (e.g., "Rust," "PyTorch," "Project Management"). This allows for skill categorization (e.g., "Programming Language," "Framework," "Soft Skill") and proficiency tracking.  
* **Education & Certification:** Separate entities to store academic degrees and professional certifications.

The following table provides a detailed blueprint of the proposed database schema. This level of specification is essential for development, as it removes ambiguity and provides a clear contract for backend engineers and database administrators. It forces consideration of data types, relationships, and potential indexing strategies needed for efficient queries.

**Table 1: Canonical User Profile (CUP) Database Schema**

| Table Name | Column Name | Data Type | Constraints / Notes |
| :---- | :---- | :---- | :---- |
| **users** | id | SERIAL | PRIMARY KEY |
|  | username | VARCHAR(255) | UNIQUE, NOT NULL |
|  | full\_name | VARCHAR(255) |  |
|  | email | VARCHAR(255) | UNIQUE, NOT NULL |
|  | phone\_number | VARCHAR(50) |  |
|  | linkedin\_url | VARCHAR(255) |  |
|  | github\_url | VARCHAR(255) |  |
|  | personal\_website\_url | VARCHAR(255) |  |
| **mdb\_portfolios** | id | SERIAL | PRIMARY KEY |
|  | user\_id | INTEGER | FOREIGN KEY to users.id |
|  | git\_repo\_url | VARCHAR(255) | NOT NULL |
|  | last\_commit\_hash | VARCHAR(40) |  |
| **work\_experiences** | id | SERIAL | PRIMARY KEY |
|  | user\_id | INTEGER | FOREIGN KEY to users.id |
|  | company\_name | VARCHAR(255) | NOT NULL |
|  | job\_title | VARCHAR(255) | NOT NULL |
|  | start\_date | DATE |  |
|  | end\_date | DATE |  |
|  | summary | TEXT |  |
|  | source\_commit\_hash | VARCHAR(40) |  |
| **projects** | id | SERIAL | PRIMARY KEY |
|  | user\_id | INTEGER | FOREIGN KEY to users.id |
|  | project\_name | VARCHAR(255) | NOT NULL |
|  | summary | TEXT |  |
|  | source\_file\_path | VARCHAR(255) | Path within the MDBook repo. |
|  | source\_commit\_hash | VARCHAR(40) |  |
| **accomplishments** | id | SERIAL | PRIMARY KEY |
|  | user\_id | INTEGER | FOREIGN KEY to users.id |
|  | work\_experience\_id | INTEGER | FOREIGN KEY to work\_experiences.id, NULLABLE |
|  | project\_id | INTEGER | FOREIGN KEY to projects.id, NULLABLE |
|  | description | TEXT | NOT NULL |
|  | is\_quantified | BOOLEAN | DEFAULT FALSE. Flagged by AI if it contains metrics. |
|  | source\_commit\_hash | VARCHAR(40) |  |
| **skills** | id | SERIAL | PRIMARY KEY |
|  | skill\_name | VARCHAR(255) | UNIQUE, NOT NULL |
|  | category | VARCHAR(100) | e.g., 'language', 'framework', 'database', 'soft\_skill' |
| **user\_skills** | user\_id | INTEGER | FOREIGN KEY to users.id |
|  | skill\_id | INTEGER | FOREIGN KEY to skills.id |
|  | proficiency\_level | VARCHAR(50) | e.g., 'proficient', 'expert' (optional) |
|  | source\_commit\_hash | VARCHAR(40) |  |
|  |  |  | PRIMARY KEY (user\_id, skill\_id) |

#### **Versioning and Historical Tracking**

A cornerstone of the GYG-be philosophy is the ability to observe and learn from one's own progress. The CUP schema is designed to facilitate this by including a source\_commit\_hash column in key tables. When the ingestion pipeline processes an updated MDBook repository, it can compare the content derived from the new commit hash with the content from the previous hash.

This allows the system to:

* Identify new projects, skills, and accomplishments that the user has added.  
* Detect modifications to existing descriptions.  
* Provide a "diff" view of the user's professional profile over time, offering a tangible visualization of their growth. This feature directly operationalizes the principle of continuous, measurable self-improvement.3

---

## **Part III: The AI-Powered Analysis and Generation Engine**

This part of the system constitutes the "brains" of the GYG-Resume-Tailor. It is where the structured Canonical User Profile (CUP) is intelligently compared against a target job description (JD) to produce actionable insights, a match score, and tailored content. The engine is architected as a Rust service that efficiently orchestrates a series of calls to specialized Python-based AI models via the PyO3 bridge.

### **5\. Job Description Analysis and Deconstruction**

Before any matching can occur, the unstructured text of a job description must be deconstructed into a structured format, the "Job Description Profile" (JDP). This process mirrors the ingestion of the user's MDBook, creating a comparable data structure.

* **Data Ingestion and Cleaning:** The AI Engine Service will accept a JD as either a public URL or raw text. For URLs, it will use the reqwest library in Rust to fetch the page content. The raw HTML will then be passed through a library like html2text 31 to strip away markup and extract the clean, plain text of the job posting. This cleaning step is vital for the accuracy of the subsequent NLP models.  
* **Named Entity Recognition (NER) for Key Information Extraction:** The cleaned JD text is the primary input for the NER model. This task is not handled in Rust but is delegated to the Python environment via PyO3.  
  * **Model Selection and Justification:** The choice of NER model is critical for accuracy. Generic NER models, such as dslim/bert-base-NER, are trained to recognize broad categories like Person, Organization, and Location.32 While useful, they are not optimized for the specific vocabulary of job descriptions. Therefore, this system will prioritize a model that has been specifically fine-tuned for the recruitment domain. A prime candidate is  
    Nucha/Nucha\_ITSkillNER\_BERT, which is explicitly designed to recognize both hard and soft skills.21 To further enhance performance, this model could be fine-tuned on a specialized dataset like  
    Mehyaar/Annotated\_NER\_PDF\_Resumes, which contains thousands of CVs annotated with IT skills, ensuring the model is highly adept at identifying domain-specific technologies and qualifications.33  
  * **Extraction Process:** The Python function receives the JD text, passes it through the NER pipeline, and extracts a structured set of entities. These entities will include:  
    * **Hard Skills:** Programming languages, frameworks, tools, cloud platforms (e.g., "Python", "React", "AWS", "Kubernetes").  
    * **Soft Skills:** Interpersonal attributes (e.g., "communication", "teamwork", "leadership").  
    * **Experience Level:** Required years of experience (e.g., "5+ years", "senior level").  
    * **Qualifications:** Required degrees or certifications (e.g., "Bachelor's in Computer Science", "AWS Certified Developer").  
  * **Output (JDP):** The extracted entities are structured into a Job Description Profile (JDP) object and returned to the Rust service. This JDP serves as the structured target against which the user's CUP will be compared.

### **6\. The Multi-Stage Matching and Generation Core**

The central analysis is performed by a sophisticated, multi-stage pipeline that combines different AI techniques to produce a holistic evaluation. This modular approach allows each stage to use the best-suited model for a specific task.

#### **Stage 1: Semantic Skill and Experience Matching**

This stage moves beyond simple keyword comparison to understand the deeper semantic meaning behind the text in both the user's profile and the job description.

* **Methodology:** The core technique is to compute the semantic similarity between text fragments using sentence-transformer models. These models are designed to map sentences and paragraphs to a high-dimensional vector space where semantic similarity corresponds to proximity.34  
* **Model Selection:** The sentence-transformers/all-mpnet-base-v2 model is an excellent choice for this task due to its strong performance on semantic textual similarity benchmarks.35 It provides a good balance of speed and accuracy. An alternative like  
  all-MiniLM-L6-v2 could be used for faster inference if needed.34  
* **Process Flow:**  
  1. The text for each key requirement extracted from the JDP (e.g., "design and implement robust data pipelines") is passed to the sentence-transformer model to generate a numerical vector embedding.  
  2. Similarly, the text for each relevant entry in the user's CUP—such as project summaries, work experience descriptions, and individual accomplishments—is also converted into a vector embedding.  
  3. The system then calculates the **cosine similarity** between the vectors from the JD and the vectors from the CUP.37 A cosine similarity score ranges from \-1 to 1, where a score closer to 1 indicates a higher degree of semantic similarity.  
  4. The output of this stage is a detailed similarity matrix. This matrix not only contributes to an overall match score but also provides granular insights, such as identifying that the user's "Project X" is a 95% semantic match for the JD's requirement for "experience with real-time data processing." It also clearly highlights gaps where no part of the user's profile strongly matches a key requirement.

#### **Stage 2: Generative Content Creation (Bullet Point Summarization)**

A common challenge for users is translating their detailed, narrative-style project descriptions into the concise, action-oriented bullet points preferred on resumes. This stage automates that process using abstractive summarization.

* **Methodology:** An abstractive summarization model is used to generate new text that captures the essence of a longer document.  
* **Model Selection:** Models from the BART and T5 families are well-suited for this task. facebook/bart-large-cnn is a widely used and effective model for summarizing news-like articles 20, and  
  Falconsai/text\_summarization (a fine-tuned T5 model) is also a strong candidate.38  
* **Process Flow:** The full-text description of a user's project or work experience from the CUP is fed into the summarization model. The key to success in this stage is prompt engineering. The model will be invoked with a carefully crafted prompt, such as: *"You are a professional resume writer. Summarize the following project description into a single, impactful resume bullet point. Start with a strong action verb and quantify the achievement with metrics if the information is available. The output should be a single sentence."* This guides the model to produce output in the desired format, transforming raw descriptions into polished, resume-ready content.

#### **Stage 3: Holistic Analysis and Scoring (Generative Evaluation)**

While the previous stages provide structured data and content, this final stage uses a large language model (LLM) to perform a holistic, qualitative evaluation, mimicking how a human recruiter might assess the overall fit.

* **Methodology:** This stage leverages a generative LLM that has been specifically fine-tuned for the task of matching CVs to job descriptions.  
* **Model Selection:** The model LlamaFactoryAI/cv-job-description-matching is purpose-built for this exact scenario.39 It is a fine-tuned version of Llama 3.1 designed to take a CV and a JD as input and produce a structured JSON output with a comprehensive analysis.39 This is a significant advantage over using a general-purpose chat model, as it is already optimized for the domain and output format.  
* **Process Flow:**  
  1. The system first synthesizes a temporary "master resume" in plain text by assembling the most relevant information from the user's CUP, including their contact info, summaries, and the AI-generated bullet points from Stage 2\.  
  2. This master resume text, along with the original cleaned JD text, is formatted into the specific input structure expected by the LlamaFactoryAI model.  
  3. The model is invoked. As documented, its prompt instructs it to return a JSON object containing four specific keys: matching\_analysis (a detailed breakdown of strengths and weaknesses), description (a concise summary of the match), score (a numerical compatibility score from 0-100), and recommendation (actionable suggestions for the candidate).39  
  4. This structured JSON output is the final product of the AI engine. It provides the overall quantitative score and the rich, qualitative feedback that will be presented to the user on their dashboard.

#### **Technical Integration with PyO3**

The successful orchestration of these Python-based AI models from the Rust backend depends on a clean and robust implementation of the PyO3 bridge.

* **Data Marshalling:** The Rust service will define simple structs using serde to represent the data being passed to and from Python. For example, a NerInput { text: String } struct in Rust can be serialized to JSON, passed to Python as a string, and then deserialized. The results from Python (e.g., the structured JDP) will be returned as a JSON string and deserialized back into a corresponding Rust struct. This approach minimizes complex type conversions across the FFI boundary.  
* **GIL Management:** All calls into the Python interpreter will be wrapped in a Python::with\_gil(|py| {... }) block.22 This is a critical step that acquires Python's Global Interpreter Lock (GIL), ensuring that the Rust thread has safe, exclusive access to the Python runtime environment during the execution of the ML model.  
* **Error Propagation:** Python functions can raise exceptions. The PyO3 bindings are designed to catch these exceptions and convert them into a Rust PyErr. The Rust code will then map this PyErr into its own application-specific error enum, allowing Python errors to be handled gracefully within Rust's standard Result\<T, E\> error-handling paradigm.40 This prevents a Python error from crashing the entire Rust service.

To provide a clear overview of the model selection process, the following table compares the chosen models for each core AI task. This demonstrates a rigorous, evidence-based approach, ensuring that the best tool is selected for each specific job within the pipeline.

**Table 2: Comparative Analysis of Selected NLP Models**

| Task | Selected Model | Base Architecture | Key Strengths | Potential Weaknesses | Justification for Selection |
| :---- | :---- | :---- | :---- | :---- | :---- |
| **NER (JD Parsing)** | Nucha/Nucha\_ITSkillNER\_BERT 21 | BERT | Fine-tuned specifically for IT and soft skills; high relevance to the recruitment domain. | May require further fine-tuning for niche industries. | Superior domain-specific accuracy compared to general-purpose NER models like bert-base-NER.32 |
| **Semantic Matching** | sentence-transformers/all-mpnet-base-v2 35 | MPNet | State-of-the-art performance on semantic textual similarity (STS) tasks; understands context and nuance. | Larger model size than alternatives like MiniLM, leading to slightly higher latency. | Provides the highest quality semantic embeddings, which is critical for accurately identifying experience gaps and strengths beyond keyword matching.36 |
| **Summarization** | facebook/bart-large-cnn 20 | BART | Excellent at abstractive summarization; generates fluent and coherent text. | Can sometimes hallucinate details not present in the source text if not prompted carefully. | Proven effectiveness for generating high-quality summaries. Its generative nature is ideal for rephrasing user content into professional resume language. |
| **Holistic Analysis** | LlamaFactoryAI/cv-job-description-matching 39 | Llama 3.1 | Purpose-built and fine-tuned for this exact task; provides structured JSON output with score and recommendations. | As a fine-tuned model, its behavior is specialized and less flexible than a base model. | Using a specialized model eliminates the need for complex prompt engineering and output parsing, directly providing the final analysis in the desired format.39 |

---

## **Part IV: Output, User Experience, and Implementation**

### **7\. Dynamic Resume Rendering and Export**

The final stage of the GYG-Resume-Tailor pipeline is the generation of a polished, professional resume document. This process must be flexible, reliable, and produce high-quality, ATS-friendly outputs. The architecture for this stage prioritizes modern web technologies for layout and styling, providing a significant advantage over traditional, element-by-element PDF construction.

#### **HTML Templating Engine**

The foundation of the rendering process is a powerful templating engine that combines the AI-generated content with a professional design.

* **Engine Selection:** The system will use **Tera**, a mature and feature-rich templating engine for Rust.41 Tera's syntax is heavily inspired by Jinja2, making it familiar to a wide audience of developers and designers. It supports template inheritance, loops, conditionals, and custom functions, which are all necessary for creating complex and dynamic resume layouts. While other excellent options exist in the Rust ecosystem, such as the type-safe  
  Askama 43 or the macro-based  
  Maud 44, Tera's balance of power, flexibility, and maturity makes it the most suitable choice for this project.  
* **Rendering Process:** The Resume Rendering Service will receive a request containing the tailored content for the resume. This content, which includes the user's basic information and the specific projects, experiences, and AI-generated accomplishments selected for a particular job application, will be packaged into a tera::Context object. This context object is then passed to the Tera engine, which renders a specified template file (e.g., professional\_template.tera).  
* **Template Design:** The system will ship with a collection of professionally designed resume templates. These templates will be crafted as .tera files containing standard HTML and CSS, along with Tera's templating tags. A key design principle for these templates will be ATS compatibility. This means they will prioritize a clean, single-column layout, standard fonts, and a clear information hierarchy, avoiding complex visual elements like tables, images, or multi-column layouts that can confuse older ATS parsers.7

#### **PDF Generation from HTML**

Once the final HTML is rendered, it must be converted into a PDF document for distribution. The most robust and high-fidelity method for this conversion is to use a modern, headless web browser.

* **Methodology:** The "HTML-to-PDF" approach leverages the power of browser rendering engines (like Blink, used in Chrome) to interpret HTML, CSS, and even JavaScript. This ensures that complex layouts, custom fonts, and modern CSS features like Flexbox and Grid are rendered with perfect accuracy, which is notoriously difficult to achieve with direct PDF generation libraries.45  
* **Library Selection:** The **headless\_chrome** crate in Rust provides a high-level, ergonomic API to control a headless instance of Google Chrome or Chromium.45 The Resume Rendering Service will use this crate to open the generated HTML, instruct the browser to "print" it to a PDF, and capture the resulting file bytes.  
* **Comparative Analysis:** This approach is chosen over pure-Rust, direct PDF generation libraries like genpdf or printpdf.46 While these libraries are powerful and avoid the dependency on an external browser binary, they operate at a much lower level. Building a sophisticated, visually appealing resume with them would require manually positioning every single text element, line, and shape, a process that is both complex and time-consuming.45 The HTML-to-PDF workflow abstracts away this complexity, allowing for rapid development and easy modification of resume templates using standard web technologies.

The following table summarizes the trade-offs and justifies the selection of the HTML-to-PDF generation strategy.

**Table 3: Comparative Analysis of PDF Generation Libraries**

| Library Name | Approach | Key Features | Ease of Use for Complex Layouts | Dependencies | Recommendation |
| :---- | :---- | :---- | :---- | :---- | :---- |
| headless\_chrome 45 | HTML-to-PDF | Full support for modern HTML, CSS, JavaScript; high-fidelity rendering. | Very Easy. Layouts are defined in standard CSS. | Requires a Chrome/Chromium binary on the server. | **Recommended.** Offers the best balance of quality, flexibility, and development speed. |
| genpdf 46 | Direct Generation | High-level abstractions for elements like paragraphs and tables; pure Rust. | Moderate. Simpler than printpdf, but still requires programmatic layout construction. | None (pure Rust). | Viable alternative if a browser dependency is unacceptable, but less flexible for design. |
| printpdf 47 | Direct Generation | Low-level control over PDF objects; supports graphics, fonts, and layers; WASM support. | Difficult. Requires manual calculation and positioning of all elements. | None (pure Rust). | Overly complex for this use case. Better suited for PDF manipulation than generation from scratch. |
| lopdf 45 | Direct Generation | PDF creation, merging, and editing at the element level. | Very Difficult. Requires deep knowledge of the PDF specification. | None (pure Rust). | Not recommended for generation. It is a foundational library that printpdf builds upon. |

#### **WebAssembly (WASM) for Future Development**

An interesting avenue for future development is client-side PDF generation. The printpdf library notably supports compilation to WebAssembly.47 While the primary architecture uses server-side rendering, a future version could leverage WASM to allow users to generate or preview PDFs directly in their browser, reducing server load and improving interactivity. This aligns with the GYG-be philosophy of using cutting-edge, high-performance web technologies.48

### **8\. The GYG-be User Experience: A Continuous Feedback Loop**

The user interface (UI) and user experience (UX) of the GYG-Resume-Tailor are designed to be more than just a functional front-end; they are a core part of the system's pedagogical mission. The entire experience is crafted to reinforce the GYG-be philosophy of disciplined, iterative improvement.

#### **The Dashboard, Not the Editor**

The most significant departure from conventional resume tools is the complete absence of a direct resume editor. The user never types into a "resume" form. Instead, their primary interaction is with an analytical dashboard. After providing a link to a job description, the user triggers an analysis against the latest commit of their MDBook portfolio. The dashboard then presents a rich, multi-faceted view of the results.

* **Core Components of the Dashboard:**  
  * **Overall Match Score:** A prominent display of the final score (0-100) generated by the holistic analysis model, providing an immediate at-a-glance assessment of fit.39  
  * **JD Requirements Breakdown:** A list of the key skills, qualifications, and responsibilities extracted from the job description by the NER model.  
  * **Profile-to-JD Mapping:** For each JD requirement, the dashboard will display the most semantically similar projects, work experiences, or accomplishments from the user's CUP. This is powered by the cosine similarity analysis and will use visual cues, such as color-coding or strength bars, to indicate the degree of match.  
  * **Identified Gaps:** The dashboard will explicitly highlight requirements from the JD for which no strong match was found in the user's profile, making it immediately obvious where their stated experience falls short.

#### **Actionable Recommendations and the Feedback Loop**

The dashboard is not just for displaying data; it is for driving action. The recommendation text generated by the LlamaFactoryAI model will be a central feature.39 This provides a clear, AI-driven suggestion for improvement. For example, a recommendation might state:

*"The job description heavily emphasizes experience with 'CI/CD pipelines'. Your portfolio mentions projects using Docker, but does not detail the automation process. Consider adding a new section to your 'Cloud-Native App' project in your MDBook that describes the GitHub Actions workflow you built."*

This leads directly to the core workflow, which is a continuous, cyclical feedback loop:

1. **Analyze:** The user initiates an analysis of their MDBook against a target job.  
2. **Review:** The user reviews the score, the identified gaps, and the AI-generated recommendations on the dashboard.  
3. **Improve:** The user switches to their local development environment, checks out their MDBook repository, and edits the source .md files to address the feedback. This is where the real "work" happens, in alignment with the GYG-be ethos.  
4. **Commit & Push:** The user commits their improvements to their Git repository with a descriptive message.  
5. **Re-run:** The user returns to the GYG-Resume-Tailor dashboard and re-runs the analysis. The system automatically pulls the latest commit, and the user sees an updated (and ideally improved) match score, thus closing the loop.

This iterative process transforms resume building from a dreaded, one-off task into a continuous practice of professional development and self-reflection.

#### **Integration with Professional Branding Concepts**

To further embody its role as a holistic career management tool, the system will provide contextual help and resources related to broader professional branding. It will offer tips and link to guides on how to create a compelling GitHub profile README, the importance of contributing to open source, and how to maintain a consistent professional identity across platforms like LinkedIn and personal websites.5 This encourages the user to think of their career not just in terms of a resume document, but as a complete, multi-faceted professional brand, a core tenet of the GYG-be philosophy.50

### **9\. Phased Implementation Roadmap**

Building a system of this complexity requires a pragmatic, phased implementation. This roadmap breaks the project down into three manageable phases, each delivering a concrete set of capabilities and building upon the last.

#### **Phase 1 (MVP \- The Core Pipeline)**

The goal of the Minimum Viable Product (MVP) is to establish the foundational, end-to-end data pipeline and prove the core concept of MDBook-based analysis. The focus is on backend functionality over UI polish.

* **Core Features:**  
  * **MDBook Ingestion Service:** A Rust service capable of cloning a public Git repository and parsing the MDBook structure using the mdbook crate and the defined gyg: semantic tag convention.  
  * **Canonical User Profile (CUP):** Implementation of the full CUP schema in a PostgreSQL database. The ingestion service will populate the CUP from the parsed MDBook.  
  * **Basic Job Description Parser:** A simple function to accept raw text for a JD.  
  * **Stage 1 AI Implementation:** Integration of the first AI stage: semantic similarity matching. This involves setting up the PyO3 bridge to call a Python function that uses a sentence-transformer model to generate embeddings and calculate cosine similarity scores.  
  * **Trigger Mechanism:** A simple Command Line Interface (CLI) or a basic, unauthenticated API endpoint to trigger the process. The input would be a Git repo URL and JD text, and the output would be a raw JSON object containing the match score and similarity matrix.  
* **Exclusions:** This phase will have no graphical user interface, no PDF generation, and will not include the more advanced generative AI stages.

#### **Phase 2 (Enhancement \- The AI Generation Engine)**

This phase focuses on building out the full suite of AI capabilities and creating the initial user-facing application.

* **Core Features:**  
  * **Advanced AI Integration:** Implement and integrate the remaining AI stages:  
    * Stage 2: Generative summarization for creating resume bullet points from project descriptions.  
    * Stage 3: Holistic analysis using the LlamaFactoryAI/cv-job-description-matching model to generate the final structured JSON output with a score, analysis, and recommendations.39  
  * **Resume Rendering Service:** Build the service using Tera for HTML templating and headless\_chrome for PDF generation. It will initially support one or two standard, ATS-friendly templates.  
  * **Initial Dashboard UI:** Develop the first version of the web application using Rust and WebAssembly. This dashboard will display the full, multi-faceted analysis results from the AI engine and provide a button to download the generated PDF resume.  
  * **User Authentication:** Implement a basic user authentication system to manage user profiles and repositories.

#### **Phase 3 (Maturity \- The Polished Product)**

The final phase focuses on refining the user experience, adding customization, and ensuring the system is scalable and robust for a wider audience.

* **Core Features:**  
  * **Full Feedback Loop UX:** Polish the dashboard UI to fully realize the iterative feedback loop. This includes clear guidance, intuitive visualizations of strengths and weaknesses, and a seamless process for re-running analysis after a Git push.  
  * **Template Customization:** Introduce support for multiple resume templates and allow users to choose or even customize them (e.g., selecting colors, fonts).  
  * **Historical Analysis:** Implement features to visualize a user's professional growth over time by comparing CUP data from different Git commits.  
  * **Broader Platform Integration:** Explore integrations with other professional platforms. For example, using the AI-generated summaries to suggest updates to a user's LinkedIn profile or to help draft project READMEs on GitHub.  
  * **Scalability and Performance Optimization:** Conduct load testing, optimize database queries, and scale the backend services to handle a growing number of users and concurrent analyses. This includes optimizing the use of the AI models, potentially through batching or more efficient resource management.

### **Conclusion and Future Directions**

The GYG-Resume-Tailor, as outlined in this implementation plan, represents a significant evolution in the field of career development tooling. By rigorously adhering to the 'Git-Your-Gig' (GYG-be) philosophy, it moves beyond the limited paradigm of static document editing and introduces a dynamic, continuous, and disciplined approach to professional brand management. The "Portfolio-as-Code" concept, with MDBook as the source-controlled knowledge base, combined with a sophisticated multi-stage AI analysis pipeline, creates a powerful feedback loop that encourages and facilitates genuine professional growth. The hybrid Rust and Python architecture is a pragmatic and robust choice, ensuring high performance and reliability while leveraging the best available tools for advanced artificial intelligence. This system is not merely a resume builder; it is a comprehensive career co-pilot designed for the modern, autonomous professional.

#### **Future Directions**

Upon successful implementation of the three-phase roadmap, several exciting avenues for future expansion can be explored to further enhance the system's value proposition:

* **Proactive Job Market Analysis:** The system could be extended to analyze not just a single job description, but broader trends across the job market. By scraping and analyzing thousands of job postings from platforms like LinkedIn or Indeed, the tool could provide users with proactive insights, such as identifying the most in-demand skills in their field and suggesting areas for learning and portfolio development to stay ahead of the curve.51  
* **Open Source Contribution Matching:** A significant part of a developer's brand is their contribution to the open-source community.5 A future module could analyze a user's existing GitHub activity (forks, languages used, types of PRs submitted) and the skills in their CUP to recommend relevant open-source projects that are actively seeking contributors. This would provide a direct path for users to build public, verifiable experience in areas identified as gaps.  
* **Web3 and Decentralized Identity Integration:** As the professional landscape evolves, concepts from Web3 and decentralized identity may become more prominent. The system could explore integrations with platforms like gitgig-io 54, which uses blockchain for bounties and credentials. This could allow users to attach verifiable credentials to their MDBook portfolio, creating a cryptographically secure and trusted professional identity.  
* **Enhanced AI-Powered Coaching:** The AI engine could be enhanced to provide more in-depth coaching. Beyond just identifying skill gaps, it could generate personalized learning plans, suggest specific online courses or tutorials, and even help draft blog posts or project documentation for the user's MDBook, acting as a true partner in their continuous learning journey, fully realizing the recursive self-improvement goal of the GYG-be philosophy.3

#### **Works cited**

1. accessed December 31, 1969, httpss://gyg-be.github.io/  
2. gyg-be.github.io, accessed July 31, 2025, [https://gyg-be.github.io/](https://gyg-be.github.io/)  
3. GYG.be · GitHub, accessed July 31, 2025, [https://github.com/GYG-be](https://github.com/GYG-be)  
4. 7 Branding Tools To Get Your Brand Off the Ground (2025) \- Shopify, accessed July 31, 2025, [https://www.shopify.com/blog/branding-tools](https://www.shopify.com/blog/branding-tools)  
5. How To Build A Personal Brand On GitHub? \- GeeksforGeeks, accessed July 31, 2025, [https://www.geeksforgeeks.org/git/how-to-build-a-personal-brand-on-github/](https://www.geeksforgeeks.org/git/how-to-build-a-personal-brand-on-github/)  
6. Resources for Building Your Brand as a Software Developer \- Turing Curriculum, accessed July 31, 2025, [https://curriculum.turing.edu/job\_seekers/resources/branding\_resources](https://curriculum.turing.edu/job_seekers/resources/branding_resources)  
7. Resume Matcher, accessed July 31, 2025, [https://resumematcher.fyi/](https://resumematcher.fyi/)  
8. Jobscan ATS Resume Checker and Job Search Tools, accessed July 31, 2025, [https://www.jobscan.co/](https://www.jobscan.co/)  
9. Resume Job Description Match \- Compare Your Resume to Any Job \- Teal, accessed July 31, 2025, [https://www.tealhq.com/tool/resume-job-description-match](https://www.tealhq.com/tool/resume-job-description-match)  
10. Resume Matching Algorithms: How They Work \- JobSwift.AI, accessed July 31, 2025, [https://jobswift.ai/blog/resume-matching-algorithms-how-they-work/](https://jobswift.ai/blog/resume-matching-algorithms-how-they-work/)  
11. SkillSyncer: Free ATS Resume Scanner, accessed July 31, 2025, [https://skillsyncer.com/](https://skillsyncer.com/)  
12. Build REST APIs with the Rust Axum Web Framework \- YouTube, accessed July 31, 2025, [https://www.youtube.com/watch?v=7RlVM0D4CEA](https://www.youtube.com/watch?v=7RlVM0D4CEA)  
13. The Beginner's Guide to Machine Learning with Rust \- MachineLearningMastery.com, accessed July 31, 2025, [https://machinelearningmastery.com/the-beginners-guide-to-machine-learning-with-rust/](https://machinelearningmastery.com/the-beginners-guide-to-machine-learning-with-rust/)  
14. How to Get Started with Data Engineering Using Rust, accessed July 31, 2025, [https://dataengineeracademy.com/module/how-to-get-started-with-data-engineering-using-rust/](https://dataengineeracademy.com/module/how-to-get-started-with-data-engineering-using-rust/)  
15. Beginners Guide: Data Pipeline with Rust \- Decube, accessed July 31, 2025, [https://www.decube.io/post/data-pipeline-with-rust](https://www.decube.io/post/data-pipeline-with-rust)  
16. rust-lang/mdBook: Create book from markdown files. Like Gitbook but implemented in Rust, accessed July 31, 2025, [https://github.com/rust-lang/mdBook](https://github.com/rust-lang/mdBook)  
17. Does rust have a mature machine learning environment, akin to python? \- Reddit, accessed July 31, 2025, [https://www.reddit.com/r/rust/comments/1i117x4/does\_rust\_have\_a\_mature\_machine\_learning/](https://www.reddit.com/r/rust/comments/1i117x4/does_rust_have_a_mature_machine_learning/)  
18. Are we learning yet?, accessed July 31, 2025, [https://www.arewelearningyet.com/](https://www.arewelearningyet.com/)  
19. Fast Tokenizers: How Rust is Turbocharging NLP | by Mohammad Shojaei | Medium, accessed July 31, 2025, [https://medium.com/@mshojaei77/fast-tokenizers-how-rust-is-turbocharging-nlp-dd12a1d13fa9](https://medium.com/@mshojaei77/fast-tokenizers-how-rust-is-turbocharging-nlp-dd12a1d13fa9)  
20. How to Build A Text Summarizer Using Huggingface Transformers \- freeCodeCamp, accessed July 31, 2025, [https://www.freecodecamp.org/news/how-to-build-a-text-summarizer-using-huggingface-transformers/](https://www.freecodecamp.org/news/how-to-build-a-text-summarizer-using-huggingface-transformers/)  
21. Nucha/Nucha\_ITSkillNER\_BERT \- Hugging Face, accessed July 31, 2025, [https://huggingface.co/Nucha/Nucha\_ITSkillNER\_BERT](https://huggingface.co/Nucha/Nucha_ITSkillNER_BERT)  
22. Calling Python from Rust \- PyO3 user guide, accessed July 31, 2025, [https://pyo3.rs/latest/python-from-rust.html](https://pyo3.rs/latest/python-from-rust.html)  
23. Calling Python from Rust with PyO3: A Practical Guide | by Ryoji Uehara, accessed July 31, 2025, [https://python.plainenglish.io/calling-python-from-rust-with-pyo3-a-practical-guide-5e498238e6c0](https://python.plainenglish.io/calling-python-from-rust-with-pyo3-a-practical-guide-5e498238e6c0)  
24. Executing existing Python code \- PyO3 user guide, accessed July 31, 2025, [https://pyo3.rs/main/python-from-rust/calling-existing-code.html](https://pyo3.rs/main/python-from-rust/calling-existing-code.html)  
25. Machine learning — list of Rust libraries/crates // Lib.rs, accessed July 31, 2025, [https://lib.rs/science/ml](https://lib.rs/science/ml)  
26. Is anyone doing Machine Learning in Rust? \- Reddit, accessed July 31, 2025, [https://www.reddit.com/r/rust/comments/13eij5q/is\_anyone\_doing\_machine\_learning\_in\_rust/](https://www.reddit.com/r/rust/comments/13eij5q/is_anyone_doing_machine_learning_in_rust/)  
27. mdbook \- Rust, accessed July 31, 2025, [https://docs.rs/mdbook/\*/mdbook/](https://docs.rs/mdbook/*/mdbook/)  
28. Introduction \- mdBook Documentation \- GitHub Pages, accessed July 31, 2025, [https://moenarch.github.io/moenarchbook/index.html](https://moenarch.github.io/moenarchbook/index.html)  
29. mdBook Documentation, accessed July 31, 2025, [https://crisal.io/tmp/book-example/book/print.html](https://crisal.io/tmp/book-example/book/print.html)  
30. mdbook-template/book.toml at main \- GitHub, accessed July 31, 2025, [https://github.com/kg4zow/mdbook-template/blob/main/book.toml](https://github.com/kg4zow/mdbook-template/blob/main/book.toml)  
31. Text processing — list of Rust libraries/crates // Lib.rs, accessed July 31, 2025, [https://lib.rs/text-processing](https://lib.rs/text-processing)  
32. dslim/bert-base-NER \- Hugging Face, accessed July 31, 2025, [https://huggingface.co/dslim/bert-base-NER](https://huggingface.co/dslim/bert-base-NER)  
33. Mehyaar/Annotated\_NER\_PDF\_Resumes · Datasets at Hugging Face, accessed July 31, 2025, [https://huggingface.co/datasets/Mehyaar/Annotated\_NER\_PDF\_Resumes](https://huggingface.co/datasets/Mehyaar/Annotated_NER_PDF_Resumes)  
34. Sentence Similarity and Semantic Search using free Huggingface Embedding API \- Medium, accessed July 31, 2025, [https://medium.com/neural-engineer/sentence-similarity-and-semantic-search-d6995c5e368a](https://medium.com/neural-engineer/sentence-similarity-and-semantic-search-d6995c5e368a)  
35. micposso/word-semantic-similarity \- Hugging Face, accessed July 31, 2025, [https://huggingface.co/micposso/word-semantic-similarity](https://huggingface.co/micposso/word-semantic-similarity)  
36. Comparison Of Models For Resume-JD Matching: BERT, Gemini, And Llama 3.1 \- IOSR Journal, accessed July 31, 2025, [https://www.iosrjournals.org/iosr-jce/papers/Vol27-issue2/Ser-5/A2702050110.pdf](https://www.iosrjournals.org/iosr-jce/papers/Vol27-issue2/Ser-5/A2702050110.pdf)  
37. Document Matching for Job Descriptions \- Stanford University, accessed July 31, 2025, [https://web.stanford.edu/class/archive/cs/cs224n/cs224n.1214/reports/final\_reports/report062.pdf](https://web.stanford.edu/class/archive/cs/cs224n/cs224n.1214/reports/final_reports/report062.pdf)  
38. Falconsai/text\_summarization \- Hugging Face, accessed July 31, 2025, [https://huggingface.co/Falconsai/text\_summarization](https://huggingface.co/Falconsai/text_summarization)  
39. LlamaFactoryAI/cv-job-description-matching \- Hugging Face, accessed July 31, 2025, [https://huggingface.co/LlamaFactoryAI/cv-job-description-matching](https://huggingface.co/LlamaFactoryAI/cv-job-description-matching)  
40. Bridging Python & Rust: A Walkthrough of using Py03, accessed July 31, 2025, [https://sinon.github.io/bridging-python-and-rust/](https://sinon.github.io/bridging-python-and-rust/)  
41. tera \- Rust \- Docs.rs, accessed July 31, 2025, [https://docs.rs/tera](https://docs.rs/tera)  
42. Keats/tera: A template engine for Rust based on Jinja2/Django \- GitHub, accessed July 31, 2025, [https://github.com/Keats/tera](https://github.com/Keats/tera)  
43. Template engine — list of Rust libraries/crates // Lib.rs, accessed July 31, 2025, [https://lib.rs/template-engine](https://lib.rs/template-engine)  
44. Templating » AWWY? \- Are We Web Yet?, accessed July 31, 2025, [https://www.arewewebyet.org/topics/templating/](https://www.arewewebyet.org/topics/templating/)  
45. Compare Rust HTML to PDF Libraries \- Open-Source and Commercial \- DocRaptor, accessed July 31, 2025, [https://docraptor.com/rust-html-to-pdf](https://docraptor.com/rust-html-to-pdf)  
46. genpdfi \- Rust \- Docs.rs, accessed July 31, 2025, [https://docs.rs/genpdfi](https://docs.rs/genpdfi)  
47. fschutt/printpdf: Rust / WASM library for reading, writing, templating and rendering PDF, accessed July 31, 2025, [https://github.com/fschutt/printpdf](https://github.com/fschutt/printpdf)  
48. A Gentle Introduction to WebAssembly in Rust (2025 Edition) | by Mark Tolmacs \- Medium, accessed July 31, 2025, [https://medium.com/@mtolmacs/a-gentle-introduction-to-webassembly-in-rust-2025-edition-c1b676515c2d](https://medium.com/@mtolmacs/a-gentle-introduction-to-webassembly-in-rust-2025-edition-c1b676515c2d)  
49. Compiling from Rust to WebAssembly \- MDN Web Docs, accessed July 31, 2025, [https://developer.mozilla.org/en-US/docs/WebAssembly/Guides/Rust\_to\_Wasm](https://developer.mozilla.org/en-US/docs/WebAssembly/Guides/Rust_to_Wasm)  
50. Brand and brand awareness for developer tools \- Developer Markepear, accessed July 31, 2025, [https://www.markepear.dev/blog/branding-developer-tools](https://www.markepear.dev/blog/branding-developer-tools)  
51. How to Keep Your Portfolio Updated for US Employers \- Fueler, accessed July 31, 2025, [https://fueler.io/blog/how-to-keep-your-portfolio-updated-for-us-employers](https://fueler.io/blog/how-to-keep-your-portfolio-updated-for-us-employers)  
52. Portfolio Analytics | Portfolio Analysis Tool \- FactSet, accessed July 31, 2025, [https://www.factset.com/solutions/portfolio-analytics](https://www.factset.com/solutions/portfolio-analytics)  
53. Developing Your Professional Brand with GitHub \- YouTube, accessed July 31, 2025, [https://www.youtube.com/watch?v=NBRxCEy1F9k](https://www.youtube.com/watch?v=NBRxCEy1F9k)  
54. GitGig \- GitHub, accessed July 31, 2025, [https://github.com/gitgig-io](https://github.com/gitgig-io)