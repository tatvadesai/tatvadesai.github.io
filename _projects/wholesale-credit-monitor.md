---
title: wholesale credit monitor
order: 5
group: quant
tagline: early warnings for a credit book
summary: an offline early-warning and management-information view over a synthetic wholesale credit book.
kind: credit risk analytics
year: 2026
stack: python, duckdb, streamlit
links:
  - label: github
    url: https://github.com/tatvadesai/wholesale-credit-monitor
---

a synthetic book of six obligors and $420m of assumed exposure goes into a duckdb mart. from there the monitor computes ead, pd, lgd and expected loss, sector and country concentration, and warnings that carry their evidence with them.

a stress case (1.5x pd, plus ten points of lgd) takes expected loss from $9.61m to $17.61m. a second layer screens card transactions for fraud with a review budget, because a real team can only look at so many alerts a day.
