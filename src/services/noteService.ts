import axios from 'axios';
import type { Note, NoteTag } from '../types/note';

const API_URL = 'https://notehub-public.goit.study/api/notes';
const TOKEN = import.meta.env.VITE_NOTEHUB_TOKEN;

const instance = axios.create({
    baseURL: API_URL,
    headers: {
        Authorization: `Bearer ${TOKEN}`,
    },
});

export interface FetchNotesParams {
    page?: number;
    search?: string;
    perPage?: number;
}

export interface FetchNotesResponse {
    results: Note[];
    totalPages: number;
}

export const fetchNotes = async ({ page = 1, search = '', perPage = 12 }: FetchNotesParams): Promise<FetchNotesResponse> => {
    const response = await instance.get('', {
        params: { page, search, perPage },
    });
    return response.data;
};

export const createNote = async (note: {
    title: string;
    content: string;
    tag: NoteTag;
}): Promise<Note> => {
    const response = await instance.post('', note);
    return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
    const response = await instance.delete(`/${id}`);
    return response.data;
};