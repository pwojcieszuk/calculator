const API_URL = process.env.NEXT_PUBLIC_CALCULATOR_API_URL;

interface CalculationResponse {
  result: number | string;
}

export const calculateExpression = async (expression: string): Promise<CalculationResponse> => {
  try {
    const response = await fetch(`${API_URL}/calculate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ expression }),
    });

      if (!response.ok) {
        const errorBody = await response.json();
        throw new Error(errorBody.message ?? 'There was an error calculating the expression.');
     }

    return await response.json() as CalculationResponse;
  } catch (error) {
    // Re-throw the error for handling in the component
    throw error;
  }
};
