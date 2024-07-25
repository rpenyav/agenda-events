import axios from "axios";
import { Eventos } from "../interfaces/eventos";

const appToken = "KU8ylV4QkNBc4JS8USXRkk0jW";

interface FetchDataResult {
  data: Eventos[];
  totalRecords: number;
}

const fetchData = async (): Promise<FetchDataResult> => {
  const response = await axios.get(
    "https://analisi.transparenciacatalunya.cat/resource/rhpv-yr4f.json",
    {
      headers: {
        "X-App-Token": appToken,
      },
      params: {
        $order: "data_inici DESC",
      },
    }
  );

  const filteredData = response.data.filter(
    (event: any) => event.data_inici !== "9999-09-09T00:00:00.000"
  );

  const uniqueData = filteredData.reduce((acc: Eventos[], current: Eventos) => {
    const x = acc.find((item) => item.codi === current.codi);
    if (!x) {
      return acc.concat([current]);
    } else {
      return acc;
    }
  }, []);

  const totalRecords = uniqueData.length;

  return {
    data: uniqueData,
    totalRecords,
  };
};

const fetchDetail = async (codi: string): Promise<Eventos[]> => {
  const response = await axios.get(
    `https://analisi.transparenciacatalunya.cat/resource/rhpv-yr4f.json`,
    {
      headers: {
        "X-App-Token": appToken,
      },
      params: {
        codi,
      },
    }
  );

  return response.data;
};

export { fetchData, fetchDetail };
