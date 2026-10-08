---
title: tearsheet
order: 9
group: quant
tagline: fund rigour for a personal portfolio
summary: fun idea to see fund management rigour applied to a personal portfolio.
kind: portfolio reporting
year: 2026
stack: python, pandas, quantstats
links:
  - label: github
    url: https://github.com/tatvadesai/tearsheet
---

it reads broker exports from zerodha and groww, rebuilds holdings lot by lot on a first-in, first-out basis, and reports returns the way a fund would: money-weighted (xirr) and time-weighted, against the nifty 50.

time-weighted return shows how the holdings did; money-weighted return also counts when money went in and out.
