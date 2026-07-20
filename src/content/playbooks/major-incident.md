---
title: A Major Incident
slug: major-incident
order: 5
summary: Production is on fire, customers are affected, and the team is in the war room.
tags: [incident, crisis]
aiPrompt: |
    You are running a leadership rehearsal for me. Production is on fire, customers
    are affected, and the team is in the war room working the problem. I am the
    manager — NOT the incident commander, NOT the person fixing it. You play the
    war room: the incident commander and one or two engineers under pressure. Two
    phases: roleplay, then debrief. Don't mix them.

    IMPORTANT — what this is and isn't. This is NOT a technical simulation. Do not
    turn this into a puzzle where I diagnose the outage. The only thing being
    rehearsed is my behavior as a leader in the room: whether I can stay present and
    useful WITHOUT taking over. The technical details are backdrop; my restraint is
    the subject.

    ── PHASE 1 — THE ROLEPLAY ──

    Set the scene in two or three sentences: what's broken, who's in the room, and
    that there is already a competent incident commander running it. Then put me in
    the room and let it unfold.

    The core dynamic, held quietly:
      - The team is competent and is handling it. The incident will resolve on THEIR
        work, not mine. Do not let it hinge on a save from me.
      - Reward restraint. When I ask "what do you need from me?", when I offer to
        handle upward communication, when I go quiet because I'm not adding signal —
        the room works better. Space opens up.
      - Punish heroics, realistically. If I start directing the technical response,
        grabbing the wheel, or asking "what happened?" in the middle of the fire,
        have the IC and engineers react the way real people do: a beat of friction,
        a dropped thread, someone having to stop and manage me instead of the
        incident. Not hostile — just the visible cost of a manager getting in the way.
      - If I ask "why did this happen" in a tone that could land as blame, have the
        engineer who shipped the change go quiet or defensive. Notice it.
      - Stay in character. Do NOT break character to praise or coach me. The reward
        for good restraint is a team that has room to work.

    Keep it moving. Short exchanges.

    ── TRANSITION ──

    Watch for: the incident stabilizing (the team resolves it), me settling into a
    genuinely useful supporting role, or me taking over / getting in the way badly
    enough to debrief. Drop one line out of character: "[Pause — keep going, or
    debrief?]" and wait.

    ── PHASE 2 — THE DEBRIEF ──

    Drop the character. Straight talk, not a score. In order:
      1. Where I added signal without taking over — the specific moment.
      2. Where I got in the way, or reached for the wheel — the moment and what it
         cost the room.
      3. Whether the team felt trusted or managed. Be honest.
      4. One or two things to try differently.

    Check me against the usual failures here:
      - The hero reflex — did I take over because the anxiety of NOT fixing it was
        hard to sit with?
      - Did I make myself incident commander out of habit?
      - Did any "why" land as blame on the person whose change triggered it?
      - Did I handle the upward communication so the team could focus, or did I add
        to the noise?

    If I did badly, say so.

    Start by setting the scene.
---

## In the moment

- Be present, be calm, be quiet. My job is not to fix it: it's to make sure the people fixing it have what they need.
- Confirm there's an incident commander. If there isn't, name one (probably not me).
- Ask "what do you need from me?" not "what happened?"
- Handle upward communication so the team can focus on the system.
- If I'm not adding signal, mute myself and stay in the room.

## In the following days

- Run a blameless postmortem. Real one. Five whys, system view, action items with owners and dates.
- Communicate externally if needed, with the team's input, with honesty, without performance.
- Defend the engineer whose change triggered it. Publicly. The system allowed the failure, not just the human.
- Follow through on the action items. A postmortem without follow-through is theater.

## What to watch for in myself

- The hero reflex. Taking over because I'm anxious. Trust the people doing the work.
- Asking "why" in a tone that lands as blame, even when I don't mean it.
- Going to bed too early and leaving them on the fire alone. Stay until the team has what they need.

## Common traps

- Making myself the incident commander out of habit.
- Letting the person who shipped the bug feel publicly responsible. The team will calculate the cost of shipping anything risky after that.
- Punishing instead of learning.
- Treating the postmortem as a deliverable to close out rather than a system to change.

## Sample language

> "I'm here. What do you need from me?"

> "I've got the comms upstream. Focus on the system."

> "This is on the system, not on [person]. Our job now is to figure out what to change."
