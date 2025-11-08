const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterStudentRequest {
  username: string;
  password: string;
  name: string;
  last_name: string;
  birth_day: string; // ISO date string (YYYY-MM-DD)
  id_faculty: number;
}

export interface JwtResponse {
  token: string;
  refreshToken: string;
}

export interface RegisterStudentResponse {
  id: number;
  username: string;
  name: string;
  lastName: string;
}

export interface RegisterPsychologistRequest {
  username: string;
  password: string;
  name: string;
  last_name: string;
  birth_day: string; // ISO date string (YYYY-MM-DD)
  university: string;
  profession: string;
}

export interface RegisterPsychologistResponse {
  id: number;
  username: string;
  name: string;
  lastName: string;
}

export interface FacultyDTO {
  id: number;
  name: string;
}

class ApiService {
  private getAuthHeaders(): HeadersInit {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  async login(credentials: LoginRequest): Promise<JwtResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Error al iniciar sesión' }));
      throw new Error(error.message || 'Error al iniciar sesión');
    }

    return response.json();
  }

  async registerStudent(data: RegisterStudentRequest): Promise<RegisterStudentResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/register/student`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Error al registrar usuario' }));
      throw new Error(error.message || 'Error al registrar usuario');
    }

    return response.json();
  }

  async registerPsychologist(data: RegisterPsychologistRequest): Promise<RegisterPsychologistResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/register/psychologist`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Error al registrar psicólogo' }));
      throw new Error(error.message || 'Error al registrar psicólogo');
    }

    return response.json();
  }

  async getFaculties(): Promise<FacultyDTO[]> {
    const response = await fetch(`${API_BASE_URL}/faculties`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Error al obtener facultades' }));
      throw new Error(error.message || 'Error al obtener facultades');
    }

    return response.json();
  }
}

export const apiService = new ApiService();

