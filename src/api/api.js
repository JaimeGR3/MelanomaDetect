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
          const icon = result === "Melanoma" ? melanoma_svg : no_melanoma_svg;
          resultText.innerHTML = `
            Resultado: <strong>${result}</strong><br>
            <span class="inline-block align-middle ml-2">${icon}</span>
          `;
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



const melanoma_svg = `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="none" viewBox="0 0 24 24" stroke="#dc2626" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="12" r="10" stroke="#dc2626" stroke-width="2" fill="#fee2e2"/>
  <circle cx="8" cy="10" r="2" fill="#b91c1c"/>
  <circle cx="15" cy="14" r="3" fill="#b91c1c"/>
  <path d="M12 8v4" stroke="#b91c1c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="12" cy="17" r="1" fill="#b91c1c"/>
</svg>`

const no_melanoma_svg = `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="none" viewBox="0 0 24 24" stroke="#16a34a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="12" r="10" stroke="#16a34a" stroke-width="2" fill="#dcfce7"/>
  <path d="M9 12l2 2 4-4" stroke="#16a34a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`