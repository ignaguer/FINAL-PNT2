import axios from "axios";

const URL = "https://api.bluelytics.com.ar/v2/latest";

export async function getValorDolar() {
  try {
    const { data: Valor } = await axios.get(URL);
    return Valor; 
  } catch (error) {
    console.error("Error productos GET:", error);
    return [];
  }
}