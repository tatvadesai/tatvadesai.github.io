import assert from 'node:assert/strict';
const site = new URL(process.env.SITE_URL || 'http://127.0.0.1:4000');
assert(['127.0.0.1', 'localhost', '[::1]'].includes(site.hostname), 'Use a local preview, not the published site.');
assert(process.env.AGENT_BROWSER_CDP, 'Set AGENT_BROWSER_CDP to an existing browser endpoint.');
const origin = site.origin;
const socket = new WebSocket(process.env.AGENT_BROWSER_CDP);
await new Promise((resolve, reject) => {
    socket.addEventListener('open', resolve, { once: true });
    socket.addEventListener('error', reject, { once: true });
});
let id = 0, sessionId;
const pending = new Map();
socket.addEventListener('message', ({ data }) => {
    const message = JSON.parse(data), request = pending.get(message.id);
    if (!request) return;
    pending.delete(message.id);
    clearTimeout(request.timer);
    if (message.error) request.reject(new Error(message.error.message));
    else request.resolve(message.result);
});
function send(method, params = {}, timeout = 15000) {
    return new Promise((resolve, reject) => {
        const requestId = ++id;
        const timer = setTimeout(() => {
            pending.delete(requestId);
            reject(new Error(`Timed out: ${method}`));
        }, timeout);
        pending.set(requestId, { resolve, reject, timer });
        socket.send(JSON.stringify({ id: requestId, method, params, ...(sessionId ? { sessionId } : {}) }));
    });
}
async function evaluate(expression) {
    const { result, exceptionDetails } = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
    if (exceptionDetails) throw new Error(exceptionDetails.text);
    return result.value;
}
async function navigate(path) {
    await send('Page.navigate', { url: origin + path });
    for (let i = 0; i < 50; i++) {
        try {
            if (await evaluate(`location.pathname === ${JSON.stringify(path)} && document.readyState === 'complete' && !!document.querySelector('.site-footer')`)) return;
        } catch (error) {
            // Navigation can replace the execution context between polls.
            if (!/context.*destroyed|target navigated|Cannot find context/i.test(error.message)) throw error;
        }
        await new Promise(resolve => setTimeout(resolve, 100));
    }
    throw new Error(`Page did not load: ${path}`);
}
async function viewport(width, height) {
    await send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile: false });
    const zoom = width / await evaluate('visualViewport.width');
    await send('Emulation.setDeviceMetricsOverride', {
        width: Math.round(width * zoom), height: Math.round(height * zoom), deviceScaleFactor: 1, mobile: false,
    });
    await evaluate('scrollTo(0, 0)');
}
const routes = ['/', '/essays/', '/essays/progress/', '/personal-software/', '/software/gatheraround/', '/about/', '/skill-issue/', '/404.html'];
const results = [];
try {
    const { targetInfos } = await send('Target.getTargets');
    const target = targetInfos.find(t => t.type === 'page' && t.url.startsWith(origin + '/'));
    assert(target, 'Existing local preview tab not found');
    ({ sessionId } = await send('Target.attachToTarget', { targetId: target.targetId, flatten: true }));
    await send('Page.enable');
    await send('Emulation.setFocusEmulationEnabled', { enabled: true });
    await send('Network.enable');
    await send('Network.setCacheDisabled', { cacheDisabled: true });
    for (const path of routes) {
        await navigate(path);
        await evaluate('document.fonts.ready.then(() => true)');
        const widths = path === '/skill-issue/' ? [1440, 768, 641, 639, 390, 320] : [1440, 390, 320];
        for (const width of widths) {
            await viewport(width, width === 1440 ? 1000 : 844);
            const layout = await evaluate(`(() => {
                const rect = s => document.querySelector(s).getBoundingClientRect();
                const style = s => getComputedStyle(document.querySelector(s));
                const metadata = [...document.querySelectorAll('.work-meta, .blog-desc, .essay-meta, .essay-standfirst, .project-plate figcaption')];
                return {
                    width: innerWidth, overflow: document.documentElement.scrollWidth > innerWidth + 1,
                    phonePortraits: matchMedia('(max-width: 40rem)').matches,
                    body: style('body').fontSize, signupWidth: rect('.signup').width,
                    label: style('#signup-title').fontSize, labelWeight: style('#signup-title').fontWeight,
                    emailWidth: rect('#signup-email').width, emailHeight: rect('#signup-email').height,
                    buttonHeight: rect('.signup-row button').height,
                    hasFinance: !!document.querySelector('input[name="finance"]'),
                    normalMetadata: metadata.every(e => getComputedStyle(e).fontStyle === 'normal'),
                    navCaps: style('.site-nav').fontVariantCaps, headerFont: style('h1').fontFamily,
                    signupHeading: document.querySelector('#signup-title').textContent,
                    writingLabel: document.querySelector('.site-nav a[href="/essays/"]').textContent,
                    footerGap: rect('.site-footer').top - rect('.signup').bottom,
                    activeLinks: [...document.querySelectorAll('.site-nav [aria-current="page"]')].map(a => a.textContent)
                };
            })()`);
            assert(Math.abs(layout.width - width) <= 1, `${path}: viewport`);
            assert(!layout.overflow, `${path} at ${width}: horizontal overflow`);
            assert.equal(layout.body, width > 480 ? '22px' : '20px', path);
            assert(layout.signupWidth <= 561 && layout.emailWidth >= 140, path);
            assert(layout.emailHeight >= 43 && layout.buttonHeight >= 43, path);
            assert.equal(layout.label, '18px', path);
            assert.equal(layout.labelWeight, '600', path);
            assert.equal(layout.signupHeading, 'notes from tatva', path);
            assert.equal(layout.writingLabel, 'writings', path);
            assert(!layout.hasFinance && layout.normalMetadata && layout.navCaps === 'normal', path);
            assert(layout.footerGap > 0 && layout.footerGap < 48, path);
            if (path === '/personal-software/' || path.startsWith('/software/')) assert.deepEqual(layout.activeLinks, ['work']);
            if (path.startsWith('/essays/')) assert.deepEqual(layout.activeLinks, ['writings']);
            if (path === '/essays/') assert.equal(await evaluate("document.querySelector('h1').textContent"), 'writings');
            if (path === '/') assert.equal(await evaluate("document.querySelector('#home-writing').textContent"), 'writings');
            if (path === '/skill-issue/') {
                const portraits = await evaluate(`Promise.all([...document.querySelectorAll('.person-item img')].map(async image => {
                    await image.decode();
                    const rect = image.getBoundingClientRect();
                    const caption = image.closest('figure').querySelector('figcaption');
                    const label = caption.getBoundingClientRect();
                    return {
                        name: caption.textContent.trim(), width: rect.width, height: rect.height,
                        x: rect.x, y: rect.y, bottom: label.bottom,
                        expectedHeight: rect.width * image.naturalHeight / image.naturalWidth,
                        naturalWidth: image.naturalWidth, captionHeight: label.height,
                        captionOpacity: getComputedStyle(caption).opacity
                    };
                }))`);
                assert.deepEqual(portraits.map(p => p.name), [
                    'claude shannon', 'richard feynman', 'dhirubhai ambani', 'michael ovitz',
                    'charlie munger', 'sam walton', 'henry kravis',
                ]);
                for (const portrait of portraits) {
                    assert(Math.abs(portrait.height - portrait.expectedHeight) < 1, `${portrait.name}: preserve photograph proportions`);
                    assert(portrait.width >= 180 && portrait.width <= portrait.naturalWidth + 1, `${portrait.name}: readable, not upscaled`);
                    assert(portrait.captionHeight >= 20 && portrait.captionOpacity === '1', `${portrait.name}: visible name`);
                }
                for (let i = 1; i < portraits.length; i++) {
                    assert(portraits[i].y > portraits[i - 1].y, 'Portraits follow reading order');
                    // Use the actual media query: embedded-browser zoom can round the requested width by one pixel.
                    if (layout.phonePortraits) assert(portraits[i].y - portraits[i - 1].bottom >= 47, `Phone portraits at ${layout.width}px need breathing room`);
                }
                assert(Math.abs(portraits[0].width - portraits[1].width) > 20, 'Portrait sizes should vary');
                assert(portraits[1].x > portraits[0].x, 'Opening portraits should be offset');
            }
            results.push({ path, width, result: 'PASS' });
        }
        for (const theme of ['dark', 'light']) {
            await evaluate(`document.querySelector('[data-theme-choice="${theme}"]').click()`);
            assert.equal(await evaluate(`document.querySelector('[data-theme-choice="${theme}"]').getAttribute('aria-pressed')`), 'true');
        }
        await evaluate("document.querySelector('#signup-email').focus()");
        assert.equal(await evaluate("getComputedStyle(document.querySelector('#signup-email')).outlineStyle"), 'solid', `${path}: email focus indicator`);
        // A stubbed fetch guarantees that no real subscription is sent.
        await evaluate(`window.requests = [];
            window.fetch = (_url, options) => {
                window.requests.push({finance: options.body.get('finance'), honeypot: options.body.has('website')});
                return Promise.reject(new Error('Mocked connection failure'));
            };
            document.querySelector('#signup-email').value = 'invalid';`);
        assert.equal(await evaluate("document.querySelector('#signup-email').checkValidity()"), false);
        await evaluate(`document.querySelector('#signup-email').value = 'preview@example.test';
            document.querySelector('.signup-form').requestSubmit();
            new Promise(resolve => setTimeout(resolve, 50))`);
        assert.equal(await evaluate("document.querySelector('#signup-error').hidden"), false);
        assert.equal(await evaluate("document.querySelector('.signup-row button').disabled"), false);
        assert.equal(await evaluate("document.querySelector('#signup-email').value"), 'preview@example.test');
        assert.deepEqual(await evaluate('window.requests'), [{ finance: 'no', honeypot: true }]);
        await evaluate(`window.fetch = (_url, options) => {
                window.requests.push({finance: options.body.get('finance'), honeypot: options.body.has('website')});
                return Promise.resolve({});
            };
            document.querySelector('.signup-form').requestSubmit();
            new Promise(resolve => setTimeout(resolve, 50))`);
        assert.equal(await evaluate("!!document.querySelector('.signup-success[role=\"status\"]')"), true);
        assert.deepEqual(await evaluate('window.requests[1]'), { finance: 'no', honeypot: true });
    }
    console.log(JSON.stringify({ result: 'PASS', layouts: results, themes: '8 pages passed', signup: '8 pages: invalid/error/retry/success; finance=no; all requests mocked' }, null, 2));
} finally {
    try {
        if (sessionId) {
            await send('Emulation.clearDeviceMetricsOverride');
            await send('Emulation.setFocusEmulationEnabled', { enabled: false });
            await send('Network.setCacheDisabled', { cacheDisabled: false });
            await send('Page.navigate', { url: origin + '/' });
        }
    } finally {
        socket.close();
    }
}
