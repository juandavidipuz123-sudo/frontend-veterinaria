'use client';

import { useState, useEffect, useCallback } from 'react';
import { api } from '@/lib/api';
import { Cita } from '@/types';

export default function CitasPage() {
  const [items, setItems] = useState<Cita[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    fecha: new Date().toISOString().split('T')[0],
    hora: '10:00',
    tipo: 'revision',
    estado: 'pendiente',
    id_animal: 1,
    id_veterinario: 1,
    id_usuario_creacion: 1,
  });
  const [saving, setSaving] = useState(false);

  const loadItems = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.citas.list();
      setItems(data.items);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error loading items');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(loadItems, 0);
    return () => clearTimeout(timer);
  }, [loadItems]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      setSaving(true);
      if (editingId !== null) {
        await api.citas.update(editingId, formData);
      } else {
        await api.citas.create(formData);
      }
      setShowForm(false);
      setEditingId(null);
      setFormData({ fecha: new Date().toISOString().split('T')[0], hora: '10:00', tipo: 'revision', estado: 'pendiente', id_animal: 1, id_veterinario: 1, id_usuario_creacion: 1 });
      await loadItems();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Error saving');
    } finally {
      setSaving(false);
    }
  }

  async function handleEdit(id: number) {
    try {
      const item = await api.citas.get(id);
      setFormData({
        fecha: item.fecha,
        hora: item.hora,
        tipo: item.tipo,
        estado: item.estado,
        id_animal: item.id_animal,
        id_veterinario: item.id_veterinario,
        id_usuario_creacion: item.id_usuario_creacion,
      });
      setEditingId(id);
      setShowForm(true);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Error loading item');
    }
  }

  async function handleDelete(id: number) {
    if (!confirm('¿Estás seguro de eliminar este registro?')) return;
    try {
      await api.citas.delete(id);
      await loadItems();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Error deleting');
    }
  }

  function getTipoBadge(tipo: string) {
    return tipo === 'urgencias' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800';
  }

  function getEstadoBadge(estado: string) {
    const colors: Record<string, string> = {
      pendiente: 'bg-yellow-100 text-yellow-800',
      confirmada: 'bg-green-100 text-green-800',
      cancelada: 'bg-gray-100 text-gray-800',
    };
    return `px-2 py-1 rounded text-xs ${colors[estado] || ''}`;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Citas</h1>
        {!showForm && (
          <button
            onClick={() => {
              setFormData({ fecha: new Date().toISOString().split('T')[0], hora: '10:00', tipo: 'revision', estado: 'pendiente', id_animal: 1, id_veterinario: 1, id_usuario_creacion: 1 });
              setEditingId(null);
              setShowForm(true);
            }}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Nuevo
          </button>
        )}
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow mb-6 border">
          <h2 className="text-xl font-semibold mb-4">
            {editingId !== null ? 'Editar' : 'Nuevo'} registro
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Fecha</label>
                <input
                  type="date"
                  value={formData.fecha}
                  onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Hora</label>
                <input
                  type="time"
                  value={formData.hora}
                  onChange={(e) => setFormData({ ...formData, hora: e.target.value })}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
                <select
                  value={formData.tipo}
                  onChange={(e) => setFormData({ ...formData, tipo: e.target.value })}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="revision">Revision</option>
                  <option value="urgencias">Urgencias</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
                <select
                  value={formData.estado}
                  onChange={(e) => setFormData({ ...formData, estado: e.target.value })}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="pendiente">Pendiente</option>
                  <option value="confirmada">Confirmada</option>
                  <option value="cancelada">Cancelada</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ID Animal</label>
                <input
                  type="number"
                  value={formData.id_animal}
                  onChange={(e) => setFormData({ ...formData, id_animal: parseInt(e.target.value) || 0 })}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required={editingId === null}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ID Veterinario</label>
                <input
                  type="number"
                  value={formData.id_veterinario}
                  onChange={(e) => setFormData({ ...formData, id_veterinario: parseInt(e.target.value) || 0 })}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required={editingId === null}
                />
              </div>
              {editingId === null && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">ID Usuario Creador</label>
                  <input
                    type="number"
                    value={formData.id_usuario_creacion}
                    onChange={(e) => setFormData({ ...formData, id_usuario_creacion: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              )}
            </div>
            <div className="flex gap-2 mt-6">
              <button
                type="submit"
                disabled={saving}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
              >
                {saving ? 'Guardando...' : 'Guardar'}
              </button>
              <button
                type="button"
                onClick={() => { setShowForm(false); setEditingId(null); }}
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className="text-center py-8 text-gray-500">Cargando...</div>
      ) : items.length === 0 ? (
        <div className="text-center py-8 text-gray-500">No hay registros</div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fecha</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Hora</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tipo</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID Animal</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID Veterinario</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">{item.id}</td>
                  <td className="px-6 py-4">{item.fecha}</td>
                  <td className="px-6 py-4">{item.hora}</td>
                  <td className="px-6 py-4"><span className={`px-2 py-1 rounded text-xs ${getTipoBadge(item.tipo)}`}>{item.tipo}</span></td>
                  <td className="px-6 py-4"><span className={getEstadoBadge(item.estado)}>{item.estado}</span></td>
                  <td className="px-6 py-4">{item.id_animal}</td>
                  <td className="px-6 py-4">{item.id_veterinario}</td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button onClick={() => handleEdit(item.id)} className="text-blue-600 hover:text-blue-800">Editar</button>
                    <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-800">Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}