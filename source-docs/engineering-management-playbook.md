# Engineering Management Playbook

A companion to the Leadership Manual, specific to running a software engineering team.

The main manual is about the human and organizational work of leading. This one is about the *technical* work of leading engineers: how technical to stay, where to engage with the code and systems, how to think about on-call, how to influence architecture, and how to keep the engineering bar high without becoming a bottleneck.

---

## 1. Technical Credibility

The honest framing: technical enough that engineers trust your judgment on the things you weigh in on; not so deep in the code that you do their jobs for them. Credibility is not measured in PRs shipped; it's measured in whether your engineers feel you understand the work.

### Anchoring principles

- **You don't need to be the best engineer in the room.** You need to be the person who can ask the question that unsticks the room.
- **Depth beats breadth, here.** Pick one or two areas of the system you commit to understanding deeply. Be honest about the rest.
- **Decay is real.** Six months out of hands-on work and your instincts will lie to you. Build deliberate routines to stay current.

### Tactics

- [ ] **Read PRs as a learner, not a reviewer.** Skim 5-10 per week from across the team. You're absorbing patterns and naming, not gatekeeping.
- [ ] **Pair quarterly.** Sit with an engineer on a real task for an hour. You'll learn what the dev experience actually feels like.
- [ ] **Run the system end-to-end once a quarter.** Build it locally, deploy a change to staging, follow it through. Painful steps tell you what to fix.
- [ ] **Shadow on-call for a rotation each year.** Not to drive, but to feel the load.
- [ ] **Attend design reviews and read the RFCs.** Even the ones you don't need to weigh in on.
- [ ] **Subscribe to alerts and key dashboards.** Don't act on them; just notice the rhythm of the system.
- [ ] **Keep one personal coding habit.** A side project, an Advent of Code, a small internal tool. Just enough to keep the muscle alive.

### What to avoid

- Reviewing PRs to prove you still can. Engineers can tell.
- Architectural opinions formed from skimming. If you don't have time to engage seriously, defer with grace.
- Hiding from a topic because it's outside your background. Ask. Engineers respect a manager who says "explain this to me" far more than one who fakes it.

---

## 2. Code Review Participation

How much should a manager review code? It depends, but the wrong answers are obvious. Reviewing nothing tells the team you've left the work behind. Reviewing everything tells the team you don't trust them.

### A working model

- **Default: don't be on the required reviewer list.** Your reviews shouldn't be load-bearing.
- **Do review:** changes to things you uniquely know about (auth, infra you built, customer-facing copy), high-risk changes flagged for extra eyes, PRs from new hires in their first month.
- **Do skim, don't block:** broader patterns, naming, what people are working on. This is signal-gathering, not gatekeeping.
- **Time-bound:** if your review is taking more than ~15 minutes, you're probably the wrong reviewer.

### Conventions worth setting

- Distinguish **blocking comments** from **suggestions** from **questions** in writing. Use prefixes like `nit:`, `q:`, `blocking:` if your team doesn't already.
- Don't drop a review and disappear. If you're going to be the bottleneck, hand it off.
- Praise good code in writing. Reviews are one of the few public artifacts of the work.

### Anti-patterns

- Skipping the review and then second-guessing the decision in 1:1s.
- "Drive-by" stylistic comments that derail substantive review.
- Asking for changes you're not willing to defend on a call.

---

## 3. On-Call Philosophy

On-call is where engineering culture gets revealed. How a team responds to a 2 AM page tells you more than any survey.

### Your role as a manager

- **You are responsible for the load, not the rotation.** If on-call is brutal, that's your problem to fix even if you're not on the rotation.
- **Be on the escalation path, not the front line.** The team should never have to think about whether to wake you for a serious incident.
- **Attend incident reviews.** Quietly. Your presence signals importance; your silence signals trust.

### Questions to answer in your first 60 days

- What's the page volume per engineer per week? (Aim: < 2 actionable pages per week per person, ideally lower.)
- What % of pages are actionable vs. noise?
- What's the MTTR trend?
- How is on-call compensated: money, time off, neither?
- Who's been carrying a disproportionate load? (There's always someone.)
- Is there a runbook? Does it match reality?

### Investments that pay back

- **Reduce paging noise aggressively.** Every false page erodes the team's willingness to respond to real ones.
- **Make the on-call handoff a real ritual.** 15-minute weekly meeting; document what's outstanding.
- **Track on-call as work.** Engineers on-call should not be expected to ship features that week.
- **Run a quarterly on-call retro.** What pages came up? What did we fix? What didn't we?
- **Blameless postmortems, real action items, owners.** Action items without owners are wishes.

### Things to push back on

- Heroics. The engineer who stays up all night fixing things needs rest and process improvement, not another bonus.
- "We can't change the rotation right now." If the rotation is unsustainable, that *is* the priority.

---

## 4. Architecture & Technical Decisions

You probably aren't the architect anymore. Your job is to make sure good architectural decisions get made: by the right people, with the right information, at the right time.

### Where to engage

