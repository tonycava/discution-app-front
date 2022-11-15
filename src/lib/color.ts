export const shadeRGBColor = (color: string, percent: number) => {
  const [R, G, B] = color.split(",").map(parseFloat);
  const t = percent < 0 ? 0 : 255
  const p = percent < 0 ? percent * - 1 : percent
  
  return (Math.round((t - R) * p) + R) / 255 + "," + (Math.round((t - G) * p) + G) / 255 + "," + (Math.round((t - B) * p) + B) / 255;
}