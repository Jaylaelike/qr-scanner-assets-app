import { useEffect, useState } from "react";
import { Buffer } from "buffer";
import axios from "axios";
import { useParams } from "react-router-dom";
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
      <div className="py-12">
        <img
          src={data}
          className="h-auto max-w-full"
          width={200}
          height={200}
        />
      </div>
    </div>
  );
}

export default FetchImage;
