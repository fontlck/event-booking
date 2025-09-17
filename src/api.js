import { API_BASE } from './config';

async function request(entity, action, payload = null) {
  const url = `${API_BASE}?entity=${entity}&action=${action}`;
  const options = payload ? {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  } : {};
  const res = await fetch(url, options);
  if (!res.ok) throw new Error(`API ${res.status}`);
  return res.json();
}

export const ModelsAPI = {
  list: () => request("models", "list"),
  create: (payload) => request("models", "create", payload),
  update: (id, payload) => request("models", "update", { id, ...payload }),
  remove: (id) => request("models", "delete", { id })
};

export const EventsAPI = {
  list: () => request("events", "list"),
  create: (payload) => request("events", "create", payload),
  update: (id, payload) => request("events", "update", { id, ...payload }),
  remove: (id) => request("events", "delete", { id })
};
