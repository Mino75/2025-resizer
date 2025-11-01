(function() {
    
    // Define preset background colors and pick one randomly
    const backgroundOptions = ['#FF8F00', '#D32F2F', '#388E3C', '#1976D2', '#7B1FA2'];
    const selectedBackground = backgroundOptions[Math.floor(Math.random() * backgroundOptions.length)];

    
    const css = `
      body {
        background-color: ${selectedBackground}; /* dark green background */
        color: #fff;
        font-family: Arial, sans-serif;
        margin: 20px;
        padding: 0 10px;
        text-align: center;
      }
      h2, label {
        color: #FF7F00; /* strong orange for titles and labels */
      }
      input, select {
        padding: 8px;
        margin: 5px;
        font-size: 1em;
        background-color: #333;
        color: #fff;
        border: 1px solid #555;
      }
      button {
        cursor: pointer;
        background-color: #FF7F00; /* strong orange buttons */
        color: white;
        border: none;
        border-radius: 4px;
        padding: 8px 16px;
      }
      button:hover {
        background-color: #E67300; /* slightly darker on hover */
      }
      .dimensions {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 10px;
      }
      #previewContainer {
        position: relative;
        display: inline-block;
        margin-top: 10px;
        max-width: 100%;
      }
      #preview {
        max-width: 100%;
        display: block;
      }
      #cropBox {
        /* Initial styles are set dynamically in main.js */
      }
      /* Mobile specific styling */
      @media (max-width: 600px) {
        input, select, button {
          width: 100%;
          box-sizing: border-box;
        }
        .dimensions {
          flex-direction: column;
          align-items: center;
        }
      }
    `;
    const style = document.createElement('style');
    style.type = 'text/css';
    style.appendChild(document.createTextNode(css));
    document.head.appendChild(style);
  })();
  
