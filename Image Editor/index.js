// Get DOM elements
const fileInput = document.getElementById('fileInput');
const canvas = document.getElementById('canvas');
const applyFilterBtn = document.getElementById('applyFilter');
const brightnessInput = document.getElementById('brightness');
const contrastInput = document.getElementById('contrast');
const saveImageBtn = document.getElementById('saveImage');

// Set up canvas context
const ctx = canvas.getContext('2d');

// Event listener for file input change
fileInput.addEventListener('change', function(e) {
  const file = e.target.files[0];
  const reader = new FileReader();

  reader.onload = function(event) {
    const img = new Image();
    img.onload = function() {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
    }
    img.src = event.target.result;
  }

  reader.readAsDataURL(file);
});

// Event listener for apply filter button click
applyFilterBtn.addEventListener('click', function() {
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  // Apply filter to each pixel
  for (let i = 0; i < data.length; i += 4) {
    // Apply filter logic here
    // Example: Invert colors
    data[i] = 255 - data[i]; // Red
    data[i + 1] = 255 - data[i + 1]; // Green
    data[i + 2] = 255 - data[i + 2]; // Blue
}

ctx.putImageData(imageData, 0, 0);
});

// Event listener for brightness input change
brightnessInput.addEventListener('input', function() {
const brightnessValue = parseInt(this.value);
applyBrightness(brightnessValue);
});

// Event listener for contrast input change
contrastInput.addEventListener('input', function() {
const contrastValue = parseInt(this.value);
applyContrast(contrastValue);
});

// Function to apply brightness
function applyBrightness(value) {
const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
const data = imageData.data;

for (let i = 0; i < data.length; i += 4) {
  data[i] += value; // Red
  data[i + 1] += value; // Green
  data[i + 2] += value; // Blue
}

ctx.putImageData(imageData, 0, 0);
}

// Function to apply contrast
function applyContrast(value) {
const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
const data = imageData.data;
const factor = (259 * (value + 255)) / (255 * (259 - value));

for (let i = 0; i < data.length; i += 4) {
  data[i] = factor * (data[i] - 128) + 128; // Red
  data[i + 1] = factor * (data[i + 1] - 128) + 128; // Green
  data[i + 2] = factor * (data[i + 2] - 128) + 128; // Blue
}

ctx.putImageData(imageData, 0, 0);
}

// Event listener for save image button click
saveImageBtn.addEventListener('click', function() {
  const dataURL = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.href = dataURL;
  link.download = 'edited_image.png';
  link.click();
});