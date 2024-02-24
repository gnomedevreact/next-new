export async function base64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const allowedFormats: string[] = ["image/png", "image/jpeg", "image/jpg"];

    if (!allowedFormats.includes(file.type)) {
      reject(new Error("Неподдерживаемый формат изображения"));
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      resolve(reader.result?.toString() || "");
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsDataURL(file);
  });
}
