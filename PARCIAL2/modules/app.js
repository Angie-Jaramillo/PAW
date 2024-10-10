export class DomService {
    constructor() {
        this.foodSelect = document.getElementById('sel-food');
        this.messageDiv = document.getElementById('message');
    }

    renderFoodOptions(foods) {
        this.foodSelect.innerHTML = ''; 
        foods.forEach(food => {
            const option = document.createElement('option');
            option.value = food.id;
            option.textContent = food.name; 
            this.foodSelect.appendChild(option);
        });
    }

    fillFormWithFood(food) {

        document.getElementById('name').value = food.name || '';
        document.getElementById('description').value = food.description || '';

        const ingredientsList = document.getElementById('ingredients-list');
        ingredientsList.innerHTML = '';

        if (food.ingredients && food.ingredients.length > 0) {
            food.ingredients.forEach(ingredient => {
                const li = document.createElement('li');
                li.textContent = ingredient;
                ingredientsList.appendChild(li);
            });
        }
	
	document.getElementById('image-url').value = food.image || '';
        document.getElementById('food-image').src = food.image || '';
    }

    displayMessage(message) {
        this.messageDiv.textContent = message;
    }
}