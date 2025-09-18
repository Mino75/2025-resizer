# 🖼️ Resizer

## 📋 Table of Contents
- [📖 About](#-about)
- [🚀 Getting Started](#-getting-started)
- [🔨 How to Build / How to Run](#-how-to-build--how-to-run)
- [🏗️ Project Structure](#️-project-structure)
- [🎯 Features](#-features)
- [📚 Dependencies](#-dependencies)
- [🐳 Docker Deployment](#-docker-deployment)
- [💡 Usage](#-usage)
- [⚡ Preset Dimensions](#-preset-dimensions)
- [📱 Progressive Web App](#-progressive-web-app)
- [📄 License](#-license)

## 📖 About
Resizer is an offline image resizing Progressive Web App that allows users to resize, crop, and convert images to various formats including PNG, JPG, WEBP, and PDF. Built with vanilla JavaScript and HTML5 Canvas API, it provides powerful image processing capabilities that work entirely in the browser without requiring server-side processing.

## 🚀 Getting Started

### Prerequisites
- Node.js (v20 or higher)
- npm package manager
- Modern web browser with Canvas API support
- FileReader API support for file handling

### 📦 Installation
```bash
git clone <repository-url>
cd resizer
npm install
```

## 🔨 How to Build / How to Run

### Development Mode
```bash
# Install dependencies
npm install

# Start the development server
node server.js
```
The application will be available at `http://localhost:3000`

### Production Mode
```bash
# Install dependencies
npm install

# Start the production server
node server.js
```

### Environment Variables
```bash
# Optional: Set custom port
export PORT=8080
node server.js
```

## 🏗️ Project Structure
```
resizer/
├── index.html              # Main application interface
├── main.js                 # Core image processing and UI logic
├── styles.js               # Dynamic CSS injection and styling
├── server.js               # Express server configuration
├── service-worker.js       # PWA offline functionality
├── manifest.json           # PWA manifest configuration
├── package.json            # Dependencies and project metadata
├── package-lock.json       # Dependency lock file
├── dockerfile              # Docker container configuration
├── jspdf.min.js           # PDF generation library
├── .gitignore             # Git ignore patterns
├── icon-192.png           # PWA icon (192x192)
├── icon-512.png           # PWA icon (512x512)
└── .github/workflows/     # CI/CD automation
    └── main.yml           # Docker build and push workflow
```

## 🎯 Features

### Image Processing
- **Smart Resizing**: Resize images while maintaining aspect ratio
- **Interactive Cropping**: Visual crop overlay with drag-and-drop functionality
- **Batch Processing**: Support for multiple image formats
- **Quality Preservation**: High-quality output with minimal compression artifacts

### Output Formats
- **PNG**: Lossless compression with transparency support
- **JPG/JPEG**: Optimized compression for web use
- **WEBP**: Modern web format with superior compression
- **PDF**: Convert images to PDF documents

### User Interface
- **Drag & Drop**: Intuitive file upload interface
- **Real-time Preview**: Live image preview with crop overlay
- **Responsive Design**: Mobile-friendly interface
- **Dark Theme**: Eye-friendly dark green and orange color scheme

### Advanced Features
- **Aspect Ratio Management**: Automatic aspect ratio calculation and display
- **Dimension Constraints**: Maximum 2000px limit for performance
- **Touch Support**: Full mobile and tablet compatibility
- **Offline Functionality**: Complete client-side processing

## 📚 Dependencies

### Runtime Dependencies
- **Express**: `^4.18.2` - Web server framework for static file serving

### Client-side Libraries
- **jsPDF**: Included locally - PDF generation and export
- **HTML5 Canvas API**: Native image processing and manipulation
- **FileReader API**: Client-side file handling and processing

### Development Tools
- **Service Worker**: Progressive Web App caching and offline support
- **Manifest.json**: PWA configuration and installability

## 🐳 Docker Deployment

### Build Docker Image
```bash
docker build -t resizer:latest .
```

### Run Container
```bash
# Run on default port 3000
docker run -p 3000:3000 resizer:latest

# Run on custom port
docker run -p 8080:3000 -e PORT=3000 resizer:latest
```

### Docker Configuration Details
- **Base Image**: Node.js 20 Alpine (lightweight)
- **Working Directory**: `/app`
- **Exposed Port**: 3000
- **Auto-install**: Dependencies installed during build
- **Production Ready**: Optimized for deployment

### Docker Hub Integration
Automated builds available through GitHub Actions workflow:
```bash
# Pull from Docker Hub (if published)
docker pull <dockerhub-username>/resizer:latest
```

## 💡 Usage

### Supported File Types
**Input Formats:**
- PNG (.png)
- JPEG (.jpg, .jpeg)  
- WEBP (.webp)
- GIF (.gif) - static frames only
- BMP (.bmp)
- SVG (.svg)

**Output Formats:**
- PNG (lossless, transparency)
- JPG (compressed, web-optimized)
- WEBP (modern, efficient)
- PDF (document format)

### Step-by-Step Process
1. **Upload Image**: Select file using the file input or drag & drop
2. **Set Dimensions**: Choose from presets or enter custom width/height
3. **Preview & Crop**: View real-time preview with interactive crop overlay
4. **Select Output**: Choose desired output format (PNG/JPG/WEBP/PDF)
5. **Process & Download**: Click "Process" to generate and download result

### Cropping Functionality
- **Visual Overlay**: Red dashed border indicates crop area
- **Drag to Position**: Click and drag crop box to desired location
- **Auto-sizing**: Crop box automatically calculates optimal dimensions
- **Aspect Ratio**: Maintains target aspect ratio during cropping
- **Constraint System**: Crop area constrained within image boundaries

## ⚡ Preset Dimensions

### Available Presets
- **48 x 48**: Icon/favicon size
- **192 x 192**: PWA icon standard
- **512 x 512**: Large icon/logo format
- **320 x 569**: Mobile portrait orientation
- **854 x 480**: Standard video thumbnail
- **1366 x 768**: Common desktop wallpaper
- **1920 x 1080**: Full HD resolution

### Custom Dimensions
- **Maximum Size**: 2000px per dimension
- **Minimum Size**: 1px per dimension
- **Aspect Ratio**: Automatically calculated and displayed
- **Smart Validation**: Input sanitization and range checking

## 📱 Progressive Web App

### PWA Features
- **Installable**: Add to home screen on mobile devices
- **Offline Support**: Full functionality without internet connection
- **Service Worker**: Advanced caching for performance and reliability
- **Responsive Design**: Optimized for all screen sizes

### Caching Strategy
- **Network First**: Attempts fresh content, falls back to cache
- **Asset Caching**: Critical resources cached for offline use
- **Smart Updates**: Automatic cache refresh with new versions
- **Fallback Handling**: Graceful degradation when offline

### Performance Optimizations
- **Lazy Loading**: Resources loaded as needed
- **Canvas Optimization**: Efficient memory management for large images
- **Touch Optimization**: Responsive touch controls for mobile
- **Battery Efficient**: Minimal CPU usage during processing

### Browser Compatibility
- **Modern Browsers**: Chrome, Firefox, Safari, Edge
- **Mobile Support**: iOS Safari, Chrome Mobile, Samsung Internet
- **API Requirements**: Canvas API, FileReader API, Service Worker support

## 📄 License
MIT License - see LICENSE file for details.

