---
layout: post
title:  "It looks like we might have consensus!"
date:   2015-09-23 8:30:00
categories: algorithms social leadership
---
I enjoy and am frustrated by the topic of CONSENSUS enough that I once started writing a book once about it ... [Plato's Republicans](http://www.platosrepublicans.com/) ... my interest in political economics and social choice theory gradually was overcome by the more concrete and practical world of consensus algorithms for distributed databases ... I continue to see BOTH topics as very closely related, but I now see that the implementations of the distributed database algorithms offers much more promise than the theoretic navel-gazing of political economics.

This is a techblog so my focus here is upon an exploration of consensus algorithms in distributed databases.  In these RT/FT algorithms as in life with humans, it is easy to recognize what consensus is after you are there ... everyone loves it and we almost declare some sort of moral triumph when we exclaim, "So we have consensus!" ... but the pain of converging on the final solution can be a bugger ... especially if speed of convergence matters.

[Paxos](https://en.wikipedia.org/wiki/Paxos_(computer_science)) ... first published in 1989, named after a fictional legislative consensus system used on the Paxos island in Greece. The Paxos family of protocols includes a spectrum of trade-offs between the number of processors, number of message delays before learning the agreed value, the activity level of individual participants, number of messages sent, and types of failures. Although no deterministic fault-tolerant consensus protocol can guarantee progress in an asynchronous network, Paxos guarantees safety (consistency), and the conditions that could prevent it from making progress are difficult to provoke. Paxos is usually used where durability is required (for example, to replicate a file or a database), in which the amount of durable state could be large. The protocol attempts to make progress even during periods when some bounded number of replicas are unresponsive. There is also a mechanism to drop a permanently failed replica or to add a new replica.

[Chandra-Toueg](https://en.wikipedia.org/wiki/Chandra%E2%80%93Toueg_consensus_algorithm) ... published by Tushar Deepak Chandra and Sam Toueg in 1996, is an algorithm for solving consensus in a network of unreliable processes equipped with an eventually strong failure detector. The failure detector is an abstract version of timeouts; it signals to each process when other processes may have crashed. An eventually strong failure detector is one that never identifies some specific good process as having failed after some initial period of confusion, and at the same time eventually identifies all bad processes as failed. The algorithm itself is similar to the Paxos algorithm, which also relies on failure detectors. Both algorithms assume the number of faulty processes is less than n/2, where n is the total number of processes.

[Raft](https://raft.github.io/) ... first published in 2013 is a understandable, more readily-implementable consensus algorithm designed as a more practical alternative to Paxos. It was meant to be more understandable than Paxos by means of separation of logic, but it is also formally proven safe and offers some new features. Raft offers a generic way to distribute a state machine across a cluster of computing systems, ensuring that each node in the cluster agrees upon the same series of state transitions. It has a number of open-source reference implementations, with full-spec implementations in Go, C++, Java, and Scala.


Reading list ...

* TBD social consensus research ... glaringly incomplete! ... especially given the material that should be out there on NEW forms of social leadership ... haven't Twitter, FB and LinkedIn taught us anything about Leaders and followers ... consider also Bitcoin and [other cultural phenomena, such as the bandwagon effect](https://en.wikipedia.org/wiki/Bandwagon_effect) *

* TBD consensus algorithm dissertations and peer-reviewed papers ... glaringly incomplete! ... [A Formal Approach to Fault Tolerant Distributed Consensus](http://lampwww.epfl.ch/~blackbal/Thesis/thesis.pdf)

* [Google's Spanner](http://research.google.com/archive/spanner.html) [pdf](http://static.googleusercontent.com/media/research.google.com/en//archive/spanner-osdi2012.pdf), [slides](http://research.google.com/archive/spanner-osdi2012.pptx), [2012 talk at OSDI](http://livestream.com/accounts/1545775/osdi12/videos/4646642)

* TBD ... video playlists

* Extended blogosphere and twittersphere TBD

* MORE repository TBD
