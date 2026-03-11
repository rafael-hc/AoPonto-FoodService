import { NavLink, useNavigate } from 'react-router';
import { useAuthStore } from './store/auth-store';

export function AppNav() {
  const { isAuthenticated, signOut } = useAuthStore();
  const navigate = useNavigate();
  const activeStyle = 'text-orange-600 font-semibold';
  const baseStyle = 'px-3 py-2 transition-colors hover:text-orange-500';

  function handleLogout() {
    signOut();
    navigate('/login');
  }

  return (
    <nav className="flex items-center gap-4">
      {isAuthenticated ? (
        <>
          <NavLink
            to="/"
            end
            className={({ isActive }) => (isActive ? activeStyle : baseStyle)}
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/profile"
            className={({ isActive }) => (isActive ? activeStyle : baseStyle)}
          >
            Meu Perfil
          </NavLink>
          <button
            onClick={handleLogout}
            className="px-3 py-1 bg-gray-100 rounded text-sm hover:bg-gray-200 transition-colors"
          >
            Sair
          </button>
        </>
      ) : (
        <NavLink
          to="/login"
          className={({ isActive }) => (isActive ? activeStyle : baseStyle)}
        >
          Entrar
        </NavLink>
      )}
    </nav>
  );
}
