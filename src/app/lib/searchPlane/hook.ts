import { useSearchPlaneStore } from './store';
import { searchPlaneRepo } from '@/app/repoUtility';
import { PlaneResponse } from './interface';
import { usePopUpStore } from '../popUp/store';
import { ShowPopUpType } from '@/app/enum';

export const useSearchPlane = () => {
  const { showPopUp } = usePopUpStore();

  const { isSearchWaiting, setIsSearchWaiting, lastModifiedTime, setSearchPlanes, setLastModifiedTime, searchPlanes } =
    useSearchPlaneStore();

  const searchPlane = (userAirline: string) => {
    if (isSearchWaiting) return;
    setIsSearchWaiting(true);
    searchPlaneHandler(userAirline);
  };

  const compareDates = (prev: Date, now: Date) => {
    let prevDate = new Date(prev).getTime();
    let nowDate = new Date(now).getTime();
    return prevDate === nowDate;
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
      .searchPlane()
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
