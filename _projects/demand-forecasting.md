---
title: demand forecasting
order: 8
group: quant
tagline: forecasts for a distributor
summary: an anonymised case study of the weekly demand forecasting and inventory planning i built for my family's distribution business.
kind: forecasting
year: 2026
stack: r, shell
links:
  - label: github
    url: https://github.com/tatvadesai/demand-forecasting-synthetic
---

the real pipeline runs on real sales. this public version swaps in 1,463 fictional weekly observations so the method can be shown without the data.

a harmonic regression beats the seasonal-naive baseline on a fixed 52-week holdout (mase 0.664 against 1.116). the plan uses the median forecast, orders up to the 80th percentile, and that 80% band actually covers 80.8% of weeks. an automated privacy scan has to pass before anything is published.
