// src/services/ApiService.js

const API_BASE_URL = process.env.REACT_APP_API_URL;

const ApiService = {
  
  // 获取用户列表
  async fetchUsers() {
    try {
      const response = await fetch(`${API_BASE_URL}/users`);
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  },

  // 获取特定用户的详情
  async fetchUser(userId) {
    try {
      const response = await fetch(`${API_BASE_URL}/users/${userId}`);
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  },

  // 创建新用户
  async createUser(userData) {
    try {
      const response = await fetch(`${API_BASE_URL}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  },

  // 更新用户信息
  async updateUser(userId, userData) {
    try {
      const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  },

  // 删除用户
  async deleteUser(userId) {
    try {
      const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
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
        body: JSON.stringify(recipeData)
      });
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  },
   
  // 更新食谱信息
  async updateRecipe(recipeId, recipeData) {
    const formData = new FormData();
    formData.append('_method', 'PUT');

    for (const key in recipeData) {
        formData.append(key, recipeData[key]);
    }

    for (let [key, value] of formData.entries()) {
      console.log(key, value);
  }

    try {
      const response = await fetch(`${API_BASE_URL}/recipes/${recipeId}`, {
        method: 'POST',
        body: formData
      });
      console.log(response);
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

  // 为其他 API 路由添加类似的方法（如 recipes, ingredients, reviews）

};

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
