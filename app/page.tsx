import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Sistema Veterinaria</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <NavCard
            title="Usuarios"
            description="Gestionar usuarios del sistema"
            href="/usuarios"
            color="bg-blue-500"
          />
          <NavCard
            title="Animales"
            description="Gestionar mascotas y animales"
            href="/animales"
            color="bg-green-500"
          />
          <NavCard
            title="Citas"
            description="Administrar citas veterinarias"
            href="/citas"
            color="bg-purple-500"
          />
          <NavCard
            title="Consultas"
            description="Registrar consultas y diagnósticos"
            href="/consultas"
            color="bg-orange-500"
          />
        </div>

        <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Bienvenido al Sistema</h2>
          <p className="text-gray-600 mb-6">
            Este sistema le permite gestionar todos los aspectos de su veterinaria:
          </p>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              Crear, consultar, actualizar y eliminar registros de todas las entidades
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              Comunicacion en tiempo real con el backend FastAPI
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              Persistencia de datos en PostgreSQL
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              Gestion de usuarios, animales, citas y consultas
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
}

function NavCard({
  title,
  description,
  href,
  color,
}: {
  title: string;
  description: string;
  href: string;
  color: string;
}) {
  return (
    <Link
      href={href}
      className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      <div className={`${color} h-2`} />
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
          {title}
        </h3>
        <p className="mt-2 text-gray-600">{description}</p>
        <div className="mt-4 text-blue-500 font-medium group-hover:text-blue-700">
          Gestionar →
        </div>
      </div>
    </Link>
  );
}