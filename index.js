// Fetch the elements data
fetch('elements-data.json')
  .then(response => response.json())
  .then(elements => {
    
    // Define which elements belong to which period
    const periods = [
      { id: 1, range: [1, 2] },      // Period 1: H, He
      { id: 2, range: [3, 10] },     // Period 2: Li → Ne
      { id: 3, range: [11, 18] },    // Period 3: Na → Ar
      { id: 4, range: [19, 36] },    // Period 4: K → Kr
      { id: 5, range: [37, 54] },    // Period 5: Rb → Xe
      { id: 6, range: [55, 86] },    // Period 6: Cs → Rn
      { id: 7, range: [87, 118] }    // Period 7: Fr → Og
    ];
    
    // Loop through each period
    periods.forEach(period => {
      const container = document.getElementById(`period-${period.id}`);
      
      // Filter elements for this period
      const periodElements = elements.filter(el => 
        el.atomicNumber >= period.range[0] && 
        el.atomicNumber <= period.range[1]
      );
      
      // Create a link for each element
      periodElements.forEach(element => {
        const link = document.createElement('a');
        link.href = `element-${element.atomicNumber}.html`;
        link.textContent = `${element.atomicNumber} - ${element.name} (${element.symbol})`;
        container.appendChild(link);
      });
    });
  });