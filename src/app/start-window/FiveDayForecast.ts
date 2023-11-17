
export class FiveDayForecast {
  constructor(
    public TempList: number[],
    public PressureList: number[],
    public PrecipitationList: number[],
    public MaxTemp: number,
    public MinTemp: number,
    public DayOfWeek: string,
  ) { }
}
