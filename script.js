// script.js
const ICON_HAVE = `<svg class="icon have" viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path></svg>`;
const ICON_MISSING = `<svg class="icon missing" viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.93 14.93L12 12.41 7.07 17.34 5.66 15.93 10.59 11 5.66 6.07 7.07 4.66 12 9.59l4.93-4.93 1.41 1.41L13.41 11l4.93 4.93-1.41 1.41z"></path></svg>`;

const CUISINE_ICONS = {
    "Gujarati": "🍛","Punjabi": "🥘","Rajasthani": "🌶️","South Indian": "🍚",
    "Italian": "🍕","Mexican": "🌮","Maharashtrian": "🍲","Chinese": "🥡",
    "Global": "🌍","Thai": "🍜","American":"🍔","Middle Eastern":"🥙"
};

// Ingredients grouped (same as your earlier data but kept concise)
const MOCK_INGREDIENT_GROUPS = [
    { category: "Vegetables & Greens", items: [
        {id: 1, name: 'Tomato'}, {id: 2, name: 'Onion'}, {id: 6, name: 'Lettuce'},
        {id: 8, name: 'Garlic'}, {id: 9, name: 'Bell Pepper'}, {id: 12, name: 'Avocado'},
        {id: 15, name: 'Ginger'}, {id: 16, name: 'Green Chili'}, {id: 19, name: 'Fenugreek (Methi)'},
        {id: 30, name: 'Potato'}, {id: 32, name: 'Mixed Vegetables'}, {id: 33, name: 'Basil'},
        {id: 35, name: 'Parsley'}
    ]},
    { category: "Dairy, Cheese & Paneer", items: [
        {id: 3, name: 'Cheese'}, {id: 14, name: 'Yogurt'}, {id: 22, name: 'Paneer'},
        {id: 24, name: 'Butter'}, {id: 25, name: 'Cream'}, {id: 42, name: 'Milk'}
    ]},
    { category: "Proteins", items: [
        {id: 5, name: 'Chicken'}, {id: 10, name: 'Ground Beef'}, {id: 21, name: 'Chickpeas'},
        {id: 26, name: 'Lentils (Dal)'}, {id: 29, name: 'Urad Dal'}, {id: 40, name: 'Egg'}
    ]},
    { category: "Pantry & Grains", items: [
        {id: 4, name: 'Bread'}, {id: 7, name: 'Pasta'}, {id: 11, name: 'Tortilla'},
        {id: 13, name: 'Besan (Gram Flour)'}, {id: 18, name: 'Wheat Flour'}, {id: 28, name: 'Rice'},
        {id: 38, name: 'Flattened Rice (Poha)'}, {id: 39, name: 'Pizza Dough'}, {id: 41, name: 'Macaroni'},
        {id: 45, name: 'Pav (Indian Bread)'}
    ]},
    { category: "Spices & Condiments", items: [
        {id: 17, name: 'Mustard Seeds'}, {id: 20, name: 'Turmeric'}, {id: 23, name: 'Cashews'},
        {id: 27, name: 'Ghee'}, {id: 31, name: 'Tamarind'}, {id: 34, name: 'Olive Oil'},
        {id: 36, name: 'Chili Flakes'}, {id: 37, name: 'Soy Sauce'}, {id: 43, name: 'Green Curry Paste'},
        {id: 44, name: 'Coconut Milk'}
    ]}
];

