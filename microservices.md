# Microservices Notes ... 7/20/2015
## Netflix History
* Push AWS to limits / DevOps transition coincident with microservices transition
* Loosely-coupled development, consistency ... quorum/gossip ... Cassandra DB repair
* Seek to maximize diversity of opinion, present in public, pain produces resilient architecture
* Use quorums in distributed architecture rather than trying to harden master-slave architecture  
* Open source history at Netflix; company put a contributor agreement in place with ASF ... GPL license was seen as being just annoying
* Engineers [at Netflix] are compensated with a mark-to-market approach, so DevOps engineers with good open source projects are compensated well
* Monkeys are there to impose systemic rules, eg triple redundancy
* Overcoming the "Throat to Choke" objection ...  need to build SOLID ecosystem around an open source project, community-built ...
* At Netflix, the default is that a repo will be open source
* How do you convince people to just radically throw things away
* Once you have kids watching Netflix, the account does not go away ... otherwise the biggest, closest competitor is YouTube
* Netflix has 37% of streaming, Amazon Prime has 2%
* The "secret" story of the Netflix open source prize was that it was about recruiting
* Netflix OSS ... IBM Watson ... Nike fitness trackers ... riot games, online gaming
* Old, gray hairs ... some from Xerox PARC ... were the ones who built the Netflix system

## Lessons from Netflix
* Speed wins in the marketplace ... radically increasing speed slashes costs ... focus on one TOP LEVEL goal, no locally-optimized metrics
* Remove friction from product development ... microservices, standalone APIs vs systems, open source
* High trust, low process, no hand-offs between teams ... evolving culture is difficult to build, easy to destroy
* Freedom and responsibility culture ... don't mandate communication, remove barriers to responsible communication
* Don't do your own undifferentiated heavy lifting ... why companies like Netflix use AWS
* Use simple patterns automated by tooling
* Self service clouds makes impossible things instant
* "You build it, you run it" - Werner Vogels 2006
* Consider attending DevOps Enterprise Summit #DOES15
* Developer responsibility for being self-starting ... faster, cheaper, safer ... agile, lean, rugged
* Value chain mapping -- AGILE, Lean, 6 Sigma -- systems-based approach demands ambiguity, allows for flexibility
* "It isn't what you don't know that gives you trouble; it is what you do know, but ain't so" -- Will Rogers
** Make your assumptions explicit
** Extrapolate trends to the limit
** Listen to non-customer
** Follow developer adoption, not IT spend
** Map evolution of products to services to utilities
**
* Organizations build up complex "scar tissue" processes ... it is better to build, refactor, re-build, simplify, solidify patterns
* O-O-D-A loop ... Land grab opportunity -- Model Hypotheses -- JFDI -- Launch AB Test
* Instead of monolithic approach, a microservice approach breaks the silos ... Product Team does UX, Dev, QA, DBA ... Platform Team does SySAdmin, NetAdmin, SANAdmin ... DevOps is a ReOrg
* Run what you wrote
* Nondestructive Production Updates ... "Immutable Code" Service Pattern ... A|B Test, Feature Flags and Version Routing control traffic
* Release more often to drive down complexity ... change one thing at a time

## Microservices
* Definition: Loosely-coupled service-oriented architecture with bounded contexts
* Conway's law -- Organizational coupling
* Centralized Database Schemas
* Enterprise Service Bus -- centralized message queues
* Inflexible Protocol Versioning
* Separate Concerns with microservice
* Invert Conway's Law -- teams own service groups and backend stores
* One "verb" per single function microservice, size doesn't matter
* One developer independently produces a microservice
* Each microservice is its own build, avoid trunk conflicts
* Deploy in a container, Tomcat, AMI, or Docker or
* Stateless business logic: Cattle, not pets.
* Stateful cached data service layer

## Anomaly Detection As A Service ... NetfixOSS Hystrix

## New Relic config mgmt ... YAML tools ... use SPIGO to visualize dependency tree evolution over time

## Expedient hackery to build a USEFUL model without modeling too much detail

## Developer Concerns -- Agile, Lean, Rugged -- Faster, Cheaper, Safer

## Zipkin Browser

## Freedom and Responsibility Culture
* Simple, single purpose -- "best television experience"
* Values are what we value
* Highly aligned, Loosely-coupled
* Context, not control
* Mark to market pay raises

## Holacracy -- Brian Robertson

## Capital One DevOps Dashboard -- [Hygieia](https://github.com/capitalone/Hygieia)

## Read [Systems Thinking](https://www.safaribooksonline.com/library/view/systems-thinking-3rd/9780123859150/)

## [Pytheas](https://github.com/Netflix/pytheas)
