const menuButton = document.querySelector('.menu');
const navigation = document.querySelector('.nav');
if (menuButton && navigation) {
  menuButton.addEventListener('click', () => {
    const open = navigation.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  });
  navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    navigation.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  }));
}
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

const mediaItems = document.getElementById('media-items');
if (mediaItems) {
  const safeWebUrl = value => {
    if (typeof value !== 'string' || !value.trim()) return '';
    try {
      const url = new URL(value, window.location.origin);
      return url.protocol === 'https:' || url.protocol === 'http:' ? url.href : '';
    } catch {
      return '';
    }
  };

  fetch('/content/media.json')
    .then(response => {
      if (!response.ok) throw new Error('Media library unavailable');
      return response.json();
    })
    .then(content => {
      const items = Array.isArray(content.items) ? content.items : [];
      mediaItems.replaceChildren();
      if (!items.length) {
        const empty = document.createElement('p');
        empty.textContent = 'New stories and programmes will appear here soon.';
        mediaItems.append(empty);
        return;
      }

      items.filter(item => item && item.published !== false).forEach(item => {
        const card = document.createElement('article');
        card.className = 'media-card';
        const imageUrl = safeWebUrl(item.image);
        const destination = safeWebUrl(item.video_url || item.article_url);
        if (imageUrl) {
          const image = document.createElement('img');
          image.src = imageUrl;
          image.alt = typeof item.title === 'string' ? item.title : 'AMA TV story';
          image.loading = 'lazy';
          card.append(image);
        }

        const details = document.createElement('div');
        const type = document.createElement('small');
        type.textContent = typeof item.type === 'string' ? item.type : 'AMA TV';
        const title = document.createElement('h3');
        title.textContent = typeof item.title === 'string' ? item.title : 'AMA TV story';
        details.append(type, title);
        if (typeof item.date === 'string' && item.date) {
          const date = document.createElement('time');
          date.dateTime = item.date;
          const parsedDate = new Date(item.date);
          date.textContent = Number.isNaN(parsedDate.getTime()) ? item.date : new Intl.DateTimeFormat('en-GB', { dateStyle: 'medium' }).format(parsedDate);
          details.append(date);
        }
        if (typeof item.summary === 'string' && item.summary) {
          const summary = document.createElement('p');
          summary.textContent = item.summary;
          details.append(summary);
        }
        if (destination) {
          const link = document.createElement('a');
          link.href = destination;
          link.target = '_blank';
          link.rel = 'noopener noreferrer';
          link.textContent = item.video_url ? 'Watch story' : 'Read story';
          details.append(link);
        }
        card.append(details);
        mediaItems.append(card);
      });
    })
    .catch(() => {
      mediaItems.textContent = 'New stories and programmes will appear here soon.';
    });
}