// Larger recipe set (added more variety)
const ALL_MOCK_RECIPES = [
    { id: 101, name: "Khandvi", cuisine: "Gujarati", instructions: "Make a batter of gram flour and yogurt, cook it, spread it, roll it, and temper with mustard seeds.", ingredientIds: [13, 14, 17] },
    { id: 102, name: "Thepla", cuisine: "Gujarati", instructions: "Knead wheat flour with fenugreek leaves, yogurt, and spices. Roll thin and cook on a tawa.", ingredientIds: [18, 19, 14, 20] },
    { id: 201, name: "Paneer Butter Masala", cuisine: "Punjabi", instructions: "Make a rich tomato and cashew gravy. Add paneer cubes and finish with butter and cream.", ingredientIds: [22, 1, 2, 23, 24, 25] },
    { id: 202, name: "Chole", cuisine: "Punjabi", instructions: "Boil chickpeas. Make a spicy onion-tomato gravy and simmer the chickpeas in it.", ingredientIds: [21, 2, 1, 15, 8] },
    { id: 301, name: "Dal Baati", cuisine: "Rajasthani", instructions: "Prepare dal with lentils. Make hard wheat rolls (baati) and serve with ghee.", ingredientIds: [26, 18, 27] },
    { id: 302, name: "Gatte ki Sabzi", cuisine: "Rajasthani", instructions: "Make steamed gram flour dumplings (gatte) and cook them in a tangy yogurt-based curry.", ingredientIds: [13, 14, 1, 2] },
    { id: 401, name: "Masala Dosa", cuisine: "South Indian", instructions: "Make a fermented rice and dal batter. Spread thin on a pan, fill with a spiced potato mixture, and fold.", ingredientIds: [28, 29, 30, 2, 17] },
    { id: 402, name: "Sambar", cuisine: "South Indian", instructions: "Cook lentils with mixed vegetables and a special tamarind-based spice powder (sambar masala).", ingredientIds: [26, 32, 31, 1] },
    { id: 501, name: "Margherita Pizza", cuisine: "Italian", instructions: "Roll out pizza dough. Top with tomato sauce, cheese, and fresh basil. Bake until golden.", ingredientIds: [39, 1, 3, 33] },
    { id: 502, name: "Aglio e Olio", cuisine: "Italian", instructions: "Boil pasta. Sauté sliced garlic and chili flakes in olive oil. Toss with pasta and fresh parsley.", ingredientIds: [7, 8, 34, 35, 36] },
    { id: 503, name: "Chicken Quesadilla", cuisine: "Mexican", instructions: "Place chicken, cheese, and sliced bell peppers on a tortilla. Fold and cook in a pan until golden and cheese is melted.", ingredientIds: [11, 5, 3, 9] },
    { id: 601, name: "Veg Fried Rice", cuisine: "Chinese", instructions: "Stir-fry chopped vegetables and garlic. Add cooked rice and soy sauce, and mix well.", ingredientIds: [28, 32, 37, 2, 8] },
    { id: 602, name: "Chilli Paneer", cuisine: "Chinese", instructions: "Sauté paneer cubes. Stir-fry onion, bell pepper, and green chili. Add paneer, soy sauce, and a touch of tomato sauce.", ingredientIds: [22, 9, 2, 37, 8, 16, 1] },
    { id: 701, name: "Kanda Batata Poha", cuisine: "Maharashtrian", instructions: "Rinse flattened rice. Sauté mustard seeds, onions, and potatoes. Add poha and turmeric, and steam.", ingredientIds: [38, 2, 30, 17, 20] },
    { id: 702, name: "Pav Bhaji", cuisine: "Maharashtrian", instructions: "Mash boiled mixed vegetables. Cook with a spicy onion-tomato gravy and pav bhaji masala. Serve with buttered pav.", ingredientIds: [45, 32, 30, 1, 2, 24] },
    { id: 803, name: "Mac & Cheese", cuisine: "Global", instructions: "Boil macaroni. Make a cheese sauce with butter, milk, and cheese. Mix with macaroni.", ingredientIds: [41, 42, 3, 24] },
    { id: 801, name: "Cheese Omelette", cuisine: "Global", instructions: "Whisk eggs. Pour into a hot pan. Add chopped onion, tomato, and cheese. Fold and cook until set.", ingredientIds: [40, 2, 1, 3] },
    { id: 802, name: "Simple Salad", cuisine: "Global", instructions: "Chop lettuce, tomato, onion, and avocado. Toss together in a bowl. Add a light dressing if desired.", ingredientIds: [6, 1, 2, 12] },
    { id: 901, name: "Thai Green Curry", cuisine: "Thai", instructions: "Sauté green curry paste. Add coconut milk and bring to a simmer. Add chicken or mixed vegetables and cook until done.", ingredientIds: [43, 44, 5, 32] },
    // Additional new recipes
    { id: 1001, name: "Garlic Butter Pasta", cuisine: "Italian", instructions: "Cook pasta. Sauté garlic in butter, toss with pasta and parsley.", ingredientIds: [7, 8, 24, 35] },
    { id: 1002, name: "Egg Fried Rice", cuisine: "Chinese", instructions: "Stir-fry vegetables, add rice and scrambled eggs with soy sauce.", ingredientIds: [28, 32, 37, 40, 8] },
    { id: 1003, name: "Chickpea Salad", cuisine: "Middle Eastern", instructions: "Mix chickpeas with onion, tomato, parsley, olive oil, and lemon.", ingredientIds: [21, 2, 1, 35, 34] },
    { id: 1004, name: "Spicy Thai Noodles", cuisine: "Thai", instructions: "Stir fry noodles with green curry paste, veggies and a splash of coconut milk.", ingredientIds: [7, 43, 44, 32] }
];

