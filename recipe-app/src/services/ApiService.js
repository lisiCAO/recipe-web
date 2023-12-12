// src/services/ApiService.js

const API_BASE_URL = process.env.REACT_APP_API_URL;

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
  
  fetchDashboardData: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/dashboard`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // 添加任何必要的头部信息，例如认证令牌
        }
      });
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  },


  /* Users */
  // 获取用户列表
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

  // 获取特定用户的详情
  async fetchUser(userId) {
    try {
      const response = await fetchWithConfig(`${API_BASE_URL}/users/${userId}`);
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  },

  // 创建新用户
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

  // 更新用户信息
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

  // 删除用户
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
  
  // 获取食谱列表
  async fetchRecipes() {
    try {
      const response = await fetch(`${API_BASE_URL}/recipes`);
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  },

  /* Recipes */
  // 获取特定食谱的详情
  async fetchRecipe(recipeId) {
    try {
      const response = await fetch(`${API_BASE_URL}/recipes/${recipeId}`);
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  },

  // 创建新食谱
  async createRecipe(recipeData) {
    try {
      const response = await fetch(`${API_BASE_URL}/recipes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: recipeData
      });
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  },

  // 更新食谱信息
  async updateRecipe(recipeId, recipeData) {

    try {
      const response = await fetch(`${API_BASE_URL}/recipes/${recipeId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: recipeData
      });
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  },

  // 删除食谱
  async deleteRecipe(recipeId) {
    try {
      const response = await fetch(`${API_BASE_URL}/recipes/${recipeId}`, {
        method: 'DELETE'
      });
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  },

  /* Ingredients */
  // 获取食材列表
  async fetchIngredients() {
    try {
      const response = await fetch(`${API_BASE_URL}/ingredients`);
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  },

  // 获取特定食材的详情
  async fetchIngredient(ingredientId) {
    try {
      const response = await fetch(`${API_BASE_URL}/ingredients/${ingredientId}`);
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  },

  // 创建新食材
  async createIngredient(recipeData) {
    try {
      const response = await fetch(`${API_BASE_URL}/ingredients`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: recipeData
      });
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  },

  // 更新食材信息
  async updateIngredient(ingredientId, ingredientData) {

    try {
      const response = await fetch(`${API_BASE_URL}/ingredients/${ingredientId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: ingredientData
      });
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  },

  // 删除食材
  async deleteIngredient(ingredientId) {
    try {
      const response = await fetch(`${API_BASE_URL}/ingredients/${ingredientId}`, {
        method: 'DELETE'
      });
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  },

  /* Reviews */
  // 获取评论列表
  async fetchReviews() {
    try {
      const response = await fetch(`${API_BASE_URL}/reviews`);
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  },

  // 获取特定评论的详情
  async fetchReview(reviewId) {
    try {
      const response = await fetch(`${API_BASE_URL}/reviews/${reviewId}`);
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  },

  // 创建新评论
  async createReview(reviewData) {
    try {
      const response = await fetch(`${API_BASE_URL}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: reviewData
      });
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  },

  // 更新评论信息
  async updateReview(reviewId, reviewData) {

    try {
      const response = await fetch(`${API_BASE_URL}/reviews/${reviewId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: reviewData
      });
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  },

  // 删除评论
  async deleteReview(reviewId) {
    try {
      const response = await fetch(`${API_BASE_URL}/reviews/${reviewId}`, {
        method: 'DELETE'
      });
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  },

  /* Uploads */
  // 上传文件
  async uploadFile(formData) {
    try {
      const response = await fetch(`${API_BASE_URL}/upload`, {
        method: 'POST',
        body: formData
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
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(credentials)
      });
      const data = await handleResponse(response);
      // 保存JWT到localStorage
      // localStorage.setItem('token', data.token);
      return data;
    } catch (error) {
      return handleError(error);
    }
  },
  async fetchCurrentUser() {
    try {
      const response = await fetch(`${API_BASE_URL}/user`, {
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      });
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  },

  // 注销用户
  async logout() {
    try {
      const response = await fetch(`${API_BASE_URL}/logout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      });
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  }
  

  // 为其他 API 路由添加类似的方法（如 recipes, ingredients, reviews）

};

/* 处理 API 响应 */
const handleResponse = async (response) => {
  if (response.ok) {
    const contentType = response.headers.get('Content-Type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    } else {
      // 处理非 JSON 响应
      const text = await response.text();
      throw new Error(`Non-JSON response: ${text}`);
    }
  } else {
    // 处理 HTTP 错误状态
    const errorText = await response.text();
    throw new Error(`HTTP error ${response.status}: ${errorText}`);
  }
}

function handleError(error) {
  console.error('API call failed:', error);
  throw error;
}

export default ApiService;
