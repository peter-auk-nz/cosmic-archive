// Create a link for each element
periodElements.forEach(element => {
  const link = document.createElement('a');
  link.href = `element-${element.atomicNumber}.html`;
  link.textContent = `${element.atomicNumber} - ${element.name} (${element.symbol})`;
  
  // ADD THIS NEW CODE HERE!!! 👇
  link.addEventListener('click', function(event) {
    event.preventDefault(); // Stop it from going to the page
    console.log('Clicked:', element.name);
  });
  // END NEW CODE 👆
  
  container.appendChild(link);
});