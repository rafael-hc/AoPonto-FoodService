import { ProtectedRoute } from './components/protected-route'
import { useAuthStore } from './store/auth-store'

export default function App() {
  const { user } = useAuthStore()

  return (
    <ProtectedRoute>
      <div className="space-y-6">
        <header className="py-4">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Painel do Sistema
          </h2>
          <p className="text-gray-600">Bem-vindo de volta, {user?.login}!</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider">
              Pedidos Hoje
            </h3>
            <p className="mt-2 text-3xl font-bold">24</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider">
              Vendas Totais
            </h3>
            <p className="mt-2 text-3xl font-bold">R$ 1.250,50</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider">
              Clientes Ativos
            </h3>
            <p className="mt-2 text-3xl font-bold">12</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold mb-4">Pedidos Recentes</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="text-gray-400 text-sm uppercase">
                <tr>
                  <th className="pb-3 px-2">ID</th>
                  <th className="pb-3 px-2">Cliente</th>
                  <th className="pb-3 px-2">Valor</th>
                  <th className="pb-3 px-2">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="py-3 px-2">#1234</td>
                  <td className="py-3 px-2">Rafael Silva</td>
                  <td className="py-3 px-2">R$ 45,00</td>
                  <td className="py-3 px-2 text-orange-600 font-medium">
                    Em preparo
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-2">#1235</td>
                  <td className="py-3 px-2">Joana Mendes</td>
                  <td className="py-3 px-2">R$ 120,50</td>
                  <td className="py-3 px-2 text-green-600 font-medium">
                    Concluído
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