// --- STATE & DOM REFERENCES ---
let currentResults = [];
let shoppingList = new Set(JSON.parse(localStorage.getItem('fridge_shopping_list') || '[]'));
let ingredientGroupsContainer, ingredientSearch, selectionCountSpan, clearSelectionBtn,
    submitBtn, cuisineFiltersContainer, resultsDiv, loader,
    shoppingListBtn, shoppingListCount, shoppingListModal, modalCloseBtn,
    shoppingListItems, copyListBtn, clearListBtn;

// --- UTILS ---
function findIngredientNameById(id) {
    for (const grp of MOCK_INGREDIENT_GROUPS) {
        const found = grp.items.find(i => i.id === id);
        if (found) return found.name;
    }
    return `Unknown(${id})`;
}

function saveShoppingList() {
    localStorage.setItem('fridge_shopping_list', JSON.stringify(Array.from(shoppingList)));
}

// --- RENDER / UI BUILD ---
function loadIngredients() {
    MOCK_INGREDIENT_GROUPS.forEach(group => {
        const details = document.createElement('details');
        details.className = 'ingredient-group';
        details.open = true;

        const summary = document.createElement('summary');
        summary.textContent = group.category;

        const list = document.createElement('div');
        list.className = 'ingredient-list';

        group.items.sort((a,b) => a.name.localeCompare(b.name)).forEach(ingredient => {
            const label = document.createElement('label');
            label.className = 'ingredient-item';
            label.innerHTML = `
                <input type="checkbox" name="ingredients" value="${ingredient.id}" id="ing-${ingredient.id}">
                <span class="ingredient-name">${ingredient.name}</span>
            `;
            list.appendChild(label);
        });

        details.appendChild(summary);
        details.appendChild(list);
        ingredientGroupsContainer.appendChild(details);
    });
}

function updateSelectionCount() {
    const count = ingredientGroupsContainer.querySelectorAll('input[type="checkbox"]:checked').length;
    selectionCountSpan.textContent = `${count} selected`;
}

// Smart matching: returns scored recipe objects
function matchRecipes(selectedIdsSet) {
    const allIngredients = MOCK_INGREDIENT_GROUPS.flatMap(g => g.items);
    const matched = ALL_MOCK_RECIPES.map(recipe => {
        const recipeIds = new Set(recipe.ingredientIds);
        const haveIds = new Set([...selectedIdsSet].filter(id => recipeIds.has(id)));
        const missingIds = [...recipeIds].filter(id => !selectedIdsSet.has(id));
        const matchingCount = haveIds.size;
        const total = recipeIds.size;
        const matchPercent = total === 0 ? 0 : (matchingCount / total);

        const missingNames = missingIds.map(id => {
            const found = allIngredients.find(i => i.id === id);
            return found ? found.name : `Unknown(${id})`;
        });

        return {
            ...recipe,
            matchingIngredients: matchingCount,
            totalIngredients: total,
            missingIngredients: missingIds.length,
            missingIngredientIds: missingIds,
            missingIngredientNames: missingNames,
            matchPercent
        };
    }).filter(r => r.matchingIngredients > 0); // only keep recipes where user has at least 1 ingredient

    // Sort by match% desc, then by fewer missing ingredients, then by name
    matched.sort((a,b) => {
        if (b.matchPercent !== a.matchPercent) return b.matchPercent - a.matchPercent;
        if (a.missingIngredients !== b.missingIngredients) return a.missingIngredients - b.missingIngredients;
        return a.name.localeCompare(b.name);
    });

    return matched;
}

function displayRecipes(recipes) {
    resultsDiv.innerHTML = '';
    if (!recipes || recipes.length === 0) {
        resultsDiv.innerHTML = `<div class="empty-state"><p>No matching recipes found for your selection.</p></div>`;
        return;
    }

    recipes.forEach(recipe => {
        const card = document.createElement('div');
        card.className = 'recipe-card';
        const percentLabel = Math.round(recipe.matchPercent * 100);
        const missingHtml = recipe.missingIngredientNames.map(n => `<li>${ICON_MISSING}<span>${n}</span></li>`).join('');
        const haveHtml = recipe.matchingIngredients > 0 ? `<li>${ICON_HAVE}<span>You have ${recipe.matchingIngredients}/${recipe.totalIngredients} (${percentLabel}%)</span></li>` : '';

        const isAdded = recipe.missingIngredientNames.every(name => shoppingList.has(name));
        const addToListBtnHtml = recipe.missingIngredients > 0
            ? `<button class="add-to-list-btn" data-recipe-id="${recipe.id}" ${isAdded ? 'disabled' : ''}>${isAdded ? 'Added!' : 'Add missing to list'}</button>`
            : `<div style="margin-top:0.5rem; font-weight:600; color:var(--success-color)">You have all ingredients ✅</div>`;

        // cuisine tag with icon if available
        const cuisineIcon = CUISINE_ICONS[recipe.cuisine] || '🍲';

        card.innerHTML = `
            <h3>
                <span>${recipe.name}</span>
                <span class="cuisine-tag">${cuisineIcon} ${recipe.cuisine}</span>
            </h3>
            <p>${recipe.instructions}</p>
            <ul class="status-list">
                ${haveHtml}
                ${missingHtml}
            </ul>
            ${addToListBtnHtml}
        `;
        resultsDiv.appendChild(card);
    });
}

