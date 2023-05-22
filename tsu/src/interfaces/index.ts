export interface CountryType {
  value: string;
  latitude: number;
  longitude: number;
  label: string;
  distance?: number | null;
  direction?: string | null;
}
