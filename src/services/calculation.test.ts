import { calculateExpression } from './calculation';

global.fetch = jest.fn();

const mockFetch = (ok: boolean, data: any) => {
  (global.fetch as jest.Mock).mockImplementationOnce(() =>
    Promise.resolve({
      ok: ok,
      json: () => Promise.resolve(data),
    })
  );
};

describe('calculateExpression', () => {
  it('should return result for valid expression', async () => {
    const mockResult = { result: 42 };
    mockFetch(true, mockResult);

    const response = await calculateExpression('21 + 21');
    expect(response).toEqual(mockResult);
    expect(global.fetch).toHaveBeenCalledWith(
      `${process.env.NEXT_PUBLIC_CALCULATOR_API_URL}/calculate`,
      expect.anything()
    );
  });

  it('should throw an error for invalid expression', async () => {
    const mockError = { message: 'Invalid expression' };
    mockFetch(false, mockError);

    await expect(calculateExpression('invalid')).rejects.toThrow('Invalid expression');
  });
});
