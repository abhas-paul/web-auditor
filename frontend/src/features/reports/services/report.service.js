import api from "@/lib/axios";

export const reportService = {
  async generate(url) {
    const { data } = await api.post("/reports/generate-report", {
      url,
    });

    return data;
  },

  async getById(reportId) {
    const { data } = await api.get(
      `/reports/${reportId}`
    );

    return data;
  },

  async getAll() {
    const { data } = await api.get("/reports/");

    return data;
  },
};