// Build cuisine filters based on currentResults
function updateCuisineFilters(recipes) {
    cuisineFiltersContainer.innerHTML = '';
    if (!recipes || recipes.length === 0) {
        cuisineFiltersContainer.style.display = 'none';
        return;
    }

    const cuisines = ['All', ...new Set(recipes.map(r => r.cuisine).sort())];
    cuisines.forEach(cuisine => {
        const btn = document.createElement('button');
        btn.className = 'filter-btn';
        btn.innerHTML = `<span class="icon">${CUISINE_ICONS[cuisine] || '🍲'}</span> ${cuisine}`;
        if (cuisine === 'All') btn.classList.add('active');
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filterAndDisplayResults(cuisine);
        });
        cuisineFiltersContainer.appendChild(btn);
    });
    cuisineFiltersContainer.style.display = 'flex';
}

// Filter currentResults by cuisine
function filterAndDisplayResults(cuisine) {
    const filtered = cuisine === 'All' ? currentResults : currentResults.filter(r => r.cuisine === cuisine);
    displayRecipes(filtered);
}

// --- SHOPPING LIST UI & Behavior ---
function updateShoppingListUI() {
    shoppingListItems.innerHTML = '';
    if (shoppingList.size === 0) {
        shoppingListItems.innerHTML = '<li>Your list is empty.</li>';
        shoppingListBtn.style.display = 'none';
        shoppingListCount.textContent = '0';
        saveShoppingList();
        return;
    }

    shoppingListBtn.style.display = 'block';
    shoppingListCount.textContent = shoppingList.size;

    shoppingList.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        // add quick remove button
        const removeBtn = document.createElement('button');
        removeBtn.style.marginLeft = '10px';
        removeBtn.style.border = 'none';
        removeBtn.style.background = 'transparent';
        removeBtn.style.cursor = 'pointer';
        removeBtn.style.color = 'var(--error-color)';
        removeBtn.textContent = '✕';
        removeBtn.title = 'Remove';
        removeBtn.addEventListener('click', () => {
            shoppingList.delete(item);
            updateShoppingListUI();
            // re-enable add buttons for recipes that were disabled
            document.querySelectorAll('.add-to-list-btn').forEach(btn => {
                if (btn.dataset.recipeId) btn.disabled = false;
                btn.textContent = 'Add missing to list';
            });
        });

        li.appendChild(removeBtn);
        shoppingListItems.appendChild(li);
    });

    // persist as names (so removing works by name)
    saveShoppingList();
}

// Add missing ingredient names to shopping list (by recipe)
function addMissingIngredientsForRecipe(recipeId) {
    const recipe = currentResults.find(r => r.id === recipeId);
    if (!recipe) return;
    recipe.missingIngredientNames.forEach(name => shoppingList.add(name));
    updateShoppingListUI();
    // disable the clicked button and change text
    const btn = document.querySelector(`.add-to-list-btn[data-recipe-id="${recipeId}"]`);
    if (btn) {
        btn.textContent = 'Added!';
        btn.disabled = true;
    }
}

// Copy shopping list to clipboard
function copyShoppingListToClipboard() {
    const arr = Array.from(shoppingList);
    const textToCopy = arr.join('\n');
    if (!textToCopy) return;
    navigator.clipboard?.writeText(textToCopy).then(() => {
        copyListBtn.textContent = 'Copied!';
        setTimeout(() => copyListBtn.textContent = 'Copy List', 1800);
    }).catch(() => {
        // fallback
        const ta = document.createElement('textarea');
        ta.value = textToCopy;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        ta.remove();
        copyListBtn.textContent = 'Copied!';
        setTimeout(() => copyListBtn.textContent = 'Copy List', 1800);
    });
}

// Clear shopping list
function clearShoppingList() {
    shoppingList.clear();
    updateShoppingListUI();
    // re-enable 'Add missing' buttons
    document.querySelectorAll('.add-to-list-btn').forEach(btn => {
        btn.disabled = false;
        btn.textContent = 'Add missing to list';
    });
}

