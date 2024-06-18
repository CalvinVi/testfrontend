declare module "@/api" {
    export function fetchTodos(): Promise<any[]>;
    export function addTodo(todo: any): Promise<any>;
    export function deleteTodo(id: number): Promise<void>;
  }  