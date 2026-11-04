export const MAX_IMAGE_SIZE_BYTES = 10 * 1024 * 1024;
export const IMAGE_UPLOAD_ERROR = "Elige una imagen JPG, PNG o WebP de hasta 10 MB";

const allowedImageTypes = new Set(["image/jpeg", "image/png", "image/webp"]);

export function validateImageFile(file) {
  if (!file || !allowedImageTypes.has(file.type) || file.size > MAX_IMAGE_SIZE_BYTES) {
    return IMAGE_UPLOAD_ERROR;
  }

  return "";
}

export function initImageUpload({ input, message, retryButton, onImageChange }) {
  let objectUrl = "";

  function clearImage() {
    if (objectUrl) URL.revokeObjectURL(objectUrl);
    objectUrl = "";
    onImageChange("");
  }

  input.addEventListener("change", () => {
    const [file] = input.files ?? [];
    message.textContent = "";
    retryButton.hidden = true;
    if (!file) return;

    const error = validateImageFile(file);
    if (error) {
      message.textContent = error;
      retryButton.hidden = false;
      input.value = "";
      return;
    }

    clearImage();
    objectUrl = URL.createObjectURL(file);
    message.textContent = `Foto lista: ${file.name}. Solo permanece en este dispositivo.`;
    onImageChange(objectUrl);
  });

  retryButton.addEventListener("click", () => input.click());

  return clearImage;
}