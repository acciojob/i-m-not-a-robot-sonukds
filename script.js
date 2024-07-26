// Image sources (replace with actual API or image URLs)
const imageSources = [
    'https://via.placeholder.com/100?text=1',
    'https://via.placeholder.com/100?text=2',
    'https://via.placeholder.com/100?text=3',
    'https://via.placeholder.com/100?text=4',
    'https://via.placeholder.com/100?text=5'
];

let selectedImages = [];
let correctPair = null;

// Initialize the game
function initGame() {
    const imagesContainer = document.getElementById('images-container');
    imagesContainer.innerHTML = '';
    document.getElementById('para').innerHTML = '';
    document.getElementById('reset').style.display = 'none';
    document.getElementById('verify').style.display = 'none';
    selectedImages = [];

    // Randomly pick an image to duplicate
    const duplicateIndex = Math.floor(Math.random() * imageSources.length);
    const images = [...imageSources];
    images.push(imageSources[duplicateIndex]);
    correctPair = imageSources[duplicateIndex];

    // Shuffle images
    images.sort(() => 0.5 - Math.random());

    // Render images
    images.forEach((src, index) => {
        const img = document.createElement('img');
        img.src = src;
        img.className = `img${imageSources.indexOf(src) + 1}`;
        img.setAttribute('data-ns-test', `img${imageSources.indexOf(src) + 1}`);
        img.onclick = () => selectImage(index, src);
        imagesContainer.appendChild(img);
    });
}

function selectImage(index, src) {
    if (selectedImages.length < 2 && !selectedImages.some(img => img.index === index)) {
        selectedImages.push({ index, src });
        document.getElementById('reset').style.display = 'block';

        if (selectedImages.length === 2) {
            document.getElementById('verify').style.display = 'block';
        }
    }
}

function resetGame() {
    initGame();
}

function verifySelection() {
    const [first, second] = selectedImages;
    document.getElementById('verify').style.display = 'none';

    if (first.src === second.src) {
        document.getElementById('para').innerHTML = 'You are a human. Congratulations!';
    } else {
        document.getElementById('para').innerHTML = "We can't verify you as a human. You selected the non-identical tiles.";
    }
}

window.onload = initGame;
