export const runLighthouseAudit = async (url: string) => {
  try {
    console.log(`Running audit for ${url}`);

    return {
      success: true,
    };
  } catch (error) {
    console.error(error);

    throw new Error("Failed to run Lighthouse audit");
  }
};