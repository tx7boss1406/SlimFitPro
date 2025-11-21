import axios from "axios";

const API_URL = "https://slimfitpro-backend.onrender.com";

export type OverviewData = {
  totalXp: number;
  totalMissonsCompleted: number;
  level: number;
  unlocked: string[];
};

export type MissionReport = {
  completed: number;
  pending: number;
  missions: Array<{
    id: number;
    titulo: string;
    status: string;
  }>;
};

export type ConsistencyReport = {
  streak: number;
  lastCompletion: string | null;
};

export async function getOverview(userId: number) {
  try {
    const res = await axios.get(`${API_URL}/reports/overview/${userId}`);
    return res.data;
  } catch (err) {
    console.error("Erro ao buscar relatório overview:", err);
    throw err;
  }
}

export async function getMissionReport(userId: number) {
  try {
    const res = await axios.get(`${API_URL}/reports/missions/${userId}`);
    return res.data;
  } catch (err) {
    console.error("Erro ao buscar relatório de missões:", err);
    throw err;
  }
}

export async function getConsistency(userId: number) {
  try {
    const res = await axios.get(`${API_URL}/reports/consistency/${userId}`);
    return res.data;
  } catch (err) {
    console.error("Erro ao buscar relatório de consistência:", err);
    throw err;
  }
}
