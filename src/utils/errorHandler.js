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
      return {
        message: error.message,
        name: error.name,
      };
    }

    return { message: String(error) };
  }

  const { response, config, message, code, name, stack } = error;

  return {
    message,
    code,
    name,
    stack,
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
  const hasExtraContext = extraContext && Object.keys(extraContext).length > 0;
  const payload = hasExtraContext ? { ...details, context: extraContext } : details;

  if (context && error) {
    console.error(`[${context}]`, payload, error);
    return;
  }

  if (context) {
    console.error(`[${context}]`, payload);
    return;
  }

  if (error) {
    console.error(payload, error);
    return;
  }

  console.error(payload);
};

