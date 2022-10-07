beforeAll(() => {
  vi.useFakeTimers();

  const date = new Date('2022-02-01T14:30:30.000Z');

  vi.setSystemTime(date);
});

afterAll(() => {
  vi.useRealTimers();
});
