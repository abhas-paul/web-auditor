export const analyzeSecurity = async (url: string) => {
  const response = await fetch(url);

  const headers = response.headers;

  return {
    csp: !!headers.get("content-security-policy"),

    hsts: !!headers.get(
      "strict-transport-security"
    ),

    xFrameOptions: !!headers.get(
      "x-frame-options"
    ),

    xContentTypeOptions: !!headers.get(
      "x-content-type-options"
    ),

    server: headers.get("server"),

    poweredBy: headers.get("x-powered-by"),
  };
};