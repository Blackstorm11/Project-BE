// import { useEffect, useState } from "react";
// import Schedule from "./shadule.json";

// function Upload() {
//   const [num3, setNum3] = useState(null);

//   const multiply = () => {
//     let num1 = 4;
//     let num2 = 9;
//     let result = num1 + num2;
//     setNum3(result);
//   };

//   useEffect(() => {
//     const checkScheduledTime = () => {
//       const currentTime = new Date();
//       const currentDay = currentTime.toLocaleString("en-US", { weekday: "long" });
//       const currentTimeString = currentTime.toLocaleString("en-US", {
//         hour: "numeric",
//         minute: "numeric",
//         hour12: true,
//       });

//       if (currentDay in Schedule) {
//         const subjects = Schedule[currentDay];

//         for (const [subject, time] of Object.entries(subjects)) {
//           const scheduledTime = new Date(`01/01/2023 ${time}`).getTime();
//           const currentTime = new Date(`01/01/2023 ${currentTimeString}`).getTime();

//           if (scheduledTime === currentTime) {
//             console.log("done");
//             multiply();
//             break; // Stop checking further subjects
//           } else {
//             console.log("error");
//           }
//         }
//       }
//     };

//     checkScheduledTime();
//   }, []);

//   return (
//     <>
//       <button onClick={multiply}>Click</button>
//       <h1>{num3}</h1>
//     </>
//   );
// }

// export default Upload;




import { useEffect, useState } from "react";
import Schedule from "./shadule.json";

function Upload() {
  const [num3, setNum3] = useState(null);

  const multiply = () => {
    // const intervalId = setInterval(async () => {
    let num1 = 4;
    let num2 = 9;
    let result = num1 + num2;
    setNum3(result);
  };

  useEffect(() => {
    const checkScheduledTime = () => {
      const currentTime = new Date();
      const currentDay = currentTime.toLocaleString("en-US", { weekday: "long" });
      const currentTimeString = currentTime.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });

      if (currentDay in Schedule) {
        const subjects = Schedule[currentDay];

        for (const [subject, time] of Object.entries(subjects)) {
          const scheduledTime = new Date(`01/01/2023 ${time}`).getTime();
          const currentTime = new Date(`01/01/2023 ${currentTimeString}`).getTime();
          console.log(scheduledTime)
          if (scheduledTime === currentTime) {
            console.log("done");
            multiply();
            clearInterval(intervalId); // Stop further checks
            break; // Stop checking further subjects
          } else {
            console.log("error");
          }
        }
      }
    };

    const intervalId = setInterval(checkScheduledTime, 60000); // Check every minute

    // Clean up the interval on component unmount
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <>
      <button onClick={multiply}>Click</button>
      <h1>{num3}</h1>
    </>
  );
}

export default Upload;
