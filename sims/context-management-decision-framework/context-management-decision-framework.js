// Context Management Decision Framework
// CANVAS_HEIGHT: 620
// Interactive decision tree for choosing context management strategies

// Color schemes for node types
const nodeColors = {
    start:       { background: '#1565C0', border: '#0D47A1', font: '#ffffff', highlight: { background: '#1976D2', border: '#0D47A1' } },
    decision:    { background: '#F57C00', border: '#E65100', font: '#ffffff', highlight: { background: '#FB8C00', border: '#E65100' } },
    technique:   { background: '#2E7D32', border: '#1B5E20', font: '#ffffff', highlight: { background: '#388E3C', border: '#1B5E20' } },
    combination: { background: '#7B1FA2', border: '#4A148C', font: '#ffffff', highlight: { background: '#8E24AA', border: '#4A148C' } }
};

// Node descriptions for the info panel
const nodeInfo = {
    1: {
        title: 'What Is Your Task?',
        text: 'Start here. Consider the nature of your task with the LLM. The right context management strategy depends on what you are trying to accomplish and the constraints you face.<ul><li>How much information does the model need?</li><li>Is this a single query or an ongoing conversation?</li><li>Do you need the model to remember previous interactions?</li></ul>'
    },
    2: {
        title: 'Single Query or Conversation?',
        text: 'Is this a <strong>one-shot task</strong> (a single prompt and response) or an <strong>ongoing conversation</strong> where context builds over multiple turns?<ul><li><strong>Single query</strong>: Focus on packing the right context into one prompt</li><li><strong>Conversation</strong>: You will need strategies to manage context across turns</li></ul>'
    },
    3: {
        title: 'How Much Context Is Needed?',
        text: 'For single queries, how much background information does the model need to give a good answer?<ul><li><strong>Minimal</strong>: A well-crafted prompt may be sufficient</li><li><strong>Moderate</strong>: You may need to include examples or reference material</li><li><strong>Extensive</strong>: Large documents or datasets need special handling</li></ul>'
    },
    4: {
        title: 'How Long Is the Conversation?',
        text: 'For multi-turn conversations, how many exchanges do you anticipate?<ul><li><strong>Short</strong> (2-5 turns): Context window is usually sufficient</li><li><strong>Medium</strong> (5-20 turns): May need periodic summarization</li><li><strong>Long</strong> (20+ turns): Requires active context management</li></ul>'
    },
    10: {
        title: 'System Prompts',
        text: '<strong>When to use:</strong> Every interaction where you want consistent behavior.<ul><li>Set the model\'s role, personality, and constraints</li><li>Define output format expectations</li><li>Establish domain expertise and boundaries</li><li>Persists across the entire conversation</li></ul><strong>Example:</strong> "You are an expert data analyst. Always provide SQL queries with explanations. Use markdown tables for results."'
    },
    11: {
        title: 'Few-Shot Examples',
        text: '<strong>When to use:</strong> When the model needs to understand a specific pattern or format.<ul><li>Include 2-5 input/output examples in your prompt</li><li>Shows the model exactly what you expect</li><li>Particularly effective for classification, formatting, and style matching</li></ul><strong>Tip:</strong> Choose diverse examples that cover edge cases.'
    },
    12: {
        title: 'RAG (Retrieval-Augmented Generation)',
        text: '<strong>When to use:</strong> When you need the model to reference large knowledge bases or documents that exceed the context window.<ul><li>Retrieve relevant passages using semantic search</li><li>Inject only the most relevant chunks into the prompt</li><li>Keeps responses grounded in your source material</li><li>Reduces hallucination on factual queries</li></ul><strong>Best for:</strong> Q&A over documents, knowledge bases, technical documentation.'
    },
    13: {
        title: 'Chunking',
        text: '<strong>When to use:</strong> When processing documents or data that exceed the context window.<ul><li>Split large texts into manageable segments</li><li>Process each chunk independently or sequentially</li><li>Combine results with a final synthesis step</li><li>Overlap chunks slightly to avoid losing context at boundaries</li></ul><strong>Best for:</strong> Document summarization, analysis of long texts, data processing.'
    },
    20: {
        title: 'Conversation Summarization',
        text: '<strong>When to use:</strong> When conversations grow long and older details become less critical.<ul><li>Periodically summarize earlier turns into a compact recap</li><li>Replace detailed history with a summary + recent turns</li><li>Preserves key decisions and context without using full token budget</li></ul><strong>Best for:</strong> Extended brainstorming, iterative editing, long research sessions.'
    },
    21: {
        title: 'Conversation Pruning',
        text: '<strong>When to use:</strong> When you need to manage context window limits in ongoing conversations.<ul><li>Remove or trim less relevant earlier messages</li><li>Keep the most recent N turns in full detail</li><li>Retain system prompt and key reference points</li><li>Simpler than summarization but less context-preserving</li></ul><strong>Best for:</strong> Casual conversations, simple Q&A threads, chat interfaces.'
    },
    22: {
        title: 'Structured Memory',
        text: '<strong>When to use:</strong> When specific facts, preferences, or decisions must persist across sessions.<ul><li>Store key-value pairs, user preferences, or decisions externally</li><li>Inject relevant memory items into each new prompt</li><li>Update memory based on new information</li><li>More persistent than conversation history</li></ul><strong>Best for:</strong> Personal assistants, project management, ongoing collaborations.'
    },
    30: {
        title: 'RAG + Summarization',
        text: '<strong>When to use:</strong> Complex tasks requiring both external knowledge and long conversation management.<ul><li>Retrieve relevant documents via RAG for each query</li><li>Summarize conversation history to preserve context</li><li>Combine fresh retrieval with compressed history</li></ul><strong>Best for:</strong> Research assistants, technical support bots, educational tutors.'
    },
    31: {
        title: 'System Prompt + Memory + Pruning',
        text: '<strong>When to use:</strong> Building persistent AI agents that maintain character and knowledge.<ul><li>System prompt defines consistent behavior</li><li>Structured memory stores important facts</li><li>Pruning keeps the conversation window manageable</li></ul><strong>Best for:</strong> AI assistants, customer service bots, personalized learning tools.'
    }
};

