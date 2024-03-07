---
layout: post
title:  "Swarm Robotics and Warfighting Obsolescence"
date:   2024-02-21 4:30:00
categories: template
---



# Introduction to swarm computing and swarm robotics 

In order for us to lay the groundwork for how we might think about implementing swarm robotics, it's important to first think about relatively simple things such as the major difficulties that most new users will experience in adopting something like ROS 2 for swarm robotics projects in a mocked-up industrial setting for something like a high-school science project ... and thereafter, we can level up our thinking in terms of applying practical industrial experience with swarm robotics to new battlefield scenarios. 

Of course, for different scenariors and because of the constant development of technologies, there will be better alternatives or other alternatives that are better than just ROS 2 or some variant, but even ROS 2 and the coordination of something like a high school science project can be a NECESSARY starting point for thinking about how to implement swarm robotics in a practical setting, ie it's important to climb the learn curve and learn BIG lessons with the very small cost and tiniest risk of danger or even nuisance to others.

## Challenges that users may face when adopting ROS 2 for swarm robotics projects in industrial settings:

1. Complexity: ROS 2 has a steep learning curve, especially for users who are not familiar with the ROS ecosystem. Understanding the concepts, architecture, and tools can be time-consuming and challenging.

2. Integration with existing systems: Integrating ROS 2 with existing industrial systems, such as PLCs, SCADA, or other proprietary software, can be difficult. It may require custom middleware or interfaces, which can add complexity and maintenance overhead.

3. Real-time performance: In some industrial applications, real-time performance is critical. While ROS 2 has improved real-time capabilities compared to ROS 1, it may still not meet the strict real-time requirements of certain industrial use cases.

4. Scalability: Managing a large swarm of robots using ROS 2 can be challenging, especially when dealing with limited bandwidth, network latency, and resource constraints. Ensuring reliable communication and coordination among the robots can be complex.

5. Security: Industrial settings often have stringent security requirements. ROS 2 has better security features than ROS 1, but it may still require additional measures to meet specific industrial security standards and protect against potential vulnerabilities.

6. Robustness and reliability: Industrial environments can be harsh, and robots need to operate reliably under various conditions. Ensuring the robustness and fault tolerance of the ROS 2-based system can be challenging, particularly when dealing with a large swarm of robots.

## Alternatives to ROS 2 for swarm robotics in industrial settings

1. MQTT: MQTT (Message Queuing Telemetry Transport) is a lightweight publish-subscribe protocol that can be used for communication among robots. It is well-suited for low-bandwidth, high-latency networks and can be easily integrated with industrial systems.

2. DDS: DDS (Data Distribution Service) is a middleware standard for real-time systems. It provides low-latency, high-throughput communication and supports various quality of service (QoS) policies. DDS is used as the underlying communication layer in ROS 2, but it can also be used independently.

3. Custom frameworks: Some organizations choose to develop their own custom frameworks tailored to their specific requirements. This allows for greater control and optimization but requires significant development effort and expertise.

4. Industrial-specific platforms: There are some industrial-specific platforms and frameworks designed for robot control and automation, such as ABB's RobotStudio, KUKA's KUKA.PLC, or Siemens' SIMATIC. These platforms are often tightly integrated with the respective robot hardware and provide a higher level of industrial compatibility and support.

The choice between ROS 2 and other alternatives depends on the specific requirements, constraints, and expertise of the industrial setting. ROS 2 offers a rich ecosystem, extensive libraries, and community support, making it a very popular choice for many entry level robotics projects. 

## Alternatives to ROS 2 for applications with stricter real-time, security, or integration requirements

### AUTOSAR (AUTomotive Open System ARchitecture):
AUTOSAR is a standardized software architecture for automotive electronic control units (ECUs).
It provides a real-time operating system (RTOS) and a set of standardized software interfaces and services.
AUTOSAR is designed to ensure real-time performance, reliability, and safety in automotive systems.
It has strong industry adoption and is suitable for applications with strict real-time and safety requirements.

### OROCOS (Open Robot Control Software):

