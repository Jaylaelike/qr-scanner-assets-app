import QrReader from "modern-react-qr-reader";
import { useState } from "react";

import { useHistory } from "react-router-dom";
import { AiOutlinePoweroff } from "react-icons/ai";

function Home() {
  const [result, setResult] = useState("No result");
  const history = useHistory();

  const handleScan = (data) => {
    if (data) {
      setResult(data);
      history.push(`/FetchDetial/${data}`);
      console.log(result);
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  return (
    <>
      <section className="bg-gradient-to-r from-blue-500 from-10% via-green-00 via-30% to-pink-500 to-90%">
        <div className="pt-8 flex justify-center">
          <div className="max-w-sm  border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="justify-items-center">
              <center>
                <QrReader
                  delay={300}
                  facingMode={"environment"}
                  onError={handleError}
                  onScan={handleScan}
                  style={{ height: 220, width: 220 }}
                />
              </center>
            </div>

            <div className="p-5">
              <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  QR-code Assets Scanner
                </h5>
              </a>

              <div className="flex justify-center">
                <a
                  href="/"
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                >
                  <AiOutlinePoweroff />
                  RESET
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default Home;
