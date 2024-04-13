import { useSearchPlaneStore } from './store';
import { searchPlaneRepo } from '@/app/utils/repoUtility';
import { PlaneResponse } from './interface';
import { usePopUpStore } from '../popUp/store';
import { ShowPopUpType } from '@/app/utils/enum';

export const useSearchPlane = () => {
  const { showPopUp } = usePopUpStore((state) => state);

  const { isSearchWaiting, setIsSearchWaiting, lastModifiedTime, setSearchPlanes, setLastModifiedTime, searchPlanes } =
    useSearchPlaneStore();

  const searchPlane = (userAirline: string) => {
    if (isSearchWaiting) return;
    setIsSearchWaiting(true);
    searchPlaneHandler(userAirline);
  };

  const findPlaneAndShowPopup = (planeData: PlaneResponse[], userAirline: string) => {
    const isUserPlaneExist =
      planeData.findIndex((plane: PlaneResponse) => plane.AirlineID + plane.FlightNumber === userAirline) >= 0;
    if (isUserPlaneExist) showPopUp(ShowPopUpType.SUCCESS);
    else {
      showPopUp(ShowPopUpType.ERROR);
    }
  };

  const searchPlaneHandler = (userAirline: string) => {
    searchPlaneRepo
      .searchPlane(lastModifiedTime)
      .then((data) => {
        setIsSearchWaiting(false);
        const { searchPlaneResponse, modifiedTime } = data;
        findPlaneAndShowPopup(searchPlaneResponse, userAirline);
        setSearchPlanes(searchPlaneResponse);
        setLastModifiedTime(modifiedTime);
      })
      .catch((err: Error) => {
        if (err.message === '304') {
          findPlaneAndShowPopup(searchPlanes, userAirline);
        }
        setIsSearchWaiting(false);
      });
  };

  return { searchPlane };
};
