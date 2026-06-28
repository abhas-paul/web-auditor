import api from "@/lib/axios";

export const downloadReportPdf = async (reportId) => {
  const response = await api.get(
    `/reports/${reportId}/pdf`,
    {
      responseType: "blob",
    }
  );

  return response.data;
};