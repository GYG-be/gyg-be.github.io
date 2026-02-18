**The 100-point plan** applies Donovan's principles to build a personal intelligence apparatus for the modern professional—one that finds real opportunities through relentless, systematic, frontline engagement with the world.

# OpenClaw on Dual Mac Mini M4: 100 Points for Building Your Opportunity Intelligence System

> ***OBSERVE. BUILD. GATHER INTELLIGENCE. DEFINE YOUR LUCK SURFACE AREA.***
>
> This is a living roadmap for deploying a private, high-performance AI opportunity-finding cluster on two Mac Mini M4s. The emphasis is always on *getting started*, iterating fast, and avoiding the trap of over-engineering before you've found a single lead. Two M4s is already serious infrastructure — don't let it intimidate you into paralysis.

*Last updated: February 17 2026. This document is a living roadmap — version it in Git, review it quarterly, and update it when the market or the technology changes. The principles are durable; the specific tools are not.*

---

## Phase 1: Hardware Foundation & Cluster Bootstrap (Points 1–10)

**Point 1: Designate Your Two Mac Minis — "Primary" and "Secondary."**
The Primary M4 (ideally the M4 Pro variant with 24–48GB unified memory) runs the OpenClaw Gateway, the local inference engine, and your core agent orchestration. The Secondary M4 handles background scraping, vector indexing, and redundancy. Label them clearly — even physically with a sticker — so you never forget which one has the "heartbeat."

*Weaknesses:* Unified memory is shared between CPU and GPU/Neural Engine tasks; heavy inference AND heavy scraping on Primary simultaneously causes contention.
*Opportunities:* Use Apple's MLX framework (optimized for Apple Silicon) instead of Ollama's default GGUF quantization for dramatically faster inference on the M4's Neural Engine — benchmarks show 2–3x throughput improvements on M4 vs. equivalent GGUF.

---

**Point 2: Network Them Directly — Thunderbolt Bridge + 10GbE.**
Connect both Minis with a Thunderbolt 4 cable for a direct 40Gbps inter-node link. Assign static IPs on this bridge (e.g., `192.168.100.1` and `192.168.100.2`). Keep a separate ethernet port on each for WAN. This ensures your agent traffic stays off your home router and stays fast.

*Weaknesses:* Thunderbolt bridge has no built-in failover; a cable pull breaks inter-node comms.
*Opportunities:* Add a cheap managed switch with a dedicated 2.5GbE VLAN as fallback, plus mDNS `.local` resolution so agents find each other even if IPs shift.

---

**Point 3: Install macOS Sequoia (or latest) and Harden Both Nodes.**
Enable FileVault on both. Set automatic login to OFF. Create a dedicated `openclaw` service user account (not admin) that runs all daemon processes. This prevents a rogue browser-automation session from escalating to system-level writes.

*Weaknesses:* macOS updates can silently restart daemons or revoke permissions; a surprise update during a night scan breaks everything.
*Opportunities:* Defer major OS updates (System Settings → Software Update → Automatic Updates: OFF for major versions). Script a pre-update checkpoint that exports all OpenClaw state to a timestamped backup.

---

**Point 4: Install Homebrew, Conda, and Podman on Both Nodes.**
Homebrew for system utilities. A dedicated `conda` environment (`conda create -n openclaw python=3.12`) for all Python dependencies. Podman (not Docker — no daemon required, rootless by default on macOS) for containerized scraper isolation.

*Weaknesses:* Conda environments grow large; Podman on macOS runs inside a Linux VM (podman machine), adding ~500MB overhead and slight latency.
*Opportunities:* Use `uv` (ultra-fast Python package installer) instead of pip inside your conda env — installs are 10–100x faster, which matters when iterating on agent skills.

---

**Point 5: Deploy OpenClaw on Primary — Initialize `~/.openclaw` Workspace.**
Clone the OpenClaw repository to `/Users/openclaw/.openclaw` on Primary. Run `clawctl init` to scaffold `SOUL.md`, `MEMORIES.md`, `HEARTBEAT.md`, and the `skills/` directory. Keep Secondary's OpenClaw install as a read-only mirror for failover, synced via `rsync` over the Thunderbolt bridge every 30 minutes.

