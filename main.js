

// ----------------------------
// Service Worker Registration
// ----------------------------
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js').then(() => {
      console.log('Service Worker Registered');
    });
    navigator.serviceWorker.addEventListener('message', event => {
      if (event.data.action === 'reload') {
        console.log('New version available. Reloading...');
        window.location.reload();
      }
    });
  }
  



document.addEventListener('DOMContentLoaded', function() {
    const upload = document.getElementById('upload');
    const presetSelect = document.getElementById('presetDimensions');
    const widthInputEl = document.getElementById('width');
    const heightInputEl = document.getElementById('height');
    const originalInfo = document.getElementById('originalInfo');
    const preview = document.getElementById('preview');
    const previewContainer = document.getElementById('previewContainer');
    const cropBox = document.getElementById('cropBox');
    const processBtn = document.getElementById('processBtn');
    const outputTypeSelect = document.getElementById('outputType');
    const MAX_DIMENSION = 2000;
  
    let fullImage = new Image();
    let imageLoaded = false;
    let sourceCanvas = document.createElement('canvas');
    let sourceCtx = sourceCanvas.getContext('2d');
  
    // Variables for crop box dragging
    let isDragging = false;
    let dragStartX = 0, dragStartY = 0;
    let cropStartLeft = 0, cropStartTop = 0;
  
    // When a preset dimension is chosen, update width/height inputs and reinitialize crop box.
    presetSelect.addEventListener('change', function() {
      const val = presetSelect.value;
      if (val) {
        const parts = val.split(',');
        if (parts.length === 2) {
          widthInputEl.value = parts[0];
          heightInputEl.value = parts[1];
          if (imageLoaded) initializeCropBox();
        }
      }
    });
  
    // Also update crop box when width or height inputs change.
    widthInputEl.addEventListener('change', function() {
      if (imageLoaded) initializeCropBox();
    });
    heightInputEl.addEventListener('change', function() {
      if (imageLoaded) initializeCropBox();
    });
  
    // Load and validate the selected image file.
    upload.addEventListener('change', function(e) {
      const file = e.target.files[0];
      if (!file) {
        alert("Please select a file.");
        return;
      }
      if (!file.type.startsWith('image/')) {
        alert("Please select a valid image file.");
        return;
      }
      const reader = new FileReader();
      reader.onload = function(evt) {
        fullImage = new Image();
        fullImage.onload = function() {
          imageLoaded = true;
          // Draw the full-resolution image onto an offscreen canvas.
          sourceCanvas.width = fullImage.width;
          sourceCanvas.height = fullImage.height;
          sourceCtx.drawImage(fullImage, 0, 0);
          // Display original dimensions and ratio.
          const ratio = (fullImage.width / fullImage.height).toFixed(2);
          originalInfo.textContent = `Original Dimensions: ${fullImage.width} x ${fullImage.height} (Ratio: ${ratio})`;
          // Set the preview image source.
          preview.src = evt.target.result;
          preview.onload = function() {
            initializeCropBox();
          };
        };
        fullImage.onerror = function() {
          alert("Error loading image. Please select a valid image file.");
        };
        fullImage.src = evt.target.result;
      };
      reader.onerror = function() {
        alert("Error reading file.");
      };
      reader.readAsDataURL(file);
    });
  
    // Initialize (or update) the crop box overlay.
    // When the target ratio differs from the original ratio,
    // the crop box will cover the full width or full height of the preview,
    // ensuring minimal content loss.
    function initializeCropBox() {
      // Read target dimensions from inputs and validate.
      let targetWidth = parseInt(widthInputEl.value.replace(/,/g, ''), 10);
      let targetHeight = parseInt(heightInputEl.value.replace(/,/g, ''), 10);
      if (!targetWidth || isNaN(targetWidth) || targetWidth <= 0) {
        targetWidth = fullImage.width;
      } else if (targetWidth > MAX_DIMENSION) {
        targetWidth = MAX_DIMENSION;
      }
      if (!targetHeight || isNaN(targetHeight) || targetHeight <= 0) {
        targetHeight = fullImage.height;
      } else if (targetHeight > MAX_DIMENSION) {
        targetHeight = MAX_DIMENSION;
      }
      // Calculate the desired and original ratios.
      const desiredRatio = targetWidth / targetHeight;
      const originalRatio = fullImage.width / fullImage.height;
      // If the ratios are nearly identical, no crop is needed.
      if (Math.abs(desiredRatio - originalRatio) < 0.01) {
        cropBox.style.display = 'none';
        return;
      }
      cropBox.style.display = 'block';
      // Get the displayed preview dimensions.
      const previewW = preview.offsetWidth;
      const previewH = preview.offsetHeight;
      let cropBoxWidth, cropBoxHeight;
      // Determine which dimension should fill the preview:
      // If desired ratio is less than original, the image is too wide.
      // Therefore, use full height and compute width.
      if (desiredRatio < originalRatio) {
        cropBoxHeight = previewH;
        cropBoxWidth = previewH * desiredRatio;
      } else {
        // Otherwise, use full width and compute height.
        cropBoxWidth = previewW;
        cropBoxHeight = previewW / desiredRatio;
      }
      // Center the crop box within the preview container.
      cropBox.style.width = cropBoxWidth + 'px';
      cropBox.style.height = cropBoxHeight + 'px';
      cropBox.style.position = 'absolute';
      cropBox.style.border = '2px dashed red';
      cropBox.style.cursor = 'move';
      cropBox.style.left = ((previewW - cropBoxWidth) / 2) + 'px';
      cropBox.style.top = ((previewH - cropBoxHeight) / 2) + 'px';
    }
  
    // Enable dragging of the crop box (mouse and touch events).
    cropBox.addEventListener('mousedown', startDrag);
    cropBox.addEventListener('touchstart', startDrag);
    document.addEventListener('mousemove', onDrag);
    document.addEventListener('touchmove', onDrag);
    document.addEventListener('mouseup', endDrag);
    document.addEventListener('touchend', endDrag);
  
    function startDrag(e) {
      e.preventDefault();
      isDragging = true;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      dragStartX = clientX;
      dragStartY = clientY;
      cropStartLeft = parseFloat(cropBox.style.left);
      cropStartTop = parseFloat(cropBox.style.top);
    }
  
    function onDrag(e) {
      if (!isDragging) return;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      const dx = clientX - dragStartX;
      const dy = clientY - dragStartY;
      let newLeft = cropStartLeft + dx;
      let newTop = cropStartTop + dy;
      // Constrain the crop box within the preview container.
      const maxLeft = preview.offsetWidth - cropBox.offsetWidth;
      const maxTop = preview.offsetHeight - cropBox.offsetHeight;
      newLeft = Math.max(0, Math.min(newLeft, maxLeft));
      newTop = Math.max(0, Math.min(newTop, maxTop));
      cropBox.style.left = newLeft + 'px';
      cropBox.style.top = newTop + 'px';
    }
  
    function endDrag() {
      isDragging = false;
    }
  
    // Process the image: if cropping is needed, use the crop overlay;
    // otherwise, simply resize the full image.
    processBtn.addEventListener('click', function() {
      if (!imageLoaded) {
        alert("No image loaded. Please select an image file first.");
        return;
      }
      // Get target dimensions.
      let targetWidth = parseInt(widthInputEl.value.replace(/,/g, ''), 10);
      let targetHeight = parseInt(heightInputEl.value.replace(/,/g, ''), 10);
      if (!targetWidth || isNaN(targetWidth) || targetWidth <= 0) {
        targetWidth = fullImage.width;
      } else if (targetWidth > MAX_DIMENSION) {
        targetWidth = MAX_DIMENSION;
      }
      if (!targetHeight || isNaN(targetHeight) || targetHeight <= 0) {
        targetHeight = fullImage.height;
      } else if (targetHeight > MAX_DIMENSION) {
        targetHeight = MAX_DIMENSION;
      }
      const desiredRatio = targetWidth / targetHeight;
      const originalRatio = fullImage.width / fullImage.height;
      let srcX, srcY, srcW, srcH;
      // If ratios are nearly equal, no cropping is needed.
      if (Math.abs(desiredRatio - originalRatio) < 0.01) {
        srcX = 0;
        srcY = 0;
        srcW = fullImage.width;
        srcH = fullImage.height;
      } else {
        // Use the crop overlay. Convert preview crop coordinates to full-image coordinates.
        const previewScale = fullImage.width / preview.offsetWidth;
        const cropLeft = parseFloat(cropBox.style.left);
        const cropTop = parseFloat(cropBox.style.top);
        const cropWidth = cropBox.offsetWidth;
        const cropHeight = cropBox.offsetHeight;
        srcX = cropLeft * previewScale;
        srcY = cropTop * previewScale;
        srcW = cropWidth * previewScale;
        srcH = cropHeight * previewScale;
      }
      
      // Create an output canvas with the target dimensions.
      const outputCanvas = document.createElement('canvas');
      outputCanvas.width = targetWidth;
      outputCanvas.height = targetHeight;
      const outputCtx = outputCanvas.getContext('2d');
      // Draw the source region (full or cropped) scaled to the target size.
      outputCtx.drawImage(sourceCanvas, srcX, srcY, srcW, srcH, 0, 0, targetWidth, targetHeight);
      
      const outputType = outputTypeSelect.value;
      if (outputType === 'pdf') {
        downloadPDF(outputCanvas, targetWidth, targetHeight);
      } else {
        downloadImage(outputCanvas, outputType);
      }
    });
  
    // Trigger download of the processed image.
    function downloadImage(canvasElem, fileType) {
      const dataURL = canvasElem.toDataURL(fileType);
      const link = document.createElement('a');
      link.href = dataURL;
      const ext = fileType.split('/')[1];
      link.download = `converted.${ext}`;
      link.click();
    }
  
    // Create and download a PDF using jsPDF.
    function downloadPDF(canvasElem, targetWidth, targetHeight) {
      if (typeof window.jspdf === 'undefined') {
        alert("jsPDF library is not loaded.");
        return;
      }
      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF({
        orientation: targetWidth > targetHeight ? 'landscape' : 'portrait',
        unit: 'px',
        format: [targetWidth, targetHeight]
      });
      const dataURL = canvasElem.toDataURL("image/png");
      pdf.addImage(dataURL, 'PNG', 0, 0, targetWidth, targetHeight);
      pdf.save('converted.pdf');
    }
  });
  