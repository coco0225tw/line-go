export interface SearchPlaneData {
  searchPlaneResponse: PlaneResponse[];
  modifiedTime: string;
}

export interface PlaneResponse {
  FlightDate: Date;
  FlightNumber: string;
  AirRouteType: number;
  AirlineID: string;
  DepartureAirportID: string;
  ArrivalAirportID: string;
  ScheduleDepartureTime: Date;
  ActualDepartureTime: Date;
  EstimatedDepartureTime: Date;
  DepartureRemark: string;
  DepartureRemarkEn: string;
  Terminal: string;
  Gate: string;
  Apron: string;
  CodeShare: string;
  IsCargo: boolean;
  AcType: string;
  BaggageClaim: string;
  CheckCounter: string;
  UpdateTime: string;
}

export interface SearchPlaneState {
  isSearchWaiting: boolean;
  lastModifiedTime: string;
  searchPlanes: PlaneResponse[];
  setLastModifiedTime: (payload: string) => void;
  setIsSearchWaiting: (payload: boolean) => void;
  setSearchPlanes: (payload: PlaneResponse[]) => void;
}
