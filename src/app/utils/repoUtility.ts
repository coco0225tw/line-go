import { SearchPlaneRepository } from '../lib/searchPlane/repo';
import { searchPlaneMock } from './mockData';

export const searchPlaneRepo = SearchPlaneRepository(searchPlaneMock);
