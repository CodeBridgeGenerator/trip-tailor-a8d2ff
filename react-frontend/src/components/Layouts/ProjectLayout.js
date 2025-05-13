import AppSideBar from "./appSideBar/AppSideBar.js";

/*

import ProductsPage from "../ProductsPage/ProductsPage";
import ItinerariesPage from "../ItinerariesPage/ItinerariesPage";
import ItineraryCitiesPage from "../ItineraryCitiesPage/ItineraryCitiesPage";
import DayPlansPage from "../DayPlansPage/DayPlansPage";
import ActivitiesPage from "../ActivitiesPage/ActivitiesPage";
import BookmarksPage from "../BookmarksPage/BookmarksPage";
import PaymentsPage from "../PaymentsPage/PaymentsPage";
import ReceiptsPage from "../ReceiptsPage/ReceiptsPage";
~cb-add-import~

~cb-add-services-card~

case "products":
                return <ProductsPage />;
case "itineraries":
                return <ItinerariesPage />;
case "itineraryCities":
                return <ItineraryCitiesPage />;
case "dayPlans":
                return <DayPlansPage />;
case "activities":
                return <ActivitiesPage />;
case "bookmarks":
                return <BookmarksPage />;
case "payments":
                return <PaymentsPage />;
case "receipts":
                return <ReceiptsPage />;
~cb-add-thurthy~

*/

const AppLayout = (props) => {
  const { children, activeKey, activeDropdown } = props;

  return (
    <div className="flex min-h-[calc(100vh-5rem)] mt-20 bg-white">
      <AppSideBar activeKey={activeKey} activeDropdown={activeDropdown} />
      <div className="flex-1 ml-2">{children}</div>
    </div>
  );
};

export default AppLayout;
