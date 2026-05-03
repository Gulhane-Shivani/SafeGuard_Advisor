
import React, { useState } from 'react';
import { Search, Filter, Edit2, Trash2 } from 'lucide-react';

interface Column {
  header: string;
  accessor: string;
  render?: (value: any, row: any) => React.ReactNode;
}

interface PlatformTableProps {
  columns: Column[];
  data: any[];
  title?: string;
  description?: string;
  onEdit?: (row: any) => void;
  onDelete?: (row: any) => void;
  searchPlaceholder?: string;
  actions?: React.ReactNode;
}

export const PlatformTable: React.FC<PlatformTableProps> = ({ 
  columns, data, title, description, onEdit, onDelete, searchPlaceholder = "Search records...", actions 
}) => {
  const [search, setSearch] = useState('');

  const filteredData = data.filter(row => 
    Object.values(row).some(val => 
      String(val).toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
      {(title || search) && (
        <div className="p-8 border-b border-slate-100 space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              {title && <h3 className="text-xl font-bold text-slate-900">{title}</h3>}
              {description && <p className="text-sm text-slate-500 mt-1 font-medium">{description}</p>}
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative group min-w-[280px]">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 group-focus-within:text-teal-600 transition-colors" />
                <input 
                  type="text" 
                  placeholder={searchPlaceholder}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-teal-600/5 focus:border-teal-600 transition-all w-full text-xs font-bold"
                />
              </div>
              <button className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition-all">
                <Filter className="w-4 h-4" />
              </button>
              {actions}
            </div>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50">
              {columns.map((col, i) => (
                <th key={i} className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  {col.header}
                </th>
              ))}
              {(onEdit || onDelete) && <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filteredData.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 1} className="px-8 py-20 text-center">
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-200">
                      <Search className="w-8 h-8" />
                    </div>
                    <p className="text-slate-400 font-bold text-sm">No records found matching your search.</p>
                  </div>
                </td>
              </tr>
            ) : (
              filteredData.map((row, i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-colors group/row">
                  {columns.map((col, j) => (
                    <td key={j} className="px-8 py-5">
                      {col.render ? col.render(row[col.accessor], row) : (
                        <span className="text-sm font-bold text-slate-700">{row[col.accessor]}</span>
                      )}
                    </td>
                  ))}
                  {(onEdit || onDelete) && (
                    <td className="px-8 py-5 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover/row:opacity-100 transition-all">
                        {onEdit && (
                          <button 
                            onClick={() => onEdit(row)}
                            className="p-2 bg-teal-50 text-teal-600 hover:bg-teal-600 hover:text-white rounded-lg transition-all"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                        )}
                        {onDelete && (
                          <button 
                            onClick={() => onDelete(row)}
                            className="p-2 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-all"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