// Decision tree node data with fixed positions
const nodeData = [
    // Start node (top center)
    { id: 1,  label: 'What Is\nYour Task?',           x: -200, y: -220, type: 'start' },

    // Level 1 decisions
    { id: 2,  label: 'Single Query or\nConversation?', x: -200, y: -120, type: 'decision' },

    // Level 2 decisions
    { id: 3,  label: 'How Much\nContext Needed?',      x: -380, y: -20,  type: 'decision' },
    { id: 4,  label: 'How Long Is the\nConversation?', x: -30,  y: -20,  type: 'decision' },

    // Single query techniques (left branch)
    { id: 10, label: 'System\nPrompts',                x: -500, y: 100,  type: 'technique' },
    { id: 11, label: 'Few-Shot\nExamples',             x: -380, y: 100,  type: 'technique' },
    { id: 12, label: 'RAG',                            x: -260, y: 100,  type: 'technique' },
    { id: 13, label: 'Chunking',                       x: -260, y: 200,  type: 'technique' },

    // Conversation techniques (right branch)
    { id: 20, label: 'Conversation\nSummarization',    x: -120, y: 100,  type: 'technique' },
    { id: 21, label: 'Conversation\nPruning',          x: 10,   y: 100,  type: 'technique' },
    { id: 22, label: 'Structured\nMemory',             x: 80,   y: 200,  type: 'technique' },

    // Combination strategies (bottom)
    { id: 30, label: 'RAG +\nSummarization',           x: -260, y: 310,  type: 'combination' },
    { id: 31, label: 'System Prompt +\nMemory + Pruning', x: 10, y: 310, type: 'combination' }
];

