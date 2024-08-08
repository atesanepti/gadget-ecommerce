import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

const Rating = ({
  value,
  text,
  style = {
    text_size: "text-xs md:text-sm",
  },
}) => {
  const fullStar = Math.floor(value);
  const halfStar = value - fullStar >= 0.5 ? 1 : 0;
  const emptyStar = 5 - fullStar - halfStar;

  return (
    <div className="flex gap-2 text-white items-center">
      {[...Array(fullStar)].map((_, index) => (
        <FaStar key={index} className={`${style.text_size}`} />
      ))}
      {halfStar === 1 && <FaStarHalfAlt className={`${style.text_size}`} />}
      {[...Array(emptyStar)].map((_, index) => (
        <FaRegStar className={`${style.text_size}`} key={index} />
      ))}

      <span className={`text-white text-xs md:text-sm capitalize`}>{text && text}</span>
    </div>
  );
};

export default Rating;