OROCOS is a real-time toolkit for robot control and automation.
It consists of a real-time kernel, a component framework, and a set of libraries for motion control, kinematics, and dynamics.
OROCOS provides deterministic real-time performance and is suitable for applications with strict timing constraints.
It offers a modular and flexible architecture, making it easier to integrate with existing industrial systems.

### ROCK (Robot Construction Kit):

ROCK is a software framework for robotic systems that emphasizes real-time performance and modularity.
It provides a component-based architecture and a set of tools for system integration and deployment.
ROCK is designed to support real-time control, perception, and planning in robotic applications.
It offers a high degree of flexibility and extensibility, making it suitable for complex robotic systems.

### RTI Connext DDS:
RTI Connext DDS is a commercial implementation of the Data Distribution Service (DDS) standard.
It provides a real-time, secure, and scalable messaging middleware for distributed systems.
Connext DDS supports various quality of service (QoS) policies and offers strong security features, including authentication, encryption, and access control.
It is widely used in mission-critical applications, such as aerospace, defense, and industrial automation.

### OPC UA (Open Platform Communications Unified Architecture):
OPC UA is an industrial communication protocol and information modeling standard.
It provides a secure, reliable, and interoperable framework for data exchange between industrial devices and systems.
OPC UA supports real-time communication, security features (authentication, encryption, and access control), and complex data modeling.
It is widely adopted in industrial automation and is suitable for integrating robotic systems with existing industrial infrastructure.
These alternatives offer different features and capabilities focused on real-time performance, security, and integration with industrial systems. The choice of the most suitable alternative depends on the specific requirements of the application, the existing infrastructure, and the expertise of the development team.

### Summary 

It's important to note that while all of these different alternatives excel in different aspects, they will have an steeper learning curve than ROS 2, with a smaller community for diverse ideas or support and limited ecosystem of affiliated middleware or supporting hardware when compared to the ecosystem surrounding ROS 2. It's crucial to learn in the virtual realm to greatest degree possible in order to better think through and systematically evaluate the trade-offs.  It's not just about making a *trophy application* work at the high school science fair -- it is necessary to consider the long-term development, maintenance and logistical support aspects when selecting an alternative framework for a specific application.

## Theoretical research and development in swarm robotics