// Edge data with labels
const edgeData = [
    { from: 1,  to: 2,  label: '' },
    { from: 2,  to: 3,  label: 'Single' },
    { from: 2,  to: 4,  label: 'Conversation' },

    // Single query branches
    { from: 3,  to: 10, label: 'Minimal' },
    { from: 3,  to: 11, label: 'Moderate' },
    { from: 3,  to: 12, label: 'Extensive' },
    { from: 12, to: 13, label: 'Too large\nfor window' },

    // Conversation branches
    { from: 4,  to: 20, label: 'Long' },
    { from: 4,  to: 21, label: 'Short-Med' },
    { from: 4,  to: 22, label: 'Cross-\nsession' },

    // Combination links
    { from: 12, to: 30, label: '' },
    { from: 20, to: 30, label: '' },
    { from: 10, to: 31, label: '' },
    { from: 22, to: 31, label: '' },
    { from: 21, to: 31, label: '' }
];

let network, nodes, edges;

// Environment detection
function isInIframe() {
    try { return window.self !== window.top; }
    catch (e) { return true; }
}

function initializeNetwork() {
    const enableMouseInteraction = !isInIframe();

    // Build vis.js node objects
    const visNodes = nodeData.map(node => {
        const colorSet = nodeColors[node.type];
        return {
            id: node.id,
            label: node.label,
            x: node.x,
            y: node.y,
            color: {
                background: colorSet.background,
                border: colorSet.border,
                highlight: colorSet.highlight
            },
            font: {
                color: colorSet.font,
                size: 14,
                face: 'Arial',
                multi: false
            },
            shape: node.type === 'decision' ? 'diamond' : 'box',
            margin: node.type === 'decision' ? 14 : 10,
            borderWidth: 2,
            shadow: {
                enabled: true,
                color: 'rgba(0,0,0,0.15)',
                size: 4,
                x: 2,
                y: 2
            }
        };
    });

    const visEdges = edgeData.map((edge, i) => ({
        id: i,
        from: edge.from,
        to: edge.to,
        label: edge.label || '',
        font: {
            size: 11,
            color: '#555',
            strokeWidth: 3,
            strokeColor: 'rgba(240, 248, 255, 0.9)',
            face: 'Arial'
        },
        color: { color: '#666', highlight: '#333' },
        width: 2,
        arrows: { to: { enabled: true, scaleFactor: 0.8 } },
        smooth: {
            type: 'cubicBezier',
            roundness: 0.3
        }
    }));

    nodes = new vis.DataSet(visNodes);
    edges = new vis.DataSet(visEdges);

    const options = {
        layout: { improvedLayout: false },
        physics: { enabled: false },
        interaction: {
            selectConnectedEdges: true,
            zoomView: enableMouseInteraction,
            dragView: enableMouseInteraction,
            dragNodes: false,
            navigationButtons: true,
            hover: true,
            tooltipDelay: 200
        },
        nodes: {
            shape: 'box',
            margin: 10,
            font: { size: 14, face: 'Arial' },
            borderWidth: 2
        },
        edges: {
            arrows: { to: { enabled: true, scaleFactor: 0.8 } },
            width: 2,
            smooth: { type: 'cubicBezier', roundness: 0.3 }
        }
    };

    const container = document.getElementById('network');
    const data = { nodes: nodes, edges: edges };
    network = new vis.Network(container, data, options);

    // Position view after auto-centering
    network.once('afterDrawing', function() {
        const pos = network.getViewPosition();
        network.moveTo({
            position: {
                x: pos.x + 60,
                y: pos.y + 10
            },
            animation: false
        });
    });

    // Click handler for info panel
    network.on('click', function(params) {
        if (params.nodes.length > 0) {
            const nodeId = params.nodes[0];
            showNodeInfo(nodeId);
            highlightPath(nodeId);
        } else {
            resetHighlights();
            showDefaultInfo();
        }
    });

    // Hover cursor
    network.on('hoverNode', function() {
        container.style.cursor = 'pointer';
    });
    network.on('blurNode', function() {
        container.style.cursor = 'default';
    });

    showDefaultInfo();
}

function showNodeInfo(nodeId) {
    const info = nodeInfo[nodeId];
    if (!info) return;

    document.getElementById('info-title').textContent = info.title;
    document.getElementById('status-text').innerHTML = info.text;
}

