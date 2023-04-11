import { BasicAgent } from './Basic.agent';
import {
  CreateTaskResponse,
  GetTaskResponse,
  UpdateTaskResponse,
  UpdateTaskRequest,
  CreateTaskRequest,
  GetAllTasksResponse,
  GetAllTasksQuery,
} from 'http/model';

class TaskAgent extends BasicAgent {
  constructor() {
    super(process.env.APP_API as string);
  }

  async getAllTasks(params?: GetAllTasksQuery): Promise<GetAllTasksResponse> {
    const { data } = await this._http.get<GetAllTasksResponse>(`/tasks`, {
      params,
    });

    return data;
  }

  async getTask(taskId: string): Promise<GetTaskResponse> {
    const { data } = await this._http.get<GetTaskResponse>(`/tasks/${taskId}`);

    return data;
  }

  async updateTask(taskId: string, newData: UpdateTaskRequest): Promise<UpdateTaskResponse> {
    const { data } = await this._http.patch<UpdateTaskResponse>(`/tasks/${taskId}`, newData);

    return data;
  }

  async createTask(newData: CreateTaskRequest): Promise<CreateTaskResponse> {
    const { data } = await this._http.post<CreateTaskResponse>(`/tasks`, newData);

    return data;
  }

  async deleteTask(taskId: string): Promise<void> {
    await this._http.delete(`/tasks/${taskId}`);
  }
}

export const TaskAgentInstance = new TaskAgent();
