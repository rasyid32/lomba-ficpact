const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

/* ─── Token helpers ─── */
export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("eduplayverse_token");
}

export function setToken(token: string) {
  localStorage.setItem("eduplayverse_token", token);
}

export function removeToken() {
  localStorage.removeItem("eduplayverse_token");
}

/* ─── Core fetch wrapper ─── */
export async function fetchAPI<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({ error: "Request failed" }));
    throw new Error(body.error || `HTTP ${res.status}`);
  }

  // Handle 204 No Content
  if (res.status === 204) return {} as T;

  return res.json();
}

/* ─── Auth API ─── */
export const authAPI = {
  login: (email: string, password: string) =>
    fetchAPI<{ user: any; token: string }>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),

  register: (email: string, username: string, password: string) =>
    fetchAPI<{ user: any; token: string }>("/auth/register", {
      method: "POST",
      body: JSON.stringify({ email, username, password }),
    }),

  me: () => fetchAPI<any>("/auth/me"),
};

/* ─── User API ─── */
export const userAPI = {
  getProgress: (id: string) => fetchAPI<any>(`/users/${id}/progress`),
  updateSettings: (data: any) => fetchAPI<any>('/users/settings', {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
};

/* ─── Chapters API ─── */
export const chaptersAPI = {
  list: (category?: string, difficulty?: string) => {
    const params = new URLSearchParams();
    if (category) params.set("category", category);
    if (difficulty) params.set("difficulty", difficulty);
    const qs = params.toString();
    return fetchAPI<any[]>(`/chapters${qs ? `?${qs}` : ""}`);
  },
  get: (id: string) => fetchAPI<any>(`/chapters/${id}`),
  submit: (id: string, code: string, language: string) =>
    fetchAPI<any>(`/chapters/${id}/submit`, {
      method: "POST",
      body: JSON.stringify({ code, language }),
    }),
  getQuizStatus: (id: string) =>
    fetchAPI<{ canAttempt: boolean; cooldownRemaining: number }>(`/chapters/${id}/quiz-status`),
  submitQuiz: (id: string, score: number) =>
    fetchAPI<{ success: boolean; message: string; cooldownRemaining: number; rewardClaimed?: boolean; error?: string }>(`/chapters/${id}/submit-quiz`, {
      method: "POST",
      body: JSON.stringify({ score }),
    }),
};

/* ─── Daily Cases API ─── */
export const dailyCasesAPI = {
  getToday: () => fetchAPI<any>("/daily-cases"),
  submit: (id: string, code: string, language: string) =>
    fetchAPI<any>(`/daily-cases/${id}/submit`, {
      method: "POST",
      body: JSON.stringify({ code, language }),
    }),
};

/* ─── Shop API ─── */
export const shopAPI = {
  list: () => fetchAPI<any[]>("/coins/shop"),
  purchase: (id: string, quantity?: number) =>
    fetchAPI<any>(`/coins/shop/${id}/purchase`, {
      method: "POST",
      body: JSON.stringify({ quantity: quantity || 1 }),
    }),
};

/* ─── Community API ─── */
export const communityAPI = {
  getPosts: (category?: string, limit?: number) => {
    const params = new URLSearchParams();
    if (category) params.set("category", category);
    if (limit) params.set("limit", String(limit));
    const qs = params.toString();
    return fetchAPI<any[]>(`/community/posts${qs ? `?${qs}` : ""}`);
  },
  createPost: (title: string, content: string, category: string, tags?: string[]) =>
    fetchAPI<any>("/community/posts", {
      method: "POST",
      body: JSON.stringify({ title, content, category, tags }),
    }),
  getComments: (postId: string) =>
    fetchAPI<any[]>(`/community/posts/${postId}/comments`),
  addComment: (postId: string, content: string) =>
    fetchAPI<any>(`/community/posts/${postId}/comments`, {
      method: "POST",
      body: JSON.stringify({ content }),
    }),
  likePost: (postId: string) =>
    fetchAPI<any>(`/community/posts/${postId}/like`, {
      method: "POST",
    }),
};

/* ─── Leaderboard API ─── */
export const leaderboardAPI = {
  global: (limit?: number) => {
    const qs = limit ? `?limit=${limit}` : "";
    return fetchAPI<any[]>(`/leaderboard${qs}`);
  },
  weekly: () => fetchAPI<any[]>("/leaderboard/weekly"),
};
