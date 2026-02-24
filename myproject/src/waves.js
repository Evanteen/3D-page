
const canvas = document.querySelector("#wave-canvas");
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//arry of specific colors for the waves
const waveColors = [
    'rgba(0, 17, 255, 0.3)',
    'rgba(140, 0, 255, 0.3)',
    'rgba(255, 0, 221, 0.3)',
    'rgba(255, 0, 170, 0.3)',
    'rgba(255, 0, 0, 0.3)'
];

//gradient of colors
const gradColors = [
    'rgb(255, 0, 0)',
    'rgb(42, 0, 194)'
];

let time = 0;
const noOfLayers = 20;

function drawWaves() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw multiple wave layers
    for (let layer = 0; layer < noOfLayers; layer++) {
        ctx.strokeStyle = GradientColorMethod(layer, noOfLayers)
        ctx.lineWidth = 5 + layer * 4;  // To Decrease line width by each layer (optional)
        ctx.beginPath();

        for (let x = -10; x < canvas.width; x++) {
            const y = canvas.height / 20 +
                Math.sin((x * 0.01) + time) * 30 +
                (layer * 60);

            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }

        ctx.stroke();
    }

    time += 0.05;
    requestAnimationFrame(drawWaves);
};

function GradientColorMethod(indexer, Maxlayer) {
    const startColor = gradColors[0].match(/\d+/g).map(Number); // Extract RGB values of start color
    const endColor = gradColors[1].match(/\d+/g).map(Number);   // Extract RGB values of end color

    const rStep = (endColor[0] - startColor[0]) / Maxlayer;
    const gStep = (endColor[1] - startColor[1]) / Maxlayer;
    const bStep = (endColor[2] - startColor[2]) / Maxlayer;

    const r = Math.round(startColor[0] + rStep * indexer);
    const g = Math.round(startColor[1] + gStep * indexer);
    const b = Math.round(startColor[2] + bStep * indexer);

    return `rgb(${r}, ${g}, ${b})`;
};

function SpecifiedColorMethod(indexer) {
    return waveColors[indexer % waveColors.length];
};

function EventListeners() {

    // Handle window resize
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    // Optional: Add interactivity (like change wave colors on click)
    canvas.addEventListener('click', () => {
        // Shuffle wave colors on click
        for (let i = waveColors.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [waveColors[i], waveColors[j]] = [waveColors[j], waveColors[i]];
        }

    });


};

export function ApplyDrawing() {
    EventListeners();
    drawWaves();
};

