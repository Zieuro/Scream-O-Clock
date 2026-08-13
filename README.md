# Scream O'Clock

A rotation scheduler app for haunted house crew management. Three workers (A, B, C) rotate through positions in 20-minute slots across the evening, and the app schedules silent local notifications at each slot boundary so the crew knows when to rotate — even when the app is closed.

Built with React Native + Expo.

## What it does

- Displays the live rotation status for the current 20-minute slot (who's on set, off set, on meal)
- Shows a countdown to the next rotation
- Shows a "Next:" preview of the upcoming slot's changes
- Displays the full schedule as a color-coded table
- Arms silent scheduled notifications at every future slot boundary
- Notifications fire even when the app is killed (Android `setExactAndAllowWhileIdle` / iOS `UNUserNotificationCenter`)
- One-tap arm/disarm for all alarms
- Stop a currently-ringing alarm from within the app

## How it works

The crew works in three positions (A, B, C) across 18 fixed 20-minute slots running from 7:00 PM to 12:40 AM. Each slot assigns every worker one of three statuses:

- **On Set** — actively working a position
- **Off Set** — on break
- **On Meal** — eating

When you tap "Arm Alarms," the app schedules a local notification for each future slot's start time. When a slot boundary arrives, the notification fires with a "ROTATE!" title and the body lists who goes on set, off set, and on meal for the upcoming slot.

## Tech stack

- **React Native 0.86** — cross-platform UI (Android + iOS)
- **Expo SDK 57** — managed build, OTA updates, native modules
- **expo-router** — file-based navigation
- **NativeWind v5 + gluestack-ui** — styling
- **React 19** + **TypeScript**

## Background

Rewrite of a [Flutter app](https://github.com/Zieuro/screamoclock) in React Native + Expo. The original was vibe-coded; this version is being built properly.
