import { useSearchPlaneStore } from './store';
import { searchPlaneRepo } from '@/app/repoUtility';
export const useSearchPlane = () => {
  const { isSearchWaiting, setIsSearchWaiting, lastModifiedTime, setSearchPlanes, setLastModifiedTime } =
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
          console.log('update');
        }
      })
      .catch((err) => {
        setIsSearchWaiting(false);
      });
  };

  return { searchPlane };
};
