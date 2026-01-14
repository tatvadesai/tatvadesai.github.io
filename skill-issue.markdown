---
layout: default
title: skill issue
permalink: /skill-issue/
---

<h1>skill issue</h1>

<div class="skill-issue-intro">
    <p>it's just a skill issue</p>
</div>

<div class="people-grid">
    <div class="person-item">
        <img src="/assets/skill-issue/shannon.jpeg" alt="Claude Shannon">
        <span class="name">claude shannon</span>
    </div>

    <div class="person-item">
        <img src="/assets/skill-issue/feynman.jpeg" alt="Richard Feynman">
        <span class="name">richard feynman</span>
    </div>

    <div class="person-item">
        <img src="/assets/skill-issue/dhirubhai.jpeg" alt="Dhirubhai Ambani">
        <span class="name">dhirubhai ambani</span>
    </div>

    <div class="person-item">
        <img src="/assets/skill-issue/ovitz.jpeg" alt="Michael Ovitz">
        <span class="name">michael ovitz</span>
    </div>

    <div class="person-item">
        <img src="/assets/skill-issue/munger.jpeg" alt="Charlie Munger">
        <span class="name">charlie munger</span>
    </div>

    <div class="person-item">
        <img src="/assets/skill-issue/walton.jpeg" alt="Sam Walton">
        <span class="name">sam walton</span>
    </div>

    <div class="person-item">
        <img src="/assets/skill-issue/kravis.jpeg" alt="Henry Kravis">
        <span class="name">henry kravis</span>
    </div>


</div>

<style>
.skill-issue-intro {
    text-align: center;
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 2rem;
    color: var(--text-accent, #f9e9b1);
}

.people-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    margin-top: 2rem;
    max-width: 900px;
    margin-left: auto;
    margin-right: auto;
}

.person-item {
    position: relative;
    aspect-ratio: 1;
    overflow: hidden;
    border-radius: 4px;
}

.person-item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center top;
    display: block;
}

.name {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 0.6rem;
    font-size: 0.8rem;
    font-weight: 500;
    color: #fff;
    text-transform: lowercase;
    background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
}

/* Tablet: 2 columns */
@media (max-width: 768px) {
    .people-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

/* Mobile: single column */
@media (max-width: 480px) {
    .people-grid {
        grid-template-columns: 1fr;
        gap: 0.75rem;
    }
    
    .skill-issue-intro {
        font-size: 1.2rem;
        margin-bottom: 1.5rem;
    }
    
    .name {
        font-size: 0.85rem;
        padding: 0.5rem;
    }
}
</style>