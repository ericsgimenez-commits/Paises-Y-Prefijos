const searchInput = document.getElementById('country-search');
const cardsGrid = document.getElementById('cards-grid');

let countries = [];

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function highlightMatch(text, query) {
  const normalizedQuery = query.trim();
  if (!normalizedQuery) return text;

  const safeQuery = escapeRegExp(normalizedQuery);
  const regex = new RegExp(`(${safeQuery})`, 'gi');
  return text.replace(regex, '<span class="highlight">$1</span>');
}

function formatPhoneDisplay(phone) {
  const digits = String(phone).replace(/[^\d]+/g, '');
  return digits ? `+${digits}` : '';
}

function sortByName(a, b) {
  return a.name.localeCompare(b.name, 'es', { sensitivity: 'base' });
}

function renderCards(items, query = '') {
  const sortedItems = [...items].sort(sortByName);
  if (!items.length) {
    cardsGrid.innerHTML = '<p class="results-info">No se encontraron países. Intenta con otra búsqueda.</p>';
    return;
  }

  cardsGrid.innerHTML = sortedItems
    .map((country) => {
      const phoneLabel = formatPhoneDisplay(country.phone);
      return `
      <article class="country-card">
        <div class="flag" aria-label="Bandera de ${country.name}">${country.flag}</div>
        <div>
          <h2 class="country-name">${country.name}</h2>
          <div class="country-meta">
            <div class="meta-row"><span class="meta-label">Capital</span><strong>${highlightMatch(country.capital, query)}</strong></div>
            <div class="meta-row"><span class="meta-label">Prefijo</span><strong title="${phoneLabel}">${phoneLabel}</strong></div>
          </div>
        </div>
      </article>
    `;
    })
    .join('');
}

function normalizeText(value) {
  return String(value)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toLowerCase();
}

function normalizePhoneQuery(query) {
  return String(query).replace(/[^\d]/g, '');
}

function isPhoneSearch(query) {
  return /^[+\d\s-]+$/.test(String(query).trim()) && normalizePhoneQuery(query).length > 0;
}

function filterCountries(query) {
  const normalizedQuery = normalizeText(query);
  const phoneQuery = normalizePhoneQuery(query);
  const phoneSearch = isPhoneSearch(query);
  if (!normalizedQuery && !phoneQuery) return countries;

  return countries.filter((country) => {
    const normalizedName = normalizeText(country.name);
    const normalizedCapital = normalizeText(country.capital);
    const normalizedPhone = normalizePhoneQuery(country.phone);

    if (phoneSearch && phoneQuery) {
      return normalizedPhone.startsWith(phoneQuery);
    }

    return (
      normalizedName.includes(normalizedQuery) ||
      normalizedCapital.includes(normalizedQuery) ||
      (phoneQuery && normalizedPhone.startsWith(phoneQuery))
    );
  });
}

async function loadData() {
  try {
    const response = await fetch('data.json');
    if (!response.ok) {
      throw new Error('No se pudo cargar data.json');
    }

    countries = await response.json();
    countries.sort(sortByName);
    renderCards(countries);
  } catch (error) {
    cardsGrid.innerHTML = `<p class="results-info">${error.message}</p>`;
    console.error(error);
  }
}

searchInput.addEventListener('input', (event) => {
  const query = event.target.value;
  const filtered = filterCountries(query);
  renderCards(filtered, query);
});

loadData();