function showDefaultInfo() {
    document.getElementById('info-title').textContent = 'Context Management';
    document.getElementById('status-text').innerHTML =
        'Click any node to learn about that context management technique or decision point. ' +
        'Follow the arrows from the top to find the right strategy for your task.' +
        '<ul>' +
        '<li><strong>Blue</strong>: Starting point</li>' +
        '<li><strong>Orange diamonds</strong>: Decision points</li>' +
        '<li><strong>Green boxes</strong>: Techniques to use</li>' +
        '<li><strong>Purple boxes</strong>: Combined strategies</li>' +
        '</ul>';
}

function highlightPath(targetId) {
    // Find all ancestors leading to this node
    const pathNodes = new Set([targetId]);
    const pathEdges = new Set();

    function findParents(nodeId) {
        edgeData.forEach((edge, idx) => {
            if (edge.to === nodeId && !pathNodes.has(edge.from)) {
                pathNodes.add(edge.from);
                pathEdges.add(idx);
                findParents(edge.from);
            }
        });
    }
    findParents(targetId);

    // Also highlight children
    edgeData.forEach((edge, idx) => {
        if (edge.from === targetId) {
            pathNodes.add(edge.to);
            pathEdges.add(idx);
        }
    });

    // Dim non-path nodes
    const nodeUpdates = nodeData.map(node => {
        const colorSet = nodeColors[node.type];
        const onPath = pathNodes.has(node.id);
        return {
            id: node.id,
            opacity: onPath ? 1.0 : 0.25,
            color: {
                background: onPath ? colorSet.background : '#d0d0d0',
                border: onPath ? colorSet.border : '#aaa',
                highlight: colorSet.highlight
            },
            font: {
                color: onPath ? colorSet.font : '#999',
                size: 14,
                face: 'Arial'
            }
        };
    });
    nodes.update(nodeUpdates);

    // Dim non-path edges
    const edgeUpdates = edgeData.map((edge, idx) => ({
        id: idx,
        color: {
            color: pathEdges.has(idx) ? '#333' : '#ddd',
            highlight: '#333'
        },
        width: pathEdges.has(idx) ? 3 : 1,
        font: {
            color: pathEdges.has(idx) ? '#555' : '#ccc',
            size: 11,
            strokeWidth: 3,
            strokeColor: 'rgba(240, 248, 255, 0.9)',
            face: 'Arial'
        }
    }));
    edges.update(edgeUpdates);
}

function resetHighlights() {
    const nodeUpdates = nodeData.map(node => {
        const colorSet = nodeColors[node.type];
        return {
            id: node.id,
            opacity: 1.0,
            color: {
                background: colorSet.background,
                border: colorSet.border,
                highlight: colorSet.highlight
            },
            font: {
                color: colorSet.font,
                size: 14,
                face: 'Arial'
            }
        };
    });
    nodes.update(nodeUpdates);

    const edgeUpdates = edgeData.map((edge, idx) => ({
        id: idx,
        color: { color: '#666', highlight: '#333' },
        width: 2,
        font: {
            color: '#555',
            size: 11,
            strokeWidth: 3,
            strokeColor: 'rgba(240, 248, 255, 0.9)',
            face: 'Arial'
        }
    }));
    edges.update(edgeUpdates);
}

function resetView() {
    resetHighlights();
    showDefaultInfo();
    network.fit({ animation: { duration: 500, easingFunction: 'easeInOutQuad' } });
    // Re-offset after fit
    setTimeout(function() {
        const pos = network.getViewPosition();
        network.moveTo({
            position: { x: pos.x + 60, y: pos.y + 10 },
            animation: { duration: 300, easingFunction: 'easeInOutQuad' }
        });
    }, 600);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeNetwork();

    document.getElementById('reset-btn').addEventListener('click', resetView);

    document.getElementById('expand-btn').addEventListener('click', function() {
        network.fit({
            animation: { duration: 500, easingFunction: 'easeInOutQuad' }
        });
    });
});
