import { create } from 'zustand';
import { Task, TaskStatus, TaskPriority } from '../types/task';

interface TaskStore {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  fetchTasks: () => Promise<void>;
  addTask: (task: Task) => Promise<void>;
  updateTask: (id: string, updates: Partial<Task>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  filterTasks: (status?: TaskStatus, priority?: TaskPriority) => Task[];
  setTasks: (tasks: Task[]) => void;
}

export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: [],
  loading: false,
  error: null,

  fetchTasks: async () => {
    set({ loading: true, error: null });
    try {
      // For now, we'll use mock data since we haven't set up Firebase
      const mockTasks: Task[] = [
        {
          id: '1',
          title: 'Implement user authentication',
          description: 'Add JWT-based authentication to the application',
          status: 'in_progress',
          priority: 'high',
          type: 'feature',
          labels: ['frontend', 'backend'],
          dueDate: '2024-03-15',
          assignedTo: '1',
          archived: false,
          sprintId: 'sprint-1',
          epicId: 'epic-1',
          storyPoints: 5,
          acceptanceCriteria: [
            'User can sign up with email and password',
            'User can log in with credentials',
            'JWT token is properly stored and managed',
          ],
          estimatedTime: 480,
          actualTime: 240,
          timeEntries: [
            {
              id: '1',
              userId: '1',
              duration: 240,
              description: 'Initial setup and research',
              date: '2024-03-10',
              createdAt: '2024-03-10T10:00:00Z',
            },
          ],
          dependencies: [],
          environment: 'development',
          browsers: ['Chrome', 'Firefox'],
          devices: ['Desktop'],
          operatingSystems: ['Windows', 'macOS'],
          tags: ['auth', 'security'],
          subtasks: [
            {
              id: '1',
              title: 'Set up JWT middleware',
              description: 'Implement JWT verification middleware',
              completed: true,
              assignedTo: '1',
              dueDate: '2024-03-12',
            },
          ],
          notes: 'Consider adding OAuth support in the future',
          isRecurring: false,
          comments: [
            {
              id: '1',
              userId: '1',
              content: 'Started working on the authentication system',
              createdAt: '2024-03-10T10:00:00Z',
              updatedAt: '2024-03-10T10:00:00Z',
            },
          ],
          attachments: [],
          customFields: {},
          isTemplate: false,
          workflowRules: [],
          createdAt: '2024-03-01T10:00:00Z',
          updatedAt: '2024-03-10T10:00:00Z',
        },
      ];
      set({ tasks: mockTasks, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch tasks', loading: false });
    }
  },

  addTask: async (task) => {
    set({ loading: true, error: null });
    try {
      const now = new Date().toISOString();
      const newTask: Task = {
        ...task,
        id: Date.now().toString(),
        createdAt: now,
        updatedAt: now,
      };
      set((state) => ({
        tasks: [...state.tasks, newTask],
        loading: false,
      }));
    } catch (error) {
      set({ error: 'Failed to add task', loading: false });
    }
  },

  updateTask: async (id, updates) => {
    set({ loading: true, error: null });
    try {
      const now = new Date().toISOString();
      set((state) => ({
        tasks: state.tasks.map((task) =>
          task.id === id ? { ...task, ...updates, updatedAt: now } : task
        ),
        loading: false,
      }));
    } catch (error) {
      set({ error: 'Failed to update task', loading: false });
    }
  },

  deleteTask: async (id) => {
    set({ loading: true, error: null });
    try {
      set((state) => ({
        tasks: state.tasks.filter((task) => task.id !== id),
        loading: false,
      }));
    } catch (error) {
      set({ error: 'Failed to delete task', loading: false });
    }
  },

  filterTasks: (status?: TaskStatus, priority?: TaskPriority) => {
    const { tasks } = get();
    return tasks.filter((task) => {
      if (status && task.status !== status) return false;
      if (priority && task.priority !== priority) return false;
      return true;
    });
  },

  setTasks: (tasks) => set({ tasks }),
})); 