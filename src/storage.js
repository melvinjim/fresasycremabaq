import { CONFIG } from "./supabase";

const LS_KEY = "fyc_data_v1";

// Usa la nube solo si completaste los datos de Supabase
const useCloud =
  CONFIG.url && CONFIG.key && !CONFIG.url.includes("TU_") && !CONFIG.key.includes("TU_");

const headers = {
  apikey: CONFIG.key,
  Authorization: `Bearer ${CONFIG.key}`,
  "Content-Type": "application/json",
};

export async function loadData() {
  if (useCloud) {
    try {
      const r = await fetch(
        `${CONFIG.url}/rest/v1/${CONFIG.table}?id=eq.main&select=data`,
        { headers }
      );
      const rows = await r.json();
      if (Array.isArray(rows) && rows[0]) return rows[0].data;
    } catch (e) {
      console.error("Error leyendo de la nube:", e);
    }
    return null;
  }
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export async function saveData(data) {
  if (useCloud) {
    try {
      await fetch(`${CONFIG.url}/rest/v1/${CONFIG.table}?on_conflict=id`, {
        method: "POST",
        headers: { ...headers, Prefer: "resolution=merge-duplicates,return=minimal" },
        body: JSON.stringify({ id: "main", data }),
      });
    } catch (e) {
      console.error("Error guardando en la nube:", e);
    }
    return;
  }
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(data));
  } catch (e) {
    console.error("Error guardando:", e);
  }
}
