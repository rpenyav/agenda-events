import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchDetail } from "../services/dataService";
import { Eventos } from "../interfaces/eventos";
import { getAllImages } from "../utils/getFirstImage";
import LoaderComponent from "../components/LoaderComponent";
import { cleanHtml } from "../utils/cleanHtml";
import { formatDate } from "../utils/dateUtil";
import MapaEvento from "../components/MapaEvento";

const Detalle: React.FC = () => {
  const { codi } = useParams<{ codi: string }>();
  const [dataEvent, setDataEvent] = useState<Eventos | null>(null);

  useEffect(() => {
    const getData = async () => {
      if (codi) {
        const eventData = await fetchDetail(codi);
        if (eventData.length > 0) {
          setDataEvent(eventData[0]);
        }
      }
    };
    getData();
  }, [codi]);

  useEffect(() => {
    const descriptionElement = document.querySelector(".description-html");
    if (descriptionElement) {
      const links = descriptionElement.querySelectorAll("a");
      links.forEach((link) => {
        link.setAttribute("target", "_blank");
      });
    }
  }, [dataEvent]);

  if (!dataEvent) {
    return <LoaderComponent />;
  }

  const allImages = getAllImages(dataEvent.imatges);

  const sameDate = dataEvent.data_inici === dataEvent.data_fi;
  const startDate = new Date(dataEvent.data_inici);
  const endDate = new Date(dataEvent.data_fi);
  const sameYear = startDate.getFullYear() === endDate.getFullYear();
  const cleanedHorari = cleanHtml(dataEvent.horari);

  const fields = [
    { label: "Adreça", value: dataEvent.adre_a },
    { label: "Comarca i Municipi", value: dataEvent.comarca_i_municipi },
    { label: "Email", value: dataEvent.email },
    { label: "Espai", value: dataEvent.espai },
    { label: "Telèfon", value: dataEvent.tel_fon },
    { label: "URL", value: dataEvent.url },
  ];

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {dataEvent.denominaci}
          </li>
        </ol>
      </nav>

      <div className="row">
        <div className="col-md-3 order-md-1 order-2">
          <div className="images-container">
            {allImages.map((image: string | undefined, index: number) => (
              <img
                key={index}
                src={image}
                alt={`${dataEvent.denominaci} ${index + 1}`}
                className="event-image"
              />
            ))}
          </div>
        </div>
        <div className="col-md-9 order-md-2 order-1">
          <div className="mb-2 date-text-big">
            {!sameDate && <> Del </>}
            {formatDate(dataEvent.data_inici, sameDate || !sameYear)}
            {!sameDate && <> al {formatDate(dataEvent.data_fi)}</>}
          </div>
          {cleanedHorari && (
            <div className="horari-text-big">{cleanedHorari}</div>
          )}
          <h1 className="mt-3 mb-4">{dataEvent.denominaci}</h1>
          <div
            className="description-html"
            dangerouslySetInnerHTML={{ __html: dataEvent.descripcio_html }}
          />
          <div className="mb-3">
            <strong>Entrades:</strong> {dataEvent.entrades}
          </div>

          <div className="row">
            <div className="col-md-4">
              <div className="card p-2 me-2">
                <ul>
                  {fields.map(
                    (field, index) =>
                      field.value && <li key={index}>{field.value}</li>
                  )}
                </ul>
              </div>
            </div>
            <div className="col-md-8">
              <div>
                <MapaEvento
                  latitud={parseFloat(dataEvent.latitud)}
                  longitud={parseFloat(dataEvent.longitud)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detalle;
