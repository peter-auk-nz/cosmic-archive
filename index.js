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

        // Stop it from going to the page      
 link.addEventListener('click', function(event) {
    event.preventDefault(); // Stop it from going to the page

 
  // Get popup elements
  const popup = document.getElementById('element-popup');
  const popupName = document.getElementById('popup-element-name');
  const popupInfo = document.getElementById('popup-element-info');
  const viewPageButton = document.getElementById('popup-view-page');


  // Fill in element info
  popupName.textContent = `${element.name} (${element.symbol})`; 
  popupInfo.innerHTML = `Atomic Number: ${element.atomicNumber}<br>
  Atomic Weight: ${element.atomicWeight}<br>
  Discovered: ${element.discoveryDate}`;
  
 // Set the "View Full Page" button link
  viewPageButton.href = `element-${element.atomicNumber}.html`;

  // Show popup
  popup.classList.remove('popup-hidden');
  document.getElementById('popup-overlay').classList.remove('popup-hidden');

  // ARIA: Move focus to close button when popup opens
  const closeButton = popup.querySelector('.close-button');
  if (closeButton) {
    closeButton.focus();
  }


// ARIA: Store which element opened the popup
  popup.dataset.triggeredBy = event.target.id || 'unknown';
 })
   
container.appendChild(link);
      });
    });
  });

    

// ===================================
// ELEMENT SEARCH FUNCTIONALITY
// ===================================
    const searchButton = document.getElementById('search-button');
    const searchInput = document.getElementById('element-search');
    const announcer = document.getElementById('search-results-announce');

    // Add click event to search button
    searchButton.addEventListener('click', function() {
        const searchTerm = searchInput.value.trim().toLowerCase();
        
        // Don't search if input is empty
        if (searchTerm === '') {
            announcer.textContent = 'Please enter an element name or symbol to search.';
            return;
        }

    // Get all element links
        const elementLinks = document.querySelectorAll('.element-list a');
            // Search through all links
        let found = false;

        elementLinks.forEach(link => {
            const linkText = link.textContent.toLowerCase();

            // Check if search term matches name or symbol
            if (linkText.includes(searchTerm)) {
                // Found it! Scroll to it
                link.scrollIntoView({ behavior: 'smooth', block: 'center' });
                found = true;
        // Highlight it
        link.style.backgroundColor = 'yellow';
        link.style.padding = '0.5rem';
        link.style.borderRadius = '5px'; }
        
        // Anounce the result
        const elementName = link.textContent;
        announcer.textContent = `Found ${elementName}. Element  Highlighted. `;

        // Remove highlight after 3 seconds
        setTimeout(() => {
            link.style.backgroundColor = '';
            link.style.padding = '';
            link.style.borderRadius = '';
        }, 3000);

        found = true;
        return; // Stop after first match
        
     });

        // if not found, show message
        if (!found) {
            announcer.textContent = `No element found matching "${searchTerm}". Please try another search.`;
        }

        // Clear the search input
        searchInput.value = '';

        // Also allow pressing Enter to search
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchButton.click();
            }
        });
    });

// Close popup handlers 
document.addEventListener('DOMContentLoaded', function() {  
  const popup = document.getElementById('element-popup');
  const closeButton = document.querySelector('.close-button');
  const overlay = document.getElementById('popup-overlay');

// 1. Close button click
  if (closeButton) {
    closeButton.addEventListener('click', function() {
      popup.classList.add('popup-hidden');
      overlay.classList.add('popup-hidden');
    
//ARIA Return focus to element that opened popup
  const triggerId = popup.dataset.triggeredBy;
  if (triggerId && triggerId !== 'unknown') {
    const triggerElement = document.getElementById(triggerId);
    if (triggerElement) triggerElement.focus();
    }
  });
}
  
// 2. Click outside popup (on overlay)
   overlay.addEventListener('click', function() {
    popup.classList.add('popup-hidden');
    overlay.classList.add('popup-hidden');

    // ARIA: Return focus
  const triggerId = popup.dataset.triggeredBy;
  if (triggerId && triggerId !== 'unknown') {
    const triggerElement = document.getElementById(triggerId);
      if (triggerElement) { triggerElement.focus();
      }

      // 2B. ARIA: Also close when clicking on popup background
    popup.addEventListener('click', function(event) {
    if (event.target === popup) { // Only if clicking on the popup background, not content
      popup.classList.add('popup-hidden');
      overlay.classList.add('popup-hidden');  
    }
    });

      // ARIA: Return focus
const triggerId = popup.dataset.triggeredBy;
  if (triggerId && triggerId !== 'unknown') {
    const triggerElement = document.getElementById(triggerId);
      if (triggerElement) triggerElement.focus();
      }
    }
  });
});

// 3. ESC key
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape' || event.key === 'Esc') {
    const popup = document.getElementById('element-popup');
    if (!popup.classList.contains('popup-hidden')) {
      popup.classList.add('popup-hidden');
      document.getElementById('popup-overlay').classList.add('popup-hidden');

       // ARIA: Return focus
      const triggerId = popup.dataset.triggeredBy;
      if (triggerId && triggerId !== 'unknown') {
        const triggerElement = document.getElementById(triggerId);
        if (triggerElement) triggerElement.focus();
        } 
      }
    }
  });
