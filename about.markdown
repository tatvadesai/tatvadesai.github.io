---
layout: default
title: about
permalink: /about/
---

<h1>about</h1>

<div class="about-content">
    <p>i am tatva. i have been internet native since 2008. i have a fascination with all kinds of ideas and i read(try to), everything.  <span class="highlight">finance is a thing that fascinates me the most.</span></p>

    <p class="quote">how a simple excel sheet can run the world, eh?</p>
</div>

<div class="about-content">
    <p>I am currently a <span class = "highlight">MBA in Business Analytics student at BITS Pilani, Pilani</span>. I have scattered writings across the internet. Find them below:</p>
</div>

<div class="blogs-grid">
    <a href="https://ekagritventures.github.io" class="blog-card">
        <span class="blog-icon"></span>
        <span class="blog-title">Finance Blog</span>
        <span class="blog-desc">markets and investing.</span>
    </a>
    <a href="https://illiquidthoughts.substack.com/" class="blog-card">
        <span class="blog-icon"></span>
        <span class="blog-title">Illiquid Thoughts</span>
        <span class="blog-desc">documenting MBA.</span>
    </a>
    <a href="https://www.youtube.com/playlist?list=PLxmCgjTVWU2kVCWkxsdq2Ps4jYO3TyuA-" class="blog-card">
        <span class="blog-icon">📹</span>
        <span class="blog-title">Weekly Updates</span>
        <span class="blog-desc">now discontinued.</span>
    </a>
</div>

<style>
.blogs-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    margin-top: 1.5rem;
}

.blog-card {
    display: flex;
    flex-direction: column;
    padding: 1.25rem;
    border: 1px solid rgba(255, 245, 240, 0.15);
    border-radius: 12px;
    text-decoration: none;
    color: var(--text-primary);
    background: rgba(255, 245, 240, 0.03);
    transition: all 0.2s ease;
}

.blog-card:hover {
    border-color: var(--text-accent);
    background: rgba(249, 233, 177, 0.05);
    transform: translateY(-2px);
}

.blog-icon {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
}

.blog-title {
    font-weight: 600;
    font-size: 1.1rem;
    color: var(--text-accent);
}

.blog-desc {
    font-size: 0.85rem;
    opacity: 0.7;
    margin-top: 0.25rem;
}
</style>

