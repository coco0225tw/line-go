import { useSearchPlaneStore } from './store';
import { searchPlaneRepo } from '@/utils/repoUtility';
import { PlaneResponse } from './interface';
import { usePopUpStore } from '../popUp/store';
import { ShowPopUpType } from '@/utils/enum';

export const useSearchPlane = () => {
  const { showPopUp } = usePopUpStore();

  const { isSearchWaiting, setIsSearchWaiting, lastModifiedTime, setSearchPlanes, setLastModifiedTime, searchPlanes } =
    useSearchPlaneStore();

  const searchPlane = (userAirline: string) => {
    if (isSearchWaiting) return;
    setIsSearchWaiting(true);
    searchPlaneHandler(userAirline);
  };

  const compareDates = (prev: string, now: string) => {
    return prev === now;
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
    const token = '123'; //todo
    searchPlaneRepo
      .searchPlane(token, lastModifiedTime)
      .then((data) => {
        setIsSearchWaiting(false);
        const { searchPlaneResponse, modifiedTime } = data;
        const isSameDate = compareDates(lastModifiedTime, modifiedTime);
        if (!isSameDate) {
          findPlaneAndShowPopup(searchPlaneResponse, userAirline);
          setSearchPlanes(searchPlaneResponse);
          setLastModifiedTime(modifiedTime);
        } else {
          findPlaneAndShowPopup(searchPlanes, userAirline);
        }
      })
      .catch((err) => {
        setIsSearchWaiting(false);
      });
  };

  return { searchPlane };
};
