// 1. Setup Canvas
const canvas = document.getElementById('canvas'); // Matches your HTML ID
const ctx = canvas.getContext('2d');

// 2. Asset Paths (Check folder names and capitalization for GitHub!)
const assets = {
    background: 'title bg.png',
    slot1: 'file1.png',
    slot2: 'file2.png',
    slot3: 'file3.png',
    selector: 'highlight.png' // This should be a red scribble/outline
};

const images = {};
let loadedCount = 0;
const totalAssets = Object.keys(assets).length;

// 3. Horizontal Slots (Isaac Style)
const slots = [
    { id: 0, title: "Slot 1", imgKey: 'slot1', x: 100, y: 180 },
    { id: 1, title: "Slot 2", imgKey: 'slot2', x: 400, y: 180 },
    { id: 2, title: "Slot 3", imgKey: 'slot3', x: 700, y: 180 }
];

let selectedSlot = 0;

// EMERGENCY ERROR BOX (Appears if GitHub paths are wrong)
window.onerror = (msg, url, line) => {
    const err = document.createElement('div');
    err.style = "position:fixed;top:0;left:0;background:red;color:white;padding:10px;z-index:9999;";
    err.innerHTML = `Error: ${msg} <br> Line: ${line}`;
    document.body.appendChild(err);
};

// 4. Load Assets & Start Loop
function loadAssets() {
    for (let key in assets) {
        images[key] = new Image();
        images[key].src = assets[key];
        images[key].onload = () => {
            loadedCount++;
            if (loadedCount === totalAssets) animate(); // Start the animation loop
        };
        images[key].onerror = () => alert("MISSING FILE: " + assets[key]);
    }
}

// 5. The "Isaac" Shaky Draw Function
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw Background
    if (images.background) {
        ctx.drawImage(images.background, 0, 0, canvas.width, canvas.height);
    }

    slots.forEach((slot, index) => {
        const sprite = images[slot.imgKey];
        if (!sprite) return;

        // Draw Save File Paper
        ctx.drawImage(sprite, slot.x, slot.y);

        // Draw Selection Highlight (Shaky Animation)
        if (index === selectedSlot) {
            // "Shake" offset: adds a random -2 to +2 pixel shift
            const shakeX = (Math.random() - 0.5) * 4;
            const shakeY = (Math.random() - 0.5) * 4;

            if (images.selector && images.selector.complete) {
                // Draw your custom red scribble image
                ctx.drawImage(images.selector, slot.x - 15 + shakeX, slot.y - 15 + shakeY, sprite.width + 30, sprite.height + 30);
            } else {
                // Fallback: Code-generated red scribble if image is missing
                ctx.strokeStyle = "red";
                ctx.lineWidth = 4;
                ctx.strokeRect(slot.x - 10 + shakeX, slot.y - 10 + shakeY, sprite.width + 20, sprite.height + 20);
            }
        }
    });
}

// 6. Animation Loop (Keeps it shaking)
function animate() {
    draw();
    requestAnimationFrame(animate); // Redraws ~60 times per second
}

// 7. Input Handling (Left/Right)
window.addEventListener('keydown', (e) => {
    if (e.key === "ArrowRight") selectedSlot = (selectedSlot + 1) % slots.length;
    if (e.key === "ArrowLeft") selectedSlot = (selectedSlot - 1 + slots.length) % slots.length;
});

loadAssets();
