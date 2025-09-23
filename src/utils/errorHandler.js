import axios from "axios";

const normalizeResponseData = (data) => {
  if (!data) {
    return data;
  }

  if (typeof data === "string") {
    return data;
  }

  try {
    return JSON.parse(JSON.stringify(data));
  } catch (err) {
    return data;
  }
};

export const getAxiosErrorDetails = (error) => {
  if (!error) {
    return {};
  }

  if (!axios.isAxiosError(error)) {
    if (error instanceof Error) {
      return { message: error.message };
    }

    return { message: String(error) };
  }

  const { response, config, message, code } = error;

  return {
    message,
    code,
    status: response?.status,
    statusText: response?.statusText,
    data: normalizeResponseData(response?.data),
    method: config?.method,
    url: config?.url,
  };
};

export const getAxiosErrorMessage = (error, fallback = "An unexpected error occurred") => {
  if (!error) {
    return fallback;
  }

  if (!axios.isAxiosError(error)) {
    return error?.message || fallback;
  }

  const { response, message } = error;
  const responseData = response?.data;

  if (typeof responseData === "string" && responseData.trim().length > 0) {
    return responseData;
  }

  if (responseData?.message && typeof responseData.message === "string") {
    return responseData.message;
  }

  if (responseData?.error && typeof responseData.error === "string") {
    return responseData.error;
  }

  return message || fallback;
};

export const getAxiosErrorFooter = (error) => {
  if (!axios.isAxiosError(error)) {
    return undefined;
  }

  const { response, code } = error;
  const footerParts = [];

  if (response?.status) {
    const statusLabel = response.statusText ? `${response.status} ${response.statusText}` : `${response.status}`;
    footerParts.push(`Status: ${statusLabel}`);
  }

  if (code) {
    footerParts.push(`Code: ${code}`);
  }

  return footerParts.length ? footerParts.join(" | ") : undefined;
};

export const logAxiosError = (context, error, extraContext = {}) => {
  const details = getAxiosErrorDetails(error);
  const payload = Object.keys(extraContext).length ? { ...details, context: extraContext } : details;

  if (context) {
    console.error(`[${context}]`, payload);
  } else {
    console.error(payload);
  }
};

