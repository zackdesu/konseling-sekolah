import { Link } from "react-router-dom";
import QuotePost from "../Components/quotepost";
import { QuotesData } from "../Components/data";
import Redirectuser from "../utils/redirecthome";

const Quotes = () => {
  Redirectuser();
  return (
    <div className="py-20 flex flex-wrap items-center justify-center mx-5">
      <Link to={"/createfeed"} className="ml-auto normalbutton mr-12">
        + Buat Feed
      </Link>
      {QuotesData.map((e, i) => (
        <QuotePost data={e} key={i} />
      ))}
    </div>
  );
};

export default Quotes;
