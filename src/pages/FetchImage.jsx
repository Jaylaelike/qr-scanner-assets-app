import { useEffect, useState } from "react";
import { Buffer } from "buffer";
import axios from "axios";
import { useParams } from "react-router-dom";
import ReactLoading from "react-loading";
function FetchImage() {
  const { id } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    let abortController = new AbortController();
    const fetchImage = async () => {
      try {
        const response = await axios.get(
          import.meta.env.VITE_API_URL_IMAGES + "/" + `${id}` + ".jpg",
          {
            responseType: "arraybuffer",
            signal: abortController.signal,
          }
        );
        const base64Image = Buffer.from(response.data, "binary").toString(
          "base64"
        );
        const dataURL = `data:${response.headers["content-type"]};base64,${base64Image}`;
        setData(dataURL);
        console.log(data);
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    fetchImage();
    return () => abortController.abort();
  }, [id]);

  return (
    <div className="flex justify-center">
      {data?.length === 0 ? (
        <div className="justify-items-center">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            🤷🏼‍♂️ ไม่พบรูปภาพของอุปกรณ์!!! 🤷🏼‍♂️
          </h5>
          <div className="flex justify-center">
            <ReactLoading
              type="spin"
              color="red"
            />
          </div>
        </div>
      ) : (
        <div className="flex justify-center">
          <div className="py-5">
            <img
              src={data}
              className="h-auto max-w-full"
              width={300}
              height={300}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default FetchImage;
