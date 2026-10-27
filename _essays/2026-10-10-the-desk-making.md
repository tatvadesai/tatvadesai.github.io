---
layout: essay
title: "the desk"
date: 2026-10-10
last_modified_at: 2026-10-28
permalink: /essays/the-desk-making/
published: true
---

*Designing a live finance game for teams, organisers and a room full of people.*

**10 desks · 4 companies · 16 rounds · 160 live valuations**

The Desk began with a product problem: how do you make company valuation feel like a real decision, then run that decision smoothly in a crowded classroom?

I designed The Desk for Finomaniac at BITS Pilani. Teams study a company, submit what they think it is worth, then trade against the market price made from everyone’s numbers. The true value stays hidden until the company's final round. Each decision has a cost, and every team has to decide when to act and when to pass.

My work covered the game loop, information design, player and organiser interfaces, the room display, and rehearsal changes. I started with a single-browser prototype, tested the rules with scripted desks, and used the live rehearsal to find problems that a screen mock-up could not reveal.

<figure class="project-plate">
  <img src="{{ '/assets/img/essays/the-desk-room-essay.webp' | relative_url }}" alt="a wide view of the classroom during the desk" loading="lazy">
  <figcaption>the desk, live at bits pilani.</figcaption>
</figure>

## a game mechanic that shapes behaviour

Each round gives every team public company information and one private fact. Teams submit a valuation. The median of those valuations becomes the market price.

The valuation also limits the trade a team can make. A bid above the market allows a buy or a pass. A bid below the market allows a sell or a pass. A bid at the market allows a pass. Passing is always free.

This binding rule connects a team's stated belief to its next action. A team cannot submit an artificially low number to pull down the market, then buy at the lower price. Its own bid sets the side of the market it can take.

I kept settlement simple. There are no shares or cash balances. Each trade is a one-unit bet, settled against the company’s true value after its final round:

```text
BUY:  true value − entry price − fee
SELL: entry price − true value − fee
PASS: 0
```

The fee is ₹5 crore per trade. In round two of Annapurna Dairy, the market price was ₹601 crore and the hidden true value was ₹643 crore. A buy settled at `643 − 601 − 5 = 37` crore. A sell settled at `601 − 643 − 5 = −47` crore. The fee made a small apparent edge less attractive.

We compared the median with the mean and trimmed mean in simulations. One extreme bid can shift an average. The median is harder for a small group to move and easy to explain in the room. It does not stop a large enough group from coordinating.

I chose not to deduct points for valuation error. A penalty would treat an honest mistake like a bluff and could reward cautious guesses. Teams ranked by trading profit and loss, with valuation error as the tiebreaker.

## designing the interface around the game

The Desk had three audiences in one room. A team needed to read its private fact and enter one number. The organiser needed to run the round and see where the room stood. Everyone else needed a shared view of the company and the market.

I designed a separate screen for each job. The team screen kept the company information, private fact, timer and valuation input together. The organiser console showed phase controls and submission status. The projector carried the shared company view, countdown and market reveal.

I also gave the screens one visual language: a paper dossier with cream surfaces, dark ink and stamped accents. Serif type set company names and market prices apart. Sans-serif type carried interface labels. Monospaced numbers made bids, prices and countdowns easy to scan. On the team screen, the valuation field was the largest control because entering a number was the main action in that phase.

<figure class="project-plate">
  <img src="{{ '/assets/img/essays/the-desk-bid-screen.webp' | relative_url }}" alt="the participant desk screen during a valuation round" loading="lazy">
  <figcaption>the team screen puts the information and valuation action in one place.</figcaption>
</figure>

The first version revealed the market and opened trading as soon as the last valuation arrived. In a room, that gave teams little time to notice the price. I split the round into four steps: submit valuations, lock bids, reveal the market on the projector, then open the trade window. Each screen now had one clear job in the sequence.

I also removed the permanent leaderboard from the projector during rounds. It pulled attention toward rank while teams needed to read the case. The organiser could show standings between companies. During a round, the projector showed the clock and company facts. It showed how many teams had submitted without naming the teams still working.

The room display also had to protect hidden information. If it showed live profit and loss before the final round, teams could work backwards to estimate the true value. The server sent each screen only the information its role needed.

<figure class="project-plate">
  <img src="{{ '/assets/img/essays/the-desk-screen-essay.webp' | relative_url }}" alt="the room screen during a company reveal" loading="lazy">
  <figcaption>the projector gave the room one shared view of the market reveal.</figcaption>
</figure>

<figure class="project-plate">
  <img src="{{ '/assets/img/essays/the-desk-console.webp' | relative_url }}" alt="the organiser console with phase controls and desk status" loading="lazy">
  <figcaption>the organiser console showed the controls and the state of each desk.</figcaption>
</figure>

## useful information without a suggested answer

The first question bank had a weak incentive: the public estimate sat close to the true value, while private clues added little useful information. In the lab, ignoring a clue could be a sensible strategy.

I changed the clues so each one described a real part of the business, such as a margin, debt line or contracted asset. A private fact could now change how a team read the public assumptions. The interface did not suggest a valuation or offer a midpoint button. Teams had to decide what the fact meant.

Private information creates a fairness problem too. Random draws can give one team several bearish facts in a row. Seeded redraws kept each team’s net fact distortion within ₹25 crore for a company. I also shaped each company’s price path to overshoot or correct at least once. A straight trend would make copying momentum more useful than reading the case.

## prototype, rehearse, revise

I kept the rule engine separate from the interface, with its own test suite. The browser prototype and event app used the same engine. Scripted desks let me replay rounds and check how different bidding styles behaved before the live event.

The event app went through three stages: an offline browser lab, a Vercel and Supabase version, then a Node server and local PostgreSQL database on the event Mac, connected to the room through a Cloudflare Tunnel. The server owned the clock and checked each action. Browsers sent requests; they did not decide whether a trade was legal.

The rehearsal exposed issues beyond the rules. Rounds could close after thirty seconds even when the setting was three and a half minutes. Three of four companies ended with no trades. I fixed the minimum bidding window so a round could not rush ahead while teams were still reading.

The timeout rule also needed work. A missed clock could replace a quiet team with an automated seat and discard its later bids. I changed it so the team kept its seat and carried its own last valuation forward. A missed trade became an automatic pass, and the team could take control again next round. The organiser could pause for a break or end the game early while keeping the completed standings.

<figure class="project-plate">
  <img src="{{ '/assets/img/essays/the-desk-team-essay.webp' | relative_url }}" alt="a team at a laptop while the market is shown on the projector" loading="lazy">
  <figcaption>a team at its desk as the room follows the market reveal.</figcaption>
</figure>

## what the event showed

On 25 September, ten desks played four companies over sixteen rounds and submitted 160 live valuations. The final record shows 42 passes: two at-market, 39 voluntary and one automatic pass after a decision clock expired. The count confirms that teams used the option to sit out. It does not tell us why they chose it.

For the next run, I would add a clue review to the rehearsal checklist: verify each fact against a worked valuation sheet, then check that its wording matches the company information on screen.

The design test was whether the market made sense both to one team and to the room. The bid had to constrain incentives, the clue had to change a team's view, and the screen sequence had to make the market legible to everyone at once.
