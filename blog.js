function fmtDate(iso) {
  try {
    const d = new Date(iso);
    if (isNaN(d)) return iso;
    return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
  } catch (_) {
    return iso;
  }
}

async function loadManifest() {
  const res = await fetch('posts/index.json', { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to load posts manifest');
  const data = await res.json();
  // sort by date desc
  data.posts.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
  return data.posts;
}

function postCardHTML(p, withReadMore) {
  const link = `post.html?slug=${encodeURIComponent(p.slug)}`;
  const readMore = withReadMore ? `\n        <p><a href="${link}">Read more →</a></p>` : '';
  return `
      <article class="card">
        <h3><a href="${link}">${p.title}</a></h3>
        <p class="tagline">${fmtDate(p.date)}</p>
        <p>${p.summary ?? ''}</p>${readMore}
      </article>`;
}

function renderBlogIndex() {
  const list = document.getElementById('blog-list');
  const fallback = document.getElementById('blog-fallback');
  loadManifest().then(posts => {
    if (!posts.length) {
      fallback.style.display = 'block';
      return;
    }
    list.innerHTML = posts.map(p => postCardHTML(p, true)).join('');
  }).catch(() => {
    fallback.style.display = 'block';
  });
}

// Homepage: show the most recent posts so the blog is front and center.
function renderRecentPosts(limit) {
  const list = document.getElementById('home-blog-list');
  if (!list) return;
  loadManifest().then(posts => {
    const shown = typeof limit === 'number' ? posts.slice(0, limit) : posts;
    list.innerHTML = shown.map(p => postCardHTML(p, false)).join('');
  }).catch(() => {});
}

function getQuery(name) {
  const u = new URL(window.location.href);
  return u.searchParams.get(name);
}

async function loadPost(slug) {
  const [manifestRes, bodyRes] = await Promise.all([
    fetch('posts/index.json', { cache: 'no-store' }),
    fetch(`posts/${encodeURIComponent(slug)}.html`, { cache: 'no-store' })
  ]);
  if (!manifestRes.ok || !bodyRes.ok) throw new Error('Failed to load');
  const manifest = await manifestRes.json();
  const meta = manifest.posts.find(p => p.slug === slug);
  const body = await bodyRes.text();
  return { meta, body };
}

function renderPostPage() {
  const slug = getQuery('slug');
  const titleEl = document.getElementById('post-title');
  const dateEl = document.getElementById('post-date');
  const bodyEl = document.getElementById('post-body');
  if (!slug) {
    titleEl.textContent = 'Post not found';
    bodyEl.textContent = 'Missing slug parameter.';
    return;
  }
  // Keep the language-switch link pointing at the same post in the other language.
  const langEl = document.getElementById('post-lang-switch');
  if (langEl) {
    const inJa = window.location.pathname.includes('/ja/');
    const base = inJa ? '../post.html' : 'ja/post.html';
    langEl.href = `${base}?slug=${encodeURIComponent(slug)}`;
  }
  loadPost(slug).then(({ meta, body }) => {
    if (!meta) throw new Error('No metadata for this post');
    titleEl.textContent = meta.title;
    dateEl.textContent = fmtDate(meta.date);
    bodyEl.innerHTML = body;
  }).catch(err => {
    titleEl.textContent = 'Post failed to load';
    bodyEl.textContent = err && err.message ? err.message : 'Unknown error.';
  });
}