*Weaknesses:* Manual rsync drifts if Primary crashes mid-write; Secondary may get a corrupted state snapshot.
*Opportunities:* Use `lsyncd` (Live Syncing Daemon) for near-real-time mirroring, or set up a lightweight Git bare repo on Secondary that Primary pushes to after every completed scan cycle.

---

**Point 6: Run OpenClaw as a LaunchAgent (macOS Native Daemon).**
Create a `.plist` file in `~/Library/LaunchAgents/com.openclaw.heartbeat.plist` that keeps the OpenClaw heartbeat running on login, with `KeepAlive = true` and stdout/stderr redirected to rotating log files. Use `launchctl load` to activate it. This gives you 24/7 "heartbeat" without needing a terminal open.

*Weaknesses:* LaunchAgents run as the user, not root — some network operations or Keychain access may prompt for passwords after reboots.
*Opportunities:* Pair with `Uptime Kuma` (running in a Podman container on Secondary) to monitor the heartbeat endpoint and send a Telegram ping if the Primary goes silent for >5 minutes.

---

**Point 7: Deploy Ollama + MLX on Primary for Local Inference.**
Install Ollama for easy model management (`brew install ollama`), but also install Apple's `mlx-lm` package for native M4 inference. Run `mistral-nemo` or `llama3.2:3b` via Ollama for fast, low-memory tasks. Reserve the M4 Pro's full Neural Engine for `mlx-lm` calls when running your Auditor or Synthesis agents on complex matching tasks.

*Weaknesses:* Ollama and mlx-lm can conflict over GPU memory if called simultaneously; no built-in load balancer between them.
*Opportunities:* Write a thin Python `ModelRouter` class that checks current memory pressure (via `psutil`) and routes inference calls to Ollama (lightweight, always-on) vs. mlx-lm (high-quality, on-demand) based on task complexity score.

---

**Point 8: Offload Heavy Scraping to Secondary.**
Configure Secondary's OpenClaw instance as a dedicated "Miner Node" — it runs browser-use automation (Playwright), RSS aggregation, and all web scraping tasks. Primary orchestrates and reasons; Secondary gathers and stores. Agents communicate via a shared Redis instance running on Primary (accessible over the Thunderbolt bridge).

*Weaknesses:* Redis as a single point of failure; if Primary Redis crashes, Secondary's scrapers queue up and overflow.
*Opportunities:* Use Redis Sentinel (even with just two nodes it helps) for basic failover, or swap to Valkey (the open-source Redis fork) for a license-clean, community-supported alternative.

---

**Point 9: Set the Heartbeat Cadence — Staggered, Not Synchronized.**
Configure Primary's `HEARTBEAT.md` to trigger an "Area Scan" every 45 minutes. Configure Secondary's scraping jobs to run on a *different* 45-minute cycle, offset by 22 minutes. This prevents both Minis from hammering target sites simultaneously and reduces the fingerprint of your automated activity.

*Weaknesses:* Offset timing makes debugging harder — log timestamps from two nodes can confuse post-mortems.
*Opportunities:* Adopt structured logging (JSON via `structlog`) with a `node_id` field on every log entry, then aggregate both nodes' logs into a single Loki instance (lightweight, runs fine on Secondary) for unified querying via Grafana.

---

**Point 10: Connect Your Notification Gateway — Telegram Bot on Primary.**
Create a private Telegram bot (via BotFather) and configure OpenClaw's `SOUL.md` to push opportunity alerts to your personal chat. This becomes your mobile "radar screen." Set up separate Telegram topics (if using a Group with Topics enabled) for: `HIGH PRIORITY`, `MONITOR`, and `ARCHIVED` leads.

*Weaknesses:* Telegram's bot API has a 30-messages-per-second global limit, but more practically, notification fatigue kills the system if thresholds aren't tuned.
*Opportunities:* Add a secondary "digest" mode — instead of real-time pings, bundle all sub-75-score leads into a single daily morning summary message, keeping your immediate notifications reserved for truly high-value hits.

---