// --- BOOTSTRAP / EVENT BINDING ---
document.addEventListener('DOMContentLoaded', () => {
    // assign DOM
    ingredientSearch = document.getElementById('ingredientSearch');
    ingredientGroupsContainer = document.getElementById('ingredientGroups');
    clearSelectionBtn = document.getElementById('clearSelectionBtn');
    selectionCountSpan = document.getElementById('selectionCount');
    submitBtn = document.getElementById('submitBtn');
    cuisineFiltersContainer = document.getElementById('cuisine-filters');
    resultsDiv = document.getElementById('results');
    loader = document.getElementById('loader');
    shoppingListBtn = document.getElementById('shopping-list-btn');
    shoppingListCount = document.getElementById('shopping-list-count');
    shoppingListModal = document.getElementById('shopping-list-modal');
    modalCloseBtn = document.getElementById('modal-close-btn');
    shoppingListItems = document.getElementById('shopping-list-items');
    copyListBtn = document.getElementById('copy-list-btn');
    clearListBtn = document.getElementById('clear-list-btn');

    // load UI
    loadIngredients();
    updateSelectionCount();
    updateShoppingListUI();

    // ingredient selection -> update count
    ingredientGroupsContainer.addEventListener('change', updateSelectionCount);

    // ingredient search
    ingredientSearch.addEventListener('input', () => {
        const filter = ingredientSearch.value.toLowerCase();
        document.querySelectorAll('.ingredient-item').forEach(item => {
            const name = item.querySelector('.ingredient-name').textContent.toLowerCase();
            item.classList.toggle('hidden', !name.includes(filter));
        });
    });

    // clear selection
    clearSelectionBtn.addEventListener('click', () => {
        ingredientGroupsContainer.querySelectorAll('input[type="checkbox"]:checked').forEach(cb => cb.checked = false);
        updateSelectionCount();
    });

    // submit / find recipes
    document.getElementById('ingredientForm').addEventListener('submit', (e) => {
        e.preventDefault();
        // gather selected ids
        const selectedIds = new Set(Array.from(document.querySelectorAll('input[name="ingredients"]:checked')).map(cb => parseInt(cb.value)));
        resultsDiv.innerHTML = '';
        cuisineFiltersContainer.style.display = 'none';
        loader.style.display = 'block';

        // simulate small delay for UX
        setTimeout(() => {
            loader.style.display = 'none';
            if (selectedIds.size === 0) {
                currentResults = [];
                updateCuisineFilters([]);
                displayRecipes([]);
                return;
            }

            // MATCH with smarter logic:
            currentResults = matchRecipes(selectedIds);

            // show cuisine filters & results
            updateCuisineFilters(currentResults);
            displayRecipes(currentResults);
            // After render, wire up add-to-list buttons
            // (we wire after render to keep code simple)
        }, 350);
    });

    // results div click (delegation for add-to-list)
    resultsDiv.addEventListener('click', (event) => {
        const btn = event.target.closest('.add-to-list-btn');
        if (btn) {
            const recipeId = parseInt(btn.dataset.recipeId);
            addMissingIngredientsForRecipe(recipeId);
        }
    });

    // shopping list modal open/close
    shoppingListBtn.addEventListener('click', () => shoppingListModal.classList.add('visible'));
    modalCloseBtn.addEventListener('click', () => shoppingListModal.classList.remove('visible'));
    shoppingListModal.addEventListener('click', (e) => {
        if (e.target === shoppingListModal) shoppingListModal.classList.remove('visible');
    });

    // modal actions
    copyListBtn.addEventListener('click', copyShoppingListToClipboard);
    clearListBtn.addEventListener('click', () => {
        if (!confirm('Clear your entire shopping list?')) return;
        clearShoppingList();
    });

    // Keyboard accessibility: Enter on search triggers nothing harmful; Escape closes modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && shoppingListModal.classList.contains('visible')) {
            shoppingListModal.classList.remove('visible');
        }
    });
});

// Ensure shoppingList is displayed properly if loaded from localStorage as array of names
// Convert array to Set (if stored that way)
(function normalizeStoredShoppingList() {
    const raw = localStorage.getItem('fridge_shopping_list');
    if (!raw) return;
    try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
            // older format might be ids or names; here we assume names -> store as names
            shoppingList = new Set(parsed);
        }
    } catch (e) {
        // ignore
    }
})();

// When the page unmounts, persist shopping list (extra safety)
window.addEventListener('beforeunload', () => saveShoppingList());
