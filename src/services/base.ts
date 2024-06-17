import axios, { AxiosResponse } from 'axios';

class APIBase {
  private baseUrl: string;

  constructor() {
    this.baseUrl = import.meta.env.VITE_FUDIBOT_API || 'http://localhost:8100/api';
  }

  private buildUrl(endpoint: string): string {
    return `${this.baseUrl}/${endpoint}`;
  }

  private getHeaders(): { [key: string]: string } {
    const headers: { [key: string]: string } = {
      'Content-Type': 'application/json'
    }

    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      headers['Authorization'] = `Bearer ${accessToken}`
    }

    return headers;
  }

  protected async get<T>(endpoint: string): Promise<T> {
    const url = this.buildUrl(endpoint);
    try {
      const response: AxiosResponse<T> = await axios.get(url, {
        headers: this.getHeaders()
      });
      return response.data;
    } catch (error: any) {
      const errorDetails = {
        status: error.response.status,
        message: error.response?.data?.message || error.message
      }
      throw errorDetails;
    }
  }

  protected async post<T>(endpoint: string, data: any, headers?: {[key: string]: string}): Promise<T> {
    const url = this.buildUrl(endpoint);
    try {
      const response: AxiosResponse<T> = await axios.post(url, data, {
        headers: headers ? headers : this.getHeaders()
      });
      return response.data;
    } catch (error: any) {
      const errorDetails = {
        status: error.response.status,
        message: error.response?.data?.message || error.message
      }
      throw errorDetails;
    }
  }

  protected async put<T>(endpoint: string, data: any): Promise<T> {
    const url = this.buildUrl(endpoint);
    try {
      const response: AxiosResponse<T> = await axios.put(url, data, {
        headers: this.getHeaders()
      });
      return response.data;
    } catch (error: any) {
      const errorDetails = {
        status: error.response.status,
        message: error.response?.data?.message || error.message
      }
      throw errorDetails;
    }
  }

  protected async patch<T>(endpoint: string, data: any): Promise<T> {
    const url = this.buildUrl(endpoint);
    try {
      const response: AxiosResponse<T> = await axios.patch(url, data, {
        headers: this.getHeaders()
      });
      return response.data;
    } catch (error: any) {
      const errorDetails = {
        status: error.response.status,
        message: error.response?.data?.message || error.message
      }
      throw errorDetails;
    }
  }

  protected async delete<T>(endpoint: string): Promise<T> {
    const url = this.buildUrl(endpoint);
    try {
      const response: AxiosResponse<T> = await axios.delete(url, {
        headers: this.getHeaders()
      });
      return response.data;
    } catch (error: any) {
      const errorDetails = {
        status: error.response.status,
        message: error.response?.data?.message || error.message
      }
      throw errorDetails;
    }
  }
}

export default APIBase;