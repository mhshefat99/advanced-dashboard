import { v4 as uuidv4 } from "uuid";
import axios from "axios";

const BASE_URL = "http://localhost:3000";

const handleError = (error) => {
  if (error.response) {
    // Server responded with an error status (4xx, 5xx)
    return {
      success: false,
      message: `Server Error (${error.response.status}): ${
        error.response.data?.message || "Something went wrong"
      }`,
      status: error.response.status,
      data: error.response.data || null,
    };
  } else if (error.request) {
    // Request was made, but no response received (network issues)
    return {
      success: false,
      message: "No response from server. Please check your network connection.",
      status: null,
      data: null,
    };
  } else {
    // Other errors (e.g., Axios misconfiguration)
    return {
      success: false,
      message: `Request Error: ${error.message}`,
      status: null,
      data: null,
    };
  }
};

const getOrders = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/orders`);
    return {
      success: true,
      totalCount: response.headers["x-total-count"] || response.data.length,
      data: response.data,
    };
  } catch (error) {
    return handleError(error);
  }
};
const getOrderById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/orders/${id}`);
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    handleError(error);
  }
};
const createOrder = async (order) => {
  const newOrder = { ...order, id: uuidv4() };
  try {
    const response = await axios.post(`${BASE_URL}/orders`, newOrder, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    handleError(error);
  }
};
const editOrderById = async (order, id) => {
  try {
    const response = await axios.put(`${BASE_URL}/orders/${id}`, order, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    handleError(error);
  }
};
const deleteOrderById = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/orders/${id}`);
    return {
      success: true,
    };
  } catch (error) {
    handleError(error);
  }
};

export { getOrders, getOrderById, createOrder, editOrderById, deleteOrderById };
