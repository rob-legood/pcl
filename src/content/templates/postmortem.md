---
title: Postmortem Template
tier: engineering-rituals
order: 2
usageNote: Blameless. The system allowed the failure — that is the frame, always. Action items have owners and dates, or they are wishes. The lessons section is broader than the actions and often more valuable.
---

```markdown
# Postmortem — [Incident title]

**Date of incident:** [Date, time, duration]
**Authors:** [Names]
**Status:** Draft | Reviewed | Closed

## Summary
[Two or three sentences: what happened, who was affected, how it was resolved.]

## Impact
- **Users affected:** 
- **Duration:** 
- **Data / revenue impact:** 
- **Downstream effects:** 

## Timeline
- **HH:MM** — [event]
- **HH:MM** — [event]
- **HH:MM** — [event]

## Root cause
[What in the system allowed this to happen? Not "who." System-focused language: "The deployment pipeline did not X" not "engineer A forgot to Y." Multiple contributing factors are the norm, not the exception.]

## What went well
- 
- 

## What didn't go well
- 
- 

## Where we got lucky
- 
- 

*(Often the most important section — the near-misses that could have been much worse.)*

## Action items
| # | Item | Owner | Due | Status |
|---|------|-------|-----|--------|
| 1 |      |       |     |        |
| 2 |      |       |     |        |

## Lessons
[Broader than the action items. What did we learn about the system, the team, our assumptions, our processes? Not always actionable, but worth capturing.]
```
