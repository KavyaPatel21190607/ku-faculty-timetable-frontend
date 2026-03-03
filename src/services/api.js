const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class ApiService {
  constructor() {
    this.baseUrl = API_BASE_URL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'API request failed');
      }

      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Faculty endpoints
  async getAllFaculty(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = `/faculty${queryString ? `?${queryString}` : ''}`;
    return this.request(endpoint);
  }

  async getFacultyById(id) {
    return this.request(`/faculty/${id}`);
  }

  async searchFacultyByName(name) {
    return this.request(`/faculty/search/${encodeURIComponent(name)}`);
  }

  async getFacultyTimetableByDay(id, day) {
    return this.request(`/faculty/${id}/timetable/${day}`);
  }

  async createFaculty(facultyData) {
    return this.request('/faculty', {
      method: 'POST',
      body: JSON.stringify(facultyData),
    });
  }

  async updateFaculty(id, facultyData) {
    return this.request(`/faculty/${id}`, {
      method: 'PUT',
      body: JSON.stringify(facultyData),
    });
  }

  async deleteFaculty(id) {
    return this.request(`/faculty/${id}`, {
      method: 'DELETE',
    });
  }

  async getAllDesignations() {
    return this.request('/faculty/designations/all');
  }

  async getFacultyStats() {
    return this.request('/faculty/stats/summary');
  }

  async checkHealth() {
    return this.request('/health');
  }
}

export default new ApiService();
