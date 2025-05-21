export function uploadAndPredictImage(file, threshold = 0.2) {
  return new Promise((resolve, reject) => {
    const HF_TOKEN = import.meta.env.PUBLIC_HF_TOKEN;
    const SPACE_URL = "https://Envairont-MelanomaDetect.hf.space/predict";
    const resultText = document.getElementById("resultText");

    const reader = new FileReader();
    reader.onloadend = async () => {
      try {
        const base64Image = reader.result;

        const response = await fetch(SPACE_URL, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${HF_TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            image: base64Image,
          }),
        });

        const data = await response.json();

        if (response.ok && data && data.prediction !== undefined) {
          const result = data.prediction >= threshold ? "Melanoma" : "No Melanoma";
          const predictionPercentage = (data.prediction * 100).toFixed(2);

          resultText.textContent = `Resultado: ${result}`;
          console.log(`Resultado: ${result} (Prob: ${predictionPercentage}%)`);
          resolve(data.prediction);  // <-- Aquí se resuelve la promesa con el valor
        } else {
          resultText.textContent = `Error al procesar la imagen.`;
          reject(new Error("Error al procesar la imagen"));
        }
      } catch (error) {
        resultText.textContent = "Error al enviar la imagen.";
        console.error(error);
        reject(error);
      }
    };

    reader.onerror = () => {
      reject(new Error("Error leyendo archivo"));
    };

    reader.readAsDataURL(file);
  });
}
