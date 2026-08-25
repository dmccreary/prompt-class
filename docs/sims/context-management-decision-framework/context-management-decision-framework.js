// Context Management Decision Framework - Mermaid decision flowchart
// CANVAS_HEIGHT: 880
// Hover interaction: shows per-node detail in the right-hand info panel.
// Requires a global `nodeInfo` object to be defined before this script loads.

const infoDisplay = document.getElementById('info-display');
const defaultContent = '<p class="info-placeholder">Hover over a node to see details</p>';

function showNodeInfo(nodeId) {
    if (typeof nodeInfo !== 'undefined' && nodeInfo[nodeId]) {
        const info = nodeInfo[nodeId];
        infoDisplay.innerHTML = `
            <div class="info-title">${info.title}</div>
            <div class="info-content">${info.description}</div>
        `;
    }
}

function clearNodeInfo() {
    infoDisplay.innerHTML = defaultContent;
}

function setupNodeInteractions() {
    document.querySelectorAll('.node').forEach(node => {
        // Mermaid v11 ids look like "mermaid-<timestamp>-flowchart-<ID>-<index>",
        // so anchor on the flowchart- segment and drop the trailing index.
        const match = node.id.match(/flowchart-(.+)-\d+$/);
        const nodeId = match ? match[1] : null;
        if (nodeId && typeof nodeInfo !== 'undefined' && nodeInfo[nodeId]) {
            node.addEventListener('mouseenter', () => showNodeInfo(nodeId));
            node.addEventListener('mouseleave', clearNodeInfo);
        }
    });
}

function waitForMermaid() {
    const mermaidDiv = document.querySelector('.mermaid');
    const svg = mermaidDiv ? mermaidDiv.querySelector('svg') : null;
    if (svg && document.querySelectorAll('.node').length > 0) {
        setupNodeInteractions();
    } else {
        setTimeout(waitForMermaid, 100);
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(waitForMermaid, 100));
} else {
    setTimeout(waitForMermaid, 100);
}
