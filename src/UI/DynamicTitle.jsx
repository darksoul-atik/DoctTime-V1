import { useEffect } from "react";
import { useLocation } from "react-router";

const useDynamicTitle = (customTitle) => {
  const location = useLocation();

  useEffect(() => {
    const titleMap = {
      "/": "DocTime",
      "/bookings": "Bookings",
      "/blogs": "Blogs",
      "/contact": "Contact",
      "/error404": "Error",
    };

    if (customTitle) {
      document.title = customTitle;
    } else {
      document.title = titleMap[location.pathname] || "DocTime";
    }
  }, [location, customTitle]);
};

export default useDynamicTitle;