- **Cross-team or cross-system decisions.** These need someone with organizational context. That's often you.
- **Decisions with long reversibility horizons.** Picking a database, a primary language, a vendor: these need rigor.
- **Decisions affecting hiring, headcount, or roadmap.** Architecture and people are coupled.

### Where to stay out

- Internal implementation choices within a team's scope.
- Style and naming. (Have an opinion in writing once; then leave it to the team.)
- Anything reversible in a week.

### Rituals worth establishing or protecting

- **RFC / design doc process.** Lightweight template, async review, decision recorded. If you don't have one, set one up.
- **Architecture review forum.** Weekly or biweekly, optional attendance, used for designs that touch multiple teams or systems. Keep it small. Kill it if it becomes theater.
- **Tech radar or "we use X for Y" document.** Reduces re-litigation of solved questions.
- **Decision log.** Every non-trivial architectural decision: context, options, choice, who decided, when to revisit.

### Your tells that something is going wrong

- The same architectural debate happens three times in three months.
- A major decision was made and you only heard about it after.
- Engineers are afraid to push back on a senior IC's preference.
- Designs ship without being written down.

---

## 5. Tech Debt and Migrations

You will inherit some, you will create some, and you will lead at least one migration that takes longer than anyone expected.

### Tech debt

- **Make it visible.** Untracked debt is invisible debt is unfunded debt. Get it into the same backlog as features.
- **Allocate explicitly.** Some fraction of every cycle goes to debt. "When we have time" means never.
- **Distinguish the kinds:** deliberate-and-temporary (fine), deliberate-and-permanent (rare but real), accidental (the dangerous one).
- **Sometimes the answer is "live with it."** Not all debt should be paid. Be honest about which.

### Migrations

- **Never start one without an end date and a kill criterion.** "We'll migrate everything to X eventually" is how organizations end up running three databases.
- **Resource it like a project.** Owner, plan, milestones, regular check-ins.
- **Count down, not up.** Dashboards should show *what's left*, not what's done.
- **Celebrate the deletion.** The win is removing the old thing, not standing up the new one.

---

## 6. Hiring Engineers

What's specifically engineering-flavored about hiring:

- **You set the technical bar.** Be specific about it in writing, calibrate with your team, and don't let urgency lower it.
- **Interview design is your job.** Audit your loop in your first 60 days. Are you measuring what you actually care about? Does it bias against anyone you'd want?
- **Stay on the loop.** Even when busy. The signal you get from interviewing is irreplaceable.
- **Debrief discipline.** Decisions in writing, with evidence, before anyone shares their lean. Otherwise the loudest voice wins.
- **Be honest in offers.** Sell the role and the team, but not by misrepresenting them. The cost shows up in month four.

---

## 7. Working With Staff+ Engineers

The senior individual contributors on your team are your technical peers, your force multipliers, and often your hardest people to manage well.

### What they need from you

- **Real problems.** Staff engineers atrophy on small work.
- **Air cover.** They'll have unpopular opinions sometimes; your job is to make sure those opinions get heard.
- **Honest feedback.** They get less of it than anyone, because they're "too senior." This is wrong.
- **Visibility.** They often do work that's invisible until it isn't (a migration enabled, an incident prevented). Surface it.

### What you need from them

- A clear read on the technical state of things. They see things you don't.
- Mentorship of the rest of the team, explicit, not assumed.
- Early signal on architectural problems. Treat their concerns as data even when you push back.

### Common pitfalls

- Treating them as junior managers. They're not.
- Avoiding hard conversations because they're senior. They want them.
- Letting them become single points of failure. Diversify the knowledge.

---

## 8. Engineering Quality & Culture

You don't set engineering culture by declaring it. You set it by what you reward, tolerate, and notice.

- **Testing.** Be explicit about what you expect: what gets tests, what doesn't, what coverage means and doesn't mean.
- **Documentation.** Reward writing. Pair every "we should document this" with "and here is the hour to do it."
- **Code quality.** Establish norms; let the team enforce them. You are a tiebreaker, not a hall monitor.
- **Postmortems.** Blameless, written down, public, action items with owners. Make these the cultural artifact you protect most fiercely.
- **Production ownership.** "You build it, you run it" is a value statement, not just an org structure. Make sure the team feels the consequences of what they ship.

---

## 9. The IC → Manager Identity Question

If you came from engineering, expect grief. The work you were great at is no longer the work you do. Symptoms:

- Sneaking back into the code at night because it feels like "real work."
- Feeling like you accomplished nothing on a day full of meetings.
- Defining your value by what you produced rather than what your team produced.

What helps:

- **Redefine the unit of work.** Your output is the team's output. Internalize this even when it feels uncomfortable.
- **Keep a "what I enabled" log.** Friday afternoons, write down what happened this week that wouldn't have without you. Some weeks it'll be short. That's fine.
- **Find a peer group.** Other managers, inside or outside the company. They are the only people who will understand the specific weirdness of the job.
- **Have a coach or mentor.** Even informal. Even occasional.

---

## 10. Open Questions / Areas to Expand

- _Add as they come up._
