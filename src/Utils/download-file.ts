function downloadFile(text: string) {
  const data = new File([text], "shape", { type: "text/plain" });

  const url = URL.createObjectURL(data);

  const a = document.createElement("a");
  a.href = url;
  a.download = data.name;

  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  URL.revokeObjectURL(url);
}

export default downloadFile;
