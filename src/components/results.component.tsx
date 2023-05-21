import { h, JSX } from "preact";
import * as styles from "./results.module.less";
import { route } from "preact-router";
import { useRouter } from "preact-router";
import { Holiday } from "../types/booking";

export default function ResultsComponent({
  results,
}: {
  results: Holiday[];
}): JSX.Element {
  return (
    <section className="full-bleed">
      <ul className={`${styles["list"]} wrapper`}>
        {results.map((holiday) => (
          <Result holiday={holiday} />
        ))}
      </ul>
    </section>
  );
}

export const Result = ({ holiday }) => {
  const {
    hotel: {
      content: { hotelDescription, hotelFacilities, images, starRating },
      name: hotelName,
    },
    pricePerPerson,
  } = holiday;

  const stars = starRating
    ? new Array(parseInt(starRating, 10)).fill("★").join("")
    : undefined;

  return (
    <li className={`${styles["item"]} item`}>
      {images.length && (
        <div>
          <img src={images[0].MOBILE_MAIN.url} className={styles["img"]} />
        </div>
      )}
      <div className={styles["details"]}>
        <h3>{hotelName}</h3>
        {stars && <div aria-label={`${starRating} star`}>{stars}</div>}
        <p>{hotelDescription}</p>

        {hotelFacilities.length && (
          <ul className="facilities">
            {hotelFacilities.map((facility) => (
              <li>{facility}</li>
            ))}
          </ul>
        )}
        <div className={styles["ppp"]}>
          £{pricePerPerson}
          <abbr title="per person">pp</abbr>
        </div>
      </div>
    </li>
  );
};
