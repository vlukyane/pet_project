export interface ITodo {
    _id: string,
    id: string,
    content: string,
    isCompleted: boolean,
    isEditing: boolean,
    ctx?: {
        email: string,
        color: string,
    },
}
