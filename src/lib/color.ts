export const shadeRGBColor = (color: string, percent: number) => {
  const f = color.split(",")
  const t = percent < 0 ? 0 : 255
  const p = percent < 0 ? percent * - 1 : percent
  const R = parseInt(f[0].slice(4))
  const G = parseInt(f[1])
  const B = parseInt(f[2]);
  
  return (Math.round((t - R) * p) + R) / 255 + "," + (Math.round((t - G) * p) + G) / 255 + "," + (Math.round((t - B) * p) + B) / 255;
}