---
title: credit risk engine
order: 6
group: quant
tagline: a pd scorecard, validated
summary: a probability-of-default scorecard on the uci german credit data, built and validated the way a bank would.
kind: credit risk modelling
year: 2026
stack: python, pandas, scikit-learn
links:
  - label: github
    url: https://github.com/tatvadesai/credit-risk-engine
image: /assets/img/projects/credit-risk-roc.webp
image_alt: ROC curve of the scorecard, train AUC 0.816 and test AUC 0.792
image_caption: out-of-sample auc 0.792.
---

variables are binned by weight of evidence and information value, then a logistic model is scaled to points the usual way (50 points to double the odds). on held-out data it scores an auc of 0.792, a gini of 0.584 and a ks of 0.498.

a challenger pack compares it against heavier models: the simple logistic scorecard beats a random forest (0.787) and xgboost (0.756) out of sample. it ships with a model card and reproducibility notes.
