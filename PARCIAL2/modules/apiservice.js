export class ApiService {
  constructor(baseURL) {
      this.baseURL = baseURL;
  }

  async getFoods() {
      try {
          const response = await fetch(`${this.baseURL}/foods`);
          if (!response.ok) throw new Error('Error fetching foods');
          return await response.json();
      } catch (error) {
          console.error('Error fetching foods:', error);
          return [];
      }
  }

  async createFood(food) {
      try {
          const response = await fetch(`${this.baseURL}/foods`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(food)
          });
          if (!response.ok) throw new Error('Error creating food');
          return await response.json();
      } catch (error) {
          console.error('Error creating food:', error);
          return null;
      }
  }

  async updateFood(foodId, food) {
      try {
          const response = await fetch(`${this.baseURL}/foods/${foodId}`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(food)
          });
          if (!response.ok) throw new Error('Error updating food');
          return await response.json();
      } catch (error) {
          console.error('Error updating food:', error);
          return null;
      }
  }
}