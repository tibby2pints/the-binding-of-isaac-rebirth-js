// 1. Setup Canvas (ID must match your HTML 'canvas')
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// 2. Define Asset Paths (Check these carefully for case-sensitivity on GitHub!)
const assets = {
    background: 'title bg.png',
    slot1: 'file1.png',
    slot2: 'file2.png',
    slot3: 'file3.png',
    selector: 'highlight.png'
};

const images = {};
let loadedCount = 0;
const totalAssets = Object.keys(assets).length;

// 3. Horizontal Progression Data (Side-by-Side)
const slots = [
    { id: 0, title: "Slot 1", imgKey: 'slot1', x: 100, y: 150 },
    { id: 1, title: "Slot 2", imgKey: 'slot2', x: 400, y: 150 },
    { id: 2, title: "Slot 3", imgKey: 'slot3', x: 700, y: 150 }
];

let selectedSlot = 0;

// EMERGENCY ERROR BOX (Since console is blocked)
window.onerror = function(msg, url, line) {
    const err = document.createElement('div');
    err.style = "position:fixed;top:0;left:0;background:red;color:white;padding:10px;z-index:9999;";
    err.innerHTML = `Error: ${msg} <br> Line: ${line}`;
    document.body.appendChild(err);
};

// 4. Load images before starting
function loadAssets() {
    for (let key in assets) {
        images[key] = new Image();
        images[key].src = assets[key];
        images[key].onload = () => {
            loadedCount++;
            if (loadedCount === totalAssets) draw();
        };
        images[key].onerror = () => {
            alert("COULD NOT FIND: " + assets[key] + " (Check paths & capitalization!)");
        };
    }
}

function draw() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw Background
    if (images.background) {
        ctx.drawImage(images.background, 0, 0, canvas.width, canvas.height);
    }

    // Draw Save Slots
    slots.forEach((slot, index) => {
        const sprite = images[slot.imgKey];
        
        // Draw the specific paper sprite for this slot
        if (sprite) {
            ctx.drawImage(sprite, slot.x, slot.y);
        }

        // Draw selection highlight (Now horizontal movement)
        if (index === selectedSlot && images.selector) {
            ctx.drawImage(images.selector, slot.x - 10, slot.y - 10);
        }
    });
}

// 5. Input Handling (ArrowLeft and ArrowRight)
window.addEventListener('keydown', (e) => {
    if (e.key === "ArrowRight") {
        selectedSlot = (selectedSlot + 1) % slots.length;
    } else if (e.key === "ArrowLeft") {
        selectedSlot = (selectedSlot - 1 + slots.length) % slots.length;
    }
    draw();
});

// Start the process
loadAssets();
