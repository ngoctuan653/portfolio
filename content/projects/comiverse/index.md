---
title: ComiVerse
summary: A cross-platform digital comic ecosystem covering publishing, translation, moderation, subscriptions, community, and secure reading.
date: 2026-09-02
featured: true
tags:
  - React
  - Flutter
  - Spring Boot
  - PostgreSQL
  - Real-time Systems
---

ComiVerse is a five-person capstone project that manages the full lifecycle of digital comics across web and mobile. It connects Readers, Authors, Translators, Project Leaders, Moderators, and Administrators through role-specific workflows backed by one Spring Boot platform.

## My Contribution

I worked as a Full-stack and Mobile Developer, with a primary focus on cross-platform account flows and the Flutter reader application.

- Implemented email verification, forgot/reset password, Google Sign-In, profile synchronization, and device re-enrollment flows across clients and backend.
- Built and refined Admin experiences for account management, broadcasts, notifications, premium state, and payment statistics.
- Developed major Flutter Reader flows for Android and iOS, including discovery, reading, profile, notifications, subscription state, and protected offline-download integration.
- Connected database notifications, STOMP/WebSocket updates, and Firebase Cloud Messaging for foreground, background, and terminated app states.
- Integrated Stripe-hosted checkout and synchronized API contracts between React, Spring Boot, and Flutter.
- Contributed to deployment on Vercel and Railway and to GitHub Actions for iOS builds.

## Product Scope

Beyond comic discovery and reading, the platform supports author publishing, moderation queues, team translation by page and speech bubble, forum and chat, premium subscriptions, creator payouts, analytics, and role-based administration. Service-layer ownership checks complement endpoint RBAC so users can act only on the resources and language scopes assigned to them.

## Architecture

React 19 and Flutter clients share a Java 21 / Spring Boot backend with PostgreSQL, pgvector, Redis, JWT/OAuth2, and STOMP WebSocket. Cloud integrations include Cloudinary, Stripe, SendGrid, Firebase Cloud Messaging, Google OAuth, and Gemini. The deployed web application runs on Vercel and the API runs on Railway.

[Open the live product](https://comi-verse.vercel.app/) | [View the mobile repository](https://github.com/DangNgocThanhk18/SEP490_G37_SUM26_MOBILE_FLUTTER)
