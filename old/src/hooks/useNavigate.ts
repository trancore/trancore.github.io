import { useBlocker } from "react-router-dom";

export default function useNavigate() {
  /**
   * 内部遷移を検知し、callbacak関数を実行する。
   * @param callback 関数
   */
  function navigateHandler(callback: () => void) {
    useBlocker(({ currentLocation, nextLocation }) => {
      if (currentLocation.pathname !== nextLocation.pathname) {
        callback();
        return false;
      }
      return true;
    });
  }

  return { navigateHandler };
}
