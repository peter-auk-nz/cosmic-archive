// Get all filter buttons
const filterBtns = document.querySelectorAll('.filter-btn');
const periods = document.querySelectorAll('.period');

// Add click event to each button
filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        
        // Add active class to clicked button
        this.classList.add('active');
        
        // Get the period to show
        const periodToShow = this.getAttribute('data-period');
        
        // Show/hide periods
        if (periodToShow === 'all') {
            // Show all periods
            periods.forEach(period => {
                period.classList.remove('hidden');
            });
        } else {
            // Hide all first
            periods.forEach(period => {
                period.classList.add('hidden');
            });
            
            // Show only the section containing the selected period
            const selectedDiv = document.getElementById('period-' + periodToShow);
            if (selectedDiv) {
                // Find the parent section and show it
                const parentSection = selectedDiv.closest('.period');
                if (parentSection) {
                    parentSection.classList.remove('hidden');
                }
            }
        }
    });
});