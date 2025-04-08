import { useEffect, useState } from "react";
import searchYUrci from "../utils/searchYUrci";
import calculateArea from "../utils/calculateArea";
import { Toaster } from "@/components/ui/sonner";
import RuttingComponent from "../components/step1.rutting.components";
import ImproperComponent from "@/components/step2.improper.components";
import PotholesComponent from "@/components/step3.potholes.components";
import CorrugationComponent from "@/components/step4.corrugation.components";
import LooseComponent from "@/components/step5.loose.components";
import DustComponent from "@/components/step6.dust.components";
import DrainageComponent from "@/components/step7.drainage.components";

const MainPage = () => {
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [area, setArea] = useState(0);
  const [q, setQ] = useState<number>(0);
  const [stepData, setStepData] = useState({
    1: { deduct_value: 0 },
    2: { deduct_value: 0 },
    3: { deduct_value: 0 },
    4: { deduct_value: 0 },
    5: { deduct_value: 0 },
    6: { deduct_value: 0 },
    7: { deduct_value: 0 },
  });
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [status, setStatus] = useState("Not Yet Classified");

  useEffect(() => {
    if (width && length) {
      setArea(calculateArea(length, width));
    }

    const count = Object.values(stepData).filter(
      (data) => data.deduct_value >= 5,
    ).length;
    setQ(count);

    const searchUrciResult = searchYUrci(calculateURCI(), q);
    if (searchUrciResult) {
      setX(searchUrciResult.appr_value);
      setY(searchUrciResult.urci_value);
      setStatus(searchUrciResult.urci_status);
    }
  }, [width, length, stepData]);

  const handleDataUpdate = (stepNumber: number, data: any) => {
    setStepData((prev) => ({
      ...prev,
      [stepNumber]: data,
    }));
  };

  const calculateURCI = () => {
    const totalDeduct = Object.values(stepData).reduce(
      (sum, step) => sum + step.deduct_value,
      0,
    );

    return totalDeduct;
  };

  return (
    <div className="w-full min-h-screen py-20 bg-sea-green flex justify-center items-center">
      <Toaster position="top-right" richColors />
      <div className="lg:w-[80%] md:w-[90%] w-[95%] h-full bg-alabaster p-8 rounded-lg">
        <div className="mb-8">
          <div className="w-full flex justify-center">
            <div className="w-fit flex justify-center items-center gap-2">
              <img className="w-[15%]" src="/logo/logo.png" alt="img_logo" />
              <p className="font-bold text-2xl md:text-3xl text-crayola">
                URCI Calculator
              </p>
            </div>
          </div>
        </div>
        <div className="flex sm:flex-nowrap flex-wrap w-full gap-2">
          <div className="w-full sm:w-1/3">
            <label
              className="font-semibold text-crayola text-lg sm:text-xl"
              htmlFor="pu"
            >
              Measured Road Length (m) <span className="text-vermilion">*</span>
            </label>
            <input
              className="mt-1"
              id="pu"
              type="number"
              placeholder="Masukkan panjang jalan yang Anda ukur..."
              onChange={(e) => setLength(e.target.value)}
              required
            />
          </div>
          <div className="w-full sm:w-1/3">
            <label
              className="font-semibold text-crayola text-lg sm:text-xl"
              htmlFor="lu"
            >
              Measured Road Width (m) <span className="text-vermilion">*</span>
            </label>
            <input
              id="lu"
              className="mt-1"
              type="number"
              placeholder="Masukkan lebar jalan yang Anda ukur..."
              onChange={(e) => setWidth(e.target.value)}
              required
            />
          </div>
          <div className="w-full sm:w-1/3">
            <label
              className="font-semibold text-crayola text-lg sm:text-xl"
              htmlFor="luk"
            >
              Measured Road Area (m²) <span className="text-vermilion">*</span>
            </label>
            <input
              id="luk"
              className="mt-1"
              type="number"
              value={area}
              disabled
            />
          </div>
        </div>
        <div className="mt-8 flex flex-col gap-8">
          {/* rutting  */}
          <RuttingComponent
            onDataUpdate={handleDataUpdate}
            meassuredLength={length}
            meassuredWidth={width}
            meassuredArea={area}
          />

          {/* improper cross section  */}
          <ImproperComponent
            onDataUpdate={handleDataUpdate}
            meassuredLength={length}
            meassuredWidth={width}
            meassuredArea={area}
          />

          {/* potholes  */}
          <PotholesComponent
            onDataUpdate={handleDataUpdate}
            meassuredLength={length}
            meassuredWidth={width}
            meassuredArea={area}
          />

          {/* corrugation  */}
          <CorrugationComponent
            onDataUpdate={handleDataUpdate}
            meassuredLength={length}
            meassuredWidth={width}
            meassuredArea={area}
          />

          {/* loose aggregate  */}
          <LooseComponent
            onDataUpdate={handleDataUpdate}
            meassuredLength={length}
            meassuredWidth={width}
            meassuredArea={area}
          />

          {/* dust  */}
          <DustComponent onDataUpdate={handleDataUpdate} />

          {/* drainage  */}
          <DrainageComponent
            onDataUpdate={handleDataUpdate}
            meassuredLength={length}
            meassuredWidth={width}
            meassuredArea={area}
          />
        </div>

        <div className="w-full bg-white rounded p-5 mt-7">
          <p className="font-semibold text-xl md:text-2xl text-crayola">
            Result:
          </p>
          <div className="flex sm:flex-nowrap flex-wrap w-full gap-5 mt-2">
            <div className="w-full sm:w-1/2">
              <table className="w-full border border-black">
                <thead>
                  <tr>
                    <th
                      className="font-semibold py-1 bg-sea-green text-white border border-black"
                      colSpan={2}
                    >
                      Deduct Value From Each Step
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(stepData).map(([index, data]) => {
                    const arrTitle = [
                      "rutting",
                      "improper cross section",
                      "potholes",
                      "corrugation",
                      "loose aggregate",
                      "dust",
                      "drainage",
                    ];

                    return (
                      <tr key={index}>
                        <th className="border border-black font-normal py-1 capitalize w-[60%]">
                          {arrTitle[Number(index) - 1]}
                        </th>
                        <th className="border border-black font-normal">
                          {data.deduct_value}
                        </th>
                      </tr>
                    );
                  })}
                  <tr>
                    <th className="border border-black semibold py-1 capitalize">
                      total deduct value
                    </th>
                    <th className="border border-black font-semibold">
                      {calculateURCI()}
                    </th>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="w-full sm:w-1/2">
              <table className="w-full border border-black">
                <thead>
                  <tr>
                    <th
                      className="font-semibold py-1 bg-sea-green text-white border border-black"
                      colSpan={2}
                    >
                      URCI Result
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th className="border border-black font-normal py-1 capitalize w-[60%]">
                      deduct value
                    </th>
                    <th className="border border-black font-normal">
                      {calculateURCI()}
                    </th>
                  </tr>
                  <tr>
                    <th className="border border-black font-normal py-1 capitalize w-[60%]">
                      Q {">"}= 5
                    </th>
                    <th className="border border-black font-normal">{q}</th>
                  </tr>
                  <tr>
                    <th className="border border-black font-normal py-1 capitalize w-[60%]">
                      URCI Group
                    </th>
                    <th className="border border-black font-normal">{q}</th>
                  </tr>
                  <tr>
                    <th className="border border-black font-normal py-1 capitalize w-[60%]">
                      density (%)
                    </th>
                    <th className="border border-black font-normal">
                      {calculateURCI()}
                    </th>
                  </tr>
                  <tr>
                    <th className="border border-black font-normal py-1 capitalize w-[60%]">
                      Approximate Value
                    </th>
                    <th className="border border-black font-normal">{x}</th>
                  </tr>
                  <tr>
                    <th className="border border-black font-semibold py-1 capitalize w-[60%] bg-green-200">
                      URCI value
                    </th>
                    <th className="border border-black font-semibold bg-green-200">
                      {y}
                    </th>
                  </tr>
                  <tr>
                    <th className="border border-black font-semibold py-1 capitalize w-[60%] bg-green-200">
                      URCI status
                    </th>
                    <th className="border border-black font-semibold bg-green-200 capitalize">
                      {status}
                    </th>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
