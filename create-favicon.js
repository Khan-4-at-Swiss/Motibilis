import fs from 'fs';
import path from 'path';

const imagePath = path.resolve('public/images/motibilis.jpg');
const svgPath = path.resolve('public/favicon.svg');

const base64Data = fs.readFileSync(imagePath).toString('base64');
const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <clipPath id="circleView">
      <circle cx="50" cy="50" r="50" fill="#FFFFFF" />
    </clipPath>
  </defs>
  <image width="100" height="100" href="data:image/jpeg;base64,${base64Data}" preserveAspectRatio="xMidYMid slice" clip-path="url(#circleView)" />
</svg>`;

fs.writeFileSync(svgPath, svgContent);
console.log('Favicon created at public/favicon.svg');
