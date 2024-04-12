import { delay } from '@/utils/utils';
import { SearchPlaneData, PlaneResponse } from './interface';
export const SearchPlaneRepository = (mockData: Promise<SearchPlaneData>): SearchPlaneApiUtility => {
  const apiUtil =
    process.env['NODE_ENV'] === 'development' ? new MockSearchPlaneApiUtility(mockData) : new SearchPlaneApiUtility();
  return apiUtil;
};

class SearchPlaneApiUtility implements ISearchPlaneApiUtility {
  async searchPlane(token: string, lastModified: string): Promise<SearchPlaneData> {
    const res = await fetch(
      'https://tdx.transportdata.tw/api/basic/v2/Air/FIDS/Airport/Departure/TPE?$orderby=ScheduleDepartureTime&$format=JSON',
      {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          //Authorization: token, //todo
          'if-modified-since': lastModified,
        },
      }
    );
    try {
      const result = await res.json();
      const lastModifiedHeader = res.headers.get('last-modified');
      const data: SearchPlaneData = {
        searchPlaneResponse: result as PlaneResponse[],
        modifiedTime: lastModifiedHeader as string,
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
  async searchPlane(token: string, lastModified: string): Promise<SearchPlaneData> {
    await delay(2500);
    return this.mockData;
  }
}

interface ISearchPlaneApiUtility {
  searchPlane: (token: string, lastModified: string) => Promise<SearchPlaneData>;
}
