import { ApiService } from './modules/apiservice.js';
import { DomService } from './modules/app.js';

const apiService = new ApiService('http://ec2-3-138-183-128.us-east-2.compute.amazonaws.com:4010');
const domService = new DomService();

document.addEventListener('DOMContentLoaded', async () => {
    
    const foods = await apiService.getFoods();
    domService.renderFoodOptions(foods);

    const form = document.getElementById('element-form');
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const foodId = document.getElementById('sel-food').value;

        const food = {
            name: document.getElementById('name').value,
            description: document.getElementById('description').value,
            ingredients: Array.from(document.getElementById('ingredients-list').children).map(item => item.textContent),
        };

        let result;
        if (foodId) {
            result = await apiService.updateFood(foodId, food);
            if (result) {
                alert('Elemento actualizado correctamente');
            }
        } else {
            result = await apiService.createFood(food);
            if (result) {
                alert('Elemento creado correctamente'); // Mostrar alerta de creación
            }
        }

        if (result) {
            domService.displayMessage('Operación exitosa');
            const updatedFoods = await apiService.getFoods();
            domService.renderFoodOptions(updatedFoods);
        } else {
            domService.displayMessage('Error en la operación');
        }
    });

    document.getElementById('sel-food').addEventListener('change', (event) => {
        const foodId = event.target.value;
        if (foodId) {
            const selectedFood = foods.find(food => food.id == foodId);
            if (selectedFood) {
                domService.fillFormWithFood(selectedFood);
            }
        }
    });
});