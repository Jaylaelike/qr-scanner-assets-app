import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ReactLoading from "react-loading";

function FetchDetial() {
  const { id } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    let abortController = new AbortController();
    const fetchData = async () => {
      try {
        const response = await axios.get(
          // `http://192.168.1.198:4000/api/assets/${id}`,
          import.meta.env.VITE_API_URL + "/" + `${id}`,
          {
            signal: abortController.signal,
          }
        ); // Replace with your API endpoint
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.log("Error is :", error);
      }
    };
    fetchData();
    return () => abortController.abort();
  }, [id]);

  return (
    <>
      <section className="bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%">
        <div className=" justify-items-start pt-6 max-w-5xl p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          {data?.length === 0 ? (
            <>
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                🤷🏼‍♂️ ไม่พบอุปกรณ์ในระบบ!!! 🤷🏼‍♂️
              </h5>
              <ReactLoading
                type="spin"
                color="red"
                height={"40%"}
                width={"40%"}
              />
            </>
          ) : (
            <div className="justify-items-start">
              <div className="justify-items-start">
                <h1 className="text-4xl  dark:text-white">ข้อมูลของอุปกรณ์</h1>
                <h2 className="text-3xl  dark:text-white">ID: {data[0].No}</h2>
                <h2 className="text-3xl  dark:text-white">
                  Asset_No: {data[0].Asset_No}
                </h2>
                <h2 className="text-3xl  dark:text-white">
                  Brand: {data[0].Brand}
                </h2>
                <h2 className="text-3xl  dark:text-white">
                  Model: {data[0].Model}
                </h2>
                <h2 className="text-3xl  dark:text-white">
                  Serial_No: {data[0].Serial_No}
                </h2>
                <p>{data.Location}</p>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default FetchDetial;
