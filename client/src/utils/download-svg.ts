export async function downloadSVG(url: string, name: string) {
  const svgResponse = await fetch(url);
  const svgContent = await svgResponse.text();
  const imageFile = new File([svgContent], name, {
    type: "image/svg+xml",
  });
  return imageFile;
}
