// Wait for the page to fully load
document.addEventListener('DOMContentLoaded', function() {
  
  // Get the current page filename (e.g., "element-1.html")
  const filename = window.location.pathname.split('/').pop();
  
  // Extract the element number from the filename (e.g., "1" from "element-1.html")
  const elementNumber = parseInt(filename.match(/\d+/)[0]);
  
  // Fetch the JSON file
  fetch('elements-data.json')
    .then(response => response.json())
    .then(elements => {
      
      // Find the element with matching atomic number
      const element = elements.find(el => el.atomicNumber === elementNumber);
      
      // If we found the element, display its data
      if (element) {
        document.getElementById('name').textContent = element.name;
        document.getElementById('symbol').textContent = element.symbol;
        document.getElementById('atomicNumber').textContent = element.atomicNumber;
        document.getElementById('atomicWeight').textContent = element.atomicWeight;
        document.getElementById('meltingPoint').textContent = element.meltingPoint + '°C';
        document.getElementById('boilingPoint').textContent = element.boilingPoint + '°C';
        document.getElementById('discoveryDate').textContent = element.discoveryDate;
        document.getElementById('discoverer').textContent = element.discoverer;
        document.getElementById('stateAtroomTemperature').textContent = element.stateAtroomTemperature;
        document.getElementById('description').textContent = element.description;
        document.getElementById('electronConfig').textContent = element.electronConfig;
      }
    });
});