import Compressor from "compressorjs";

export async function base64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const allowedFormats: string[] = ["image/png", "image/jpeg", "image/jpg"];

    if (!allowedFormats.includes(file.type)) {
      reject(new Error("Неподдерживаемый формат изображения"));
      return;
    }

    new Compressor(file, {
      quality: 0.6,
      success(result) {
        const reader = new FileReader();
        reader.onload = () => {
          resolve(reader.result?.toString() || "");
        };
        reader.onerror = (error) => {
          reject(error);
        };
        reader.readAsDataURL(result);
      },
      error(error) {
        reject(error);
      },
    });
  });
}
