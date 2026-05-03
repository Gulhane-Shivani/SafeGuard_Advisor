
import React, { useState } from 'react';
import { 
  CheckSquare, Calendar, Plus, 
  AlertCircle,
  Trash2, CheckCircle2
} from 'lucide-react';
import { SectionHeader } from '../../components/platform/SectionHeader';
import { PlatformModal } from '../../components/platform/PlatformModal';
import { usePlatform } from '../../store/PlatformContext';
import { cn } from '../../utils/helpers';

const Tasks: React.FC = () => {
  const { data, updateData, addItem, removeItem } = usePlatform();
  const agentId = 2; // John Agent
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', date: '', type: 'Call' });

  const tasks = data.tasks.filter(t => t.agentId === agentId);

  const handleToggleComplete = (id: number) => {
    const updated = data.tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
    updateData('tasks', updated);
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    addItem('tasks', { ...newTask, completed: false, agentId });
    setIsModalOpen(false);
    setNewTask({ title: '', date: '', type: 'Call' });
  };

  return (
    <div className="space-y-10">
      <SectionHeader 
        title="Tasks & Calendar" 
        description="Organize your daily activities, schedule follow-ups, and track task completion."
        actions={
          <button 
             onClick={() => setIsModalOpen(true)}
             className="px-6 py-2.5 bg-teal-600 text-white rounded-xl font-bold text-xs hover:bg-teal-700 transition-all flex items-center gap-2 shadow-xl shadow-teal-600/20"
          >
             <Plus className="w-4 h-4" /> Add Task
          </button>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2 space-y-6">
            <h3 className="font-bold text-slate-900 text-lg">Upcoming Activities</h3>
            
            <div className="space-y-4">
               {tasks.filter(t => !t.completed).length === 0 ? (
                  <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 text-center">
                     <CheckSquare className="w-10 h-10 text-slate-300 mx-auto mb-4" />
                     <p className="font-black text-slate-900 text-lg">All Caught Up!</p>
                     <p className="text-sm font-medium text-slate-500 mt-1">You have no pending tasks. Great job!</p>
                  </div>
               ) : (
                  tasks.filter(t => !t.completed).map(task => (
                     <div key={task.id} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4 group transition-all hover:border-teal-200">
                        <button 
                           onClick={() => handleToggleComplete(task.id)}
                           className="w-6 h-6 rounded-full border-2 border-slate-300 hover:border-teal-500 transition-colors shrink-0"
                        />
                        <div className="flex-grow">
                           <p className="font-black text-slate-900 text-sm">{task.title}</p>
                           <div className="flex items-center gap-3 mt-1">
                              <span className="text-[10px] font-bold text-slate-500 flex items-center gap-1">
                                 <Calendar className="w-3 h-3" /> {task.date}
                              </span>
                              <span className={cn(
                                 "text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border",
                                 task.type === 'Call' ? "bg-blue-50 text-blue-600 border-blue-100" : "bg-purple-50 text-purple-600 border-purple-100"
                              )}>
                                 {task.type}
                              </span>
                           </div>
                        </div>
                        <div className="opacity-0 group-hover:opacity-100 transition-all">
                           <button onClick={() => removeItem('tasks', task.id)} className="p-2 text-red-400 hover:bg-red-50 rounded-lg">
                              <Trash2 className="w-4 h-4" />
                           </button>
                        </div>
                     </div>
                  ))
               )}
            </div>

            <h3 className="font-bold text-slate-900 text-lg pt-6">Completed</h3>
            <div className="space-y-4 opacity-60">
               {tasks.filter(t => t.completed).map(task => (
                  <div key={task.id} className="bg-slate-50 p-5 rounded-2xl border border-slate-100 flex items-center gap-4">
                     <button 
                        onClick={() => handleToggleComplete(task.id)}
                        className="w-6 h-6 rounded-full bg-teal-500 text-white flex items-center justify-center shrink-0"
                     >
                        <CheckCircle2 className="w-4 h-4" />
                     </button>
                     <div className="flex-grow">
                        <p className="font-bold text-slate-500 line-through text-sm">{task.title}</p>
                     </div>
                  </div>
               ))}
            </div>
         </div>

         <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
               <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-teal-600" /> Mini Calendar
               </h3>
               {/* Simulating a calendar grid */}
               <div className="grid grid-cols-7 gap-1 text-center mb-2">
                  {['S','M','T','W','T','F','S'].map(d => <div key={d} className="text-[10px] font-black text-slate-400">{d}</div>)}
               </div>
               <div className="grid grid-cols-7 gap-1 text-center">
                  {Array.from({length: 31}).map((_, i) => (
                     <div key={i} className={cn(
                        "h-8 flex items-center justify-center rounded-lg text-xs font-bold cursor-pointer transition-colors",
                        i + 1 === 4 ? "bg-teal-600 text-white shadow-sm" : "text-slate-700 hover:bg-slate-100"
                     )}>
                        {i + 1}
                        {i + 1 === 4 && <div className="absolute w-1 h-1 bg-white rounded-full mt-4" />}
                     </div>
                  ))}
               </div>
            </div>

            <div className="bg-orange-50 p-6 rounded-3xl border border-orange-100 flex gap-4">
               <AlertCircle className="w-6 h-6 text-orange-600 shrink-0" />
               <div>
                  <p className="text-sm font-black text-orange-900">Renewal Alert</p>
                  <p className="text-xs text-orange-800 font-medium mt-1">Bob Brown's Health Policy is due for renewal on May 20. Contact them soon.</p>
               </div>
            </div>
         </div>
      </div>

      <PlatformModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="Add New Task"
        footer={
           <>
              <button onClick={() => setIsModalOpen(false)} className="px-6 py-2 text-xs font-bold text-slate-500 hover:text-slate-900 uppercase tracking-widest">Cancel</button>
              <button onClick={handleAddTask} className="px-8 py-2.5 bg-teal-600 text-white rounded-xl font-bold text-xs hover:bg-teal-700 shadow-lg shadow-teal-600/20 uppercase tracking-widest">Save Task</button>
           </>
        }
      >
        <form className="space-y-6">
           <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Task Description</label>
              <input 
                 autoFocus
                 type="text" 
                 value={newTask.title}
                 onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                 placeholder="e.g. Call Robert about quote" 
                 className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-teal-600/5 focus:border-teal-600 transition-all"
              />
           </div>
           <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Due Date</label>
                 <input 
                    type="date" 
                    value={newTask.date}
                    onChange={(e) => setNewTask({...newTask, date: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3 text-sm font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-teal-600/5 focus:border-teal-600 transition-all"
                 />
              </div>
              <div className="space-y-2">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Task Type</label>
                 <select 
                    value={newTask.type}
                    onChange={(e) => setNewTask({...newTask, type: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-teal-600/5 focus:border-teal-600 transition-all"
                 >
                    <option value="Call">Phone Call</option>
                    <option value="Email">Email</option>
                    <option value="Meeting">Meeting</option>
                    <option value="Follow-up">Follow-up</option>
                 </select>
              </div>
           </div>
        </form>
      </PlatformModal>
    </div>
  );
};

export default Tasks;
