// Claude Code Setup - vis-network MicroSim
// CANVAS_HEIGHT: 640
// Shows how Claude Desktop, GitHub, VS Code, and the Unix shell connect
// during Week 1 of the crash course. Click a circle or an arrow to read
// what it does; hover for a one-line reminder.

// ── Detect embedding context (disable mouse pan/zoom inside an iframe) ──
function isInIframe() {
    try {
        return window.self !== window.top;
    } catch (e) {
        return true;
    }
}

// ── Node data: id, short display label, color, tooltip, infobox text ──
const nodeInfo = {
    claude: {
        label: 'Claude\nDesktop',
        x: -220, y: -110,
        background: '#D97757',
        border: '#B15C3E',
        tooltip: 'The desktop AI agent that reads, writes, and directs every other tool in your setup.',
        heading: 'Claude Desktop',
        detail: 'Claude Desktop (or Claude Code) is the AI agent at the center of your workflow. It reads your instructions, writes and edits files, and issues commands to the shell and to GitHub on your behalf. Because an agent this capable can take real, hard-to-reverse actions, everything else in this diagram exists to give it a safety net &mdash; version control it can commit to, and undo.'
    },
    github: {
        label: 'GitHub',
        x: 220, y: 120,
        background: '#24292e',
        border: '#000000',
        tooltip: 'The hosting service that stores your project’s version history — and gives Claude an undo button.',
        heading: 'GitHub',
        detail: 'GitHub is a <strong>required</strong> component in Week 1 because it gives Claude reversibility. Claude is naturally reluctant to take actions it can’t undo &mdash; but once every project lives in its own git repository, a bad edit is just a revert away, not a disaster. That’s why the very first habit we build is: every new project gets its own GitHub repo, before a single line of code is written.'
    },
    vscode: {
        label: 'VS Code',
        x: 220, y: -100,
        background: '#007ACC',
        border: '#005A9E',
        tooltip: 'The code editor where you (and Claude) can see, review, and directly edit every project file.',
        heading: 'VS Code',
        detail: 'VS Code gives you eyes on everything Claude does &mdash; a visual diff of every change, a file tree of the whole project, and an integrated terminal for running commands by hand. Connecting it to your GitHub repo closes the loop: what Claude changes, you can see; what you approve, gets pushed.'
    },
    shell: {
        label: 'Unix\nShell',
        x: -220, y: 110,
        background: '#2E7D32',
        border: '#1B5E20',
        tooltip: 'The command-line interface Claude uses to run tools like git and gh on your behalf.',
        heading: 'Unix Shell',
        detail: 'The Unix shell is how Claude actually <em>does</em> things &mdash; every file operation, every git commit, every call to GitHub happens through shell commands. The <code>gh</code> command in particular is what lets Claude create repos, open issues, and manage pull requests without you ever leaving the conversation.'
    }
};

// ── Edge data: labeled, directed relationships between tools ──
const edgeInfo = [
    {
        id: 'claude-github',
        from: 'claude', to: 'github',
        label: 'Controls using gh',
        tooltip: 'Claude issues gh commands to create repos, open issues, and manage your GitHub account.',
        heading: 'Claude Desktop → GitHub: Controls using gh',
        detail: 'Claude Desktop controls GitHub through the <code>gh</code> command-line tool, run inside the Unix shell. This is how Claude creates a new repository for every project and opens issues &mdash; and, critically, how it gives itself an undo button before taking any real action.'
    },
    {
        id: 'claude-shell',
        from: 'claude', to: 'shell',
        label: 'Executes commands via',
        tooltip: 'Every action Claude takes on your files or tools runs as a shell command under the hood.',
        heading: 'Claude Desktop → Unix Shell: Executes commands via',
        detail: 'Claude Desktop doesn’t have magic hands &mdash; it runs real Unix shell commands to move files, install packages, and call other tools. Confirming this connection works with a tiny test command is the first proof in Week 1 that the whole chain is actually wired up.'
    },
    {
        id: 'claude-vscode',
        from: 'claude', to: 'vscode',
        label: 'Opens & edits files in',
        tooltip: 'Claude creates and modifies the same files you see open in your VS Code editor.',
        heading: 'Claude Desktop → VS Code: Opens & edits files in',
        detail: 'When Claude edits a file, that change shows up immediately in VS Code &mdash; same file, same disk, no syncing step required. This lets you review every change Claude makes with VS Code’s built-in diff view before you decide whether to keep it.'
    },
    {
        id: 'shell-github',
        from: 'shell', to: 'github',
        label: 'Runs git & gh against',
        tooltip: 'Commands like git push and gh repo create are how the shell actually talks to GitHub.',
        heading: 'Unix Shell → GitHub: Runs git & gh against',
        detail: 'The shell is the messenger between your local machine and GitHub. <code>git</code> handles commits, pushes, and pulls, while <code>gh</code> handles higher-level GitHub actions like creating a repo or opening an issue &mdash; all without leaving the command line.'
    },
    {
        id: 'vscode-shell',
        from: 'vscode', to: 'shell',
        label: 'Opens terminal in',
        tooltip: 'VS Code’s built-in terminal panel is just a Unix shell you can type into directly.',
        heading: 'VS Code → Unix Shell: Opens terminal in',
        detail: 'VS Code’s integrated terminal is a real Unix shell running inside your editor. You can run the exact same git and gh commands Claude runs &mdash; a great way to double-check what just happened, or to try a command yourself before asking Claude to automate it.'
    },
    {
        id: 'vscode-github',
        from: 'vscode', to: 'github',
        label: 'Commits & syncs with',
        tooltip: 'VS Code’s Source Control panel lets you review, commit, and push changes to your GitHub repo.',
        heading: 'VS Code → GitHub: Commits & syncs with',
        detail: 'VS Code’s built-in Source Control view shows every changed file, lets you stage and commit with a click, and pushes straight to the GitHub repo for the project &mdash; the same repo Claude is committing to when it works on its own.'
    }
];

