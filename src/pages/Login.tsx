import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showToast, setShowToast] = useState(false); // Para mostrar mensajes de error
  const history = useHistory();

  const handleLogin = () => {
    if (username && password) {
      login(); // Actualiza el estado de autenticación
      const loginContainer = document.getElementById("login-container");
      if (loginContainer) {
        loginContainer.classList.add("animate-login");
      }

      setTimeout(() => {
        history.push(`/home/${username}`);
      }, 1000);
    } else {
      setShowToast(true);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-600">
      <div
        id="login-container"
        className="p-8 bg-white rounded-lg shadow-lg w-full max-w-md"
      >
        <div className="block text-black text-[30px] text-center mb-5 font-medium">Login</div>
        <label
          className="block text-lg font-semibold mb-2 text-gray-800"
          htmlFor="username"
        >
          Nombre de Usuario
        </label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Ingresa tu nombre"
          className="mb-4 border border-gray-300 rounded-md p-2 w-full bg-white placeholder:text-black text-black"
        />
        <label
          className="block text-lg font-semibold mb-2 text-gray-800"
          htmlFor="password"
        >
          Contraseña
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Ingresa tu contraseña"
          className="mb-4 border border-gray-300 rounded-md p-2 w-full bg-white placeholder:text-black text-black"
        />
        <button
          onClick={handleLogin}
          className="mt-4 bg-blue-500 text-white hover:bg-blue-600 w-full py-2 rounded"
        >
          Iniciar Sesión
        </button>
      </div>

      {showToast && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded">
          Por favor, completa todos los campos.
        </div>
      )}
    </div>
  );
};

export default LoginPage;
