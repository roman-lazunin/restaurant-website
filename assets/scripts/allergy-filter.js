const commonAllergens = [
    { id: 'gluten', name: 'Gluten' },
    { id: 'mjolk', name: 'Mjölk' },
    { id: 'notter', name: 'Nötter' },
    { id: 'fisk', name: 'Fisk' },
    { id: 'skaldjur', name: 'Skaldjur' },
    { id: 'agg', name: 'Ägg' },
    { id: 'soja', name: 'Soja' },
    { id: 'sesam', name: 'Sesam' }
];

function initAllergyFilter() {
    const filterBar = document.getElementById('allergy-filter-bar');
    if (!filterBar) return;

    commonAllergens.forEach(allergen => {
        const filterOption = document.createElement('div');
        filterOption.className = 'filter-option';
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `filter-${allergen.id}`;
        checkbox.dataset.allergen = allergen.name;
        
        const label = document.createElement('label');
        label.htmlFor = `filter-${allergen.id}`;
        label.textContent = `Utan ${allergen.name}`;
        
        filterOption.appendChild(checkbox);
        filterOption.appendChild(label);
        

        filterOption.addEventListener('click', (e) => {
            if (e.target !== label) {
                checkbox.checked = !checkbox.checked;
                toggleActiveClass(filterOption, checkbox.checked);
                applyFilters();
            }
        });
        
        label.addEventListener('click', (e) => {
            e.stopPropagation();
            checkbox.checked = !checkbox.checked;
            toggleActiveClass(filterOption, checkbox.checked);
            applyFilters();
        });
        
        filterBar.appendChild(filterOption);
    });

    const resetBtn = document.createElement('label');
    resetBtn.className = 'filter-reset btn';
    resetBtn.textContent = 'Återställ Filter';
    resetBtn.addEventListener('click', resetFilters);
    filterBar.appendChild(resetBtn);
}

function toggleActiveClass(element, isActive) {
    if (isActive) {
        element.classList.add('active');
    } else {
        element.classList.remove('active');
    }
}

function applyFilters() {
    const selectedAllergens = [];
    
    commonAllergens.forEach(allergen => {
        const checkbox = document.getElementById(`filter-${allergen.id}`);
        if (checkbox && checkbox.checked) {
            selectedAllergens.push(allergen.name);
        }
    });
    
    const menuItems = document.querySelectorAll('.menu-item');
    
    menuItems.forEach(item => {
        if (selectedAllergens.length === 0) {
            item.style.display = 'block';
            return;
        }
        
        const allergenText = item.querySelector('.menu-item-allergens').textContent;
        
        let shouldHide = false;
        
        for (const allergen of selectedAllergens) {
            if (allergenText.includes(allergen)) {
                shouldHide = true;
                break;
            }
        }
        
        item.style.display = shouldHide ? 'none' : 'block';
    });
    
    updateSectionCounts();
}

function resetFilters() {
    commonAllergens.forEach(allergen => {
        const checkbox = document.getElementById(`filter-${allergen.id}`);
        if (checkbox) {
            checkbox.checked = false;
            const filterOption = checkbox.parentElement;
            toggleActiveClass(filterOption, false);
        }
    });
    
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.style.display = 'block';
    });
    
    updateSectionCounts();
}

function updateSectionCounts() {
    const sections = ['starters-list', 'main-courses-list', 'desserts-list'];
    
    sections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (!section) return;
        
        const totalItems = section.querySelectorAll('.menu-item').length;
        const visibleItems = section.querySelectorAll('.menu-item[style="display: block"]').length;
        
        const countElement = document.getElementById(`${sectionId}-count`);
        if (countElement) {
            if (visibleItems < totalItems) {
                countElement.textContent = `Visar ${visibleItems} av ${totalItems} rätter`;
                countElement.style.display = 'block';
            } else {
                countElement.style.display = 'none';
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', initAllergyFilter);