[Swarm robotics](https://en.wikipedia.org/wiki/Swarm_robotics), [multi-agent systems](https://en.wikipedia.org/wiki/Multi-agent_system) and [fog computing](https://en.wikipedia.org/wiki/Fog_computing) ***will be*** two of the most important technologies that will change the way we think about warfighting ... and yes, they are probably still primarily only at vaporware stage -- we have not REALLY seen these things in action yet, **although** the conflict in Ukraine gives us a hint about what is to come.We have long known that the [use of swarm robotics or using multiple robots in a coordinated fashion in industrial settings](https://web.archive.org/web/20180726044234/https://link.springer.com/content/pdf/10.1007%2F978-3-319-62533-1_15.pdf) shortens manufacturing time by performing different tasks simultaneously. 

The aspect of [**emergent advantages**](https://en.wikipedia.org/wiki/Emergence) of complex swarms of work completion is certainly not at all new or just some property that has **emergentized** because of swarm robotics, ie it was not invented *lately*. Our grandparents and people before them had all heard and used the old expression: ***Many hands make light work.*** Its earliest known appearance is in the book "Proverbs" by John Heywood, which was published in 1546, but the concept behind this proverb can be traced back to ancient times, eg Homer's "Iliad" includes a passage that translates to "*By union the smallest states thrive, by discord the greatest are destroyed.*" Within the [philosophy of science](https://en.wikipedia.org/wiki/Philosophy_of_science), the most advanced thinking on emergentism both contrasts with and parallels reductionism, because emergentism involves the complexity of [neural correlates of consciousness](https://en.wikipedia.org/wiki/Neural_correlates_of_consciousness) and the [philosophy of mind](https://en.wikipedia.org/wiki/Philosophy_of_mind).

There are many tasks in any sort of complex setting, such as either an industrial environment with an autonomous warehouse or an even more complicated, highly uncertain battlefield in war, where the collaborative, intelligent, evolving coordination of multiple robots is essential to even being able to accomplish a task objective. These two examples illustrate the importance of collaborative, intelligent, and evolving coordination among multiple robots in highly uncertain, dynamic, and complex environments; it may be worth contemplating these examples in further detail.

### First Example: More Predictable, Less Beligerent Industrial Environment Or Autonomous Warehouse
   
In a large-scale autonomous warehouse, multiple robots are deployed to handle tasks such as inventory management, order fulfillment, and material transportation. The warehouse environment is highly dynamic, with constant changes in inventory levels, order priorities, and physical layout. The robots need to collaborate and coordinate their actions intelligently to optimize warehouse operations.

For example, when an urgent order comes in, the robots must quickly coordinate to locate the required items, package them, and prepare them for shipping. This involves real-time communication, task allocation, and path planning among the robots. The robots must also adapt to changes in the environment, such as newly arrived inventory or temporary obstacles, and update their coordination strategies accordingly.

The coordination challenges become even more complex when dealing with heterogeneous robot teams, where each robot has different capabilities and specializations. For instance, some robots may be responsible for heavy lifting, while others are equipped with high-precision manipulators for delicate tasks. Coordinating these diverse robots requires sophisticated algorithms for task assignment, resource allocation, and synchronization.

### Second Example: Less Predictable, More Beligerent Battlefield Environment Or Military Police in Hostile Territory
   
In a battlefield setting, multiple robots, such as unmanned aerial vehicles (UAVs), unmanned ground vehicles (UGVs), and autonomous underwater vehicles (AUVs), are deployed to support military operations. The battlefield environment is highly uncertain and dynamic, with rapidly changing threats, objectives, and environmental conditions.

For example, in a reconnaissance mission, a team of UAVs may be tasked with gathering intelligence about enemy positions and movements. The UAVs need to coordinate their flight paths, sensor coverage, and data sharing to maximize the information gathered while minimizing the risk of detection. They must also adapt to changing weather conditions, enemy countermeasures, and evolving mission objectives.

In a combat scenario, multiple robots may be involved in coordinated attacks or defensive maneuvers. This requires real-time coordination, precise timing, and adaptive formation control. The robots must be able to quickly adjust their strategies based on the actions of the enemy and the changing battlefield conditions.

Moreover, in a military setting, the robots must also interact and coordinate with human operators and other manned systems. This adds another layer of complexity, requiring seamless communication, shared situational awareness, and collaborative decision-making between humans and robots.

In both examples, the success of the mission depends on the ability of the robots to collaborate intelligently, adapt to changing circumstances, and make decisions collectively. This requires advanced algorithms for distributed decision-making, multi-robot task allocation, and adaptive coordination.

The coordination algorithms must be able to handle incomplete information, communication limitations, and the possibility of robot failures or losses. They must also be scalable to accommodate a large number of robots and be resilient to disruptions and adversarial actions.

## Gamification, simulation and developing advanced strategies for other coordination examples

Developing effective coordination strategies for such complex and uncertain environments is an active area of research in robotics and artificial intelligence. Techniques such as swarm intelligence, multi-agent reinforcement learning, and decentralized control are being explored to enable intelligent and adaptive coordination among multiple robots in challenging real-world settings.

* Manipulating [large] structural elements in a coordinated fashion in environments that are hard or impossible for humans to access such as in space or underwater.
* Performing a coordinated search or intelligence gathering task through the collaboration of different types of robots, likely in a largescale disaster or hazardous envionment, a flying drone can more rapidly locate areas where the most valuable assets are likely to be found, while a tracked robot on the ground searches in coordinated manner to refine the overall observability.
* Performing simultaneous measurements in different locations with different instruments: measuring sound disturbances in different parts of a building while monitoring toxic pollutants or radiation after an industrial accident.

It should come as no surprise that swarm robotics, as a highly coordinated logistics-enabling technology has rapidly changed warfighting and defense strategies. It is important for us to be aware of what this means ... the wars of the 2030s will not be fought with the technologies of the the 2000 or even the technologies of 2015. We might admire old warfighting technologies as museum pieces, but we should not imagine that they are not obsolete. When we say that "Freedom is not free" it increasing means that our technology and tactics that incorporate the most approapriate technologies must be part of our overall strategy.

Of course, we might think that we don't want to update our skills ... we might be able to kind of coast on the freedom provided for us, but we need to exercise those freedoms, especially the **freedom to inform ourselves** and practice with applicable technology.

We live in an information age and are subject to what could be described as information war. Of course, there is no substitute for being fiercely skeptical and yet generally aware enough of technological developments in warfighting and reasonably familar with how those technologies might be obtained implemented so that one can defend oneself. It is necessary for a well-informed citizenry to be able to defend against tyranny ... even if that defense would involve certain death for most of those doing the fighting. It's your duty as a citizen to kinda know what's going on and not be completely helpless in the face of those who would gladly prefer to keep you stupid or using their preferred media choices to program you to accept their form of tyranny.

You are kidding yourself if you think that you can be free if you don't devote at least some mental energy to the topic of self-defense and awareness of different mechanisms of self-defense. In keeping with the distributed defense philosophical underpinnings of the 2nd Amendment of the US Constitutions, it is quite necessary for citizens to be able to procure, keep and bear arms ... and arms is certainly not limited to firearms ... it is about a robust defense and awareness of what that defense would require ... therefore it is necessary to explore the implications of new technologies and the potential impact of those technologies on the future of warfighting and self-defense in the event of civil wars and insurrections. 

In the ongoing war against tyranny ...the best way to PREVENT the war from taking your ability to fight away is to use what freedom you have to prepare for what is likely to be an inevitable reality ... prevention is the only thing that really makes tyranny less likely. 

The reality that freedom can never be free, but must be continually exercised is why we continue to delve into the topics like RTOS and fault-tolerant distributed data databases, communications technologies for self-organizing hierarchies of smart systems ... in order to lay the groundwork for our future understanding of things that we expect to be more important [with applicability in many different fields] such as [swarm robotics](https://web.archive.org/web/20180726044234/https://link.springer.com/content/pdf/10.1007%2F978-3-319-62533-1_15.pdf).  A topic like swarm robotics matters because swarm robotics is a logistic technology, for moving material and machines ... and, in use as as a defense technlogy, swarm robotics is all about the disruption of logistics ... for example, in the Ukrainian strikes against Russian ammo depots, we see ways in how swarms of hundreds of robotic UAVs and or tens of sea drones act as decoys, while armed drones precisely deliver payloads that destroy or at least temporarily disrupt the invading tyrant's warfighting capability.

We can start thinking about self-organizing, but independent autonomous robots by reviewing materials on [Self-organizing Nervous Systems (SoNS) of n-multiple independent robots for coordinated swarm robotics](https://browse.arxiv.org/abs/2401.13103). {*NOTE: Please be advised that the [full pdf for this paper](https://arxiv.org/pdf/2401.13103.pdf) is quite large and will take longer than most*}.  If you are interested in this material and the level of development in this field, it also a good idea, in order to have some understanding of the PUBLICLY AVAILABLE pre-print knowledge, to keep up [daily] with new developments in [Arxiv's most recent Computer Science:Robotics preprints](https://browse.arxiv.org/list/cs.RO/recent). 

***Obviously, we should not expect ALL of the current knowledge to immediately show up on Arxiv! It's just that Arxiv does us as provide ordinary members of the public around the world with a LAGGING indication of the level of development in knowledge that is happening in this particular discipline of tech development.***  

The point of this is that warfighting systems dependent upon tanks, motorized artillery and different automotive warfighting systems which were useful a decade ago have become rapidly become increasingly obsolete as new tech-enabled warfighting strategies have been proven effective ... especially, based on what the world has seen in the last couple years.  The warfighting methods of 2014 are now BADLY DATED ... because things like the technological developments such as Self-Organizing Nervous Systems (SoNS) we see in swarm robotics nowadays have made multi-hundred or multi-thousand drone [self-organizing] coordinated swarm technology a battlefield reality.  **Weapon systems that worked in Afghanistan or Iraq wars of the 2000s and 2010s are now obsolete; weapons systems that were used in the 1990s are not DANGEROUSLY obsolete.  IT IS TIME TO DISPOSE OF THE INVENTORIES OF THESE TECHNOLOGIES WHILE THEY STILL ARE VALUED.**
