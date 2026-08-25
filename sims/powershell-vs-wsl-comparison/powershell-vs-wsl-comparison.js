// PowerShell vs. WSL Comparison Infographic
// CANVAS_HEIGHT: 690

let pinnedCell = null;

async function init() {
    const response = await fetch('./data.json');
    const data = await response.json();

    document.getElementById('title').textContent = data.title;
    document.getElementById('subtitle').textContent = data.subtitle;
    document.getElementById('source').textContent = data.source || '';

    buildHeader(data.columns);
    buildBody(data.rows, data.columns);
    setupGlobalDismissHandlers();
}

function buildHeader(columns) {
    const headerRow = document.getElementById('header-row');
    columns.forEach(col => {
        const th = document.createElement('th');
        th.className = `col-header ${col.key}`;
        th.innerHTML = `
            <div class="col-header-inner">
                <img src="${col.logo}" alt="${col.name} logo">
                <span class="col-header-name">${col.name}</span>
                <span class="col-header-tagline">${col.tagline}</span>
            </div>`;
        headerRow.appendChild(th);
    });
}

function buildBody(rows, columns) {
    const tbody = document.getElementById('table-body');

    rows.forEach(row => {
        const tr = document.createElement('tr');

        const factorTd = document.createElement('td');
        factorTd.className = 'factor-cell';
        factorTd.textContent = row.factor;
        tr.appendChild(factorTd);

        columns.forEach(col => {
            const cellData = row.cells[col.key];
            const hasDetail = Boolean(cellData.detail || cellData.example);

            const td = document.createElement('td');
            td.className = `data-cell ${col.key}${hasDetail ? ' has-detail' : ''}`;

            const inner = document.createElement('div');
            inner.className = 'cell-inner';
            inner.innerHTML = `<span class="cell-value">${cellData.value}</span>${
                hasDetail ? '<i class="info-icon" aria-hidden="true">i</i>' : ''
            }`;
            td.appendChild(inner);

            if (hasDetail) {
                td.dataset.heading = `${row.factor} — ${col.name}`;
                td.dataset.detail = cellData.detail || '';
                td.dataset.example = cellData.example || '';
                attachHandlers(td);
            }

            tr.appendChild(td);
        });

        tbody.appendChild(tr);
    });
}

function attachHandlers(cell) {
    cell.addEventListener('mouseenter', () => {
        if (!pinnedCell) showInfobox(cell, false);
    });
    cell.addEventListener('mouseleave', () => {
        if (!pinnedCell) hideInfobox();
    });
    cell.addEventListener('click', (e) => {
        e.stopPropagation();
        if (pinnedCell === cell) {
            unpin();
        } else {
            if (pinnedCell) pinnedCell.classList.remove('pinned');
            pinnedCell = cell;
            cell.classList.add('pinned');
            showInfobox(cell, true);
        }
    });
}

function showInfobox(cell, pinned) {
    const infobox = document.getElementById('infobox');
    const heading = document.getElementById('infobox-heading');
    const detail = document.getElementById('infobox-detail');
    const exampleWrap = document.getElementById('infobox-example');
    const code = document.getElementById('infobox-code');

    heading.textContent = cell.dataset.heading;
    detail.textContent = cell.dataset.detail;

    if (cell.dataset.example) {
        code.textContent = cell.dataset.example;
        exampleWrap.hidden = false;
    } else {
        exampleWrap.hidden = true;
    }

    infobox.classList.add('visible');
    positionInfobox(infobox, cell);
}

function hideInfobox() {
    document.getElementById('infobox').classList.remove('visible');
}

function unpin() {
    if (pinnedCell) pinnedCell.classList.remove('pinned');
    pinnedCell = null;
    hideInfobox();
}

function positionInfobox(infobox, cell) {
    const rect = cell.getBoundingClientRect();
    const scrollX = window.pageXOffset;
    const scrollY = window.pageYOffset;
    const viewportWidth = document.documentElement.clientWidth;
    const viewportHeight = document.documentElement.clientHeight;

    const boxWidth = infobox.offsetWidth;
    const boxHeight = infobox.offsetHeight;

    let left = rect.left + scrollX;
    if (left + boxWidth > viewportWidth - 8) {
        left = Math.max(8, viewportWidth - boxWidth - 8);
    }

    let top = rect.bottom + scrollY + 8;
    if (top + boxHeight > scrollY + viewportHeight - 8) {
        top = rect.top + scrollY - boxHeight - 8;
        if (top < scrollY + 8) top = scrollY + 8;
    }

    infobox.style.left = `${left}px`;
    infobox.style.top = `${top}px`;
}

function setupGlobalDismissHandlers() {
    document.getElementById('infobox-close').addEventListener('click', unpin);

    document.addEventListener('click', (e) => {
        const infobox = document.getElementById('infobox');
        if (pinnedCell && !infobox.contains(e.target) && !pinnedCell.contains(e.target)) {
            unpin();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') unpin();
    });
}

document.addEventListener('DOMContentLoaded', init);
