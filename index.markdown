---
layout: home
---
<div
    class="min-h-screen"
    style="background-color: #321a20; color: #fff5f0"
>
    <!-- Fixed Navigation -->
    <nav
        class="fixed top-5 right-5 z-10 rounded-lg px-4 py-2"
        style="background-color: #321a20"
    >
        <div class="flex space-x-4 text-sm">
            <a href="/essays" class="hover:opacity-70 transition-opacity">
                essays
            </a>
            <a href="/about" class="hover:opacity-70 transition-opacity">
                about
            </a>
        </div>
    </nav>

    <!-- Main Content -->

    <div>
        <div
            class="pt-24 px-5 pb-10 md:pt-28 md:px-20 max-w-4xl h-[898px] w-[1160px]"
        >
            <!-- Header -->
            <h1
                class="text-4xl font-bold mb-2"
                style="
                    letter-spacing: 2px;
                    font-family: system-ui, -apple-system, sans-serif;
                "
            >
                tatva desai
            </h1>

            <h2 class="text-xl mb-8" style="color: #f9e9b1">
                pathologically curious
            </h2>

            <!-- Main Content -->
            <div class="mb-12">
                <p class="text-base leading-6 mb-8">
                    i like to build stuff. poems, stories, websites, brands, music,
                    businesses.... <br />
                    <em style="color: #f9e9b1">
                        wherever curiosity takes me.
                    </em>
                </p>
            </div>

            <!-- Works Section -->

            <!-- Contact Section -->

            <!-- Sections -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                <!-- Writings -->
                <div class="group">
                    <h3
                        class="text-lg font-medium mb-5 tracking-wide"
                        style="color: #f9e9b1"
                    >
                        writing
                    </h3>
                    <ul class="space-y-3 text-sm opacity-90">
                        {% for post in site.essays limit: 5 %}
                        <li
                            class="hover:opacity-70 cursor-pointer transition-opacity border-l border-transparent hover:border-[#f9e9b1] pl-3 hover:pl-4 transition-all duration-200"
                        >
                           <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
                        </li>
                        {% endfor %}
                    </ul>
                </div>

                <!-- Operating -->
                <div class="group">
                    <h3
                        class="text-lg font-medium mb-5 tracking-wide"
                        style="color: #f9e9b1"
                    >
                        operating
                    </h3>
                    <ul class="space-y-3 text-sm opacity-90">
                        <li
                            class="hover:opacity-70 cursor-pointer transition-opacity border-l border-transparent hover:border-[#f9e9b1] pl-3 hover:pl-4 transition-all duration-200"
                        >
                           <a href="https://gatheraround.social">gatheraround</a>
                        </li>
                        <li
                            class="hover:opacity-70 cursor-pointer transition-opacity border-l border-transparent hover:border-[#f9e9b1] pl-3 hover:pl-4 transition-all duration-200"
                        >
                            <a href="https://pritenterprise.vercel.app">family biz</a>
                        </li>
                    </ul>
                </div>

                <!-- Miscellaneous -->
                <div class="group">
                    <h3
                        class="text-lg font-medium mb-5 tracking-wide"
                        style="color: #f9e9b1"
                    >
                        miscellaneous
                    </h3>
                    <ul class="space-y-3 text-sm opacity-90">
                        <li
                            class="hover:opacity-70 cursor-pointer transition-opacity border-l border-transparent hover:border-[#f9e9b1] pl-3 hover:pl-4 transition-all duration-200"
                        >
                            <a href="https://www.youtube.com/playlist?list=PLxmCgjTVWU2kVCWkxsdq2Ps4jYO3TyuA-&amp;si=bU2f1_spgx-YpNqk" target="_blank" rel="noopener noreferrer">what did you get done this week?</a>
                        </li>
                    </ul>
                </div>
            </div>

            <!-- Contact Section -->
            <div
                class="mt-20 pt-8 border-t border-[#4a3a3f] border-opacity-30"
            >
                <p class="text-base mb-6 opacity-90">
                    you can contact me here:
                </p>
                <div class="flex flex-wrap gap-6 text-sm mb-8">
                    <a
                        href="mailto:tatvadesai95@gmail.com"
                        class="hover:opacity-70 transition-opacity border-l border-transparent hover:border-[#f9e9b1] pl-3 hover:pl-4 transition-all duration-200"
                        style="color: #f9e9b1"
                    >
                        email
                    </a>
                    <a
                        href="https://twitter.com/tatvadesai"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="hover:opacity-70 transition-opacity border-l border-transparent hover:border-[#f9e9b1] pl-3 hover:pl-4 transition-all duration-200"
                        style="color: #f9e9b1"
                    >
                        twitter
                    </a>
                    <a
                        href="https://linkedin.com/in/tatvadesai"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="hover:opacity-70 transition-opacity border-l border-transparent hover:border-[#f9e9b1] pl-3 hover:pl-4 transition-all duration-200"
                        style="color: #f9e9b1"
                    >
                        linkedin
                    </a>
                </div>
                <p class="text-sm opacity-75">
                    you can also subscribe to my substack
                    <a
                        href="https://substack.com/@tatvadesai"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="hover:opacity-70 transition-opacity underline underline-offset-2"
                        style="color: #f9e9b1"
                    >
                        subscribe to my substack
                    </a>
                </p>
            </div>
        </div>
    </div>
</div>