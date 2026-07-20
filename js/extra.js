// Auto-resize interactive infographic-overlay MicroSim iframes.
// diagram.js inside each overlay reports its rendered content height via
// postMessage; match the message source to its iframe and apply the height.
window.addEventListener("message", function (event) {
    if (!event.data || event.data.type !== "microsim-resize") return;
    const iframes = document.querySelectorAll("iframe");
    for (let i = 0; i < iframes.length; i++) {
        if (iframes[i].contentWindow === event.source) {
            iframes[i].style.height = event.data.height + "px";
            break;
        }
    }
});

document.addEventListener("DOMContentLoaded", function () {

    // Find all admonitions with the "prompt" class
    document.querySelectorAll(".admonition.prompt").forEach((admonition) => {
        // Create a "Copy" button
        const copyButton = document.createElement("button");
        copyButton.textContent = "Copy";
        copyButton.className = "copy-button";

        // Append the button to the admonition
        admonition.appendChild(copyButton);

        // Add event listener for the button
        copyButton.addEventListener("click", () => {
            // Collect all text content inside the admonition except the title and button
            const promptText = Array.from(admonition.querySelectorAll("p:not(.admonition-title)"))
                .map((p) => p.textContent.trim())
                .join("\n");

            if (promptText) {
                // Copy the collected text to the clipboard
                navigator.clipboard.writeText(promptText).then(
                    () => {
                        // Show feedback on successful copy
                        copyButton.textContent = "Copied!";
                        setTimeout(() => (copyButton.textContent = "Copy"), 2000);
                    },
                    (err) => {
                        console.error("Failed to copy text: ", err);
                    }
                );
            } else {
                console.error("No prompt text found to copy.");
            }
        });
    });
});