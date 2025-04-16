fetch('assets/data/main-courses.json')
    .then(response => response.json())
    .then(data => {
        const mainCoursesList = document.getElementById('main-courses-list');
        mainCoursesList.innerHTML = data.map(item => `
            <div class="menu-item">
                ${item.chefRecommendation ? '<div class="chef-recommendation">Favorit</div>' : ''}
                ${item.image ? `<img src="${item.image}" alt="${item.name}" class="menu-item-image">` : ''}
                <div class="menu-item-content">
                    <div class="menu-item-header">
                        <h3 class="menu-item-name">${item.name}</h3>
                        <div class="menu-item-price">${item.price} kr</div>
                    </div>
                    <p class="menu-item-description">${item.description}</p>
                    <div class="menu-item-meta">
                        <div class="menu-item-allergens">
                            Allergier: ${item.allergens.join(', ')}
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    })
    .catch(error => console.error('Fel vid laddning av varmrätter:', error));
