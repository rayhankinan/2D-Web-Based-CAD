function downloadFile(text: string): void {
  const data = new File([text], "shapes.json", { type: "application/json" });

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
