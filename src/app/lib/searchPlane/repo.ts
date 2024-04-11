import { delay } from '@/app/utils';
import { SearchPlaneData, PlaneResponse } from './interface';
export const SearchPlaneRepository = (mockData: Promise<SearchPlaneData>): SearchPlaneApiUtility => {
  const apiUtil =
    process.env['NODE_ENV'] === 'development' ? new MockSearchPlaneApiUtility(mockData) : new SearchPlaneApiUtility();
  return apiUtil;
};

class SearchPlaneApiUtility implements ISearchPlaneApiUtility {
  async searchPlane(): Promise<SearchPlaneData> {
    const res = await fetch(
      'https://tdx.transportdata.tw/api/basic/v2/Air/FIDS/Airport/Departure/TPE?$orderby=ScheduleDepartureTime&$format=JSON',
      {
        method: 'GET',
        headers: { 'content-type': 'application/json', Authorization: '123', 'If-Modified-Since': '123' },
      }
    );
    try {
      const result = await res.json();
      const header = res.headers.get('Last-Modified');
      const data: SearchPlaneData = {
        searchPlaneResponse: result as PlaneResponse[],
        modifiedTime: header as any as Date,
      };
      if (res.ok || res.status === 403) return data;
      throw new Error();
    } catch (err) {
      throw err;
    }
  }
}

class MockSearchPlaneApiUtility implements ISearchPlaneApiUtility {
  private mockData: Promise<SearchPlaneData>;

  constructor(mockData: Promise<SearchPlaneData>) {
    this.mockData = mockData;
  }
  async searchPlane(): Promise<SearchPlaneData> {
    await delay(2500);
    return this.mockData;
  }
}

interface ISearchPlaneApiUtility {
  searchPlane: () => Promise<SearchPlaneData>;
}
