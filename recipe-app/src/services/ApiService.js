// src/services/ApiService.js

// Path context
const API_BASE_URL = process.env.REACT_APP_API_URL;

// Default Option
const fetchWithConfig = (url, options = {}) => {
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  };
  return fetch(url, { ...defaultOptions, ...options });
};

const ApiService = {
  /* DashBoard */
  fetchDashboardData: async () => {
    try {
      const response = await fetchWithConfig(`${API_BASE_URL}/dashboard`, {
        method: 'GET',
      });
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  },

  /* Users */
  // user list
  async fetchUsers() {
    try {
      const response = await fetchWithConfig(`${API_BASE_URL}/users`, {
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      });
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  },

  async fetchUser(userId) {
    try {
      const response = await fetchWithConfig(`${API_BASE_URL}/users/${userId}`);
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  },

  async createUser(userData) {
    try {
      console.log('createUser api is called')
      const response = await fetchWithConfig(`${API_BASE_URL}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: userData
      });
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  },

  async updateUser(userId, userData) {

    try {
      const response = await fetchWithConfig(`${API_BASE_URL}/users/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: userData
      });
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  },

  async deleteUser(userId) {
    try {
      const response = await fetchWithConfig(`${API_BASE_URL}/users/${userId}`, {
        method: 'DELETE'
      });
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  },

  /* Recipe */
  async fetchRecipes() {
    try {
      const response = await fetchWithConfig(`${API_BASE_URL}/recipes`);
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  },

  async fetchRecipe(recipeId) {
    try {
      const response = await fetchWithConfig(`${API_BASE_URL}/recipes/${recipeId}`);
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  },

  async createRecipe(recipeData) {
    try {
      const response = await fetchWithConfig(`${API_BASE_URL}/recipes`, {
        method: 'POST',
        body: recipeData
      });
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  },

  async updateRecipe(recipeId, recipeData) {

    try {
      const response = await fetchWithConfig(`${API_BASE_URL}/recipes/${recipeId}`, {
        method: 'PUT',
        body: recipeData
      });
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  },

  async deleteRecipe(recipeId) {
    try {
      const response = await fetchWithConfig(`${API_BASE_URL}/recipes/${recipeId}`, {
        method: 'DELETE'
      });
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  },

  /* Ingredients */
  async fetchIngredients() {
    try {
      const response = await fetchWithConfig(`${API_BASE_URL}/ingredients`);
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  },

  async fetchIngredient(ingredientId) {
    try {
      const response = await fetchWithConfig(`${API_BASE_URL}/ingredients/${ingredientId}`);
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  },

  async createIngredient(recipeData) {
    try {
      const response = await fetchWithConfig(`${API_BASE_URL}/ingredients`, {
        method: 'POST',
        body: recipeData
      });
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  },

  async updateIngredient(ingredientId, ingredientData) {

    try {
      const response = await fetchWithConfig(`${API_BASE_URL}/ingredients/${ingredientId}`, {
        method: 'PUT',
        body: ingredientData
      });
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  },

  async deleteIngredient(ingredientId) {
    try {
      const response = await fetchWithConfig(`${API_BASE_URL}/ingredients/${ingredientId}`, {
        method: 'DELETE'
      });
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  },

  /* Reviews */
  // reviews list
  async fetchReviews() {
    try {
      const response = await fetchWithConfig(`${API_BASE_URL}/reviews`);
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  },

  async fetchReview(reviewId) {
    try {
      const response = await fetchWithConfig(`${API_BASE_URL}/reviews/${reviewId}`);
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  },

  async createReview(reviewData) {
    try {
      const response = await fetchWithConfig(`${API_BASE_URL}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: reviewData
      });
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  },

  async updateReview(reviewId, reviewData) {

    try {
      const response = await fetchWithConfig(`${API_BASE_URL}/reviews/${reviewId}`, {
        method: 'PUT',
        body: reviewData
      });
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  },

  async deleteReview(reviewId) {
    try {
      const response = await fetchWithConfig(`${API_BASE_URL}/reviews/${reviewId}`, {
        method: 'DELETE'
      });
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  },

  /* Uploads */
  async uploadFile(formData) {
    try {
      const response = await fetch(`${API_BASE_URL}/upload`, {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  },

  /* Auth */
  // 登录用户
  async login(credentials) {
    try {
      const response = await fetchWithConfig(`${API_BASE_URL}/login`, {
        method: 'POST',
        body: JSON.stringify(credentials)
      });
      const data = await handleResponse(response);
      return data;
    } catch (error) {
      return handleError(error);
    }
  },
  async fetchCurrentUser() {
    try {
      const response = await fetchWithConfig(`${API_BASE_URL}/user`);
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  },

  // 注销用户
  async logout() {
    try {
      const response = await fetchWithConfig(`${API_BASE_URL}/logout`, {
        method: 'POST',
      });
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  }

  // other APIs

};

/* Handle Api response */
const handleResponse = async (response) => {
  if (response.ok) {
    const contentType = response.headers.get('Content-Type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    } else {
      // non JSON response
      const text = await response.text();
      throw new Error(`Non-JSON response: ${text}`);
    }
  } else {
    // handle HTTP error status
    const errorText = await response.text();
    throw new Error(`HTTP error ${response.status}: ${errorText}`);
  }
}

function handleError(error) {
  console.error('API call failed:', error);
  throw error;
}

export default ApiService;
