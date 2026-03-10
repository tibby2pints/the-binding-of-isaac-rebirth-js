const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// 1. Define Asset Paths (Replace these with your actual local file paths)
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

// 2. Progression Data for each slot
const slots = [
    { id: 0, title: "Slot 1", imgKey: 'slot1', x: 212, y: 110 },
    { id: 1, title: "Slot 2", imgKey: 'slot2', x: 212, y: 240 },
    { id: 2, title: "Slot 3", imgKey: 'slot3', x: 212, y: 370 }
];

let selectedSlot = 0;

// Load images before starting
function loadAssets() {
    for (let key in assets) {
        images[key] = new Image();
        images[key].src = assets[key];
        images[key].onload = () => {
            loadedCount++;
            if (loadedCount === totalAssets) draw();
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

        // Draw selection circle/highlight around the active slot
        if (index === selectedSlot && images.selector) {
            // Adjust x/y offsets to make the "circle" fit perfectly
            ctx.drawImage(images.selector, slot.x - 10, slot.y - 10);
        }
    });
}

// 3. Input Handling
window.addEventListener('keydown', (e) => {
    if (e.key === "ArrowDown") {
        selectedSlot = (selectedSlot + 1) % slots.length;
    } else if (e.key === "ArrowUp") {
        selectedSlot = (selectedSlot - 1 + slots.length) % slots.length;
    }
    draw();
});

loadAssets();
