fetch('assets/data/lunch-buffet.json')
    .then(response => response.json())
    .then(data => {
        const lunchBuffetList = document.getElementById('lunch-buffet-list');

        lunchBuffetList.classList.remove('menu-grid');
        
        lunchBuffetList.innerHTML = data.map(item => `
            <div class="lunch-buffet-container">
                <div class="lunch-buffet-header">
                    <h3 class="lunch-buffet-name">${item.name}</h3>
                    <div class="lunch-buffet-price">${item.price} kr</div>
                </div>
                <p class="lunch-buffet-description">${item.description}</p>
                <div class="collapsible-content hidden">
                    ${item.timeInfo ? `<p class="lunch-buffet-time">${item.timeInfo}</p>` : ''}
                    <div class="lunch-buffet-meta">
                        <div class="lunch-buffet-allergens">
                            ${item.allergens.join(', ')}
                        </div>
                    </div>
                </div>
                <button class="toggle-info-btn">Visa mer</button>
            </div>
        `).join('');

        document.querySelectorAll('.toggle-info-btn').forEach(button => {
            button.addEventListener('click', function() {
                const collapsibleContent = this.previousElementSibling;
                collapsibleContent.classList.toggle('hidden');
                this.textContent = collapsibleContent.classList.contains('hidden') ? 'Visa mer' : 'Visa mindre';
            });
        });
    })
    .catch(error => console.error('Fel vid laddning av lunchbuffé:', error));