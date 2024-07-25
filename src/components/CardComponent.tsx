import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { Eventos } from "../interfaces/eventos";
import { formatDate } from "../utils/dateUtil";
import { cleanHtml } from "../utils/cleanHtml";
import { getFirstImage } from "../utils/getFirstImage";
import { formatUrlString } from "../utils/formatUrlString";

interface CardComponentProps {
  dataEvent: Eventos;
}

export const CardComponent: FC<CardComponentProps> = ({ dataEvent }) => {
  const [isHovered, setIsHovered] = useState(false);

  const sameDate = dataEvent.data_inici === dataEvent.data_fi;
  const startDate = new Date(dataEvent.data_inici);
  const endDate = new Date(dataEvent.data_fi);
  const sameYear = startDate.getFullYear() === endDate.getFullYear();
  const cleanedHorari = cleanHtml(dataEvent.horari);
  const firstImage = getFirstImage(dataEvent.imatges);
  const urlDenominaci = formatUrlString(dataEvent.denominaci);

  return (
    <Link
      to={`/detalle/${dataEvent.codi}/${urlDenominaci}`}
      style={{ textDecoration: "none" }}
    >
      <div
        className={`card p-3 ${isHovered ? "hover" : ""}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="mb-2 date-text">
          {!sameDate && <> Del </>}
          {formatDate(dataEvent.data_inici, sameDate || !sameYear)}
          {!sameDate && <> al {formatDate(dataEvent.data_fi)}</>}
        </div>
        <h3>{dataEvent.denominaci}</h3>
        {cleanedHorari && <div className="horari-text">{cleanedHorari}</div>}
        {firstImage && (
          <img
            src={firstImage}
            alt={dataEvent.denominaci}
            className="event-image"
          />
        )}
      </div>
    </Link>
  );
};
