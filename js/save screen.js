// Pre-load your assets
const menuBG = new Image();
menuBG.src = 'path/to/your/menu_bg.png'; // The parchment texture

const saveSlotImg = new Image();
saveSlotImg.src = 'path/to/your/save_slot.png'; // The base save box sprite

function drawSaveScreen(ctx) {
    // 1. Draw the Background (always first)
    ctx.drawImage(menuBG, 0, 0, canvas.width, canvas.height);

    const startY = 150;
    const spacing = 130;

    // 2. Loop through and draw the 3 Save Slots
    for (let i = 0; i < 3; i++) {
        let x = canvas.width / 2 - 200; // Centered
        let y = startY + (i * spacing);
        
        const isSelected = (i === selectedSave);

        // Add 'Rebirth' style jitter only to the selected slot
        if (isSelected) {
            x += (Math.random() - 0.5) * 4;
            y += (Math.random() - 0.5) * 4;
            
            // Optional: Draw a white "glow" or outline behind the selected slot
            ctx.shadowBlur = 15;
            ctx.shadowColor = "white";
        }

        ctx.drawImage(saveSlotImg, x, y, 400, 110);
        
        // Reset shadow so it doesn't affect other slots
        ctx.shadowBlur = 0;

        // 3. Draw text/stats over the sprite
        ctx.fillStyle = isSelected ? "white" : "#5a4d3e";
        ctx.font = "24px 'Upheaval'";
        ctx.textAlign = "center";
        ctx.fillText(`SAVE SLOT ${i + 1}`, canvas.width / 2, y + 65);
    }
}
