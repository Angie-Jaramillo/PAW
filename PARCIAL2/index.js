import { ApiService } from './modules/apiservice.js';
import { DomService } from './modules/app.js';

const apiService = new ApiService('http://ec2-3-138-183-128.us-east-2.compute.amazonaws.com:4010');
const domService = new DomService();

document.addEventListener('DOMContentLoaded', async () => {
    const foods = await apiService.getFoods();
    domService.renderFoodOptions(foods);


    document.getElementById('sel-food').addEventListener('change', (event) => {
        const foodId = event.target.value;
        if (foodId) {
            const selectedFood = foods.find(food => food.id === parseInt(foodId, 10));
            if (selectedFood) {
                domService.fillFormWithFood(selectedFood); 
            } else {
                console.error('No food found with this ID');
            }
        }
    });


    const form = document.getElementById('element-form');
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        let foodId = document.getElementById('sel-food').value;

        const food = {
            name: document.getElementById('name').value,
            description: document.getElementById('description').value,
            ingredients: document.getElementById('ingredients-list').value.split(',').map(ingredient => ingredient.trim()),
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
                alert('Elemento creado correctamente');
            }
        }

        if (result) {
            const updatedFoods = await apiService.getFoods();
            domService.renderFoodOptions(updatedFoods);

            form.reset();
            document.getElementById('sel-food').value = ''; 
            foodId = '';
        } else {
            domService.displayMessage('Error en la operación');
        }
    });
});