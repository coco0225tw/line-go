import { delay } from '@/app/utils/utils';
import { SearchPlaneData, PlaneResponse } from './interface';
export const SearchPlaneRepository = (mockData: Promise<SearchPlaneData>): SearchPlaneApiUtility => {
  const apiUtil =
    process.env['NODE_ENV'] === 'development' ? new MockSearchPlaneApiUtility(mockData) : new SearchPlaneApiUtility();
  return apiUtil;
};

class SearchPlaneApiUtility implements ISearchPlaneApiUtility {
  async searchPlane(lastModified: string): Promise<SearchPlaneData> {
    const res = await fetch(
      'https://tdx.transportdata.tw/api/basic/v2/Air/FIDS/Airport/Departure/TPE?$orderby=ScheduleDepartureTime&$format=JSON',
      {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
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

      if (res.status === 304) throw new Error('304');

      return data;
    } catch (err: any) {
      throw err;
    }
  }
}

class MockSearchPlaneApiUtility implements ISearchPlaneApiUtility {
  private mockData: Promise<SearchPlaneData>;

  constructor(mockData: Promise<SearchPlaneData>) {
    this.mockData = mockData;
  }
  async searchPlane(lastModified: string): Promise<SearchPlaneData> {
    await delay(2500);
    return this.mockData;
  }
}

interface ISearchPlaneApiUtility {
  searchPlane: (lastModified: string) => Promise<SearchPlaneData>;
}
