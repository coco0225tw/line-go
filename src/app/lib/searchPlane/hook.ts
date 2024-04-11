import { useSearchPlaneStore } from './store';
import { searchPlaneRepo } from '@/app/repoUtility';
import { useUserStore } from '../user/store';
import { PlaneResponse } from './interface';
import { usePopUpStore } from '../popUp/store';
import { PopUpType } from '@/app/enum';

export const useSearchPlane = () => {
  const { userPlane } = useUserStore();
  const { showPopUp } = usePopUpStore();

  const { isSearchWaiting, setIsSearchWaiting, lastModifiedTime, setSearchPlanes, setLastModifiedTime, searchPlanes } =
    useSearchPlaneStore();

  const searchPlane = () => {
    if (isSearchWaiting) return;
    setIsSearchWaiting(true);
    searchPlaneHandler();
  };

  const compareDates = (prev: Date, now: Date) => {
    let prevDate = new Date(prev).getTime();
    let nowDate = new Date(now).getTime();
    return prevDate === nowDate;
  };

  const findPlaneAndShowPopup = (planeData: PlaneResponse[]) => {
    const isUserPlaneExist =
      -1 !== planeData.findIndex((plane: PlaneResponse) => plane.AirlineID + plane.FlightNumber === userPlane);
    if (isUserPlaneExist) showPopUp(PopUpType.SUCCESS);
    showPopUp(PopUpType.ERROR);
  };

  const searchPlaneHandler = () => {
    searchPlaneRepo
      .searchPlane()
      .then((data) => {
        setIsSearchWaiting(false);
        const { searchPlaneResponse, modifiedTime } = data;
        const isSameDate = compareDates(lastModifiedTime, modifiedTime);
        if (!isSameDate) {
          setSearchPlanes(searchPlaneResponse);
          setLastModifiedTime(modifiedTime);
          findPlaneAndShowPopup(searchPlaneResponse);
        } else {
          findPlaneAndShowPopup(searchPlanes);
        }
      })
      .catch((err) => {
        setIsSearchWaiting(false);
      });
  };

  return { searchPlane };
};
