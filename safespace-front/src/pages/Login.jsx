import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { login, register, getFaculties } from "../services/authService";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Login() {
  const [activeTab, setActiveTab] = useState("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  // Estados para registro
  const [registerData, setRegisterData] = useState({
    username: "",
    password: "",
    name: "",
    last_name: "",
    birth_day: "",
    id_faculty: "",
  });
  const [birthDate, setBirthDate] = useState(null);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [faculties, setFaculties] = useState([]);
  const [loadingFaculties, setLoadingFaculties] = useState(false);
  
  const { login: loginContext } = useContext(AuthContext);
  const navigate = useNavigate();

  // Cargar facultades cuando se cambia a la pestaña de registro
  useEffect(() => {
    if (activeTab === "register" && faculties.length === 0) {
      loadFaculties();
    }
  }, [activeTab]);

  const loadFaculties = async () => {
    setLoadingFaculties(true);
    try {
      const data = await getFaculties();
      setFaculties(data);
    } catch (err) {
      setError("Error al cargar las facultades");
    } finally {
      setLoadingFaculties(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await login(username, password);
      if (response.token) {
        loginContext(response.token);
        
        // Decodificar el token para obtener el rol del usuario
        const payload = JSON.parse(atob(response.token.split(".")[1]));
        const userRole = payload.payload?.role;
        
        // Redirigir según el rol
        if (userRole === "PSYCHOLOGIST") {
          navigate("/psicologo/dashboard");
        } else if (userRole === "STUDENT") {
          navigate("/dashboard");
        } else {
          // Por defecto, ir al dashboard de estudiante
          navigate("/dashboard");
        }
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Error al iniciar sesión. Verifica tus credenciales."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await register(registerData);
      // Después del registro exitoso, cambiar a la pestaña de login
      setActiveTab("login");
      setError("");
      // Mostrar mensaje de éxito (opcional)
      alert("Registro exitoso. Por favor, inicia sesión.");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Error al registrarse. Verifica los datos ingresados."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterChange = (field, value) => {
    setRegisterData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleBirthDateChange = (date) => {
    setBirthDate(date);
    if (date) {
      // Formatear la fecha como YYYY-MM-DD para el backend
      const formattedDate = date.toISOString().split("T")[0];
      handleRegisterChange("birth_day", formattedDate);
    } else {
      handleRegisterChange("birth_day", "");
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center relative px-4">
      {/* Enlace Volver al inicio */}
      <Link
        to="/"
        className="absolute top-6 left-6 text-blue-400 hover:text-blue-500 flex items-center gap-2 transition-colors"
      >
        <span className="text-xl">←</span>
        <span>Volver al inicio</span>
      </Link>

      {/* Contenedor principal centrado */}
      <div className="w-full max-w-md flex flex-col items-center">
        {/* Icono de corazón */}
        <div className="mb-4">
          <svg
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#60A5FA"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-blue-400"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </div>

        {/* Título */}
        <h1 className="text-4xl font-bold text-gray-800 mb-2">SafeSpace</h1>
        <p className="text-gray-500 mb-8">Tu espacio de bienestar emocional</p>

        {/* Tarjeta de login/registro */}
        <div className="w-full bg-gray-100 rounded-2xl p-6 shadow-lg">
          {/* Pestañas */}
          <div className="flex mb-6 bg-gray-200 rounded-lg p-1">
            <button
              onClick={() => setActiveTab("login")}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                activeTab === "login"
                  ? "bg-white text-gray-800 shadow-sm"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              Iniciar Sesión
            </button>
            <button
              onClick={() => setActiveTab("register")}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                activeTab === "register"
                  ? "bg-white text-gray-800 shadow-sm"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              Registrarse
            </button>
          </div>

          {/* Formulario de login */}
          {activeTab === "login" && (
            <form onSubmit={handleLogin} className="space-y-5">
              {/* Campo Username */}
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Nombre de Usuario
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="usuario123"
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-white text-gray-800"
                  />
                </div>
              </div>

              {/* Campo Contraseña */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Contraseña
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="********"
                    required
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-white text-gray-800"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <svg
                        className="h-5 w-5 text-gray-400 hover:text-gray-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="h-5 w-5 text-gray-400 hover:text-gray-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Enlace Olvidaste contraseña */}
              <div className="text-right">
                <Link
                  to="#"
                  className="text-blue-400 hover:text-blue-500 text-sm transition-colors"
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>

              {/* Mensaje de error */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              {/* Botón Iniciar Sesión */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
              </button>
            </form>
          )}

          {/* Formulario de registro */}
          {activeTab === "register" && (
            <form onSubmit={handleRegister} className="space-y-5">
              {/* Campo Username */}
              <div>
                <label
                  htmlFor="register-username"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Nombre de Usuario
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <input
                    id="register-username"
                    type="text"
                    value={registerData.username}
                    onChange={(e) => handleRegisterChange("username", e.target.value)}
                    placeholder="usuario123"
                    required
                    minLength={6}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-white text-gray-800"
                  />
                </div>
              </div>

              {/* Campo Contraseña */}
              <div>
                <label
                  htmlFor="register-password"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Contraseña
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                  <input
                    id="register-password"
                    type={showRegisterPassword ? "text" : "password"}
                    value={registerData.password}
                    onChange={(e) => handleRegisterChange("password", e.target.value)}
                    placeholder="********"
                    required
                    minLength={6}
                    maxLength={18}
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-white text-gray-800"
                  />
                  <button
                    type="button"
                    onClick={() => setShowRegisterPassword(!showRegisterPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showRegisterPassword ? (
                      <svg
                        className="h-5 w-5 text-gray-400 hover:text-gray-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="h-5 w-5 text-gray-400 hover:text-gray-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Campo Nombre */}
              <div>
                <label
                  htmlFor="register-name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Nombre
                </label>
                <input
                  id="register-name"
                  type="text"
                  value={registerData.name}
                  onChange={(e) => handleRegisterChange("name", e.target.value)}
                  placeholder="Juan"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-white text-gray-800"
                />
              </div>

              {/* Campo Apellido */}
              <div>
                <label
                  htmlFor="register-lastname"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Apellido
                </label>
                <input
                  id="register-lastname"
                  type="text"
                  value={registerData.last_name}
                  onChange={(e) => handleRegisterChange("last_name", e.target.value)}
                  placeholder="Pérez"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-white text-gray-800"
                />
              </div>

              {/* Campo Fecha de Nacimiento */}
              <div>
                <label
                  htmlFor="register-birthday"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Fecha de Nacimiento
                </label>
                <DatePicker
                  id="register-birthday"
                  selected={birthDate}
                  onChange={handleBirthDateChange}
                  dateFormat="dd/MM/yyyy"
                  maxDate={new Date()}
                  showYearDropdown
                  showMonthDropdown
                  dropdownMode="select"
                  placeholderText="Selecciona tu fecha de nacimiento"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-white text-gray-800"
                  wrapperClassName="w-full"
                  required
                />
              </div>

              {/* Campo Facultad */}
              <div>
                <label
                  htmlFor="register-faculty"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Facultad
                </label>
                <select
                  id="register-faculty"
                  value={registerData.id_faculty}
                  onChange={(e) => handleRegisterChange("id_faculty", e.target.value)}
                  required
                  disabled={loadingFaculties}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-white text-gray-800 disabled:bg-gray-100 disabled:cursor-not-allowed"
                >
                  <option value="">Selecciona una facultad</option>
                  {faculties.map((faculty) => (
                    <option key={faculty.id} value={faculty.id}>
                      {faculty.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Mensaje de error */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              {/* Botón Registrarse */}
              <button
                type="submit"
                disabled={loading || loadingFaculties}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Registrando..." : "Registrarse"}
              </button>
            </form>
          )}
        </div>

        {/* Enlace de ayuda */}
        <div className="mt-6 text-center text-sm text-gray-600">
          ¿Necesitas ayuda?{" "}
          <Link to="#" className="text-blue-400 hover:text-blue-500">
            Contacta con soporte
          </Link>
        </div>
      </div>
    </div>
  );
}

