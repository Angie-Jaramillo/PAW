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

        document.getElementById('ingredients-list').value = food.ingredients ? food.ingredients.join('\n') : '';
	
        document.getElementById('image-url').value = food.image || '';
        
        document.getElementById('food-image').src = food.image || '';
    }

    displayMessage(message) {
        this.messageDiv.textContent = message;
    }
}