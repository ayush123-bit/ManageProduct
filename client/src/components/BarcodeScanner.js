import React, { useEffect } from 'react';
import Quagga from 'quagga'; // Make sure to install Quagga.js: npm install quagga

const BarcodeScanner = ({ onDetected }) => {
  const startScanner = () => {
    const scannerContainer = document.getElementById('barcode-scanner');

    // Ensure the container exists
    if (!scannerContainer) {
      console.error('Scanner container not found.');
      return;
    }

    // Initialize Quagga
    Quagga.init({
      inputStream: {
        name: 'Live',
        type: 'LiveStream',
        target: scannerContainer, // Ensure the target element exists in the DOM
        constraints: {
          width: 640,
          height: 480,
          facingMode: 'environment' // Use the back camera
        }
      },
      decoder: {
        readers: ['ean_reader'] // Specify the barcode formats you want to read
      }
    }, (err) => {
      if (err) {
        console.error('Failed to initialize Quagga:', err);
        return;
      }
      console.log('Quagga initialized successfully.');
      Quagga.start(); // Start the barcode scanner
    });

    // When a barcode is detected
    Quagga.onDetected((result) => {
      if (result && result.codeResult) {
        const code = result.codeResult.code;
        console.log('Barcode detected:', code);
        onDetected(code); // Pass the detected code to the parent
        Quagga.stop(); // Stop the scanner after detection
      }
    });
  };

  useEffect(() => {
    startScanner();

    return () => {
      Quagga.stop(); // Stop Quagga when the component is unmounted
    };
  }, []);

  return (
    <div>
      <div id="barcode-scanner" style={{ width: '640px', height: '480px', border: '2px solid black' }}></div>
    </div>
  );
};

export default BarcodeScanner;
