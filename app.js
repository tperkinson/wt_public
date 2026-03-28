async function loadSite() {
  const response = await fetch("./data/site.json");
  if (!response.ok) {
    throw new Error(`Unable to load dashboard data: ${response.status}`);
  }
  return response.json();
}

function createList(items) {
  const list = document.createElement("ul");
  list.className = "mini-list";
  for (const item of items) {
    const li = document.createElement("li");
    li.textContent = item;
    list.append(li);
  }
  return list;
}

function renderStats(stats) {
  const root = document.querySelector("#stat-grid");
  for (const stat of stats) {
    const card = document.createElement("article");
    card.className = "stat-card";
    card.innerHTML = `
      <span class="stat-value">${stat.value}</span>
      <span class="stat-label">${stat.label}</span>
    `;
    root.append(card);
  }
}

function renderPaths(paths) {
  const root = document.querySelector("#path-grid");
  for (const path of paths) {
    const card = document.createElement("article");
    card.className = "path-card";
    card.innerHTML = `
      <p class="tag">${path.tag}</p>
      <h3>${path.title}</h3>
      <p class="body-copy">${path.description}</p>
    `;
    card.append(createList(path.actions));
    root.append(card);
  }
}

function renderDestinations(destinations) {
  const root = document.querySelector("#destination-list");
  for (const destination of destinations) {
    const card = document.createElement("article");
    card.className = "destination-card";
    card.innerHTML = `
      <div>
        <h3>${destination.name}</h3>
        <p class="destination-meta">${destination.focus}</p>
      </div>
      <p class="body-copy">${destination.summary}</p>
    `;
    card.append(createList(destination.whatToTrack));
    root.append(card);
  }
}

function renderRoadmap(phases) {
  const root = document.querySelector("#roadmap");
  for (const phase of phases) {
    const card = document.createElement("article");
    card.className = "phase-card";
    card.innerHTML = `
      <p class="phase-name">${phase.phase}</p>
      <h3>${phase.title}</h3>
    `;
    card.append(createList(phase.items));
    root.append(card);
  }
}

function renderChecklists(checklists) {
  const root = document.querySelector("#checklist-grid");
  for (const checklist of checklists) {
    const card = document.createElement("article");
    card.className = "checklist-card";
    card.innerHTML = `<h3>${checklist.title}</h3>`;
    card.append(createList(checklist.items));
    root.append(card);
  }
}

function renderQuestions(questions) {
  const root = document.querySelector("#question-list");
  for (const question of questions) {
    const li = document.createElement("li");
    li.textContent = question;
    root.append(li);
  }
}

function renderGlossary(glossary) {
  const root = document.querySelector("#glossary-grid");
  for (const item of glossary) {
    const card = document.createElement("article");
    card.className = "glossary-card";
    card.innerHTML = `
      <h3>${item.term}</h3>
      <p class="definition">${item.definition}</p>
    `;
    root.append(card);
  }
}

function populateMeta(meta) {
  document.querySelector("#hero-title").textContent = meta.title;
  document.querySelector("#hero-subtitle").textContent = meta.subtitle;
  document.querySelector("#hero-notice").textContent = meta.notice;
}

async function main() {
  try {
    const site = await loadSite();
    populateMeta(site.meta);
    renderStats(site.stats);
    renderPaths(site.paths);
    renderDestinations(site.destinations);
    renderRoadmap(site.roadmap);
    renderChecklists(site.checklists);
    renderQuestions(site.questions);
    renderGlossary(site.glossary);
  } catch (error) {
    document.body.innerHTML = `<main class="shell"><section class="panel"><h1>Dashboard unavailable</h1><p class="body-copy">${error.message}</p></section></main>`;
  }
}

main();

