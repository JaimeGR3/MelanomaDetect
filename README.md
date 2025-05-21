# MelanomaDetect 🧠🩺

**MelanomaDetect** es una aplicación web desarrollada con **Astro**, **Tailwind CSS** y SVGs personalizados, que permite a los usuarios detectar signos de **melanoma** a partir de imágenes utilizando inteligencia artificial.

El modelo IA se basa en un clasificador de imágenes entrenado previamente, y la inferencia se realiza a través de **Hugging Face Spaces**. La interfaz permite cambiar entre modo claro y oscuro y ofrece una experiencia amigable e intuitiva para usuarios preocupados por la salud de su piel.

---

## 🌐 Demo en producción

**Netlify App:**  
🔗 [melanoma-detect.netlify.app](https://melanomadetectai.netlify.app/)

---

## 🧠 ¿Cómo funciona?

1. El usuario sube una imagen de una lesión en la piel.
2. La imagen se envía a un endpoint de inferencia de Hugging Face.
3. El modelo devuelve una predicción (`maligna` o `benigna`).
4. La app muestra el resultado de forma clara y visual.

---

## 🛠️ Tecnologías usadas

- [Astro](https://astro.build/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Hugging Face Inference API](https://huggingface.co/inference-api)
- [Netlify](https://www.netlify.com/) para el despliegue

---

## 🚀 Instalación local

1. **Clona el repositorio:**

```bash
git clone https://github.com/JaimeGR3/MelanomaDetect.git
cd MelanomaDetect
