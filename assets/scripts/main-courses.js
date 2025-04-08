fetch('assets/data/main-courses.json')
    .then(response => response.json())
    .then(data => {
        const mainCoursesList = document.getElementById('main-courses-list');
        mainCoursesList.innerHTML = data.map(item => `
            <li>
                <h3>${item.name}</h3>
                <p>${item.description} ${item.tags.join(' ')}</p>
                <p>Price: ${item.price} SEK</p>
                <p>Allergens: ${item.allergens.join(', ')}</p>
            </li>
        `).join('');
    })
    .catch(error => console.error('Error loading main courses:', error));
