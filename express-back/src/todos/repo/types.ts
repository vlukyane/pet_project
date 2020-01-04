export interface ITodo {
    content: string,
    isCompleted: boolean,
    isEditing: boolean
}

export interface QueryResult {
    message: string | Error
}
