export function getBase64(img: any, callback: (url: string | null) => void) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string | null));
  reader.readAsDataURL(img);
}

export const beforeUpload = (handleError: (message: string) => void) => (file: any) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    handleError("JPG画像もしくはPNG画像を指定してください。");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    handleError("2MB未満の画像を指定してください。");
  }
  return isJpgOrPng && isLt2M;
};
