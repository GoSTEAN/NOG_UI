import React, { useRef, useEffect , useCallback} from "react";

export default function Ticket({ name }) {
  const canvasRef = useRef();

  // const generateTicket = () => {
  //   const canvas = canvasRef.current;
  //   const ctx = canvas.getContext("2d");

  //   // Set canvas size for landscape ticket
  //   canvas.width = 800;
  //   canvas.height = 300;

  //   // Background gradient
  //   const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
  //   gradient.addColorStop(0, "#0a1f3d"); // dark navy
  //   gradient.addColorStop(0.5, "#0d2b5a"); // mid-blue
  //   gradient.addColorStop(1, "#102f6d"); // bright blue
  //   ctx.fillStyle = gradient;
  //   ctx.fillRect(0, 0, canvas.width, canvas.height);

  //   // Event title
  //   ctx.font = "bold 32px sans-serif";
  //   ctx.fillStyle = "#00ffff";
  //   ctx.textAlign = "center";
  //   ctx.fillText("Abuja Night of Glory 2025", canvas.width / 2, 60);

  //   // VIP label
  //   ctx.font = "bold 28px sans-serif";
  //   ctx.fillStyle = "#ffd700";
  //   ctx.fillText("VIP TICKET", canvas.width / 2, 110);

  //   // User's name
  //   ctx.font = "bold 26px sans-serif";
  //   ctx.fillStyle = "#ffffff";
  //   ctx.fillText(name, canvas.width / 2, 160);

  //   // Event details
  //   ctx.font = "18px sans-serif";
  //   ctx.fillStyle = "#ffffff";
  //   ctx.fillText("Date: 5 Dec 2025", canvas.width / 2, 200);
  //   ctx.fillText(
  //     "Venue: Moshood Abiola National Stadium, Abuja",
  //     canvas.width / 2,
  //     230
  //   );

  //   // Border
  //   ctx.strokeStyle = "#00ffff";
  //   ctx.lineWidth = 4;
  //   ctx.strokeRect(0, 0, canvas.width, canvas.height);
  // };

    // Automatically generate ticket when name changes
  // useEffect(() => {
  //   if (name) generateTicket();
  // }, [name]);

  const generateTicket = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Set canvas size for landscape ticket
    canvas.width = 800;
    canvas.height = 300;

    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop(0, "#0a1f3d"); // dark navy
    gradient.addColorStop(0.5, "#0d2b5a"); // mid-blue
    gradient.addColorStop(1, "#102f6d"); // bright blue
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Event title
    ctx.font = "bold 32px sans-serif";
    ctx.fillStyle = "#00ffff";
    ctx.textAlign = "center";
    ctx.fillText("Abuja Night of Glory 2025", canvas.width / 2, 60);

    // VIP label
    ctx.font = "bold 28px sans-serif";
    ctx.fillStyle = "#ffd700";
    ctx.fillText("VIP TICKET", canvas.width / 2, 110);

    // User's name
    ctx.font = "bold 26px sans-serif";
    ctx.fillStyle = "#ffffff";
    ctx.fillText(name, canvas.width / 2, 160);

    // Event details
    ctx.font = "18px sans-serif";
    ctx.fillStyle = "#ffffff";
    ctx.fillText("Date: 5 Dec 2025", canvas.width / 2, 200);
    ctx.fillText(
      "Venue: Moshood Abiola National Stadium, Abuja",
      canvas.width / 2,
      230
    );

    // Border
    ctx.strokeStyle = "#00ffff";
    ctx.lineWidth = 4;
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
  
 }, [name]); 


  useEffect(() => {
  if (name) generateTicket();
}, [name, generateTicket]);

  const downloadTicket = () => {
  const canvas = canvasRef.current;
  const link = document.createElement("a");
  link.download = `Night_of_Glory_VIP_${name}.png`;
  link.href = canvas.toDataURL("image/png");
  link.click();

  // Clear the canvas (optional)
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Reload the page
  window.location.reload();
};

  return (
    <div className="flex flex-col items-center w-full mt-6 px-4">
      <div className="w-full max-w-2xl">
        <canvas
          ref={canvasRef}
          className="w-full rounded-lg shadow-lg"
          style={{ height: "auto" }}
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mt-4 justify-center w-full max-w-2xl">
        {/* <button
          onClick={generateTicket}
          className="flex-1 bg-cyan-500 hover:bg-cyan-400 text-gray-900 px-6 py-3 rounded-lg font-bold transition"
        >
          Generate Ticket
        </button> */}
        <button
          onClick={downloadTicket}
          className="flex-1 bg-yellow-400 hover:bg-yellow-300 text-gray-900 px-6 py-3 rounded-lg font-bold transition"
        >
          Download Ticket
        </button>
      </div>
    </div>
  );
}
