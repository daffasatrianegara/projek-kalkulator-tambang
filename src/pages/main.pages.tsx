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

const MainPage = () => {
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [area, setArea] = useState(0);
  const [stepData, setStepData] = useState({
    1: { deduct_value: 0 },
    2: { deduct_value: 0 },
    3: { deduct_value: 0 },
    4: { deduct_value: 0 },
    5: { deduct_value: 0 },
    6: { deduct_value: 0 },
    7: { deduct_value: 0 },
  });

  useEffect(() => {
    if (width && length) {
      setArea(calculateArea(length, width));
    }
  }, [width, length]);

  const handleDataUpdate = (stepNumber: number, data: any) => {
    setStepData((prev) => ({
      ...prev,
      [stepNumber]: data,
    }));
  };

  return (
    <div className="w-full min-h-screen py-20 bg-sea-green flex justify-center items-center">
      <Toaster position="top-right" richColors />
      <div className="lg:w-[80%] md:w-[90%] w-[95%] h-full bg-alabaster p-8 rounded-lg">
        <div className="mb-8">
          <p className="text-center font-bold text-2xl md:text-3xl text-crayola">
            URCI Calculator
          </p>
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
              placeholder="Enter the length of the road you measured..."
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
              placeholder="Enter the width of the road you are measuring..."
              onChange={(e) => setWidth(e.target.value)}
              required
            />
          </div>
          <div className="w-full sm:w-1/3">
            <label
              className="font-semibold text-crayola text-lg sm:text-xl"
              htmlFor="luk"
            >
              measured road area (m²) <span className="text-vermilion">*</span>
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
        <div className="mt-7 flex flex-col gap-7">
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
        </div>

        {/* delete when the project up to deployment  */}
        <div className="mt-4">
          <h3 className="font-bold text-crayola">Deduct Values per Step:</h3>
          <ul>
            {Object.entries(stepData).map(([stepNumber, data]) => (
              <li key={stepNumber}>
                Step {stepNumber}: {data.deduct_value}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