let network;

function buildNodes() {
    return Object.keys(nodeInfo).map(function (id) {
        const n = nodeInfo[id];
        return {
            id: id,
            label: n.label,
            x: n.x,
            y: n.y,
            shape: 'circle',
            title: n.tooltip,
            color: {
                background: n.background,
                border: n.border,
                highlight: { background: n.background, border: '#000' }
            },
            font: { color: '#ffffff', size: 15, face: 'Arial', multi: false },
            borderWidth: 3,
            widthConstraint: { minimum: 100, maximum: 100 },
            heightConstraint: { minimum: 100 },
            shadow: { enabled: true, color: 'rgba(0,0,0,0.2)', size: 5, x: 2, y: 2 }
        };
    });
}

function buildEdges() {
    return edgeInfo.map(function (e) {
        return {
            id: e.id,
            from: e.from,
            to: e.to,
            label: e.label,
            title: e.tooltip,
            arrows: { to: { enabled: true, scaleFactor: 0.9 } },
            color: { color: '#7a7a7a', highlight: '#1a1a2e' },
            width: 2,
            font: { size: 12, align: 'horizontal', background: 'aliceblue', color: '#333' },
            smooth: { type: 'curvedCW', roundness: 0.15 }
        };
    });
}

function showInfo(heading, detail, accentColor) {
    document.getElementById('infobox-heading').textContent = heading;
    document.getElementById('infobox-detail').innerHTML = detail;
    const infobox = document.getElementById('infobox');
    infobox.style.borderLeftColor = accentColor || '#d97757';
}

function initializeNetwork() {
    const nodes = new vis.DataSet(buildNodes());
    const edges = new vis.DataSet(buildEdges());

    const enableMouseInteraction = !isInIframe();

    const options = {
        layout: { improvedLayout: false },
        physics: { enabled: false },
        interaction: {
            selectConnectedEdges: false,
            hover: true,
            dragView: enableMouseInteraction,
            zoomView: enableMouseInteraction,
            dragNodes: false,
            navigationButtons: false
        },
        nodes: {
            shape: 'circle'
        },
        edges: {
            smooth: true
        }
    };

    const container = document.getElementById('network');
    network = new vis.Network(container, { nodes: nodes, edges: edges }, options);

    // With physics disabled, vis-network never auto-fits to the fixed node
    // positions on initial load — it defaults the view to the container's
    // raw pixel center instead. Force a fit so the graph is centered.
    network.once('afterDrawing', function () {
        network.fit({ animation: false });
    });

    network.on('click', function (params) {
        if (params.nodes.length > 0) {
            const n = nodeInfo[params.nodes[0]];
            showInfo(n.heading, n.detail, n.background);
        } else if (params.edges.length > 0) {
            const e = edgeInfo.find(function (edge) { return edge.id === params.edges[0]; });
            if (e) {
                showInfo(e.heading, e.detail, '#7a7a7a');
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', initializeNetwork);
