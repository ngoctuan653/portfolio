---
title: EnglishParty
summary: A CEFR A1-C2 learning platform with adaptive practice, spaced repetition, social motivation, and fair progress tracking.
date: 2026-09-02
featured: true
tags:
  - React
  - TypeScript
  - Firebase
  - Learning Technology
  - PWA
---

EnglishParty is a full-stack English learning product organized around the Common European Framework of Reference from A1 to C2. It combines structured practice with the social feedback loops that help learners return every day.

## What I Built

- Designed and implemented responsive learning experiences for grammar, use of English, reading, listening, and vocabulary.
- Built an adaptive vocabulary workflow with spaced repetition and Again, Hard, Good, and Easy review outcomes.
- Added XP, streaks, daily missions, friend activity, and real-time leaderboards while keeping rewards tied to validated study behavior.
- Implemented authentication, profile data, learning history, content management, and live updates with Firebase.
- Added a bundled bank of 800 exercises across four CEFR-aligned skill areas, plus CSV import tools for administrators.
- Shipped the application as an installable PWA on Firebase Hosting.

## Engineering Focus

The project required more than presenting questions. Progress, scoring, review scheduling, and anti-cheat signals had to agree across repeated sessions and edge cases. I separated active study time from wall-clock time, treated suspicious signals as evidence rather than automatic guilt, and kept learning progress distinct from competitive XP rewards.

The result is a product where learners can revisit weak material without losing a clear sense of mastery, while leaderboards remain useful as motivation rather than becoming the source of truth for learning.

## Stack

React 19, TypeScript, Vite, Tailwind CSS, Zustand, Firebase Auth, Firestore, Storage, Hosting, Messaging, Workbox, and PWA tooling.

[Open the live app](https://english-party.web.app/) | [View source on GitHub](https://github.com/ngoctuan653/english-party)
